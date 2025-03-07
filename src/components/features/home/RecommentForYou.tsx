import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMoviesRecommendationsQuery } from '../../../services/api/movies';
import TVSkeleton from '../../UI/loader/TVSkeleton';
import { FaCaretDown } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import { RootState } from '../../../services/store';
import { addMovies, setCurrentPage } from '../../../services/slice/recommentForYouSlice';
import VideoCard from '../../UI/VideoCard';

const RecommentForYou: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, currentPage, hasMore } = useSelector((state: RootState) => state?.recommentForYou);
    const [isLoader, setIsLoader] = useState(false);
    const { data, error, isLoading } = useGetMoviesRecommendationsQuery({ page: currentPage });

    /**
     * Update global state with fetched movies
     * @returns get videos
     */
    useEffect(() => {
        if (data?.data) {
            dispatch(
                addMovies({
                    movies: data.data,
                    hasMore: !!data.next_page_url,
                })
            );
            setIsLoader(false); // Reset loader on successful data fetch
        } else if (!isLoading && !data) {
            setIsLoader(false); // Reset loader if no data is fetched
        }
    }, [data, isLoading, dispatch]);

    /**
     * Handle errors or unsuccessful loads
     */
    useEffect(() => {
        if (error) {
            setIsLoader(false); // Reset loader on error
        }
    }, [error]);

    /**
     * Handle loadMore state
     */
    const loadMore = () => {
        if (hasMore) {
            setIsLoader(true);
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    return (
        <div>
            {
            /* video card */
            }
            <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold poppins">
                Recommend For You
            </h1>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-2">
                {movies?.length > 0
                    ? movies?.map((item) => (
                        <div key={item.id}>
                            <VideoCard actData={item?.actresses?.[0] || null} data={item} />
                        </div>
                    ))
                    : [...Array(4)].map((_, index) => <TVSkeleton key={index} />)}
            </div>
            
            {
            /* load more and error handle */
            }
            {error && <p>Error loading videos.</p>}
            {hasMore && !isLoader && !isLoading && (
                <span
                    className="text-[var(--light-blue)] mt-4 cursor-pointer hover:underline flex justify-center items-center"
                    onClick={loadMore}
                >
                    <span className="montserrat font-bold lg:text-lg text-md">
                        Load More
                    </span>
                    <FaCaretDown className="text-lg" />
                </span>
            )}
            {isLoader && (
                <div className="flex justify-center items-center mt-4">
                    <Loader className="animate-spin text-[var(--light-blue)]" size={24} />
                </div>
            )}
            {!hasMore && !isLoading && <p>No more videos to load.</p>}
        </div>
    );
};

export default RecommentForYou;
