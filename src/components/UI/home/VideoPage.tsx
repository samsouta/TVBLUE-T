import React, { useContext, useEffect } from 'react';
import HomeVideoPageChild from './HomeVideoPageChild';
import TvLoader from '../loader/TvLoader';
import { StateContext } from '../../../context/StateContext';
import { useGetVidPageQuery } from '../../../redux/api/getVideoPage';
import Pangination from '../pangination/Pangination';

const VideoPage: React.FC = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { videos, setVideos, genCurrentPage, currentPage } = context;

    const { data, isLoading, error } = useGetVidPageQuery(currentPage);


    useEffect(() => {
        if (data) {
            setVideos(data?.data || []);
        }
    }, [data, setVideos]);



    if (isLoading) return <TvLoader />;
    if (error) return <div className=' text-red-700 text-2xl' >Error: refresh page and try again :.. {error.message}</div>;

    return (
        <div className="mt-5">
            <div className=" flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    videos?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={isLoading}
                            error={error}
                        />
                    ))
                }
            </div>
            {genCurrentPage === 'All' && <Pangination />}
        </div>
    );
};

export default VideoPage;