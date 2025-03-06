import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import { useGetActressWithIdQuery } from '../../services/api/actress';
import Pangination from '../../components/UI/loader/Pangination';
import { Avatar } from '@nextui-org/react';
import VideoCard from '../../components/UI/VideoCard';

const Page: React.FC = () => {
  /**
   * @router params and search params and get id
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const actressId = id ? parseInt(id) : 1;


  /**
   * @get current page and actress from search params
   */
  const currentPage = Number(searchParams.get('page')) || 1;
  const actress = searchParams.get('actress') || '';



  /**
   * @fetch server data
   */
  const { data, isLoading, isFetching } = useGetActressWithIdQuery({ id: actressId, page: currentPage });
  const movies = data?.movies?.data || [];
  const lastPage = data?.movies?.last_page;
  const actressName = data?.actress?.name || actress;

  /**
   * @update search params
   */
  useEffect(() => {
    if (actressName) {
      setSearchParams({ page: currentPage.toString(), actress: actressName });
    }
  }, [actressName, currentPage, setSearchParams]);



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
    <div className="container mx-auto px-4 mt-24">

      {
        /* Actress info */
      }
      <div className=' mt-5' >
        <div className=' bg-black/30 p-10 rounded-lg shadow-md flex gap-x-6 md:justify-center' >
          <Avatar
            isBordered
            color="success"
            src={data?.actress?.image_url || undefined}
            name={data?.actress?.name || undefined}
            className="md:w-32 md:h-32 w-20 h-20"
            style={{ objectPosition: 'top', objectFit: 'fill' }}
          />
          <h2 className=" text-[var(--light-blue)] mb-4 flex flex-col">
            <span className="font-bold text-md md:text-xl montserrat ">{actressName} - ( {data?.actress?.age} ) yrs</span>
            {/* // For DD/MM/YYYY format */}
            <span className=' roboto text-sm md:text-lg' >
              {data?.actress?.birth_date ? new Date(data.actress.birth_date).toLocaleDateString('en-GB') : undefined}
            </span>
            <span className=' roboto text-sm md:text-lg' >
              {data?.actress?.description}
            </span>
            <span className=' roboto text-sm md:text-lg' >
              {data?.actress?.nationality}
            </span>

          </h2>
        </div>

        {
          /* // movies selection  */
        }
        <div className="flex-wrap grid mt-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
          {movies.map((movie) => (
            <VideoCard
              key={movie.id}
              data={movie}
              actData={actressName}
            />
          ))}
        </div>
        {movies.length === 0 && (
          <div className="text-center text-lg min-h-screen text-[var(--soft-blue)] py-8">
            No movies found for this actress
          </div>
        )}
      </div>



      {
      /** pangination */}
      <Pangination
        lastPage={lastPage}
        currentPage={currentPage}
        setCurrentPage={(page) => setSearchParams({ page: page.toString(), actress: actressName })}
      />

    </div>
  );
};

export default Page;
