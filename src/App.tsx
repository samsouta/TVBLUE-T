import React from 'react';
import Patch from './routes/Patch';
// import ConnectVpn from './components/UI/alert/ConnectVpn';
import AdultsModel from './components/UI/CheckAdultsModel/AdultsModel';
import { useDisclosure } from '@nextui-org/react';

const App: React.FC = () => {
  // const [accessAllowed, setAccessAllowed] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // // Get the disclosure state from NextUI
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  return (
    <div>
      <Patch />
      {/* Pass the disclosure state to AdultsModel */}
      <AdultsModel isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default App;
