import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useFindTagsVideoQuery } from '../../services/api/Movies/getTagVideo';
import { Loader } from 'lucide-react';
import HomeVideoPageChild from '../../components/features/video/VideoCard';
import Pangination from '../../components/UI/pangination/Pangination';
import { autoCorrect } from '../../utils/autoCorrect';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90';
import JuBanner300x from '../../components/ads/juicy/JuBanner300x';

const TagsDetail: React.FC = () => {

    const { tag } = useParams<{ tag: string }>(); // Fetch the genre from the URL
    const location = useLocation(); // React to route changes
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage) : 1;
    });



    const { data, isLoading, isError } = useFindTagsVideoQuery({
        tag: tag || '',
        page: currentPage,
    });

    const TagsVideo = data?.data?.data || [];
    const lastPage = data?.data?.last_page || 1;

    // Save page number when it changes
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Clear localStorage when leaving the actresses page
    useEffect(() => {
        if (!location.pathname.includes('/tags/')) {
            localStorage.removeItem('currentPage');
        }
    }, [location.pathname]);




    return (
        <div className="mt-24 mx-1 lg:mx-4">

            {/* ads  */}
            <div className=' w-full flex justify-center overflow-hidden z-0' >
                <JuLeaderboard />
            </div>
            <div className=' w-full flex justify-center overflow-hidden' >
                <AdstrBanner728x90 />
            </div>

            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] mb-6 text-2xl montserrat font-bold">
                    {autoCorrect(tag || 'Unknown')}
                </h1>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center mt-4">
                    <Loader className="animate-spin text-green-400" size={34} />
                </div>
            ) : isError || !TagsVideo?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {TagsVideo.map((item) => (
                            <HomeVideoPageChild
                                key={item?.id}
                                data={item}
                            />
                        ))}
                    </div>

                    {/* ads */}
                    <div className=' flex justify-center mt-2 z-0' >
                        <JuNativeAds />
                    </div>
                    <div className=' flex justify-center mt-2 z-0' >
                        <JuBanner300x />
                    </div>



                    <Pangination
                        lastPage={lastPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />


                </>
            )}
        </div>
    )
}

export default TagsDetail