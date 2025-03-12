import React, { useEffect } from 'react'
import Pangination from '../components/UI/loader/Pangination'
import { useGetAllMoviesQuery } from '../services/api/movies'

import VideoCard from '../components/UI/VideoCard'
import { useSearchParams } from 'react-router-dom'
import TVSkeleton from '../components/UI/loader/TVSkeleton'
import JuBanner300x from '../components/ads/juicy/JuBanner300x'
import JuNativeAds from '../components/ads/juicy/JuNativeAds'
import JuLeaderboard from '../components/ads/juicy/JuLeaderboard'


const Random: React.FC = () => {

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
    const { data, isLoading, isError , isFetching } = useGetAllMoviesQuery(currentPage);
    const genData = data?.data;
    const lastPage = data?.last_page;

    /**
     *  @set page number in URL when currentPage changes
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

    /**
 * @loading and error handling
 */
    if (isLoading || isFetching) {
        return (
            <div className="flex-wrap grid mt-24 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {[...Array(20)].map((_, index) => (
                    <TVSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="mx-1 lg:mx-4">


            <div className="flex flex-col justify-center items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                    All Videos
                </h1>

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full' >
                    <JuLeaderboard />
                </div>

            </div>
            { isError || !genData?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {genData.map((item) => (
                            <VideoCard
                                key={item?.id}
                                data={item}
                                actData={item?.actresses}
                            />
                        ))}
                    </div>


                    {
                        /* /** ADS ZONE */
                    }
                    <div className=' overflow-hidden z-0 md:col-span-4 w-full flex justify-center' >
                        <JuBanner300x />
                    </div>
                    <div className=' overflow-hidden z-0 md:col-span-4 w-full' >
                        <JuNativeAds />
                    </div>

                    <Pangination
                        lastPage={lastPage}
                        currentPage={currentPage}
                        setCurrentPage={handlePageChange}
                    />

                </>
            )}
        </div>
    )
}

export default Random