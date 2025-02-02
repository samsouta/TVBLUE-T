import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetActressQuery } from '../../services/api/actress/getActress';
import { Avatar } from '@nextui-org/react';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import Pangination from '../../components/UI/pangination/Pangination';

const AllActress: React.FC = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });

  const navigate = useNavigate();
  const { data, isLoading } = useGetActressQuery(currentPage);
  const actresses = data?.data || [];
  const lastPage = data?.last_page;

  // Save page number when it changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  // Clear localStorage when leaving the actresses page
  useEffect(() => {
    if (!location.pathname.includes('/actresses')) {
      localStorage.removeItem('currentPage');
    } else {
      localStorage.removeItem('currentPage2');
    }
  }, [location.pathname]);
  

  const handleActressClick = (actress: { id: number; name: string }) => {
    const formattedName = actress.name.toLowerCase().replace(/\s+/g, '');
    navigate(`/act/${actress.id}/${formattedName}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 mt-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <TVSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24">
      <h2 className="text-2xl montserrat font-bold text-center text-[var(--light-blue)] mb-8">
        All Model
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {actresses.map((actress) => (
          <div
            key={actress.id}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleActressClick(actress)}
          >
            <Avatar
              isBordered
              color="success"
              src={actress.image_url || undefined}
              name={actress.name || undefined}
              className="w-32 h-32"
              style={{ objectPosition: 'top', objectFit: 'fill' }}
            />
            <p className="mt-2 text-[var(--light-blue)] merriweather-regular text-center">
              {actress.name}
            </p>
          </div>
        ))}
      </div>

      <Pangination
        lastPage={lastPage ? Number(lastPage) : undefined}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  )
}

export default AllActress