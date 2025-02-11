import React, { useEffect, useState } from 'react'
import HomeVideoPageChild from '../../components/features/video/VideoCard'
import Pangination from '../../components/UI/pangination/Pangination'
import { useGetNewReleaseMovieQuery } from '../../services/api/Movies/getMovies'
import { Loader } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90'
import AdstrBanner468x60 from '../../components/ads/adstraa/AdstrBanner468x60'
import AdstrBanner320x50 from '../../components/ads/adstraa/AdstrBanner320x50'
import HillMobileBanner from '../../components/ads/Hillads/HillMobileBanner'
import HillAllDevBanner from '../../components/ads/Hillads/HillAllDevBanner'
import JuNativeAds from '../../components/ads/juicy/JuNativeAds'
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard'


const NewRelease: React.FC = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem('currentPage');
        return savedPage ? parseInt(savedPage) : 1;
    });
    const { data, isLoading, isError } = useGetNewReleaseMovieQuery(currentPage)
    const newRelease = data?.data
    const lastPage = data?.last_page

    // Save page number when it changes
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Clear localStorage when leaving the actresses page
    useEffect(() => {
        if (!location.pathname.includes('/new-release')) {
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
                <h1 className="text-[var(--light-blue)] mb-6 text-2xl montserrat font-bold">
                    New-Release
                </h1>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center mt-4">
                    <Loader className="animate-spin text-green-400" size={34} />
                </div>
            ) : isError || !newRelease?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {newRelease.map((item) => (
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
                    <div className=' w-full z-0' >
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

export default NewRelease