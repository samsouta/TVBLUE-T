import React, { useEffect, useState } from 'react'
import HomeVideoPageChild from '../../components/UI/home/HomeVideoPageChild'
import Pangination from '../../components/UI/pangination/Pangination'
import { useGetNewReleaseMovieQuery } from '../../redux/api/getMovies'


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
            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display">
                    New-Release
                </h1>
            </div>
            {isLoading ? (
                <div className="text-center text-[var(--light-blue)]">Loading...</div>
            ) : isError || !newRelease?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {newRelease.map((item) => (
                            <HomeVideoPageChild
                                key={item?.id}
                                data={item}
                                isLoading={isLoading}
                            />
                        ))}
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