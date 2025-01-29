import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useFindTagsVideoQuery } from '../redux/api/home/getTagVideo';
import { Loader } from 'lucide-react';
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild';
import Pangination from '../components/UI/pangination/Pangination';
import { autoCorrect } from '../utils/autoCorrect';



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
            {/* ADS ZONE */}
            {/* Mobile */}
            {/* <div className=' w-full flex flex-wrap justify-center' >
        <ExoPcBanner />
        <ExoMobileBanner />
        <ExoMBannerCPM/>
    </div> */}

            {/* ADS END  */}

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
                    {/* <ExoRecommendationWidget />
                    <ExoRecomCPM /> */}
                    {/* ads end  */}


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