// Ensure react-lazyload is installed
// npm install react-lazyload
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardFooter } from '@nextui-org/react';
import { GoDotFill } from 'react-icons/go';
import { MovieDataType } from '../../types/MovieType';
import { ActressType } from '../../types/ActressTypes';
import { formatDuration } from '../../utils/formatDuration';


type HomeVideoPageChildProps = {
    data: MovieDataType;
    actData: ActressType | ActressType[] | string;
};

const VideoCard: React.FC<HomeVideoPageChildProps> = ({ data, actData }) => {
    /**
     * @Router
     */
    const router = useNavigate();

    /**
     * 
     * @returns get actress name
     */
    const getActressName = (): string | null => {
        if (!actData) return null;
        if (typeof actData === 'string') return actData;
        if (Array.isArray(actData)) {
            return actData.length > 0 ? actData[0].name : null;
        }
        return actData.name;
    };
    const actress = getActressName();

    /**
     *
     * @returns handle detail navigation
     */
    const handleDetailNavigation = useCallback((id: number) => {
        router(`/videos/${id}`);
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Enables smooth scrolling
        });
    }, [router]);

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none rounded-lg bg-transparent w-full h-[250px] overflow-hidden"
        >
            <img
                src={data?.thumbnail_url}
                alt={data?.title}
                className=' w-full h-full object-fill'
                loading='lazy'
            />

            <CardFooter className="before:bg-white/10 bg-black/30 border-white/10 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xs ml-1 z-10">
                <div className="w-full h-full">
                    <div className="flex justify-between">
                        <h5 className="text-sm roboto font-normal text-[var(--white)]">{formatDuration(data?.duration)}</h5>
                        {actress === null ? (
                            <span className="flex items-center gap-x-1">
                                <GoDotFill className="text-red-500" />
                                <span className="text-xs text-[var(--white)] open-sans font-bold">unknown</span>
                            </span>


                        ) : (
                            <span className="flex items-center gap-x-1">
                                <GoDotFill className="text-green-400" />
                                <span className="text-xs text-[var(--white)] open-sans font-bold">{actress}</span>
                            </span>
                        )}
                    </div>
                    <p className="text-xs poppins font-normal text-white line-clamp-1">{data?.description}</p>
                </div>
            </CardFooter>

            <div
                onClick={() => handleDetailNavigation(data?.id)}
                className="absolute inset-0 cursor-pointer"
                aria-label={`Go to detail page for ${data?.title}`}
            ></div>
        </Card>
    );
};

export default React.memo(VideoCard);
