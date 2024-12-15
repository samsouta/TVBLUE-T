import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardFooter } from "@nextui-org/react";
import { formatDuration } from '../../../utils/formatDuration';
import LazyLoad from 'react-lazyload';
import TVSkeleton from '../loader/TVSkeleton';
import { homeDetail } from '../../../redux/slice/HomeDetailSlice';

type DataType = {
  id: number;
  description: string;
  posted_date: string;
  rating_count: string;
  rating_total: string;
  title: string;
  url: string;
  view_count: string;
  duration: string;
}
type HomeVideoPageChildProps = {
  data: DataType;
  isLoading: boolean;
}

const HomeVideoPageChild: React.FC<HomeVideoPageChildProps> = ({ data, isLoading }) => {
  const [showTVske, setShowTVske] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetailNavigation = useCallback((id: number) => {
    dispatch(homeDetail(id));
    navigate(`/videos/${id}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isLoading) {
      setShowTVske(true);
      const timer = setTimeout(() => {
        setShowTVske(false);
      }, 2000);

      // Clean up the timer when component unmounts or when isLoading changes
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      {
        showTVske ? (
          <TVSkeleton />
        ) : (
          <LazyLoad height={100} offset={100} once>
            <Card
              isFooterBlurred
              radius="lg"
              className={`border-none rounded-lg bg-transparent w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden `}
            >
              <iframe
                src={`${data?.url}?autoplay=0`}
                className="w-full h-full"
                title={data?.title}
                allow="autoplay; encrypted-media"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allowFullScreen
                aria-label="Video Player"
              ></iframe>

              {/* Footer Section */}
              <CardFooter className="before:bg-white/10 border-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xs ml-1 z-10">
                <div className="w-full h-full">
                  <h5 className="text-[1rem] custom-header text-[#ffffff]">
                    {formatDuration(data?.duration)}
                  </h5>
                  <div>
                    <p className="w-full text-sm p-text text-white line-clamp-2">
                      {data?.title}
                    </p>
                  </div>
                </div>
              </CardFooter>

              {/* Invisible Overlay for Navigation */}
              <div
                onClick={() => handleDetailNavigation(data?.id)}
                className="bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
                aria-label={`Go to detail page for ${data?.title}`}
              ></div>
            </Card>
          </LazyLoad>
        )
      }
    </>
  )
}

export default React.memo(HomeVideoPageChild);