import React, { useEffect, useState } from 'react';
import { useGetMoviesFeatureQuery } from '../../services/api/Movies/getMovies';
import HomeVideoPageChild from '../../components/features/video/VideoCard';
import WatchMore from '../../components/UI/watchMoreBtn/WatchMore';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import Pangination from '../../components/UI/pangination/Pangination';
import HomeSlider from '../../components/features/video/VideoSlider';

import { useLocation } from 'react-router-dom';
import AdstrBanner468x60 from '../../components/ads/adstraa/AdstrBanner468x60';
import HillMobileBanner from '../../components/ads/Hillads/HillMobileBanner';
import HillAllDevBanner from '../../components/ads/Hillads/HillAllDevBanner';
import JuBanner300x from '../../components/ads/juicy/JuBanner300x';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';
import Ju160x600Skyscraper from '../../components/ads/juicy/Ju160x600Skyscraper';
import Ju125x125ImgTitle from '../../components/ads/juicy/Ju125x125ImgTitle';
import Ju50x150ImgTitle from '../../components/ads/juicy/Ju50x150ImgTitle';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';

const TradingPage: React.FC = () => {
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage) : 1;
    });

    // Fetch data with pagination
    const { data, isLoading } = useGetMoviesFeatureQuery({ page: currentPage });
    const videos = data?.data || [];
    const lastPage = data?.last_page || 1;

    // Save page number when it changes
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Clear localStorage when leaving the actresses page
    useEffect(() => {
        if (!location.pathname.includes('/trending-now')) {
            localStorage.removeItem('currentPage');
        }
    }, [location.pathname]);



    return (
        <>
            <div className="mt-16 mx-1 lg:mx-4">
                <div className="grid grid-cols-12 mx-auto gap-4">
                    {/* Main Slider - Takes 9 columns on xl screens */}
                    <div className="col-span-12 md:col-span-9">
                        <HomeSlider />

                        {/* Commented ads section preserved */}
                        {/* <div className=" flex flex-col md:flex-row z-0 w-full overflow-hidden">
                            <HillAllDevBanner />
                            <div className=' flex z-0' >
                            <Ju125x125ImgTitle />
                            <Ju50x150ImgTitle />
                            </div>
                        </div> */}
                    </div>

                    {/* Ads Section - Takes 3 columns on xl screens */}
                    {/* <div className="hidden md:block md:col-span-3 z-0">
                        <Ju160x600Skyscraper />
                    </div> */}


                </div>

                {/* ads  */}
                {/* <div className=' mt-2' >
                    <HillMobileBanner />
                </div> */}

                {/* Watch More */}
                <div className="mt-10">
                    <div className="flex flex-col justify-center px-2 mt-6 items-center">
                        <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
                            Watch More Videos
                        </h1>
                        <WatchMore />
                    </div>
                    

                    {/* ads */}
                    {/* <div className="flex justify-center mt-2 w-full overflow-hidden">
                        <AdstrBanner468x60 />
                    </div>
                    <div className=' w-full' >
                        <JuLeaderboard />
                    </div> */}

                </div>



                {/* Page Title */}
                <div className="flex justify-start px-2 mt-6 items-center">
                    <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
                        Trending Now
                    </h1>
                </div>


                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {isLoading
                        ? [...Array(20)].map((_, index) => (
                            <TVSkeleton key={index} />
                        ))
                        : videos.map((item) => (
                            <HomeVideoPageChild
                                key={item?.id}
                                data={item}
                            />
                        ))}
                </div>


                {/* ads */}
                {/* <div className=' flex justify-center mt-2 z-0' >
                    <JuNativeAds />
                </div>
                <div className=' flex justify-center mt-2 z-0' >
                    <JuBanner300x />
                </div> */}


                {/* Pagination */}
                <Pangination
                    lastPage={lastPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </>
    );
};

export default TradingPage;
