import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import Pangination from '../../components/UI/loader/Pangination';
import VideoCard from '../../components/UI/VideoCard';
import { useFindTagsVideoQuery } from '../../services/api/tag';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';
import JuBanner300x from '../../components/ads/juicy/JuBanner300x';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';
import EXOPcbanner from '../../components/ads/EXO/EXOPcbanner';
import EXOMobileBanner from '../../components/ads/EXO/EXOMobileBanner';

const Page: React.FC = () => {

    /**
      * @hook for router location and search params and state
      */
    const { tag } = useParams<{ tag: string }>(); // Fetch the genre from the URL
    const [searchParams, setSearchParams] = useSearchParams();

    /**
     *  @get current page from search params
     */
    const currentPage = Number(searchParams.get('page')) || 1;


    /**
     * @fetch server data
     */
    const { data, isLoading, isError, isFetching } = useFindTagsVideoQuery({
        tag: tag || '',
        page: currentPage,
    });
    const TagsVideo = data?.data?.data || [];
    const lastPage = data?.data?.last_page || 1;

    /**
     * @set page number in URL when currentPage changes
     */
    useEffect(() => {
        setSearchParams({ page: currentPage.toString() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, setSearchParams]);

    /**
     * 
     *  @handle page change when user click on page number
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
                {[...Array(10)].map((_, index) => (
                    <TVSkeleton key={index} />
                ))}
            </div>
        );
    }


    return (
        <div className=" mx-1 lg:mx-4">

            <div className="flex flex-col justify-center items-center">
                <h1 className="text-[var(--light-blue)] mb-6 text-2xl montserrat font-bold">
                    {tag || 'Unknown'}
                </h1>

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full' >
                    <JuLeaderboard />
                </div>
            </div>
            {isError || !TagsVideo?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {TagsVideo.map((item) => (
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


                    {/* /** pang */}
                    <Pangination
                        lastPage={lastPage}
                        currentPage={currentPage}
                        setCurrentPage={handlePageChange}
                    />


                    {
                        /* ADS ZONE */
                    }
                    <div className=' flex flex-col items-center' >
                        <div className=' hidden lg:block' >
                            <EXOPcbanner />
                        </div>
                        <div className=' block lg:hidden' >
                            <EXOMobileBanner />
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default Page