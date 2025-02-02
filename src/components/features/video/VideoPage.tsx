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
import ExoRecomCPM from '../../ads/EXoClick/ExoRecomCPM';
import ExoMBannerCPM from '../../ads/EXoClick/ExoMBannerCPM';
import ExoMobileBanner from '../../ads/EXoClick/ExoMobileBanner';

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

            {/* ADS ZONE */}
            {/* Mobile */}
            <div>
            <div className=' w-full flex flex-wrap justify-center' >
                <ExoMBannerCPM />
            </div>
            </div>
            {/* ADS END  */}

            <FindVideoWithTags isTag='creampie' />

            {/* // ads/ */}
            <div className='block md:hidden' >
                <ExoOutstreamVideo />
            </div>
            {/* ads------- */}

            <FindVideoWithTags isTag='Bondage' />

            {/* ads */}
            <div className=' block xl:hidden' >
            <ExoRecomCPM />
            </div>
            {/* ads end */}


            {/* ads  */}
                <div className=' hidden xl:hidden' >
                <div className=' flex justify-center' >
                    <ExoPcBanner />
                </div>
                </div>
            
            {/* ads */}

            <MoviesWithGenre
                isGenre={'Chinese AV'}
            />
            {/* ADS ZONE */}
            {/* Mobile */}
            <div className=' w-full flex flex-wrap justify-center' >
                <ExoMobileBanner />
            </div>
            {/* ADS END  */}

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

            <RandomVideo />


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
