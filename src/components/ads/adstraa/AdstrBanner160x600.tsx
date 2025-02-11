import React from 'react'


const AdstrBanner160x600: React.FC = () => {
  // Build the HTML content to be loaded in the iframe.
  // The <base> tag is added to help resolve the external script URL.
  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <base href="https://www.highperformanceformat.com/">
      </head>
      <body>
        <!-- Inline ad configuration -->
        <script type="text/javascript">
          atOptions = {
            'key' : '276bcaca190b9f94e185954fe0466b8b',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        </script>
        <!-- External script that loads the ad -->
        <script type="text/javascript" src="//www.highperformanceformat.com/276bcaca190b9f94e185954fe0466b8b/invoke.js"></script>
      </body>
    </html>
  `;
  return (
    <iframe
      title="Ad"
      width="160"
      height="600"
      srcDoc={iframeContent}
      style={{ border: "none" }}
    />
  )
}

export default AdstrBanner160x600