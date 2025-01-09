import React, { useCallback, useEffect, useState } from 'react';
import { useGetVideoByIdQuery } from '../../../redux/api/getVideoDetail';
import LazyLoad from 'react-lazyload';
import TvLoader from '../loader/TvLoader';
import formatRelativeDate from '../../../utils/formatRelativeDate';
import { useNavigate, useParams } from 'react-router-dom';
import ShareModelUI from '../commentSection/ShareModelUI';
import { useIncrementViewMutation } from '../../../redux/api/postViewCount';
import { MovieDataType } from '../../../types/MovieDataType';
import CommentUI from '../commentSection/CommentUI';
import { useGetRelatedMovieQuery } from '../../../redux/api/getMovies';
import RelatedVideo from './RelatedVideo';
import TVSkeleton from '../loader/TVSkeleton';

const HomeDetail: React.FC = () => {
    const { id: vidId } = useParams<{ id: string }>();
    const videoId = parseInt(vidId || "10", 10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    // Get video data by ID
    const { data, isLoading, error } = useGetVideoByIdQuery(videoId);
    const { data: related, isLoading: isRelatedLoading } = useGetRelatedMovieQuery(videoId);
    const [incrementView] = useIncrementViewMutation();

    // Check if data is present, and handle the case where it might be undefined
    const video = data?.movie || {} as MovieDataType;
    const relatedVids = related?.related_videos || [] as MovieDataType[];

    // refresh page 
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    // turnback
    useEffect(() => {
        // Initial pushState to make sure history is handled correctly
        window.history.pushState({}, document.title, window.location.href);

        const handlePopState = () => {
            navigate(-1);  // go back to previous page
            const scrollPosition = (document.documentElement.scrollHeight - window.innerHeight) / 2;
            window.scrollTo(0, scrollPosition);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    // Calculate relative date and rating percentage
    const relativeDate = formatRelativeDate(video?.posted_date);

    const handleShareClick = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    const handleVideoPlayed = useCallback((videoId: number) => {
        if (videoId) {
            incrementView({ videoId });
        }
    }, [incrementView]);

    if (isLoading) return <TvLoader />;

    if (error || !data) {
        return <div className="text-red-600 mt-28">Error fetching movie data</div>;
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
                                    src={video?.video_url}
                                    width="100%"
                                    height="100%"
                                    title="Video Player"
                                    sandbox="allow-scripts allow-same-origin allow-presentation"
                                    allowFullScreen
                                    onLoad={() => handleVideoPlayed(data?.movie.id)}
                                />
                                <div className="cursor-not-allowed absolute bottom-0 z-50 right-14 rounded-md bg-transparent w-8 h-8"></div>
                            </div>
                        </LazyLoad>
                        {isProcessing && <TvLoader />}
                    </div>
                </div>
                <CommentUI
                    vidId={video.id}
                    relativeDate={relativeDate}
                    handleShareClick={handleShareClick}
                    data={video}
                />
            </div>

            {/* Related Videos */}
            <div className="mt-10 mx-auto mb-20">
                <h2 className="text-xl md:text-2xl head-font ms-2 text-white mb-4">Related Videos</h2>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {isRelatedLoading
                        ? Array.from({ length: 8 }).map((_, index) => (
                              <div key={index} className="w-full">
                                  <TVSkeleton />
                              </div>
                          ))
                        : relatedVids.map((item) => (
                              <RelatedVideo
                                  key={item.id}
                                  isLoading={isLoading}
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
