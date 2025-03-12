import { useEffect } from "react";

const EXOMobileBanner = () => {
  useEffect(() => {
    // Check if script is already added to prevent duplicates
    if (!document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
      const script = document.createElement("script");
      script.src = "https://a.magsrv.com/ad-provider.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Check if ad container exists before adding the ad
    if (!document.querySelector(".eas6a97888e10")) {
      const ins = document.createElement("ins");
      ins.className = "eas6a97888e10";
      ins.setAttribute("data-zoneid", "5558320");
      document.getElementById("exoClickAdContainer")?.appendChild(ins);
    }

    // Push the ad provider script
    (window as any).AdProvider = (window as any).AdProvider || [];
    (window as any).AdProvider.push({ serve: {} });
  }, []);

  return <div id="exoClickAdContainer"></div>;
};

export default EXOMobileBanner;
