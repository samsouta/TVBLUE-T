import React from 'react';

const AdstrBanner728x90: React.FC = () => {
  // Build the HTML content for the iframe.
  // The <base> tag helps resolve the relative URL of the external script.
  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <base href="//www.highperformanceformat.com/">
      </head>
      <body>
        <!-- Inline ad configuration -->
        <script type="text/javascript">
          atOptions = {
            'key' : '898ef15f9ba74e9ad624b4df45b179c7',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <!-- External ad script -->
        <script type="text/javascript" src="//www.highperformanceformat.com/898ef15f9ba74e9ad624b4df45b179c7/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="Ad Banner 728x90"
      width="728"
      height="90"
      srcDoc={iframeContent}
      style={{ border: "none" }}
    />
  );
};

export default AdstrBanner728x90;
