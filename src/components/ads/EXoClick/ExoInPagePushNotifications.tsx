import React, { useEffect } from 'react';

const ExoInPagePushNotifications: React.FC = () => {
  useEffect(() => {
    // Add the external ad script
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.type = 'application/javascript';
    adScript.src = 'https://a.magsrv.com/ad-provider.js';
    document.body.appendChild(adScript);

    // Create the <ins> element dynamically
    const adElement = document.createElement('ins');
    adElement.className = 'eas6a97888e42';
    adElement.setAttribute('data-zoneid', '5513366');

    // Append the ad element to the placeholder in the component
    const placeholder = document.getElementById('exo-in-page-push-notifications-placeholder');
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
      {/* Placeholder for the in-page push notifications ad */}
      <div id="exo-in-page-push-notifications-placeholder" style={{ textAlign: 'center' }}></div>
    </div>
  );
};

export default ExoInPagePushNotifications;
