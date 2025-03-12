import React, { useEffect, useRef } from 'react';
import NoVideoFound from '../components/UI/error-page/NoVideoFound';
import Pangination from '../components/UI/loader/Pangination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/store';
import { setCurrentSection } from '../services/slice/ScrollSlice';
import { useSearchVideosQuery } from '../services/api/searchEngine';
import VideoCard from '../components/UI/VideoCard';
import { useSearchParams } from 'react-router-dom';
import TVSkeleton from '../components/UI/loader/TVSkeleton';
import JuLeaderboard from '../components/ads/juicy/JuLeaderboard';
import JuBanner300x from '../components/ads/juicy/JuBanner300x';
import JuNativeAds from '../components/ads/juicy/JuNativeAds';

const Search: React.FC = () => {
    /**
     * @router params and search query and dispatch
     */
    const searchQuery = useSelector((state: RootState) => state?.src?.searchQuery);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    /**
     * @get current page from search params
     */
    const currentPage = Number(searchParams.get('page')) || 1;

    /**
     * @handle scroll to content 
     * @useEffect for scroll to content
     */
    const contentRef = useRef<HTMLDivElement>(null);
    const currentSection = useSelector((state: RootState) => state.scroll.currentSection);
    useEffect(() => {
        if (currentSection && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            dispatch(setCurrentSection(false)); // Reset the state after scrolling
        }
    }, [currentSection, dispatch]);

    /**
     * @fetch server data 
     */
    const { data, isLoading, isError, isFetching } = useSearchVideosQuery(
        { query: searchQuery, page: currentPage },
        { skip: !searchQuery }  // Skip the request if searchQuery is empty
    );
    const searchResults = data?.data || [];
    const lastPage = data?.last_page;
    const validLastPage = lastPage ? Number(lastPage) : undefined;

    /**
     * @set page number in URL when currentPage changes
     */
    useEffect(() => {
        setSearchParams({ page: currentPage.toString() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, setSearchParams]);

    /**
     * 
     * @param page 
     * @handle page change
     */
    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };


    return (
        <div ref={contentRef} className=" mx-1 lg:mx-4">

            <div className='flex flex-col justify-center items-center'>
                <h1 className=' mb-6 text-[var(--light-blue)] my-2 text-2xl font-bold montserrat'>
                    {searchQuery}
                </h1>

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full' >
                    <JuLeaderboard />
                </div>

            </div>

            {
                isLoading || isFetching ? (
                    <div className="flex-wrap grid mt-24 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {[...Array(10)].map((_, index) => (
                            <TVSkeleton key={index} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-white flex justify-center items-center">No Video Found</div>
                ) : (!searchResults || searchResults.length === 0) ? (
                    <NoVideoFound />
                ) : (
                    <>
                        <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                            {searchResults.map((item) => (
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
                            lastPage={validLastPage || 1}
                            currentPage={currentPage}
                            setCurrentPage={handlePageChange}
                        />

                    </>

                )
            }
        </div>
    );
};

export default Search;
