import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Card, CardFooter } from '@nextui-org/react';
import { formatDuration } from '../../../utils/formatDuration';
import TVSkeleton from '../loader/TVSkeleton';
type DataType = {
    id: number;
    title: string;
    description: string;
    posted_date: string;
    genre: string;
    duration: string;
    view_count: string;
    rating_count: string;
    rating_total: string;
    url: string;
    img_path: string;
}
type RelatedVideoProps = {
    data: DataType;
    isLoading: boolean;
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const RelatedVideo: React.FC<RelatedVideoProps> = ({ isLoading, data, setIsProcessing }) => {
    const [showTVske, setShowTVske] = useState(false);

    const nav = useNavigate();
    const HomeDetailHandle = useCallback((vid: number) => {
        nav(`/videos/${vid}`);
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, 3000);
    }, [nav, setIsProcessing]);

    useEffect(() => {
        if (!isLoading) {
            setShowTVske(true);
            const timer = setTimeout(() => {
                setShowTVske(false);
            }, 3000);

            // Clean up the timer when component unmounts or when isLoading changes
            return () => clearTimeout(timer);
        }
    }, [isLoading]);


    return (
        <div>
            {
                showTVske ? (
                    <TVSkeleton />
                ) : (
                    <LazyLoad height={100} offset={100} once>
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className={`border-none rounded-lg bg-transparent w-full h-[150px] sm:h-[200px] lg:h-[250px] overflow-hidden `}
                        >
                            <img className=' w-full h-full object-fill' src={data?.img_path} alt={data?.title} />

                            {/* Footer Section */}
                            <CardFooter className="before:bg-white/10 border-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xs ml-1 z-10">
                                <div className="w-full h-full">
                                    <h5 className="lg:text-[1rem] text-[12px] custom-header text-[#ffffff]">
                                        {formatDuration(data?.duration)}
                                    </h5>
                                    <div>
                                        <p className="w-full text-[10px] lg:text-sm p-text text-white line-clamp-1">
                                            {data?.title}
                                        </p>
                                    </div>
                                </div>
                            </CardFooter>

                            {/* Invisible Overlay for Navigation */}
                            <div
                                onClick={() => HomeDetailHandle(data?.id)}
                                className="bg-transparent w-full h-full absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
                                aria-label={`Go to detail page for ${data?.title}`}
                            ></div>
                        </Card>
                    </LazyLoad >
                )
            }
        </div >
    )
}

export default React.memo(RelatedVideo);