import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HomeVideoPageChild from '../../components/features/video/VideoCard';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import { useGetActressWithIdQuery } from '../../services/api/actress/getActress';
import Pangination from '../../components/UI/pangination/Pangination';

const ActressMovies: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const actressId = id ? parseInt(id) : 1;
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage2');
        return savedPage ? parseInt(savedPage) : 1;
    });

    const { data, isLoading } = useGetActressWithIdQuery({ id: actressId, page: currentPage });

    const movies = data?.movies?.data || [];
    const lastPage = data?.movies?.last_page;
    const actressName = data?.actress?.name || 'Actress';

    // Save page number when it changes
    useEffect(() => {
        localStorage.setItem('currentPage2', currentPage.toString());
    }, [currentPage]);

    // Navigate to formatted actress route
    useEffect(() => {
        if (data?.actress?.name) {
            const formattedName = data.actress.name.toLowerCase().replace(/\s+/g, '');
            navigate(`/act/${actressId}/${formattedName}`, { replace: true });
        }
    }, [data, actressId]);




    if (isLoading) {
        return (
            <div className="flex-wrap grid mt-24 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {[...Array(10)].map((_, index) => (
                    <TVSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 mt-24">
            <h2 className="text-2xl montserrat text-center text-[var(--light-blue)] mb-4">
                <span className="font-bold">{actressName}</span>'s Movies
            </h2>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {movies.map((movie) => (
                    <HomeVideoPageChild key={movie.id} data={movie} />
                ))}
            </div>
            {movies.length === 0 && (
                <div className="text-center text-lg min-h-screen text-[var(--soft-blue)] py-8">
                    No movies found for this actress
                </div>
            )}
            <Pangination lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default ActressMovies;
