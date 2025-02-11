import React, { useEffect, useRef } from 'react';

const Ju160x600Skyscraper: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Load the JuicyAds script
    const script1 = document.createElement('script');
    script1.src = "https://poweredby.jads.co/js/jads.js";
    script1.async = true;
    script1.setAttribute("data-cfasync", "false");

    // JuicyAds ad placement script
    const script2 = document.createElement('script');
    script2.textContent = "(adsbyjuicy = window.adsbyjuicy || []).push({'adzone': 1080328});";
    script2.async = true;
    script2.setAttribute("data-cfasync", "false");

    // Create ad container
    const ins = document.createElement('ins');
    ins.id = "1080328";
    ins.setAttribute("data-width", "160");
    ins.setAttribute("data-height", "612");

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

export default Ju160x600Skyscraper;
