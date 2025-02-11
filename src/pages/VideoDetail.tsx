import React, { useCallback, useState } from 'react';
import { useGetVideoByIdQuery } from '../services/api/Movies/getVideoDetail';
import LazyLoad from 'react-lazyload';
import TvLoader from '../components/UI/loader/TvLoader';
import { useParams } from 'react-router-dom';
import ShareModelUI from '../components/UI/commentSection/ShareModelUI';
import { useIncrementViewMutation } from '../services/api/vote/postViewCount';
import { MovieDataType } from '../types/MovieDataType';
import CommentUI from '../components/UI/commentSection/CommentUI';
import { useGetRelatedMovieQuery } from '../services/api/Movies/getMovies';
import RelatedVideo from '../components/features/video/RelatedVideo';
import TVSkeleton from '../components/UI/loader/TVSkeleton';
import { formatRelativeDate } from '../utils/formatRelativeDate';
import AdstrBanner728x90 from '../components/ads/adstraa/AdstrBanner728x90';
import AdstrBanner468x60 from '../components/ads/adstraa/AdstrBanner468x60';
import AdstrBanner320x50 from '../components/ads/adstraa/AdstrBanner320x50';
import Adstrbanner300x250 from '../components/ads/adstraa/Adstrbanner300x250';
import AdstrBanner160x600 from '../components/ads/adstraa/AdstrBanner160x600';
import JuLeaderboard from '../components/ads/juicy/JuLeaderboard';
import JuNativeAds from '../components/ads/juicy/JuNativeAds';
import HillAllDevBanner from '../components/ads/Hillads/HillAllDevBanner';


const VideoDetail: React.FC = () => {
    const { id: vidId } = useParams<{ id: string }>();
    const videoId = parseInt(vidId || "10", 10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Get video data by ID
    const { data, isLoading, error } = useGetVideoByIdQuery(videoId);
    const { data: related, isLoading: isRelatedLoading } = useGetRelatedMovieQuery(videoId);
    const [incrementView] = useIncrementViewMutation();

    // Check if data is present, and handle the case where it might be undefined
    const video = data?.movie || {} as MovieDataType;
    const relatedVids = related?.related_videos || [] as MovieDataType[];

    // Calculate relative date
    // Parse the posted_date (assumes your backend now returns an ISO string)
    const postedDateStr = video?.posted_date;
    const parsedDate = postedDateStr ? new Date(postedDateStr) : new Date();
    const relativeDate = formatRelativeDate(parsedDate);

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

            {/* ads  zone*/}
           <div className=' block lg:hidden' >
           <div className="flex justify-center xl:justify-start mt-2 w-full overflow-hidden">
                <AdstrBanner728x90 />
            </div>
            <div className="flex justify-center mt-2 w-full overflow-hidden">
                <AdstrBanner468x60 />
            </div>
            <div className="flex justify-center mt-2 w-full overflow-hidden">
                <AdstrBanner320x50 />
            </div>
           </div>


            {/* Hero Section */}
            <div>
                <div className="flex xl:justify-between">
                    <div className="w-full relative  grid grid-cols-12 overflow-hidden">
                        <div className=' lg:col-span-8 col-span-12' >
                            <LazyLoad height={100} offset={100} once>
                                <div className="relative shadow-xl rounded-xl overflow-hidden w-full h-[250px] lg:h-[600px] lg:w-[900px] ">
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
                        </div>
                        {isProcessing && <TvLoader />}

                        {/* ads zone right side  */}
                        <div className=' hidden lg:block col-span-4' >
                            <div className=' flex' >
                                <div>
                                <Adstrbanner300x250 />
                                <HillAllDevBanner/>
                                </div>
                                <AdstrBanner160x600 />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ads under video */}
                <div className='flex justify-center overflow-hidden md:justify-start z-0 mt-2' >
                    <JuLeaderboard />
                </div>

                <CommentUI
                    vidId={video.id}
                    relativeDate={relativeDate}
                    handleShareClick={handleShareClick}
                    data={video}
                />

            </div>


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

            {/* ads zone */}
            <div>
                <JuNativeAds />
            </div>

            {/* Share Modal */}
            {isModalOpen && (
                <ShareModelUI id={vidId} setIsModalOpen={setIsModalOpen} />
            )}
        </div>
    );
};

export default VideoDetail;
