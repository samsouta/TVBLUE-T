import React, { useEffect } from 'react';

const ExoMixbanner: React.FC = () => {
  useEffect(() => {
    // Create the first script tag for the ad
    const script1 = document.createElement('script');
    script1.async = true;
    script1.type = 'application/javascript';
    script1.src = 'https://a.magsrv.com/ad-provider.js';
    document.body.appendChild(script1);

    // Create the <ins> tag for the ad
    const ins = document.createElement('ins');
    ins.className = 'eas6a97888e38';
    ins.setAttribute('data-zoneid', '5520318');

    // Append the <ins> tag to the container in the component
    const container = document.getElementById('ad-container-mixbanner');
    if (container) {
      container.appendChild(ins);
    }

    // Create the second script tag to trigger the ad
    const script2 = document.createElement('script');
    script2.textContent = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;

    // Append the second script tag to the container
    if (container) {
      container.appendChild(script2);
    }

    // No cleanup logic, the ad will remain visible on the page
  }, []);

  return (
    <div>
      <div id="ad-container-mixbanner"></div> {/* The ad will be displayed in this div */}
    </div>
  );
};

export default ExoMixbanner;
