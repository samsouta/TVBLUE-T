import React, { useEffect } from 'react';

const TrafficNative: React.FC = () => {
  useEffect(() => {
    // Add the first script for loading the native ad SDK
    const sdkScript = document.createElement('script');
    sdkScript.src = "//cdn.tsyndicate.com/sdk/v1/n.js";
    sdkScript.async = true;
    sdkScript.onload = () => {
      // Once the SDK is loaded, initialize the native ad
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        NativeAd({
          element_id: "ts_ad_native_67ak9",
          spot: "b51ada703d20425684523945e465f65a",
          type: "label-under",
          cols: 4,
          rows: 1,
          title: "Suggested for you",
          titlePosition: "left",
          adsByPosition: "right",
          breakpoints: [
            {
              "cols": 2,
              "width": 770
            }
          ]
        });
      `;
      document.body.appendChild(inlineScript);
    };

    // Append the script to the body
    document.body.appendChild(sdkScript);

    // No cleanup to ensure the ad remains loaded and visible
  }, []);

  return (
    <div>
      {/* Placeholder for the native ad */}
      <div id="ts_ad_native_67ak9"></div>
    </div>
  );
};

export default TrafficNative;
