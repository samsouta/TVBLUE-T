import React, { useEffect } from 'react';

const ExoOutstreamVideo: React.FC = () => {
  useEffect(() => {
    // Add the external ad script
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.type = 'application/javascript';
    adScript.src = 'https://a.magsrv.com/ad-provider.js';
    document.body.appendChild(adScript);

    // Create the <ins> element dynamically
    const adElement = document.createElement('ins');
    adElement.className = 'eas6a97888e37';
    adElement.setAttribute('data-zoneid', '5513448');

    // Append the ad element to the placeholder in the component
    const placeholder = document.getElementById('exo-outstream-video-placeholder');
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
      {/* Placeholder for the outstream video ad */}
      <div id="exo-outstream-video-placeholder" style={{ textAlign: 'center' }}></div>
    </div>
  );
};

export default ExoOutstreamVideo;
