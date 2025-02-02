import React, { useEffect, useState } from 'react';
import Patch from './routes/Patch';
import ConnectVpn from './components/UI/alert/ConnectVpn';
import Background from './components/UI/eldoraui/Novatrixbg';

const App: React.FC = () => {
  const [accessAllowed, setAccessAllowed] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkCountry = async () => {
      try {
        const apiKey = '92c40db8874c3a370112846cd14fe388906b6e2fdc895a2f7f1a8851'; // Replace with your ipdata.co API key
        const response = await fetch(`https://api.ipdata.co?api-key=${apiKey}`);
        const data = await response.json();


        // Block access if the country is Myanmar (MM)
        if (data.country_code === 'MM') {
          setAccessAllowed(false);
        }
      } catch (error) {
        console.error('Error checking country:', error);
        setAccessAllowed(true); // Allow access if API fails
      } finally {
        setIsLoading(false);
      }
    };

    checkCountry();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!accessAllowed) {
    return (
      <div>
        <div><ConnectVpn /></div>
      </div>
    );
  }

  return (
    <div>
      <Background/>
      <Patch />

    </div>
  );
};

export default App;
