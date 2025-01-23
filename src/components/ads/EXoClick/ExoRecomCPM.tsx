import React, { useEffect } from 'react';

const ExoRecomCPM: React.FC = () => {
  useEffect(() => {
    // Add the external ad script
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.type = 'application/javascript';
    adScript.src = 'https://a.magsrv.com/ad-provider.js';
    document.body.appendChild(adScript);

    // Create the <ins> element dynamically for the recommendation CPM ad
    const adElement = document.createElement('ins');
    adElement.className = 'eas6a97888e20'; // Use the provided class name
    adElement.setAttribute('data-zoneid', '5520716'); // Set the correct zone ID

    // Append the ad element to the placeholder in the component
    const placeholder = document.getElementById('exo-recom-cpm-placeholder');
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
      {/* Placeholder for the recommendation CPM ad */}
      <div id="exo-recom-cpm-placeholder" style={{ textAlign: 'center' }}></div>
    </div>
  );
};

export default ExoRecomCPM;
