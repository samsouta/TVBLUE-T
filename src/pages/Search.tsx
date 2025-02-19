import React, { useEffect, useRef, useState } from 'react';
import NoVideoFound from '../components/UI/NoFound/NoVideoFound';
import HomeVideoPageChild from '../components/features/video/VideoCard';
import Pangination from '../components/UI/pangination/Pangination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useSearchVideosQuery } from '../services/api/search/searchEngine';
import { setCurrentSection } from '../services/slice/ScrollSlice';
import { Loader } from 'lucide-react';

import { useLocation } from 'react-router-dom';
import JuNativeAds from '../components/ads/juicy/JuNativeAds';
import JuLeaderboard from '../components/ads/juicy/JuLeaderboard';
import AdstrBanner728x90 from '../components/ads/adstraa/AdstrBanner728x90';
import JuBanner300x from '../components/ads/juicy/JuBanner300x';

const Search: React.FC = () => {
    const location = useLocation();
    const searchQuery = useSelector((state: RootState) => state?.src?.searchQuery);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage) : 1;
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const currentSection = useSelector((state: RootState) => state.scroll.currentSection);
    const dispatch = useDispatch();

    const { data, isLoading, isError } = useSearchVideosQuery(
        { query: searchQuery, page: currentPage },
        { skip: !searchQuery }  // Skip the request if searchQuery is empty
    );

    const searchResults = data?.data || [];
    const lastPage = data?.last_page;
    const validLastPage = lastPage ? Number(lastPage) : undefined;

    // Save page number when it changes
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    // Clear localStorage when leaving the actresses page
    useEffect(() => {
        if (!location.pathname.includes('/search/')) {
            localStorage.removeItem('currentPage');
        }
    }, [location.pathname]);

    useEffect(() => {
        if (currentSection && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            dispatch(setCurrentSection(false)); // Reset the state after scrolling
        }
    }, [currentSection, dispatch]);

    return (
        <div ref={contentRef} className="mt-20 mx-1 lg:mx-4">

            {/* ads  */}
            <div className=' w-full flex justify-center overflow-hidden z-0' >
                <JuLeaderboard />
            </div>
            <div className=' w-full flex justify-center overflow-hidden' >
                <AdstrBanner728x90 />
            </div>

            <div className='flex justify-center items-center'>
                <h1 className=' mb-6 text-[var(--light-blue)] my-2 text-2xl font-bold montserrat'>
                    {searchQuery}
                </h1>
            </div>

            {
                isLoading ? (
                    <div className="flex justify-center items-center mt-4">
                        <Loader className="animate-spin text-green-400" size={34} />
                    </div>
                ) : isError ? (
                    <div className="text-white flex justify-center items-center">No Video Found</div>
                ) : (!searchResults || searchResults.length === 0) ? (
                    <NoVideoFound />
                ) : (
                    <>
                        <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                            {searchResults.map((item) => (
                                <HomeVideoPageChild
                                    key={item?.id}
                                    data={item}
                                />
                            ))}
                        </div>



                        {/* ads */}
                        <div className=' flex justify-center mt-2 z-0' >
                            <JuNativeAds />
                        </div>
                        <div className=' flex justify-center mt-2 z-0' >
                            <JuBanner300x />
                        </div>

                        <Pangination
                            lastPage={validLastPage || 1}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />



                    </>

                )
            }
        </div>
    );
};

export default Search;
