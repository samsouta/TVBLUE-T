import React, { useEffect } from 'react';

const ExoClickBanner: React.FC = () => {
    useEffect(() => {
        // Helper function to dynamically add scripts
        const addScript = (src: string, isInline: boolean, inlineContent?: string) => {
            const script = document.createElement('script'); // create new script tag
            script.type = 'text/javascript'; // define type as JavaScript
            script.async = true; // load script asynchronously

            if (isInline && inlineContent) {
                script.text = inlineContent; // Add inline JavaScript
            } else {
                script.src = src; // Add external script source
            }

            // Append script to the ad container
            const adContainer = document.getElementById('exo-container');
            if (adContainer) {
                adContainer.appendChild(script); // Insert the script into ad-container
            }
        };

        // Add JuicyAds main script (external script)
        addScript('https://a.magsrv.com/ad-provider.js', false);

        const inlineScript = `(AdProvider = window.AdProvider || []).push({"serve": {}});`;
        addScript('', true, inlineScript);

        // Mobile Banner Ads
        addScript('https://a.pemsrv.com/ad-provider.js', false);
        const mobileInlineScript = `(AdProvider = window.AdProvider || []).push({ "serve": {} });`;
        addScript('', true, mobileInlineScript);

        // Web Banner Ads
        addScript('https://a.magsrv.com/ad-provider.js', false);
        const webBannerInlineScript = `(AdProvider = window.AdProvider || []).push({ "serve": {} });`;
        addScript('', true, webBannerInlineScript);

        // Multi-Format Ads
        addScript('https://a.magsrv.com/ad-provider.js', false);
        const multiFormatInlineScript = `(AdProvider = window.AdProvider || []).push({ "serve": {} });`;
        addScript('', true, multiFormatInlineScript);

        // Native Ads
        addScript('https://a.magsrv.com/ad-provider.js', false);
        const nativeInlineScript = `(AdProvider = window.AdProvider || []).push({ "serve": {} });`;
        addScript('', true, nativeInlineScript);

        // Cleanup on unmount
        // return () => {
        //     const adContainer = document.getElementById('exo-container');
        //     if (adContainer) {
        //         // Remove specific script elements added dynamically
        //         const scripts = adContainer.getElementsByTagName('script');
        //         Array.from(scripts).forEach((script) => {
        //             adContainer.removeChild(script); // Remove each script
        //         });
        //     }
        // };
    }, []);

    return (
        <div className='w-full overflow-hidden flex flex-wrap' id='exo-container'>
            {/* Mobile Banner */}
            <ins className="eas6a97888e35" data-zoneid="5513346"></ins>

            {/* Web Banner */}
            <div className=' ad-container' >
                <div className="ad-item">
                <ins className="eas6a97888e2" data-zoneid="5513330"></ins>
                </div>
            </div>

            {/* Multi-Format Banner */}
            <ins className="eas6a97888e38" data-zoneid="5513370"></ins>

            {/* Native Ads */}
            <ins className="eas6a97888e20" data-zoneid="5513360"></ins>
        </div>
    );
};

export default ExoClickBanner;
