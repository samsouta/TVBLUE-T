import React, { useEffect, useState } from "react";
import { useGetMoviesRecommendationsQuery } from "../../../services/api/Movies/getMovies";
import { FaCaretDown } from "react-icons/fa";
import HomeVideoPageChild from "../video/VideoCard";
import { RootState } from "../../../store/store"; // Adjust path as needed
import { addMovies, setCurrentPage } from "../../../services/slice/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import TVSkeleton from "../../UI/loader/TVSkeleton";

const RecommentForYou: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, currentPage, hasMore } = useSelector((state: RootState) => state?.movies);
    const [isLoader, setIsLoader] = useState(false);

    const { data, error, isLoading } = useGetMoviesRecommendationsQuery({ page: currentPage });

    // Update global state with fetched movies
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

    // Handle errors or unsuccessful loads
    useEffect(() => {
        if (error) {
            setIsLoader(false); // Reset loader on error
        }
    }, [error]);

    const loadMore = () => {
        if (hasMore) {
            setIsLoader(true);
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    return (
        <>

            <div>
                <div className="flex justify-start items-center">
                    <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat ">
                        Recomment For You
                    </h1>
                </div>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-2">
                    {movies.length > 0
                        ? movies.map((item) => (
                            <HomeVideoPageChild key={item.id} data={item} />
                        ))
                        : [...Array(4)].map((_, index) => (
                            <TVSkeleton key={index} />
                        ))}
                </div>

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
        </>
    );
};

export default RecommentForYou;
