import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import HomeVideoPageChild from '../../components/features/video/VideoCard';
import Pangination from '../../components/UI/pangination/Pangination';
import { useGetMoviesWithGrenreQuery } from '../../services/api/Movies/getMovies';
import { autoCorrect } from '../../utils/autoCorrect';
import ExoRecommendationWidget from '../../components/ads/EXoClick/ExoRecommendationWidget';
import { Loader } from 'lucide-react';
import ExoRecomCPM from '../../components/ads/EXoClick/ExoRecomCPM';
import ExoPcBanner from '../../components/ads/EXoClick/ExoPcBanner';
import ExoMobileBanner from '../../components/ads/EXoClick/ExoMobileBanner';
import ExoMBannerCPM from '../../components/ads/EXoClick/ExoMBannerCPM';

const MoreDetail: React.FC = () => {
    const { genre } = useParams<{ genre: string }>(); // Fetch the genre from the URL
    const location = useLocation(); // React to route changes
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage) : 1;
    });



    const { data, isLoading, isError } = useGetMoviesWithGrenreQuery({
        genre: genre || '',
        page: currentPage,
    });

    const genData = data?.data;
    const lastPage = data?.last_page;

    // Save page number when it changes
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    // Clear localStorage when leaving the actresses page
    useEffect(() => {
        if (!location.pathname.includes('/gn/')) {
            localStorage.removeItem('currentPage');
        }
    }, [location.pathname]);

    // don't need now 
    // useEffect(() => {
    //     if (currentSection && contentRef.current) {
    //         contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //         dispatch(setCurrentSection(false)); // Reset the state after scrolling
    //     }
    // }, [currentSection, dispatch]);

    return (
        <div className="mt-24 mx-1 lg:mx-4">
            {/* ADS ZONE */}
            {/* Mobile */}
            <div className=' w-full flex flex-wrap justify-center' >
                <div className=' hidden xl:block' >
                    <ExoPcBanner />
                </div>
                <div className=' block xl:hidden' >
                    <ExoMobileBanner />
                    <ExoMBannerCPM />
                </div>
            </div>

            {/* ADS END  */}

            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                    {autoCorrect(genre || 'Unknown')}
                </h1>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center mt-4">
                    <Loader className="animate-spin text-green-400" size={34} />
                </div>
            ) : isError || !genData?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {genData.map((item) => (
                            <HomeVideoPageChild
                                key={item?.id}
                                data={item}
                            />
                        ))}
                    </div>

                    {/* ads */}
                    <ExoRecommendationWidget />
                    <ExoRecomCPM />
                    {/* ads end  */}


                    <Pangination
                        lastPage={lastPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </>
            )}
        </div>
    );
};

export default MoreDetail;
