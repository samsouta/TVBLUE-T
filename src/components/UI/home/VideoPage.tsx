import React, { useContext, useEffect, useState } from 'react';
import HomeVideoPageChild from './HomeVideoPageChild';
import TvLoader from '../loader/TvLoader';
import { useGetallVidQuery, useGetGenChineseQuery, useGetGenCutesiroQuery, useGetGenJavUnQuery, useGetGenpremiumavQuery, useGetGenRussiaQuery } from '../../../redux/api/getVideoPage';
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { formatGenre } from '../../../utils/formatGenre';
import { StateContext } from '../../../context/StateContext';

const VideoPage: React.FC = () => {
    const nav = useNavigate();
    const location = useLocation();
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { setCurrentPage } = context;
    // Ramdom
    const { data: allvid, isLoading: allvidLoading } = useGetallVidQuery(1);
    //
    const { data: chinese, isLoading: chineseLoading } = useGetGenChineseQuery(1);
    const { data: unjav, isLoading: unjavLoading } = useGetGenJavUnQuery(1);
    const { data: russia, isLoading: russiaLoading } = useGetGenRussiaQuery(1);
    const { data: cutesiro, isLoading: cutesiroLoading } = useGetGenCutesiroQuery(1);
    const { data: premiumav, isLoading: premiumavLoading } = useGetGenpremiumavQuery(1);
    // loading
    const isLoading =
        chineseLoading ||
        unjavLoading ||
        russiaLoading ||
        cutesiroLoading ||
        premiumavLoading ||
        allvidLoading;
    // data
    const allRamdom = allvid?.data
    const vidChinese = chinese?.data;
    const vidUnjav = unjav?.data;
    const vidRussia = russia?.data
    const vidCuteSiro = cutesiro?.data
    const vidPremiumav = premiumav?.data

    const HandleMoreVid = (gen: string) => {
        nav(`/${gen}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const HandleAllVid = () => {
        nav(`/random`)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        if (location.pathname === '/') {
            localStorage.removeItem('currentPage');
            setCurrentPage(1);
        }
    }, [location.pathname, setCurrentPage]);

    if (isLoading) return <TvLoader />;

    return (
        <div className='flex flex-col gap-y-28'>
            {/* Chinese */}
            <div className="">
                <div className='flex justify-between items-center'>
                    <h1 className='text-[var(--light-blue)] my-2 text-2xl lg:text-4xl playfair-display'>
                        {vidChinese && vidChinese[0] ? formatGenre(vidChinese[0]?.genre) : 'Loading...'}
                    </h1>
                    <span onClick={() => HandleMoreVid(vidChinese && vidChinese[0] ? vidChinese[0]?.genre : '')}
                        className='text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center'>
                        <span className='montserrat font-normal lg:text-xl text-md'>More</span>
                        <FaArrowRight className=' text-xs' />
                    </span>
                </div>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {vidChinese?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={chineseLoading}
                        />
                    ))}
                </div>
            </div>

            {/* Jav Unce */}
            <div className="">
                <div className='flex justify-between items-center'>
                    <h1 className='text-[var(--light-blue)] my-2 text-2xl lg:text-4xl playfair-display'>
                        {vidUnjav && vidUnjav[0] ? formatGenre(vidUnjav[0]?.genre) : 'Loading...'}
                    </h1>
                    <span onClick={() => HandleMoreVid(vidUnjav && vidUnjav[0] ? vidUnjav[0]?.genre : '')}
                        className='text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center'>
                        <span className='montserrat font-normal lg:text-xl text-md'>More</span>
                        <FaArrowRight className=' text-xs' />
                    </span>
                </div>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {vidUnjav?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={unjavLoading}
                        />
                    ))}
                </div>
            </div>

            {/* Russia */}
            <div className="">
                <div className='flex justify-between items-center'>
                    <h1 className='text-[var(--light-blue)] my-2 text-2xl lg:text-4xl playfair-display'>
                        {vidRussia && vidRussia[0] ? formatGenre(vidRussia[0]?.genre) : 'Loading...'}
                    </h1>
                    <span onClick={() => HandleMoreVid(vidRussia && vidRussia[0] ? vidRussia[0]?.genre : '')}
                        className='text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center'>
                        <span className='montserrat font-normal lg:text-xl text-md'>More</span>
                        <FaArrowRight className=' text-xs' />
                    </span>
                </div>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {vidRussia?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={unjavLoading}
                        />
                    ))}
                </div>
            </div>

            {/* CuteSiRo */}
            <div className="">
                <div className='flex justify-between items-center'>
                    <h1 className='text-[var(--light-blue)] my-2 text-2xl lg:text-4xl playfair-display'>
                        {vidCuteSiro && vidCuteSiro[0] ? formatGenre(vidCuteSiro[0]?.genre) : 'Loading...'}
                    </h1>
                    <span onClick={() => HandleMoreVid(vidCuteSiro && vidCuteSiro[0] ? vidCuteSiro[0]?.genre : '')}
                        className='text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center'>
                        <span className='montserrat font-normal lg:text-xl text-md'>More</span>
                        <FaArrowRight className=' text-xs' />
                    </span>
                </div>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {vidCuteSiro?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={unjavLoading}
                        />
                    ))}
                </div>
            </div>

            {/* premiunAV */}
            <div className="">
                <div className='flex justify-between items-center'>
                    <h1 className='text-[var(--light-blue)] my-2 text-2xl lg:text-4xl playfair-display'>
                        {vidPremiumav && vidPremiumav[0] ? formatGenre(vidPremiumav[0]?.genre) : 'Loading...'}
                    </h1>
                    <span onClick={() => HandleMoreVid(vidPremiumav && vidPremiumav[0] ? vidPremiumav[0]?.genre : '')}
                        className='text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center'>
                        <span className='montserrat font-normal lg:text-xl text-md'>More</span>
                        <FaArrowRight className=' text-xs' />
                    </span>
                </div>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {vidPremiumav?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={unjavLoading}
                        />
                    ))}
                </div>
            </div>

            {/* Ramdomly */}
            <div className="">
                <div className='flex justify-between items-center'>
                    <h1 className='text-[var(--light-blue)] my-2 text-2xl lg:text-4xl playfair-display'>
                        Randomly
                    </h1>
                    <span onClick={HandleAllVid}
                        className='text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center'>
                        <span className='montserrat font-normal lg:text-xl text-md'>More</span>
                        <FaArrowRight className=' text-xs' />
                    </span>
                </div>
                <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                    {allRamdom?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={unjavLoading}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
