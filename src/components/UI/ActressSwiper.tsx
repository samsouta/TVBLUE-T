import { Avatar } from '@nextui-org/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetAllActressQuery } from '../../services/api/actress';
import { GoDotFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const ActressSwiper: React.FC = () => {
    /**
     * router
     */
    const navigate = useNavigate();

    /**
     * @fetch side data
     */
    const { data, isLoading } = useGetAllActressQuery();
    const actresses = data?.data || [];
    const popularActresses = actresses.filter(actress => actress.is_popular === true);

    /**
     * 
     * @param actress handle actress click
     */
    const handleActressClick = (id: number) => {
        navigate(`/act/${id}`);
    };



    return (
        <div>
            {isLoading ? (
                <div className="flex space-x-4 overflow-hidden">
                    {Array(6).fill(0).map((_, index) => (
                        <div key={index} className="animate-pulse flex flex-col items-center space-y-2 p-4">
                            <div className="bg-gray-300 rounded-full w-40 h-40"></div>
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    breakpoints={{
                        320: { slidesPerView: 3, spaceBetween: 20 },
                        1024: { slidesPerView: 6, spaceBetween: 30 },
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {popularActresses.map((actress, index) => (
                        <SwiperSlide
                            key={actress?.id || index}
                            className="cursor-pointer"
                            onClick={() => handleActressClick(actress.id)}
                        >
                            <div className="relative flex flex-col items-center justify-center py-4">
                                <Avatar
                                    isBordered
                                    color="success"
                                    size="lg"
                                    src={actress.image_url || undefined}
                                    name={actress.name || undefined}
                                    className="w-40 h-40 hover:scale-105 transition-transform"
                                    style={{ objectPosition: 'top', objectFit: 'fill' }}
                                />
                                <p className="mt-2 text-[var(--light-blue)] merriweather-regular text-md">
                                    <i className='flex items-center gap-x-1'>
                                        <GoDotFill className='text-md text-green-400' />
                                        <span className=' text-md font-medium raleway'>{actress.name}</span>
                                    </i>
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>

    )
}

export default ActressSwiper