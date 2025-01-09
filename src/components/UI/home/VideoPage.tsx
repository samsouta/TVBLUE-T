import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';
import RecommentForYou from '../TypeOfVideoPage/RecommentForYou';
import MoviesWithGenre from '../TypeOfVideoPage/MoviesWithGenre';
import { FaArrowAltCircleUp } from "react-icons/fa";

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
        <div className='flex flex-col gap-y-28'>

            <RecommentForYou />

            <MoviesWithGenre
                isGenre={'uncensored'}
            />

            <MoviesWithGenre
                isGenre={'uncensoredleaked'}
            />

            <MoviesWithGenre
                isGenre={'chinese'}
            />
            <MoviesWithGenre
                isGenre={'bigass'}
            />
            <MoviesWithGenre
                isGenre={'s-cute'}
            />
            <MoviesWithGenre
                isGenre={'censored'}
            />



            {
                location.pathname === '/' &&
                <div
                    className=' md:hidden'
                    onClick={handletotop}
                >
                    <FaArrowAltCircleUp className=' text-4xl text-[var(--white)] fixed z-50 bottom-10 right-10' />
                </div>
            }

        </div>
    );
};

export default VideoPage;
