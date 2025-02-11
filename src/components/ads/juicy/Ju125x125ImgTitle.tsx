import React, { useEffect, useRef } from 'react';

const Ju125x125ImgTitle: React.FC = () => {
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
    script2.textContent = "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1080329});";
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    // Create ad container
    const ins = document.createElement('ins');
    ins.id = "1080329";
    ins.setAttribute("data-width", "133");
    ins.setAttribute("data-height", "151");

    // Append elements
    adRef.current.appendChild(script1);
    adRef.current.appendChild(ins);
    adRef.current.appendChild(script2);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ''; // Remove script and ad on unmount
      }
    };
  }, []);

  return <div ref={adRef} className="w-full flex justify-center"></div>;
};

export default Ju125x125ImgTitle;
