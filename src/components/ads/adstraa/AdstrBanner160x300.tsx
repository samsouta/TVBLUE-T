import React from 'react';

const AdstrBanner160x300: React.FC = () => {
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
            'key': '7e312dfe608148669ed7243ecafe3f01',
            'format': 'iframe',
            'height': 300,
            'width': 160,
            'params': {}
          };
        </script>
        <!-- External ad script -->
        <script type="text/javascript" src="//www.highperformanceformat.com/7e312dfe608148669ed7243ecafe3f01/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="Ad Banner 160x300"
      width="160"
      height="300"
      srcDoc={iframeContent}
      style={{ border: 'none' }}
    />
  );
};

export default AdstrBanner160x300;
