import React, { useEffect, useRef, useState } from 'react';
import NoVideoFound from '../components/UI/NoFound/NoVideoFound';
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild';
import Pangination from '../components/UI/pangination/Pangination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useSearchVideosQuery } from '../redux/api/searchEngine';
import { setCurrentSection } from '../redux/slice/ScrollSlice';

const Search: React.FC = () => {
    const searchQuery = useSelector((state: RootState) => state?.src?.searchQuery);
    const [currentPage, setCurrentPage] = useState(1);

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


    useEffect(() => {
        if (currentSection && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            dispatch(setCurrentSection(false)); // Reset the state after scrolling
        }
    }, [currentSection, dispatch]);

    return (
        <div ref={contentRef} className="mt-20 mx-1 lg:mx-4">
            <div className='flex justify-center items-center'>
                <h1 className='text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display'>
                    {searchQuery}
                </h1>
            </div>

            {
                isLoading ? (
                    <div>Loading...</div>  // Show loading state
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
