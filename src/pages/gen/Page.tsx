import React, { useEffect} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Pangination from '../../components/UI/loader/Pangination';
import { useGetMoviesWithGrenreQuery } from '../../services/api/movies';
import { autoCorrect } from '../../utils/autoCorrect';
import VideoCard from '../../components/UI/VideoCard';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';

const Page: React.FC = () => {
    /**
     *  @hook for router location and search params and state
     */
    const { genre } = useParams<{ genre: string }>(); // Fetch the genre from the URL
    const [searchParams, setSearchParams] = useSearchParams();

    /**
     * @get current page from search params
     */
    const currentPage = Number(searchParams.get('page')) || 1;

    /**
     * @fetch server data
     */
    const { data, isLoading, isError,isFetching } = useGetMoviesWithGrenreQuery({
        genre: genre || '',
        page: currentPage,
    });
    const genData = data?.data;
    const lastPage = data?.last_page;

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
        {[...Array(10)].map((_, index) => (
          <TVSkeleton key={index} />
        ))}
      </div>
    );
  }
  

    return (
        <div className="mx-1 lg:mx-4">

            <div className="flex justify-center items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                    {autoCorrect(genre || 'Unknown')}
                </h1>
            </div>
            { isError || !genData?.length ? (
                <div className="text-center text-[var(--light-blue)]">No video found</div>
            ) : (
                <>
                    <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {genData.map((item) => (
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
    );
};

export default Page;
