import React, { useContext, useEffect } from 'react';
import VideoPage from '../components/UI/home/VideoPage';
import HomePageType from '../components/UI/home/HomePageType';
import { StateContext } from '../context/StateContext';
import PhotoPage from '../components/UI/home/PhotoPage';
import BuyMeCoffee from '../components/UI/BuyMeCoffee/BuyMeCoffee';
import TradingNow from '../components/tradingNow/TradingNow';
import Text from '../components/UI/textAnimation/Text';
import ExoMobileBanner from '../components/ads/EXoClick/ExoMobileBanner';
import ExoOutstreamVideo from '../components/ads/EXoClick/ExoOutstreamVideo';
import ExoPcBanner from '../components/ads/EXoClick/ExoPcBanner';
import TrafficMobileBanner from '../components/ads/trafficstar/TrafficMobileBanner';
import TrafficPCBanner from '../components/ads/trafficstar/TrafficPCBanner';
import ExoRecommendationWidget from '../components/ads/EXoClick/ExoRecommendationWidget';
import TrafficNative from '../components/ads/trafficstar/trafficNative';
import ExoMBannerCPM from '../components/ads/EXoClick/ExoMBannerCPM';
import ExoRecomCPM from '../components/ads/EXoClick/ExoRecomCPM';

const Home: React.FC = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('StateContext not found');
  }

  const { typePage } = context;


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [])

  return (
    <div className='mt-11 flex flex-col mx-1 lg:mx-4 gap-y-8'>
      {/* Buy me  */}
      <div className=' flex flex-col justify-center items-center ' >
        <Text />
        <span className=' text-2xl md:text-4xl text-[#7FADE0] playfair-display' >Support Here</span>
        <BuyMeCoffee />
      </div>

      {/* ADS ZONE */}
      {/* Mobile */}
      <div className=' w-full flex flex-wrap justify-center' >
        <ExoMBannerCPM />
        <ExoMobileBanner />
      </div>
      {/* ADS END  */}

      {/* Tabs for selecting type */}
      <div className='' >
        {/* <MobileCategory/> */}
        <HomePageType />
      </div>


      {/* Content based on selected type */}
      <div className='' >
        {/* ads */}
        <ExoRecomCPM />
        <ExoRecommendationWidget />
        {/* ads end */}

        {/* tradingBtn */}
        <div className=' mb-9 flex flex-col justify-center items-center' >
          <h1 className="text-[var(--light-blue)] my-2 text-2xl lg:text-4xl playfair-display">
            Trending Video
          </h1>
          <TradingNow />
        </div>
        {/* ads */}
       
        {/* ads end  */}
        {typePage === 'Video' && <VideoPage />}
        {typePage === 'Photo' && <PhotoPage />}
      </div>

    </div>
  );
};

export default Home;
