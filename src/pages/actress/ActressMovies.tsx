import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HomeVideoPageChild from '../../components/features/video/VideoCard';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import { useGetActressWithIdQuery } from '../../services/api/actress/getActress';
import Pangination from '../../components/UI/pangination/Pangination';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';
import JuBanner300x from '../../components/ads/juicy/JuBanner300x';
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90';
import { Avatar } from '@nextui-org/react';

const ActressMovies: React.FC = () => {
  // Get the route param "id"
  const { id } = useParams<{ id: string }>();
  const actressId = id ? parseInt(id) : 1;
  const navigate = useNavigate();
  const location = useLocation();


  // Initialize currentPage from localStorage
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage2');
    return savedPage ? parseInt(savedPage) : 1;
  });

  // Fetch actress data based on the id and currentPage
  const { data, isLoading } = useGetActressWithIdQuery({ id: actressId, page: currentPage });
  const movies = data?.movies?.data || [];
  const lastPage = data?.movies?.last_page;
  const actressName = data?.actress?.name || 'Actress';

  // Save the current page number to local storage when it changes
  useEffect(() => {
    localStorage.setItem('currentPage2', currentPage.toString());
  }, [currentPage]);



  // Navigate to the formatted actress route if the actress name is available
  useEffect(() => {
    if (data?.actress?.name) {
      const formattedName = data.actress.name.toLowerCase().replace(/\s+/g, '');
      const expectedPath = `/act/${actressId}/${formattedName}`;

      // Only navigate if we're not already on the expected path
      if (location.pathname !== expectedPath) {
        navigate(expectedPath, { replace: true });
      }
    }
  }, [data, actressId, location.pathname, navigate]);

  if (isLoading) {
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

      {/* Actress info */}
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

        {/* // movies selection  */}
        <div className="flex-wrap grid mt-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
          {movies.map((movie) => (
            <HomeVideoPageChild key={movie.id} data={movie} />
          ))}
        </div>
        {movies.length === 0 && (
          <div className="text-center text-lg min-h-screen text-[var(--soft-blue)] py-8">
            No movies found for this actress
          </div>
        )}
      </div>

      {/* ads */}
      
      <div className=' flex justify-center mt-2 z-0' >
        <JuBanner300x />
      </div>


      <Pangination lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default ActressMovies;
