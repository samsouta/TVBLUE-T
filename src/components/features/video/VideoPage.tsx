import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';
import RecommentForYou from '../home/RecommentForYou';
import MoviesWithGenre from '../MoviesWithGenre/MoviesWithGenre';

import FindVideoWithTags from '../MoviesWithTags/FindVideoWithTags';
import RandomVideo from '../home/RandomVideo';
import JuNativeAds from '../../ads/juicy/JuNativeAds';
import Ju125x125ImgTitle from '../../ads/juicy/Ju125x125ImgTitle';
import Ju50x150ImgTitle from '../../ads/juicy/Ju50x150ImgTitle';
import JuBanner300x from '../../ads/juicy/JuBanner300x';
import JuLeaderboard from '../../ads/juicy/JuLeaderboard';
import GoUpBtn from '../../UI/GoUp/GoUpBtn';


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
        <>
            <div className='flex flex-col gap-y-12'>


                <RecommentForYou />

                {/* ads  */}
                <div className='' >
                    <JuLeaderboard />
                </div>


                <FindVideoWithTags isTag='creampie' />

                {/* ads */}
                <div className=' z-0 flex justify-around' >
                    <Ju125x125ImgTitle />
                    <Ju50x150ImgTitle/>
                </div>

                <FindVideoWithTags isTag='Bondage' />


                {/* ads  */}
                <div className=' flex justify-center z-0' >
                    <JuNativeAds/>
                </div>


                <MoviesWithGenre
                    isGenre={'Chinese AV'}
                />

                {/* ads  */}
                <div className=' flex justify-center z-0' >
                    <JuBanner300x/>
                </div>


                <MoviesWithGenre
                    isGenre={'uncensored'}
                />



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
                        <span className=' text-md text-[var(--soft-blue)] font-bold' >UP</span>
                        <GoUpBtn/>
                    </div>
                }

            </div>
        </>
    );
};

export default VideoPage;
