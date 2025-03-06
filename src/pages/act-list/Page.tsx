import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetActressQuery } from '../../services/api/actress';
import { Avatar } from '@nextui-org/react';
import Pangination from '../../components/UI/loader/Pangination';
import ModalLoader from '../../components/UI/loader/ModalLoader';

const Page: React.FC = () => {
  /**
   * @hook for router location and search params and state
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * @get current page from search params
   */
  const currentPage = Number(searchParams.get('page')) || 1;

  /**
   * @fetch server data
   */
  const { data, isLoading, isFetching } = useGetActressQuery(currentPage);
  const actresses = data?.data || [];
  const lastPage = data?.last_page;

  /**
   * @set page number in URL when currentPage changes
   */
  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, setSearchParams]);

  /**
   * @function handle page change
   */
  const handleActressClick = (id: number) => {
    navigate(`/act/${id}`);
  };

  /**
   * 
   * @handle page change 
   */
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  /**
   * @handle  loading and error state
   * @useEffect
   */

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto px-4 mt-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <ModalLoader key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24">
      {
        /* /actress  */
      }
      <h2 className="text-2xl montserrat font-bold text-center text-[var(--light-blue)] mb-8">
        All Model
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {actresses.map((actress) => (
          <div
            key={actress.id}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleActressClick(actress.id)}
          >
            <Avatar
              isBordered
              color="success"
              src={actress?.image_url || 'https://i.pinimg.com/736x/36/19/ee/3619ee7178e5b3a907918b5e76b057f4.jpg'}
              name={actress?.name || 'Unknown'}
              className="w-32 h-32"
              style={{ objectPosition: 'top', objectFit: 'fill' }}
            />
            <p className="mt-2 text-[var(--light-blue)] merriweather-regular text-center">
              {actress.name}
            </p>
          </div>
        ))}
      </div>




      {/* /**
         * @pagination
         */ }
      <Pangination
        lastPage={lastPage ? Number(lastPage) : undefined}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />

    </div>
  )
}

export default Page