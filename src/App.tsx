import React from 'react';
// import ConnectVpn from './components/UI/alert/ConnectVpn';
import AdultsModel from './components/UI/AdultsModel';
import { useDisclosure } from '@nextui-org/react';
import Router from './routes/Router';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet-async';


const App: React.FC = () => {
  // const [accessAllowed, setAccessAllowed] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // // Get the disclosure state from NextUI
  const { isOpen, onOpenChange } = useDisclosure();

  // useEffect(() => {
  //   // Check the user's country access
  //   const checkCountry = async () => {
  //     try {
  //       const apiKey = '92c40db8874c3a370112846cd14fe388906b6e2fdc895a2f7f1a8851'; // Replace with your ipdata.co API key
  //       const response = await fetch(`https://api.ipdata.co?api-key=${apiKey}`);
  //       const data = await response.json();

  //       // Block access if the country is Myanmar (MM)
  //       if (data.country_code === 'MM') {
  //         setAccessAllowed(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking country:', error);
  //       setAccessAllowed(true); // Allow access if API fails
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkCountry();

  //   // Check localStorage for the modal flag
  //   const modalShown = localStorage.getItem('modalShown');
  //   if (!modalShown) {
  //     onOpen(); // Open the modal if it hasn't been shown before
  //     localStorage.setItem('modalShown', 'true');
  //   }
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!accessAllowed) {
  //   return (
  //     <div>
  //       <ConnectVpn />
  //     </div>
  //   );
  // }

  const siteStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "BlueTV - Best HD Porn & JAV Movies",
    "description": "Stream trending Porn & JAV movies in HD quality on BlueTV. No ads, unlimited viewing.",
    "thumbnailUrl": "https://bluetv.xyz/card.jpg",
    "uploadDate": new Date().toISOString(),
    "contentUrl": "https://bluetv.xyz/",
    "duration": "PT2H",
    "publisher": {
      "@type": "Organization",
      "name": "BlueTV",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bluetv.xyz/logo.png"
      }
    }
  };

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>BlueTV - Watch Free HD Adult Movies & JAV Videos</title>
          <meta name="description" content="Watch free HD adult movies and live cam shows on BlueTV. Unlimited premium streaming with no ads." />
          <meta name="keywords" content="HD adult movies, JAV videos, premium porn, streaming movies" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://bluetv.xyz/" />

          {/* Open Graph (Facebook) */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="BlueTV - Watch Free HD Adult Movies" />
          <meta property="og:description" content="Unlimited access to the best HD adult movies and live cam shows. No ads, just streaming." />
          <meta property="og:image" content="https://bluetv.xyz/card.jpg" />
          <meta property="og:url" content="https://bluetv.xyz/" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="BlueTV - Free HD Adult Movies & JAV Videos" />
          <meta name="twitter:description" content="Stream free HD adult movies and JAV videos with no ads on BlueTV." />
          <meta name="twitter:image" content="https://bluetv.xyz/card.jpg" />

          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(siteStructuredData)}
          </script>
        </Helmet>

        <Router />
      </HelmetProvider>

      {/* Pass the disclosure state to AdultsModel */}
      <AdultsModel isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default App;
