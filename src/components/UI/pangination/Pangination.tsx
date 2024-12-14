import React, { useCallback, useContext, useState } from 'react'
import { Pagination } from '@nextui-org/react'
import { useGetVidPageQuery } from '../../../redux/api/getVideoPage'
import { StateContext } from '../../../context/StateContext';
import TvLoader from '../loader/TvLoader';

const Pangination: React.FC = () => {
    const [showTVLoad, setShowTVLoad] = useState(false);
    const { data, isLoading, error } = useGetVidPageQuery();

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { currentPage, setCurrentPage } = context;

    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (!isLoading) {
            setShowTVLoad(true);
            const timer = setTimeout(() => {
                setShowTVLoad(false);
            }, 2000);

            // Clean up the timer when component unmounts or when isLoading changes
            return () => clearTimeout(timer);
        }
    }, [setCurrentPage])

    if (showTVLoad) return <TvLoader />
    if (error) return <p className=' text-red-700 text-xl' >ERROR::* Please refresh page and try again later</p>
    return (
        <>
            {/* // Pagination */}
            <div className={`
                my-10 flex justify-center w-full`
            }>
                <Pagination
                    showControls
                    variant="bordered"
                    total={data?.meta.last_page || 0}
                    initialPage={currentPage}
                    page={currentPage}
                    onChange={handlePageChange}
                    classNames={{
                        cursor: 'text-[#ffffff]  bg-[var(--dark-blue)]',
                        item: " text-[var(--soft-blue)] border-[var(--light-blue)]",
                    }}
                />
            </div>
        </>
    )
}

export default Pangination