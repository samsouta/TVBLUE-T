import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardFooter } from "@nextui-org/react";
import { formatDuration } from '../../../utils/formatDuration';
import LazyLoad from 'react-lazyload';
import { homeDetail } from '../../../redux/slice/HomeDetailSlice';
import { MovieDataType } from '../../../types/MovieDataType';
import { GoDotFill } from 'react-icons/go';

type HomeVideoPageChildProps = {
  data: MovieDataType;
}

const HomeVideoPageChild: React.FC<HomeVideoPageChildProps> = ({ data }) => {
  const actresses = data?.actresses || [];
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




  return (
    <>

      <LazyLoad height={100} offset={100} once>
        <Card
          isFooterBlurred
          radius="lg"
          className={`border-none rounded-lg bg-transparent w-full h-[150px] sm:h-[200px] lg:h-[250px] overflow-hidden `}
        >
          <img className=' w-full h-full object-fill' src={data?.thumbnail_url} alt={data?.title} />

          {/* Footer Section */}
          <CardFooter className="before:bg-white/10 border-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xs ml-1 z-10">
            <div className="w-full h-full">
              <div className=' flex justify-between' >
                <h5 className="lg:text-[1rem] text-[12px] custom-header text-[#ffffff]">
                  {formatDuration(data?.duration)}
                </h5>
                {actresses.length > 0 && (
                  <span className=" ">
                    <i className='flex items-center gap-x-1'>
                      <GoDotFill className='text-md text-green-400' />
                      <span className='montserrat text-xs lg:text-sm  font-normal text-[var(--dark-blue)]' >{actresses[0].name}</span>
                    </i>
                  </span>
                )}
              </div>
              <div>
                <p className="w-full text-[10px] lg:text-sm p-text text-white line-clamp-1">
                  {data?.description}
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

    </>
  )
}

export default React.memo(HomeVideoPageChild);