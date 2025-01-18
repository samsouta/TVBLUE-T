import React, { useEffect } from 'react';

const ExoPCStickyBanner: React.FC = () => {
  useEffect(() => {
    // Add the external script
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.type = 'application/javascript';
    adScript.src = 'https://a.magsrv.com/ad-provider.js';
    document.body.appendChild(adScript);

    // Create the <ins> element dynamically
    const adElement = document.createElement('ins');
    adElement.className = 'eas6a97888e17';
    adElement.setAttribute('data-zoneid', '5513344');

    // Append the ad element to the placeholder in the component
    const placeholder = document.getElementById('exo-sticky-banner-placeholder');
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
      {/* Placeholder for the sticky ad */}
      <div id="exo-sticky-banner-placeholder" style={{ textAlign: 'center' }}></div>
    </div>
  );
};

export default ExoPCStickyBanner;
