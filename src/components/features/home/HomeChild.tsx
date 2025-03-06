import React from 'react';
import { useLocation } from 'react-router-dom';

// Components
import RecommentForYou from './RecommentForYou';
import RandomVideo from './RandomVideo';
import GoUpBtn from '../../UI/GoUpBtn';
import VideoWithTags from './VideoWithTags';
import VideoWithGenre from './VideoWithGenre';
import JuLeaderboard from '../../ads/juicy/JuLeaderboard';
import JuNativeAds from '../../ads/juicy/JuNativeAds';




const HomeChild: React.FC = () => {
    /**
     * route location
     */
    const location = useLocation();

    /**
     * handle go to top button
     */
    const handleToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="container mx-auto px-1 md:px-4 py-4 md:py-8">
            <div className="flex flex-col space-y-8 md:space-y-16">
                {
                    /* Recommended Section */
                }
                <section className="space-y-4 md:space-y-8">
                    <RecommentForYou />
                </section>

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full' >
                    <JuLeaderboard />
                </div>

                {
                    /* Tags Based Videos Section */
                }
                <section className="space-y-6 md:space-y-12">
                    <div className="space-y-12">
                        <VideoWithTags isTag="creampie" />
                        <VideoWithTags isTag="Bondage" />
                    </div>
                </section>

                {
                    /* /** ADS ZONE */
                }
                <div className=' overflow-hidden z-0 md:col-span-4 w-full' >
                    <JuNativeAds />
                </div>

                {
                    /* Genre Based Videos Section */
                }
                <section className="space-y-6 md:space-y-12">
                    <div className="space-y-12">
                        <VideoWithGenre isGenre="Chinese AV" />
                        <VideoWithGenre isGenre="uncensored" />
                    </div>
                </section>

                {
                    /* More Tags Section */
                }
                <section className="space-y-6 md:space-y-12">
                    <div className="space-y-8">
                        <VideoWithTags isTag="tight pussy" />
                        <VideoWithTags isTag="Cosplay" />
                        <VideoWithTags isTag="Big ass" />
                        <VideoWithTags isTag="Romantic" />
                    </div>
                </section>

                {
                    /* Additional Genre Section */
                }
                <section className="space-y-4 md:space-y-8">
                    <VideoWithGenre isGenre="censored" />
                </section>

                {
                    /* Random Video Section */
                }
                <section className="space-y-4 md:space-y-8">
                    <RandomVideo />
                </section>

                {
                    /* Mobile Go To Top Button */
                }
                {location.pathname === '/home' && (
                    <div
                        className="md:hidden fixed bottom-8 right-8 flex flex-col items-center cursor-pointer z-50"
                        onClick={handleToTop}
                    >
                        <GoUpBtn />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeChild;
