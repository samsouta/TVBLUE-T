import React, { useEffect } from 'react';

const ExoPcBanner: React.FC = () => {
  useEffect(() => {
    // Add the external script
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.type = 'application/javascript';
    adScript.src = 'https://a.magsrv.com/ad-provider.js';
    document.body.appendChild(adScript);

    // Create the <ins> element dynamically
    const adElement = document.createElement('ins');
    adElement.className = 'eas6a97888e2';
    adElement.setAttribute('data-zoneid', '5513330');

    // Append the ad element to the placeholder in the component
    const placeholder = document.getElementById('exo-pc-banner-placeholder');
    if (placeholder) {
      placeholder.appendChild(adElement);
    }

    // Add the inline script for AdProvider
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;
    document.body.appendChild(inlineScript);

    // No cleanup to ensure ads remain loaded
  }, []);

  return (
    <div>
      {/* Placeholder for the ad */}
      <div id="exo-pc-banner-placeholder" style={{ textAlign: 'center' }}></div>
    </div>
  );
};

export default ExoPcBanner;
