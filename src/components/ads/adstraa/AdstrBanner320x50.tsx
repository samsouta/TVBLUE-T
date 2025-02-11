import React from 'react';

const AdstrBanner320x50: React.FC = () => {
  // Build the HTML content for the iframe.
  // The <base> tag ensures that the external script's relative URL is resolved correctly.
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
            'key': 'ca0456b6b6b94b250993e7c8595fb48d',
            'format': 'iframe',
            'height': 50,
            'width': 320,
            'params': {}
          };
        </script>
        <!-- External ad script -->
        <script type="text/javascript" src="//www.highperformanceformat.com/ca0456b6b6b94b250993e7c8595fb48d/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="Ad Banner 320x50"
      width="320"
      height="50"
      srcDoc={iframeContent}
      style={{ border: 'none' }}
    />
  );
};

export default AdstrBanner320x50;
