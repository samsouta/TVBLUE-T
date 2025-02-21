import React, { useContext, useEffect } from 'react';
import VideoPage from '../components/features/video/VideoPage';
import { StateContext } from '../context/StateContext';
import TradingNow from '../components/UI/tradingNowButton/TradingNow';
import SwiperBox from '../components/features/PopularModelSwiper/SwiperBox';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import JuBanner300x from '../components/ads/juicy/JuBanner300x';


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
    <>
      <div className=' flex flex-col mx-1 lg:mx-4 gap-y-8'>
        <div className='' >
          {/* Popular Actress */}
          <div className=' mb-9 ' >
            <div className=" flex justify-between items-center">
              <span className='text-[var(--light-blue)] ps-1 my-2 text-2xl poppins-bold' > Popular Actress</span>
              <Link to={`/actresses`} ><div className=' flex px-2 items-center cursor-pointer' >
                <span className="raleway text-[var(--light-blue)] font-bold lg:text-xl text-md">See All</span>
                <FaArrowRight className="text-sm text-[var(--light-blue)] md:text-lg" />
              </div></Link>
            </div>
            <SwiperBox />
          </div>

          {/* ads  */}
          <div className=' overflow-hidden w-full flex justify-center' >
            <JuBanner300x />
          </div>


          {/* tradingBtn */}
          <div className=' mb-9 flex flex-col justify-start items-center' >
            <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
              Trending Video
            </h1>
            <TradingNow />
          </div>



          {typePage === 'Video' && <VideoPage />}

        </div>

      </div>
    </>
  );
};

export default Home;
