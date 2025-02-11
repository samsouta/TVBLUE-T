import React, { useEffect, useRef } from 'react';

const JuNativeAds: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Load JuicyAds script
    const script1 = document.createElement('script');
    script1.src = "https://poweredby.jads.co/js/jads.js";
    script1.async = true;
    script1.setAttribute("data-cfasync", "false");

    // JuicyAds ad placement script
    const script2 = document.createElement('script');
    script2.textContent = "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1080331});";
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    // Create ad container
    const ins = document.createElement('ins');
    ins.id = "1080331";
    ins.setAttribute("data-width", "432");
    ins.setAttribute("data-height", "152");

    // Append elements
    adRef.current.appendChild(script1);
    adRef.current.appendChild(ins);
    adRef.current.appendChild(script2);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ''; // Cleanup script and ad on unmount
      }
    };
  }, []);

  return <div ref={adRef} className="w-full flex justify-center"></div>;
};

export default JuNativeAds;
