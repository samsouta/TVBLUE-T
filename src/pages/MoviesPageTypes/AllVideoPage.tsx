import React, { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import HomeVideoPageChild from '../../components/features/video/VideoCard'
import Pangination from '../../components/UI/pangination/Pangination'
import { useGetAllMoviesQuery } from '../../services/api/Movies/getMovies'
import { useLocation } from 'react-router-dom'
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90'
import AdstrBanner468x60 from '../../components/ads/adstraa/AdstrBanner468x60'
import AdstrBanner320x50 from '../../components/ads/adstraa/AdstrBanner320x50'
import HillMobileBanner from '../../components/ads/Hillads/HillMobileBanner'
import HillAllDevBanner from '../../components/ads/Hillads/HillAllDevBanner'
import JuNativeAds from '../../components/ads/juicy/JuNativeAds'
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard'


const AllVideoPage: React.FC = () => {
    const location = useLocation(); // React to route changes
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage) : 1;
    });



    const { data, isLoading, isError } = useGetAllMoviesQuery(currentPage);

    const genData = data?.data;
    const lastPage = data?.last_page;

    // Save page number when it changes
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    // Clear localStorage when leaving the actresses page
    useEffect(() => {
        if (!location.pathname.includes('/all-movies')) {
            localStorage.removeItem('currentPage');
        }
    }, [location.pathname]);

    return (
        <div className="mt-24 mx-1 lg:mx-4">

            {/* ads  */}
            <div className='' >
                <HillMobileBanner />
            </div>
            <div className="flex justify-center mt-2 w-full overflow-hidden">
                <AdstrBanner320x50 />
            </div>
            <div className='' >
                <HillAllDevBanner />
            </div>


            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                    All Videos
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
                    <div className=' flex justify-center mt-2 z-0' >
                        <JuNativeAds />
                    </div>
                    <div className=' w-full' >
                        <JuLeaderboard />
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

export default AllVideoPage