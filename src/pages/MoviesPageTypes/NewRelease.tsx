import React, { useEffect, useState } from 'react'
import HomeVideoPageChild from '../../components/features/video/VideoCard'
import Pangination from '../../components/UI/pangination/Pangination'
import { useGetNewReleaseMovieQuery } from '../../services/api/Movies/getMovies'
import { Loader } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import JuNativeAds from '../../components/ads/juicy/JuNativeAds'
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard'
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90'
import JuBanner300x from '../../components/ads/juicy/JuBanner300x'


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
        <div className=" mx-1 lg:mx-4">
            {/* ads  */}
            <div className=' w-full flex justify-center overflow-hidden z-0' >
                <JuLeaderboard />
            </div>
            <div className=' w-full flex justify-center overflow-hidden' >
                <AdstrBanner728x90 />
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

export default NewRelease