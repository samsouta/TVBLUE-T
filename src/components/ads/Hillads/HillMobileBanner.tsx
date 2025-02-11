import React, { useEffect, useRef } from 'react';

const HillMobileBanner: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    const script = document.createElement('script');
    script.src = "//worthlessbend.com/bWX.VhsZdIGClE0qYKW/dPi/YEWL5GuYZ/XZIg/_eWmq9WuhZHUGlEk/P/TKYzwoOyDWIe2EN/D/UXtJN_jDA/4GMejoY/0ONOgg";
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ''; // Remove script when component unmounts
      }
    };
  }, []);

  return <div ref={adRef} className="w-full flex justify-center"></div>;
};

export default HillMobileBanner;
