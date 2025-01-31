import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import TVSkeleton from '../../UI/loader/TVSkeleton';
import HomeVideoPageChild from '../video/VideoCard';
import { useNavigate } from 'react-router-dom';
import { useGetAllMoviesQuery } from '../../../services/api/Movies/getMovies';


const RandomVideo: React.FC = () => {

    const { data, isLoading } = useGetAllMoviesQuery(1);
    const videos = data?.data || [];
    const nav = useNavigate();

    const handleMoreVid = () => {
        nav(`/all-movies`);
        // Save genre to localStorage
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                    All Video / Random
                </h1>
                <span
                    onClick={handleMoreVid}
                    className="text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center"
                >
                    <span className="montserrat font-bold lg:text-xl text-md">More</span>
                    <FaArrowRight className="text-sm md:text-lg" />
                </span>
            </div>

            {/* Video Grid Section */}
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {isLoading ? (
                    // Show skeleton loader when loading
                    <>
                        {[...Array(10)].map((_, index) => (
                            <TVSkeleton key={index} />
                        ))}
                    </>
                ) : (
                    // Render videos when data is available
                    videos.map((item) => (
                        <HomeVideoPageChild key={item?.id} data={item} />
                    ))
                )}
            </div>
        </div>
    )
}

export default RandomVideo