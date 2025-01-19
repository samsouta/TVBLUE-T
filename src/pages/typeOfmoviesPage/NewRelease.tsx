import React, { useEffect, useState } from 'react'
import HomeVideoPageChild from '../../components/UI/home/HomeVideoPageChild'
import Pangination from '../../components/UI/pangination/Pangination'
import { useGetNewReleaseMovieQuery } from '../../redux/api/getMovies'
import ExoMobileInstantMessage from '../../components/ads/EXoClick/ExoMobileInstantMessage'
import ExoMobileBanner from '../../components/ads/EXoClick/ExoMobileBanner'
import TrafficMobileBanner from '../../components/ads/trafficstar/TrafficMobileBanner'
import ExoMobileFullpage from '../../components/ads/EXoClick/ExoMobileFullpage'
import ExoPcBanner from '../../components/ads/EXoClick/ExoPcBanner'
import TrafficPCBanner from '../../components/ads/trafficstar/TrafficPCBanner'
import ExoPCStickyBanner from '../../components/ads/EXoClick/ExoPCStickyBanner'
import ExoDesktopFullpage from '../../components/ads/EXoClick/ExoDesktopFullpage'
import ExoRecommendationWidget from '../../components/ads/EXoClick/ExoRecommendationWidget'
import TrafficNative from '../../components/ads/trafficstar/trafficNative'
import ExoInPagePushNotifications from '../../components/ads/EXoClick/ExoInPagePushNotifications'
import { Loader } from 'lucide-react'


const NewRelease: React.FC = () => {
    const storedPage = localStorage.getItem('NewReleaseCurrentPage')
    const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage) : 1)
    const { data, isLoading, isError } = useGetNewReleaseMovieQuery(currentPage)
    const newRelease = data?.data
    const lastPage = data?.last_page

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
    // Update localStorage whenever currentPage changes
    useEffect(() => {
        localStorage.setItem('NewReleaseCurrentPage', currentPage.toString())
    }, [currentPage]);


    return (
        <div className="mt-24 mx-1 lg:mx-4">
            {/* ads  */}
            {/* Mobile */}
            <div className=' block md:hidden' >
                <ExoMobileInstantMessage />
                <ExoMobileBanner />
                <TrafficMobileBanner />
                <ExoMobileFullpage />
            </div>
            {/* PC */}
            <div className="hidden md:block">
                <ExoPcBanner />
                <div className=' w-full flex justify-center' ><TrafficPCBanner /></div>
                <ExoPCStickyBanner />
                <ExoDesktopFullpage />
            </div>
            {/* ads end  */}
            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display">
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
                    <Pangination
                        lastPage={lastPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                    {/* ads */}
                    <ExoRecommendationWidget />
                    <TrafficNative />
                    <ExoInPagePushNotifications />
                    {/* ads end */}
                </>
            )}
        </div>
    )
}

export default NewRelease