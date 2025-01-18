import React, { useEffect } from 'react';

const ExoDesktopFullpage: React.FC = () => {
  useEffect(() => {
    // Add the external script
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.type = 'application/javascript';
    adScript.src = 'https://a.pemsrv.com/ad-provider.js';
    document.body.appendChild(adScript);

    // Create the <ins> element dynamically
    const adElement = document.createElement('ins');
    adElement.className = 'eas6a97888e35';
    adElement.setAttribute('data-zoneid', '5513346');

    // Append the ad element to the placeholder in the component
    const placeholder = document.getElementById('exo-desktop-fullpage-placeholder');
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
      {/* Placeholder for the full-page ad */}
      <div id="exo-desktop-fullpage-placeholder" style={{ textAlign: 'center' }}></div>
    </div>
  );
};

export default ExoDesktopFullpage;
