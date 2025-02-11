import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HomeVideoPageChild from '../../components/features/video/VideoCard';
import TVSkeleton from '../../components/UI/loader/TVSkeleton';
import { useGetActressWithIdQuery } from '../../services/api/actress/getActress';
import Pangination from '../../components/UI/pangination/Pangination';
import AdstrBanner728x90 from '../../components/ads/adstraa/AdstrBanner728x90';
import AdstrBanner468x60 from '../../components/ads/adstraa/AdstrBanner468x60';
import AdstrBanner320x50 from '../../components/ads/adstraa/AdstrBanner320x50';
import HillMobileBanner from '../../components/ads/Hillads/HillMobileBanner';
import HillAllDevBanner from '../../components/ads/Hillads/HillAllDevBanner';
import JuNativeAds from '../../components/ads/juicy/JuNativeAds';
import JuLeaderboard from '../../components/ads/juicy/JuLeaderboard';

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
      <div className='' >
        <HillMobileBanner />
      </div>
      <div className="flex justify-center mt-2 w-full overflow-hidden">
        <AdstrBanner320x50 />
      </div>
      <div className='' >
        <HillAllDevBanner />
      </div>

      <h2 className="text-2xl montserrat text-center text-[var(--light-blue)] mb-4">
        <span className="font-bold">{actressName}</span>'s Movies
      </h2>
      <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
        {movies.map((movie) => (
          <HomeVideoPageChild key={movie.id} data={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-center text-lg min-h-screen text-[var(--soft-blue)] py-8">
          No movies found for this actress
        </div>
      )}

      {/* ads */}
      <div className=' flex justify-center mt-2 z-0' >
        <JuNativeAds />
      </div>
      <div className=' w-full' >
        <JuLeaderboard />
      </div>


      <Pangination lastPage={lastPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

    </div>
  );
};

export default ActressMovies;
