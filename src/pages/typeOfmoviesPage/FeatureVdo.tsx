import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../../context/StateContext';
import { useGetMoviesFeatureQuery } from '../../redux/api/getMovies';
import { formatGenre } from '../../utils/formatGenre';
import HomeVideoPageChild from '../../components/UI/home/HomeVideoPageChild';
import TVSkeleton from '../../components/UI/loader/TVSkeleton'; // Adjust path as needed
import Pangination from '../../components/UI/pangination/Pangination';

const FeatureVdo: React.FC = () => {
    const { genre } = useParams();
    const context = useContext(StateContext);

    if (!context) {
        throw new Error('StateContext not found');
    }

    const { currentPage, setCurrentPage } = context;

    // Restore current page from localStorage
    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
    }, [genre, setCurrentPage]);

    // Save current page to localStorage
    useEffect(() => {
        localStorage.setItem('currentPage', String(currentPage));
    }, [currentPage]);

    // Fetch movies with pagination
    const { data: feature, isLoading: featureLoading } = useGetMoviesFeatureQuery({page:currentPage});
    const trading = feature?.data || [];
    const lastPage = feature?.last_page || 1;

    return (
        <div className="mt-24 mx-1 lg:mx-4">
            {/* Genre Title */}
            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] playfair-display">
                    {formatGenre(genre || '')}
                </h1>
            </div>

            {/* Video Grid */}
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {featureLoading
                    ? [...Array(20)].map((_, index) => (
                        <TVSkeleton key={index} />
                      ))
                    : trading.map((item) => (
                        <HomeVideoPageChild key={item?.id} data={item} />
                      ))}
            </div>

            {/* Pagination */}
            <Pangination
                lastPage={lastPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default FeatureVdo;
