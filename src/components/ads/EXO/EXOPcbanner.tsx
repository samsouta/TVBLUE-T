import { useEffect } from "react";

const EXOPcbanner = () => {
  useEffect(() => {
    // Check if script is already added to prevent duplicates
    if (!document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
      const script = document.createElement("script");
      script.src = "https://a.magsrv.com/ad-provider.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Check if ad container exists before adding the ad
    if (!document.querySelector(".eas6a97888e2")) {
      const ins = document.createElement("ins");
      ins.className = "eas6a97888e2";
      ins.setAttribute("data-zoneid", "5558316");
      document.getElementById("exoClickPcAdContainer")?.appendChild(ins);
    }

    // Push the ad provider script
    (window as any).AdProvider = (window as any).AdProvider || [];
    (window as any).AdProvider.push({ serve: {} });
  }, []);

  return <div id="exoClickPcAdContainer"></div>;
};

export default EXOPcbanner;
