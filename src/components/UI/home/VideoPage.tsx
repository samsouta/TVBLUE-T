import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';
import RecommentForYou from '../TypeOfVideoPage/RecommentForYou';
import MoviesWithGenre from '../TypeOfVideoPage/MoviesWithGenre';
import { FaArrowAltCircleUp } from 'react-icons/fa';

import TrafficNative from '../../ads/trafficstar/trafficNative';
import ExoOutstreamVideo from '../../ads/EXoClick/ExoOutstreamVideo';
import ExoMixbanner from '../../ads/EXoClick/ExoMixbanner';
import ExoPcBanner from '../../ads/EXoClick/ExoPcBanner';

const VideoPage: React.FC = () => {
    const location = useLocation();
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { setCurrentPage } = context;

    useEffect(() => {

        if (location.pathname === '/home') {
            localStorage.removeItem('currentPage');
            localStorage.removeItem('NewReleaseCurrentPage');
            localStorage.removeItem('TradingCurrentPage');
            setCurrentPage(1);
        }
    }, [location.pathname, setCurrentPage]);

    const handletotop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    return (
        <div className='flex flex-col gap-y-12'>

            <RecommentForYou />
            {/* // ads/ */}
            <ExoOutstreamVideo />
            {/* ads------- */}
            <MoviesWithGenre
                isGenre={'uncensored'}
            />

            <MoviesWithGenre
                isGenre={'uncensoredleaked'}
            />

            {/* ads  */}
            <div className=' flex justify-center' >
            <ExoPcBanner />
            </div>
            {/* ads */}

            <MoviesWithGenre
                isGenre={'chinese'}
            />

            {/* ads */}
            <ExoMixbanner />
            {/* ads end */}

            <MoviesWithGenre
                isGenre={'bigass'}
            />


            <MoviesWithGenre
                isGenre={'s-cute'}
            />


            <MoviesWithGenre
                isGenre={'censored'}
            />

            <MoviesWithGenre
                isGenre={'LinaMigurrt'}
            />


            {
                location.pathname === '/home' &&
                <div
                    className=' md:hidden flex flex-col gap-y-4 justify-center items-center'
                    onClick={handletotop}
                >
                    <span className=' text-xl text-white' >Go Up / အပါ်ဆုံးသို့ပြန်သွားမယ်</span>
                    <FaArrowAltCircleUp className=' text-4xl cursor-pointer   text-[var(--white)] ' />
                </div>
            }

        </div>
    );
};

export default VideoPage;
