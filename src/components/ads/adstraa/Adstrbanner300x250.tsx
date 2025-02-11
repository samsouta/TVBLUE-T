import React from 'react';

const Adstrbanner300x250: React.FC = () => {
  // Build the HTML content to be loaded into the iframe.
  // The <base> tag ensures the relative URL for the external script is correctly resolved.
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
            'key': 'e34153dd7dd03f0c43ec356835fe236a',
            'format': 'iframe',
            'height': 250,
            'width': 300,
            'params': {}
          };
        </script>
        <!-- External ad script -->
        <script type="text/javascript" src="//www.highperformanceformat.com/e34153dd7dd03f0c43ec356835fe236a/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="Ad Banner 300x250"
      width="300"
      height="250"
      srcDoc={iframeContent}
      style={{ border: "none" }}
    />
  );
};

export default Adstrbanner300x250;
