import React, { useEffect } from 'react';
import { useGetMoviesFeatureQuery } from '../services/api/movies';
import WatchMore from '../components/UI/WatchMoreBtn';
import TVSkeleton from '../components/UI/loader/TVSkeleton';
import Pangination from '../components/UI/loader/Pangination';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/UI/VideoCard';
import ADSSlider from '../components/UI/ADSSlider';
import Ju160x600Skyscraper from '../components/ads/juicy/Ju160x600Skyscraper';
import JuBanner300x from '../components/ads/juicy/JuBanner300x';
import JuLeaderboard from '../components/ads/juicy/JuLeaderboard';
import JuNativeAds from '../components/ads/juicy/JuNativeAds';
import AdstrBanner728x90 from '../components/ads/adstraa/AdstrBanner728x90';

const Trending: React.FC = () => {
    /**
     * @hook for router location and search params
     */
    const [searchParams, setSearchParams] = useSearchParams();

    /**
     * @get current page from search params
     */
    const currentPage = Number(searchParams.get('page')) || 1;

    /**
     * @fetch server data
     */
    const { data, isLoading, isFetching } = useGetMoviesFeatureQuery({ page: currentPage });
    const videos = data?.data || [];
    const lastPage = data?.last_page || 1;

    /**
     * @set page number in URL when currentPage changes
     */
    useEffect(() => {
        setSearchParams({ page: currentPage.toString() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, setSearchParams]);

    /**
     * 
     * @handle page change
     */
    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };


    return (
        <>
            <div className=" mx-1 lg:mx-4">
                <div className="grid grid-cols-12 gap-4">
                    {
                        /* ADS Slider */
                    }
                    <div className="col-span-12 md:col-span-8">
                        <ADSSlider />

                        {
                            /* /** ADS ZONE */
                        }
                        <div className=' overflow-hidden z-0 md:col-span-4 w-full' >
                            <JuLeaderboard />
                            <JuNativeAds />
                        </div>
                    </div>

                    {
                        /* /** ADS ZONE hidden in mobile */
                    }
                    <div className=' overflow-hidden z-0 md:col-span-4 w-full hidden md:block' >
                        <Ju160x600Skyscraper />
                    </div>
                </div>


                {
                    /* Watch More */
                }
                <div className="mt-10">
                    <div className="flex flex-col justify-center px-2 mt-6 items-center">
                        <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
                            Watch More Videos
                        </h1>
                        <WatchMore />
                    </div>
                </div>

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full flex justify-center' >
                    <JuBanner300x />
                </div>



                {
                    /* /* video card */
                }
                <div className="flex justify-start px-2 mt-6 items-center">
                    <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
                        Trending Now
                    </h1>
                </div>

                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {isLoading || isFetching
                        ? [...Array(20)].map((_, index) => (
                            <TVSkeleton key={index} />
                        ))
                        : videos.map((item) => (
                            <VideoCard
                                key={item?.id}
                                data={item}
                                actData={item?.actresses}
                            />
                        ))}
                </div>


                {
                    /* /* Pagination */
                }
                <Pangination
                    lastPage={lastPage}
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange}
                />

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full flex justify-center' >
                    <AdstrBanner728x90/>
                </div>

            </div>

        </>
    );
};

export default Trending;
