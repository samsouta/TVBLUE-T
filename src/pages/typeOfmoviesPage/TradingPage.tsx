import React, { useEffect, useState } from 'react';
import { useGetMoviesFeatureQuery } from '../../redux/api/getMovies';
import HomeVideoPageChild from '../../components/UI/home/HomeVideoPageChild';
import WatchMore from '../../components/UI/watchMoreBtn/WatchMore';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import Pangination from '../../components/UI/pangination/Pangination';
import ExoClickBanner2 from '../../components/ads/ExoClickBanner2';
import { ScrollAlert } from '../../components/UI/alert/ScrollAlert';
import TrafficMobileBanner from '../../components/ads/trafficstar/TrafficMobileBanner';

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
        <ScrollAlert/>
            <div className="mt-20 mx-1 lg:mx-4">
                {/* Ads slider */}
                {/* <HomeSlider /> */}
                {/* Watch More */}
                <div className="mt-10">
                    <WatchMore />
                </div>
                {/* Page Title */}
                <div className="flex justify-center mt-6 items-center">
                    <h1 className="text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] playfair-display">
                        Trading Now
                    </h1>
                </div>
                <ExoClickBanner2 />

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
