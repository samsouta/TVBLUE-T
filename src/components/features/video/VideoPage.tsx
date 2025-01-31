import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';
import RecommentForYou from '../home/RecommentForYou';
import MoviesWithGenre from '../MoviesWithGenre/MoviesWithGenre';
import { FaArrowAltCircleUp } from 'react-icons/fa';

import FindVideoWithTags from '../MoviesWithTags/FindVideoWithTags';
import ExoOutstreamVideo from '../../ads/EXoClick/ExoOutstreamVideo';
import ExoPcBanner from '../../ads/EXoClick/ExoPcBanner';
import ExoMixbanner from '../../ads/EXoClick/ExoMixbanner';
import RandomVideo from '../home/RandomVideo';

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

            <FindVideoWithTags isTag='creampie' />

            {/* // ads/ */}
            <ExoOutstreamVideo />
            {/* ads------- */}

            <FindVideoWithTags isTag='Bondage' />



            {/* ads  */}
            <div className=' flex justify-center' >
                <ExoPcBanner />
            </div>
            {/* ads */}

            <MoviesWithGenre
                isGenre={'Chinese AV'}
            />

            <MoviesWithGenre
                isGenre={'uncensored'}
            />

            {/* ads */}
            <ExoMixbanner />
            {/* ads end */}

            <FindVideoWithTags isTag='tight pussy' />

            <FindVideoWithTags isTag='Cosplay' />

            <FindVideoWithTags isTag='Big ass' />

            <FindVideoWithTags isTag='Romantic' />

            <MoviesWithGenre
                isGenre={'censored'}
            />

            <RandomVideo/>


            {
                location.pathname === '/home' &&
                <div
                    className=' md:hidden flex flex-col gap-y-4 justify-center items-center'
                    onClick={handletotop}
                >
                    <span className=' text-md text-[var(--soft-blue)]' >Go Up / အပါ်ဆုံးသို့ပြန်သွားမယ်</span>
                    <FaArrowAltCircleUp className=' text-4xl cursor-pointer   text-[var(--white)] ' />
                </div>
            }

        </div>
    );
};

export default VideoPage;
