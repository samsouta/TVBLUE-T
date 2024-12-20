import React, { useContext } from 'react';
import HomeSlider from '../components/UI/home/HomeSlider';
import VideoPage from '../components/UI/home/VideoPage';
import HomePageType from '../components/UI/home/HomePageType';
import { StateContext } from '../context/StateContext';
import MobileCategory from '../components/layouts/navbar/MobileCategory';
import PhotoPage from '../components/UI/home/PhotoPage';

const Home: React.FC = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('StateContext not found');
  }

  const { typePage } = context;

  return (
    <div className='mt-20 flex flex-col mx-1 lg:mx-4 gap-y-8'>
      {/* Slider */}
      <HomeSlider />

      {/* Tabs for selecting type */}
      <div className='' >
        {/* <MobileCategory/> */}
        <HomePageType />
      </div>

      {/* Content based on selected type */}
      <div className='' >
        {typePage === 'Video' && <VideoPage />}
        {typePage === 'Photo' && <PhotoPage />}
      </div>
    </div>
  );
};

export default Home;
