import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild';
import Pangination from '../components/UI/pangination/Pangination';
import { useGetMoviesWithGrenreQuery } from '../redux/api/getMovies';
import { autoCorrect } from '../utils/autoCorrect';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCurrentSection } from '../redux/slice/ScrollSlice';

const MoreDetail: React.FC = () => {
    const { genre } = useParams<{ genre: string }>(); // Fetch the genre from the URL
    const location = useLocation(); // React to route changes
    const [currentPage, setCurrentPage] = useState(1);


    const contentRef = useRef<HTMLDivElement>(null);
    const currentSection = useSelector((state: RootState) => state.scroll.currentSection);
    const dispatch = useDispatch();

    const { data, isLoading, isError } = useGetMoviesWithGrenreQuery({
        genre: genre || '',
        page: currentPage,
    });

    const genData = data?.data;
    const lastPage = data?.last_page;

    // Reset currentPage when genre changes
    useEffect(() => {
        setCurrentPage(1);
    }, [location.pathname]); // Watch for path changes

    useEffect(() => {
        if (currentSection && contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            dispatch(setCurrentSection(false)); // Reset the state after scrolling
        }
    }, [currentSection, dispatch]);

    return (
        <div ref={contentRef} className="mt-24 mx-1 lg:mx-4">
            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display">
                    {autoCorrect(genre || 'Unknown')}
                </h1>
            </div>
            {isLoading ? (
                <div className="text-center text-[var(--light-blue)]">Loading...</div>
            ) : isError || !genData?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {genData.map((item) => (
                            <HomeVideoPageChild
                                key={item?.id}
                                data={item}
                            />
                        ))}
                    </div>
                    <Pangination
                        lastPage={lastPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default MoreDetail;
