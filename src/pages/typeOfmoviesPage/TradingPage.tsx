import React, { useEffect, useState } from 'react';
import { useGetMoviesFeatureQuery } from '../../redux/api/getMovies';
import HomeVideoPageChild from '../../components/UI/home/HomeVideoPageChild';
import WatchMore from '../../components/UI/watchMoreBtn/WatchMore';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import Pangination from '../../components/UI/pangination/Pangination';
import HomeSlider from '../../components/UI/home/HomeSlider';
import ExoMobileBanner from '../../components/ads/EXoClick/ExoMobileBanner';
import ExoPcBanner from '../../components/ads/EXoClick/ExoPcBanner';
import ExoPCStickyBanner from '../../components/ads/EXoClick/ExoPCStickyBanner';
import ExoMobileInstantMessage from '../../components/ads/EXoClick/ExoMobileInstantMessage';
import ExoDesktopFullpage from '../../components/ads/EXoClick/ExoDesktopFullpage';
import ExoMobileFullpage from '../../components/ads/EXoClick/ExoMobileFullpage';
import ExoRecommendationWidget from '../../components/ads/EXoClick/ExoRecommendationWidget';
import ExoInPagePushNotifications from '../../components/ads/EXoClick/ExoInPagePushNotifications';
import ExoOutstreamVideo from '../../components/ads/EXoClick/ExoOutstreamVideo';
import TrafficMobileBanner from '../../components/ads/trafficstar/TrafficMobileBanner';
import TrafficPCBanner from '../../components/ads/trafficstar/TrafficPCBanner';
import TrafficNative from '../../components/ads/trafficstar/trafficNative';

const TradingPage: React.FC = () => {
    // Manage current page state
    const storedPage = localStorage.getItem('TradingCurrentPage');
    const [currentPage, setCurrentPage] = useState<number>(parseInt(storedPage || '1', 10));

    // Fetch data with pagination
    const { data, isLoading } = useGetMoviesFeatureQuery({ page: currentPage });
    const videos = data?.data || [];
    const lastPage = data?.last_page || 1;

    // Save current page to localStorage
    useEffect(() => {
        localStorage.setItem('TradingCurrentPage', currentPage.toString());
    }, [currentPage]);

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <>
            <div className="mt-20 mx-1 lg:mx-4">
                {/* Ads slider */}
                <HomeSlider />
                {/* Mobile */}
                <div className=' block md:hidden' >
                <ExoMobileInstantMessage/>
                <ExoMobileBanner />
                <TrafficMobileBanner/>
                <ExoMobileFullpage/>
                </div>
                {/* PC */}
                <div className="hidden md:block">
                    <ExoPcBanner />
                    <TrafficPCBanner/>
                    <ExoPCStickyBanner/>
                    <ExoDesktopFullpage/>
                </div>
                

                {/* Watch More */}
                <div className="mt-10">
                    <WatchMore />
                </div>
                {/* Page Title */}
                <div className="flex justify-center mt-6 items-center">
                    <h1 className="text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] playfair-display">
                        Trending Now
                    </h1>
                </div>
                {/* ads */}
                <ExoOutstreamVideo/>
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
                <ExoRecommendationWidget/>
                <TrafficNative/>
                <ExoInPagePushNotifications/>
                {/* ads end */}

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
