import React, { useEffect } from 'react';

const JuicyBannerMobileimg7: React.FC = () => {
  useEffect(() => {
    // Create and append the external script for JuicyAds
    const juicyScript = document.createElement('script');
    juicyScript.type = 'text/javascript';
    juicyScript.async = true;
    juicyScript.setAttribute('data-cfasync', 'false');
    juicyScript.src = 'https://poweredby.jads.co/js/jads.js';

    // Append the <ins> tag for JuicyAds
    const juicyIns = document.createElement('ins');
    juicyIns.id = '1077730';
    juicyIns.setAttribute('data-width', '468');
    juicyIns.setAttribute('data-height', '60');

    // Add the inline script for JuicyAds
    const juicyInlineScript = document.createElement('script');
    juicyInlineScript.type = 'text/javascript';
    juicyInlineScript.async = true;
    juicyInlineScript.setAttribute('data-cfasync', 'false');
    juicyInlineScript.text = `(adsbyjuicy = window.adsbyjuicy || []).push({'adzone':1077730});`;

    // Get the container to append ads elements
    const container = document.getElementById('juicy-container');
    if (container) {
      container.appendChild(juicyScript); // Add the external script
      container.appendChild(juicyIns);    // Add the <ins> tag
      container.appendChild(juicyInlineScript); // Add the inline script
    }

    // Cleanup on unmount
    return () => {
      if (container) {
        container.innerHTML = ''; // Remove all child elements
      }
    };
  }, []);

  return (
    <div
      id="juicy-container"
      className="w-full"
      style={{
        position: 'relative', // Ensure it's in a stacking context
        zIndex: 0, // Set z-index
      }}
    >
      {/* JuicyAds content will be dynamically added here */}
    </div>
  );
};

export default JuicyBannerMobileimg7;
