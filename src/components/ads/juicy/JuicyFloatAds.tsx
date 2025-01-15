import React, { useEffect } from 'react';

const JuicyFloatAds: React.FC = () => {
  useEffect(() => {
    // Set the juicy_adzone script
    const juicyAdzoneScript = document.createElement('script');
    juicyAdzoneScript.type = 'text/javascript';
    juicyAdzoneScript.text = "juicy_adzone = '1077735';";

    // Append the juicy_adzone script to the head
    document.head.appendChild(juicyAdzoneScript);

    // Add the external script for JuicyAds float ad
    const juicyFloatScript = document.createElement('script');
    juicyFloatScript.type = 'text/javascript';
    juicyFloatScript.src = 'https://poweredby.jads.co/js/jfc.js';
    juicyFloatScript.charset = 'utf-8';

    // Append the float ad script to the head
    document.head.appendChild(juicyFloatScript);

    // Cleanup on unmount
    return () => {
      // Remove the scripts when component is unmounted
      document.head.removeChild(juicyAdzoneScript);
      document.head.removeChild(juicyFloatScript);
    };
  }, []);

  return (
    <div>
      {/* JuicyAds Float Ad will be dynamically added here */}
    </div>
  );
};

export default JuicyFloatAds;
