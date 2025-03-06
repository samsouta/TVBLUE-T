import React, { useEffect } from 'react'
import Pangination from '../components/UI/loader/Pangination'
import { useGetNewReleaseMovieQuery } from '../services/api/movies'
import { useSearchParams } from 'react-router-dom'
import VideoCard from '../components/UI/VideoCard'
import TVSkeleton from '../components/UI/loader/TVSkeleton'


const NewRelease: React.FC = () => {
    /**
     * @hook for router location and search params
     */
    const [searchParams, setSearchParams] = useSearchParams();

    /**
   * @get current page from search params
   */
    const currentPage = Number(searchParams.get('page')) || 1;

    /**
     * @fetch server data
     */
    const { data, isLoading, isError,isFetching } = useGetNewReleaseMovieQuery(currentPage)
    const newRelease = data?.data
    const lastPage = data?.last_page

    /**
     * @set page number in URL when currentPage changes
     */
    useEffect(() => {
        setSearchParams({ page: currentPage.toString() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, setSearchParams]);

    /**
     * 
     * @handle page change
     */
    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
      };

  /**
   * @loading and error handling
   */
  if (isLoading || isFetching) {
    return (
      <div className="flex-wrap grid mt-24 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
        {[...Array(20)].map((_, index) => (
          <TVSkeleton key={index} />
        ))}
      </div>
    );
  }


    return (
        <div className=" mx-1 lg:mx-4">
            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] mb-6 text-2xl montserrat font-bold">
                    New-Release
                </h1>
            </div>


            {isError || !newRelease?.length || isFetching ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
                        {newRelease.map((item) => (
                            <VideoCard
                                key={item?.id}
                                data={item}
                                actData={item?.actresses}
                            />
                        ))}
                    </div>

                    <Pangination
                        lastPage={lastPage}
                        currentPage={currentPage}
                        setCurrentPage={handlePageChange}
                    />

                </>
            )}
        </div>
    )
}

export default NewRelease