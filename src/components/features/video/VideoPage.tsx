import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';

// Components
import RecommentForYou from '../home/RecommentForYou';
import MoviesWithGenre from '../MoviesWithGenre/MoviesWithGenre';
import FindVideoWithTags from '../MoviesWithTags/FindVideoWithTags';
import RandomVideo from '../home/RandomVideo';
import GoUpBtn from '../../UI/GoUp/GoUpBtn';

// Ads Components
import JuNativeAds from '../../ads/juicy/JuNativeAds';
import JuLeaderboard from '../../ads/juicy/JuLeaderboard';
import AdstrBanner728x90 from '../../ads/adstraa/AdstrBanner728x90';

interface AdSectionProps {
    children: React.ReactNode;
}

const AdSection: React.FC<AdSectionProps> = ({ children }) => (
    <div className="w-full max-w-screen-xl mx-auto flex overflow-hidden justify-center z-0 my-4 md:my-8">
        {children}
    </div>
);

const VideoPage: React.FC = () => {
    const location = useLocation();
    const context = useContext(StateContext);

    if (!context) {
        throw new Error('StateContext not found');
    }

    const { setCurrentPage } = context;

    useEffect(() => {
        if (location.pathname === '/home') {
            localStorage.removeItem('currentPage');
            localStorage.removeItem('NewReleaseCurrentPage');
            localStorage.removeItem('TradingCurrentPage');
            setCurrentPage(1);
        }
    }, [location.pathname, setCurrentPage]);

    const handleToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="container mx-auto px-1 md:px-4 py-4 md:py-8">
            <div className="flex flex-col space-y-8 md:space-y-16">
                {/* Recommended Section */}
                <section className="space-y-4 md:space-y-8">
                    <RecommentForYou />
                    <AdSection>
                        <JuLeaderboard />
                    </AdSection>
                </section>

                {/* Tags Based Videos Section */}
                <section className="space-y-6 md:space-y-12">
                    <div className="space-y-12">
                        <FindVideoWithTags isTag="creampie" />
                        
                        <AdSection>
                            <JuNativeAds />
                        </AdSection>

                        <FindVideoWithTags isTag="Bondage" />
                       
                    </div>
                </section>

                {/* Genre Based Videos Section */}
                <section className="space-y-6 md:space-y-12">
                    <div className="space-y-12">
                        <MoviesWithGenre isGenre="Chinese AV" />
                        <AdSection>
                            <AdstrBanner728x90 />
                        </AdSection>

                        <MoviesWithGenre isGenre="uncensored" />
                    </div>
                </section>

                {/* More Tags Section */}
                <section className="space-y-6 md:space-y-12">
                    <div className="space-y-8">
                        <FindVideoWithTags isTag="tight pussy" />
                        <FindVideoWithTags isTag="Cosplay" />
                        <FindVideoWithTags isTag="Big ass" />
                        <FindVideoWithTags isTag="Romantic" />
                    </div>
                </section>

                {/* Additional Genre Section */}
                <section className="space-y-4 md:space-y-8">
                    <MoviesWithGenre isGenre="censored" />
                </section>

                {/* Random Video Section */}
                <section className="space-y-4 md:space-y-8">
                    <RandomVideo />
                </section>

                {/* Mobile Go To Top Button */}
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

export default VideoPage;
