import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRelatedMovieQuery } from '../../services/api/movies';
import { formatRelativeDate } from '../../utils/formatRelativeDate';
import { useIncrementViewMutation } from '../../services/api/voting';
import VideoSelection from '../../components/features/videos/VideoSelection';
import VideoCard from '../../components/UI/VideoCard';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import { MovieDataType } from '../../types/MovieType';
import TvLoader from '../../components/UI/loader/TvLoader';
import Ju160x600Skyscraper from '../../components/ads/juicy/Ju160x600Skyscraper';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';
import JuBanner300x from '../../components/ads/juicy/JuBanner300x';
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90';

type MoviesDetailType = {
    movie: MovieDataType;
}


const Page: React.FC = () => {
    /**
     * Get video ID from URL
     */
    const { id: vidId } = useParams<{ id: string }>();
    const videoId = parseInt(vidId || "10", 10);
    /**
     * @state
     */
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState<MoviesDetailType | null>(null);
    const [error, setError] = useState<string | null>(null);

    /**
     * @fetch side data from api
     */
    const { data: related, isLoading: isRelatedLoading } = useGetRelatedMovieQuery(videoId);
    const [incrementView] = useIncrementViewMutation();

    /**
     * @useEffect to fetch movie data
     */
    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true); // Reset loading state every time id changes
            setError(null);
            try {
                const response = await fetch(`https://bluetv.x10.mx/api/v1/movies/${vidId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setMovies(data);

            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [vidId]);

    /**
     * @Calculate relative date
     *  Parse the posted_date (assumes your backend now returns an ISO string)
     */
    const postedDateStr = movies?.movie?.posted_date;
    const parsedDate = postedDateStr ? new Date(postedDateStr) : new Date();
    const relativeDate = formatRelativeDate(parsedDate);

    /**
     * @get view from iframe 
     */
    const handleVideoPlayed = useCallback((videoId: number) => {
        if (videoId) {
            incrementView({ videoId });
        }
    }, [incrementView]);

    /**
     * @error handling
     */

    if (loading) {
        return <div className=""><TvLoader /></div>;
    }

    if (error) {
        return <div className="text-red-600 mt-28">Error fetching movie data</div>;
    }

    return (
        <>
            <div className="text-gray-100  px-2  ">
                {
                    /* Video player Section */
                }
                <div>
                    <div className="flex xl:justify-between">
                        <div className="w-full relative  grid grid-cols-12 overflow-hidden">
                            <div className=' lg:col-span-8 col-span-12' >
                                <div className="relative shadow-xl rounded-xl overflow-hidden w-full h-[250px] lg:h-[600px] lg:w-[900px] ">
                                    <iframe
                                        src={movies?.movie?.video_url}
                                        width="100%"
                                        height="100%"
                                        title="Video Player"
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin allow-presentation"
                                        allowFullScreen
                                        onLoad={() => handleVideoPlayed(movies?.movie?.id || 0)}
                                    />
                                    <div className="cursor-not-allowed absolute bottom-0 z-50 right-14 rounded-md bg-transparent w-8 h-8"></div>
                                </div>
                            </div>

                            {
                                /* /** ADS ZONE hidden in mobile */
                            }
                            <div className=' overflow-hidden z-0 md:col-span-4 w-full hidden xl:block' >
                                <Ju160x600Skyscraper />
                            </div>

                        </div>
                    </div>

                    {
                        /* /** ADS ZONE hidden pc */
                    }
                    <div className=' overflow-hidden z-0 md:col-span-4 w-full flex items-center flex-col xl:flex-row' >
                        <JuLeaderboard />
                        <JuNativeAds />
                    </div>

                    {
                        /* // Video Info Section */
                    }
                    <VideoSelection
                        vidId={movies?.movie.id || 0}
                        relativeDate={relativeDate}
                        data={movies?.movie as MovieDataType}
                    />

                    {
                        /* /** ADS ZONE */
                    }
                    <div className=' overflow-hidden z-0 md:col-span-4 w-full flex justify-center lg:hidden' >
                        <JuBanner300x />
                    </div>

                </div>

                {
                    /* // Related Videos Section */
                }
                <div className="mt-10 mx-auto mb-20 ">
                    <h2 className="text-xl md:text-2xl head-font ms-2 text-white mb-4">Related Videos</h2>
                    {
                        isRelatedLoading ? (
                            <div className="flex justify-center items-center">
                                {
                                    [...Array(10)].map((_, index) => <TVSkeleton key={index} />)
                                }
                            </div>
                        ) : (
                            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                                {
                                    related?.related_videos?.map((item, index) => (
                                        <VideoCard
                                            key={index}
                                            data={item}
                                            actData={item?.actresses || null}
                                        />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full flex justify-center' >
                    <AdstrBanner728x90 />
                </div>

            </div>
        </>
    );
};

export default Page;