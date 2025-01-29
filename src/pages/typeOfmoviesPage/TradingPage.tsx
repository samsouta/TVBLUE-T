import React, { useEffect, useState } from 'react';
import { useGetMoviesFeatureQuery } from '../../redux/api/getMovies';
import HomeVideoPageChild from '../../components/UI/home/HomeVideoPageChild';
import WatchMore from '../../components/UI/watchMoreBtn/WatchMore';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import Pangination from '../../components/UI/pangination/Pangination';
import HomeSlider from '../../components/UI/home/HomeSlider';
import ExoMobileBanner from '../../components/ads/EXoClick/ExoMobileBanner';
import ExoPcBanner from '../../components/ads/EXoClick/ExoPcBanner';
import ExoRecommendationWidget from '../../components/ads/EXoClick/ExoRecommendationWidget';
import ExoOutstreamVideo from '../../components/ads/EXoClick/ExoOutstreamVideo';
import ExoMixbanner from '../../components/ads/EXoClick/ExoMixbanner';
import ExoMBannerCPM from '../../components/ads/EXoClick/ExoMBannerCPM';
import { useLocation } from 'react-router-dom';

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
            <div className="mt-20 mx-1 lg:mx-4">
                {/* Ads slider */}
                <HomeSlider />

                {/* ADS ZONE */}
                <div className=' w-full flex flex-wrap justify-center' >
                    {/* <ExoPcBanner /> */}
                    <ExoMBannerCPM />
                    <ExoMobileBanner />
                </div>
                {/* ADS END  */}


                {/* Watch More */}
                <div className="mt-10">
                    <div className="flex justify-start px-2 mt-6 items-center">
                        <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
                            Watch More Videos
                        </h1>
                    </div>
                    <WatchMore />
                </div>
                {/* Page Title */}
                <div className="flex justify-start px-2 mt-6 items-center">
                    <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
                        Trending Now
                    </h1>
                </div>
                {/* ads */}
                <ExoRecommendationWidget />
                <ExoOutstreamVideo />

                {/* ads end  */}
                {/* Video Grid */}
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
                <ExoMixbanner />
                {/* ads end */}

                {/* Pagination */}
                <Pangination
                    lastPage={lastPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            {/* ads */}
            <div className=' w-full flex flex-wrap justify-center' >
                <ExoPcBanner />
            </div>
            <a href="https://www.exoclick.com/signup/?login=samsouta">
                <img src="https://www.exoclick.com/banners/468x60.gif" alt="exo-banner" />
            </a>
            {/* ads end ---- */}
        </>
    );
};

export default TradingPage;
