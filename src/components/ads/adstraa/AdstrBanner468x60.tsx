import React from 'react';

const AdstrBanner468x60: React.FC = () => {
  // Build the HTML content for the iframe.
  // The <base> tag helps resolve the relative URL for the external script.
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
            'key': '3a71499dbe7050458dd3c51366b1ae94',
            'format': 'iframe',
            'height': 60,
            'width': 468,
            'params': {}
          };
        </script>
        <!-- External ad script -->
        <script type="text/javascript" src="//www.highperformanceformat.com/3a71499dbe7050458dd3c51366b1ae94/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="Ad Banner 468x60"
      width="468"
      height="60"
      srcDoc={iframeContent}
      style={{ border: 'none' }}
    />
  );
};

export default AdstrBanner468x60;
