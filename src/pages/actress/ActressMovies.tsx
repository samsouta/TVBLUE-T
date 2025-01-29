import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HomeVideoPageChild from '../../components/UI/home/HomeVideoPageChild';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import { useGetActressWithIdQuery } from '../../redux/api/actress/getActress';
import Pangination from '../../components/UI/pangination/Pangination';

const ActressMovies: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const actressId = id ? parseInt(id) : 1;
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetActressWithIdQuery(actressId);
    
    const movies = data?.movies?.data || [];
    const lastPage = data?.movies?.last_page;
    // const lastPage = data?.last_page;
    const actressName = data?.actress?.name || 'Actress';
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.actress?.name) {
            const formattedName = data?.actress?.name.toLowerCase().replace(/\s+/g, '');
            navigate(`/actress/${actressId}/${formattedName}`, { replace: true });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <span className=' font-bold' >{actressName}</span>'s Movies
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

            <Pangination
                lastPage={lastPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default ActressMovies