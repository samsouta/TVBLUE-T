import React, { useEffect, useRef } from 'react';

const HillAllDevBanner: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    const script = document.createElement('script');
    script.src = "//worthlessbend.com/bsX.VHs/d/GZlo0HYDWtdciUYWWZ5GuQZZX/IO/weEmV9RujZIUNlwk/PXTnYKwPOSDyIb2nOmTzI/ttNQjVAz4/MvjZYn5pMNwA";
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = ''; // Remove script on unmount
      }
    };
  }, []);

  return <div ref={adRef} className="w-full flex justify-center"></div>;
};

export default HillAllDevBanner;
