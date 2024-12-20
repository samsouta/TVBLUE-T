import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild';
import { useGetAllVideosQuery } from '../redux/api/getAllVideos';
import NoVideoFound from '../components/UI/NoFound/NoVideoFound';

const Search: React.FC = () => {
    const path = window.location.pathname;
    const lastPath = path.split('/').filter(Boolean).pop();  // Get last part of the path

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }

    const { searchVideos } = context;  // Extract searchVideos from context

    const { isLoading } = useGetAllVideosQuery();  // Fetch loading state for videos

    return (
        <div className="mt-20 mx-1 lg:mx-4">
            <div className='flex justify-center items-center'>
                <h1 className='text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display'>
                    {lastPath}
                </h1>
            </div>

            {
                // Check if searchVideos is an empty array or undefined
                (!searchVideos || searchVideos.length === 0) ? (
                        <NoVideoFound />
                ) : (
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {/* Wrap map function in curly braces */}
                        {searchVideos?.map((item) => (
                            <HomeVideoPageChild
                                key={item?.id}
                                data={item}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Search;
