import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetActressQuery } from '../../services/api/actress/getActress';
import { Avatar } from '@nextui-org/react';
import Pangination from '../../components/UI/pangination/Pangination';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';
import JuBanner300x from '../../components/ads/juicy/JuBanner300x';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90';
import ModalLoader from '../../components/UI/loader/ModalLoader';

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
            <ModalLoader key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24">

      {/* ads  */}
      <div className=' w-full flex justify-center overflow-hidden z-0' >
        <JuLeaderboard />
      </div>
      <div className=' w-full flex justify-center overflow-hidden' >
        <AdstrBanner728x90 />
      </div>
      <div className=' flex justify-center mt-2 z-0' >
        <JuNativeAds />
      </div>

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

      {/* ads */}
      <div className=' flex justify-center mt-2 z-0' >
        <JuBanner300x />
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