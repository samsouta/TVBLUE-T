import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import TVSkeleton from '../../UI/loader/TVSkeleton';
import { useFindTagsVideoQuery } from '../../../services/api/tag';
import VideoCard from '../../UI/VideoCard';

type TagProps = {
    isTag: string;
};

const VideoWithTags: React.FC<TagProps> = ({isTag}) => {
    /**
     * @fetch data from API
     */
    const { data, isLoading } = useFindTagsVideoQuery({ tag: isTag || '', page: 1 });
    const videos = data?.data?.data || [];

    /**
     * @hook router 
     */
    const router = useNavigate();

    /**
     * @function handleMoreVid to go to more video page
     */
    const handleMoreVid = () => {
        router(`/tags/${isTag}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {
            /* Header Section */
            }
            <div className="flex justify-between items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                    {isTag}
                </h1>
                <span
                    onClick={handleMoreVid}
                    className="text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center"
                >
                    <span className="montserrat font-bold lg:text-xl text-md">More.</span>
                    <FaArrowRight className="text-sm md:text-lg" />
                </span>
            </div>

            {
            /* Video Grid Section */
            }
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
                        <VideoCard 
                        key={item?.id} 
                        data={item}
                        actData={item?.actresses}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default VideoWithTags