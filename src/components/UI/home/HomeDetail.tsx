import React, { useCallback, useState } from 'react';
import { useGetVideoByIdQuery } from '../../../redux/api/getVideoDetail';
import LazyLoad from 'react-lazyload';
import TvLoader from '../loader/TvLoader';
import formatRelativeDate from '../../../utils/formatRelativeDate';
import { useParams } from 'react-router-dom';
import CommentUI from '../commentSection/CommentUI';
import { calculateRatingPercentage } from '../../../utils/calculateRatingPercentage';
import ShareModelUI from '../commentSection/ShareModelUI';
import RelatedVideo from './RelatedVideo';

// Define the correct type for movie data
type DataType = {
    id: number;
    title: string;
    description: string;
    duration: string;
    posted_date: string;
    rating_count: string;
    rating_total: string;
    url: string;
    view_count: string;
};


const HomeDetail: React.FC = () => {
    const { id: vidId } = useParams<{ id: string }>();
    const videoId = parseInt(vidId || "10", 10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Get video data by ID
    const { data, isFetching, error } = useGetVideoByIdQuery(videoId);

    // Check if data is present, and handle the case where it might be undefined
    const video = data?.movie || {} as DataType;
    const RelatedVids = data?.relatedMovies || [] as DataType[];
    const videoRating = {
        RatingTotal: video?.rating_total,
        RatingCount: video?.rating_count,
    };

    // Calculate relative date and rating percentage
    const relativeDate = formatRelativeDate(video?.posted_date);
    const ratingPercentage = calculateRatingPercentage({
        RatingTotal: videoRating.RatingTotal,
        RatingCount: videoRating.RatingCount,
    });

    const handleShareClick = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    if (isFetching) {
        return <TvLoader />;
    }

    if (error || !data) {
        return <div className="text-red-600">Error fetching movie data</div>;
    }

    return (
        <div className="text-gray-100 mt-[80px] px-2">
            {/* Hero Section */}
            <div>
                <div className="flex xl:justify-between">
                    <div className="w-full relative">
                        <LazyLoad height={100} offset={100} once>
                            <div className="relative shadow-sm rounded-xl overflow-hidden w-full h-[250px] md:h-[500px] lg:h-[400px] xl:w-[900px] xl:h-[600px]">
                                <iframe
                                    src={video?.url}
                                    width="100%"
                                    height="100%"
                                    title="Video Player"
                                    sandbox="allow-scripts allow-same-origin allow-presentation"
                                    allowFullScreen
                                />
                                <div className="cursor-not-allowed absolute bottom-0 z-50 right-14 rounded-md bg-transparent w-8 h-8"></div>
                            </div>
                        </LazyLoad>
                        {isProcessing && <TvLoader />}
                    </div>
                </div>
                <CommentUI
                    vidId={video.id}
                    ratingPercentage={ratingPercentage}
                    relativeDate={relativeDate}
                    handleShareClick={handleShareClick}
                    data={video}
                />
            </div>

            {/* Related Videos */}
            <div className="mt-10 mx-auto mb-20">
                <h2 className="text-xl md:text-2xl head-font ms-2 text-white mb-4">Related Videos</h2>
                <div className="flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {RelatedVids.map((item:DataType) => (
                        <RelatedVideo
                            key={item.id}
                            isLoading={isFetching}
                            data={item}
                            setIsProcessing={setIsProcessing}
                        />
                    ))}
                </div>
            </div>

            {/* Share Modal */}
            {isModalOpen && (
                <ShareModelUI id={vidId} setIsModalOpen={setIsModalOpen} />
            )}
        </div>
    );
};

export default HomeDetail;