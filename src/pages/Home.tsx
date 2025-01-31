import React, { useContext, useEffect } from 'react';
import VideoPage from '../components/features/video/VideoPage';
import { StateContext } from '../context/StateContext';
import TradingNow from '../components/UI/tradingNowButton/TradingNow';
import SwiperBox from '../components/features/PopularModelSwiper/SwiperBox';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ExoRecommendationWidget from '../components/ads/EXoClick/ExoRecommendationWidget';
import ExoRecomCPM from '../components/ads/EXoClick/ExoRecomCPM';
import ExoMBannerCPM from '../components/ads/EXoClick/ExoMBannerCPM';
import ExoMobileBanner from '../components/ads/EXoClick/ExoMobileBanner';


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
    <div className='mt-20 flex flex-col mx-1 lg:mx-4 gap-y-8'>

      <div className='' >
        {/* ads */}
        <ExoRecommendationWidget />
        <ExoRecomCPM />
        {/* ads end */}

        {/* Popular Actress */}
        <div className=' mb-9 ' >
          <div className=" flex justify-between items-center">
            <span className='text-[var(--light-blue)] ps-1 my-2 text-2xl font-bold montserrat' > Popular Actress</span>
            <Link to={`/actresses`} ><div className=' flex px-2 items-center cursor-pointer' >
              <span className="montserrat text-[var(--light-blue)] font-bold lg:text-xl text-md">See All</span>
              <FaArrowRight className="text-sm text-[var(--light-blue)] md:text-lg" />
            </div></Link>
          </div>
          <SwiperBox />
        </div>

        {/* tradingBtn */}
        <div className=' mb-9 flex flex-col justify-start items-center' >
          <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
            Trending Video
          </h1>
          <TradingNow />
        </div>
        {/* ADS ZONE */}
        {/* Mobile */}
        <div className=' w-full flex flex-wrap justify-center' >
          <ExoMBannerCPM />
          <ExoMobileBanner />
        </div>
        {/* ADS END  */}
        {typePage === 'Video' && <VideoPage />}
        {/* {typePage === 'Photo' && <PhotoPage />} */}
      </div>

    </div>
  );
};

export default Home;
