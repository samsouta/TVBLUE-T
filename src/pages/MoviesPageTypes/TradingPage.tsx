import React, { useEffect, useState } from 'react';
import { useGetMoviesFeatureQuery } from '../../services/api/Movies/getMovies';
import HomeVideoPageChild from '../../components/features/video/VideoCard';
import WatchMore from '../../components/UI/watchMoreBtn/WatchMore';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import Pangination from '../../components/UI/pangination/Pangination';
import HomeSlider from '../../components/features/video/VideoSlider';

import { useLocation } from 'react-router-dom';
import JuBanner300x from '../../components/ads/juicy/JuBanner300x';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';
import Ju160x600Skyscraper from '../../components/ads/juicy/Ju160x600Skyscraper';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';
import AdstrBanner160x600 from '../../components/ads/adstraa/AdstrBanner160x600';
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90';

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
            <div className=" mx-1 lg:mx-4">
                <div className="grid grid-cols-12 gap-4">
                    {/* Main Slider - Takes 9 columns on xl screens */}
                    <div className="col-span-12 md:col-span-8">
                        <HomeSlider />
                    </div>

                    {/* Ads Section - long board */}
                    <div className="hidden md:block md:col-span-4 z-0">
                        <div className=' flex justify-center' >
                            <Ju160x600Skyscraper />
                            <AdstrBanner160x600 />
                        </div>
                    </div>


                </div>

                {/* Watch More */}
                <div className="mt-10">
                    <div className="flex flex-col justify-center px-2 mt-6 items-center">
                        <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
                            Watch More Videos
                        </h1>
                        <WatchMore />

                        {/* Commented ads section preserved */}
                        <div className=' flex z-0 flex-col  items-center mt-2 md:flex-row overflow-hidden' >
                            <JuBanner300x />
                        </div>
                    </div>


                   

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
                   <div className=' flex flex-col gap-y-3' >
                   <div className="flex justify-center z-0  w-full overflow-hidden">
                        <AdstrBanner728x90 />
                    </div>
                    <div className=' flex justify-center z-0 overflow-hidden' >
                        <JuLeaderboard />
                    </div>
                    <div className=' flex justify-center z-0' >
                        <JuNativeAds />
                    </div>
                   </div>

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
