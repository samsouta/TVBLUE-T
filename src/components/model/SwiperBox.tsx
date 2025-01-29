import { Avatar } from '@nextui-org/react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useGetActressQuery } from '../../redux/api/actress/getActress';
import { GoDotFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const SwiperBox: React.FC = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetActressQuery();
    const actresses = data?.data || [];
    const popularActresses = actresses.filter(actress => actress.is_popular === true);

    const handleActressClick = (actress: { id: number; name: string }) => {
        const formattedName = actress.name.toLowerCase().replace(/\s+/g, '');
        navigate(`/actress/${actress.id}/${formattedName}`);
    };

    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {popularActresses.map((actress, index) => (
                    <SwiperSlide
                        key={actress?.id || index}
                        className="cursor-pointer"
                        onClick={() => handleActressClick(actress)}
                    >
                        <div className="relative flex flex-col items-center justify-center py-4">
                            <Avatar
                                isBordered
                                color="success"
                                size="lg"
                                src={actress.image_url || undefined}
                                name={actress.name || undefined}
                                className="w-40 h-40 hover:scale-105 transition-transform"
                                style={{objectPosition: 'top' , objectFit: 'fill'}}
                            />
                            <p className="mt-2 text-[var(--light-blue)] merriweather-regular text-md">
                                <i className='flex items-center gap-x-1'>
                                    <GoDotFill className='text-md text-green-400' />
                                    <span>{actress.name}</span>
                                </i>
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SwiperBox