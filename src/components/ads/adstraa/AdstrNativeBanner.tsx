import { useEffect } from "react";

const AdstrNativeBanner = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//relishsubsequentlytank.com/ec3a7f0a7922dcd24979434c8b8a071a/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);
  }, []);

  return <div id="container-ec3a7f0a7922dcd24979434c8b8a071a"></div>;
};

export default AdstrNativeBanner;

