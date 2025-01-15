import React, { useEffect } from 'react';

const ExoClickBanner2: React.FC = () => {
    useEffect(() => {
        // Function to dynamically add a script
        const addScript = (src: string, isInline: boolean, inlineContent?: string) => {
            const script = document.createElement('script'); // Create a script tag
            script.type = 'text/javascript'; // Set type
            script.async = true; // Make it async

            if (isInline && inlineContent) {
                script.text = inlineContent; // Add inline content if provided
            } else {
                script.src = src; // Add external source
            }

            // Append script to the ad container
            const adContainer = document.getElementById('exo-container-2');
            if (adContainer) {
                adContainer.appendChild(script); // Attach script to the container
            }
        };

        // Add external script for ads
        addScript('https://a.magsrv.com/ad-provider.js', false);

        // Add inline script
        const inlineScript = `(AdProvider = window.AdProvider || []).push({ "serve": {} });`;
        addScript('', true, inlineScript);

        // Cleanup on unmount
        // return () => {
        //     const adContainer = document.getElementById('exo-container-2');
        //     if (adContainer) {
        //         // Remove dynamically added scripts
        //         const scripts = adContainer.getElementsByTagName('script');
        //         Array.from(scripts).forEach((script) => {
        //             adContainer.removeChild(script);
        //         });
        //     }
        // };
    }, []);

    return (
        <div className="w-full overflow-hidden" id="exo-container-2">
            {/* Multi-Format Ad */}
            <ins className="eas6a97888e37" data-zoneid="5513448"></ins>
        </div>
    );
};

export default ExoClickBanner2;
