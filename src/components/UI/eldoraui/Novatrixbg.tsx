import React, { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

// Vertex Shader
const vert = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

// Fragment Shader
const frag = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Slow down the wave animation
  float d = -uTime * 0.5; // Reduced speed from 1.2 to 0.5
  float a = 0.0;

  // Generate a slower wave effect
  for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x * 0.5); // Reduced frequency
      d += sin(uv.y * i * 0.5 + a); // Smoother wave
  }

  d += uTime * 0.5; // Slower movement

  vec3 col = vec3(
    cos(uv * vec2(d, a) * 0.3) * 0.6 + 0.4, // Reduce wave effect strength
    cos(a + d) * 0.5 + 0.5
  );
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);

  // Define colors
  vec3 color1 = vec3(1.0, 0.435, 0.569);  // #ff6f91
  vec3 color2 = vec3(0.518, 0.369, 0.761);  // #845ec2
  vec3 color3 = vec3(0.690, 0.659, 0.725);  // #b0a8b9

  // Dynamic mix factor with slower animation
  float factor1 = 0.5 + 0.5 * sin(uTime * 0.3 + uv.x * 3.14159); // Reduced speed
  float factor2 = 0.5 + 0.5 * cos(uTime * 0.3 + uv.y * 3.14159); // Reduced speed

  // Smooth color transition
  vec3 mixColor = mix(mix(color1, color2, factor1), color3, factor2);

  gl_FragColor = vec4(col * mixColor, 1.0);
}
`;



interface NovatrixProps {
  className?: string;
}

const Novatrix: React.FC<NovatrixProps> = ({ className = "" }) => {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctnDom.current) return;

    const ctn = ctnDom.current;
    const renderer = new Renderer({
      alpha: true, // Enable transparency
      antialias: true, // Enable antialiasing
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0); // Transparent background

    // Set initial size using device pixel ratio for better resolution
    const scale = window.devicePixelRatio;
    renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);

    const geometry = new Triangle(gl);

    // Declare and initialize program BEFORE defining the resize function
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: [
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ],
        },
      },
    });

    // Now define resize after program is declared
    function resize() {
      const scale = window.devicePixelRatio;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      program.uniforms.uResolution.value = [
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      ];
    }
    window.addEventListener("resize", resize, false);

    const mesh = new Mesh(gl, { geometry, program });

    let animateId: number;
    function update(t: number) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);

    ctn.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div ref={ctnDom} className={`gradient-canvas h-full w-full ${className}`} />
  );
};

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Novatrix />
    </div>
  );
};

export default Background;
