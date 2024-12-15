import React, { useCallback, useContext, useEffect, useState } from 'react'
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
    
    // component load တုန်းက localStorage မှာရှိတဲ့ currentPage ကို set လုပ်ပါ
    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setCurrentPage(parseInt(savedPage));
        }
    }, [setCurrentPage]);

    const handlePageChange = useCallback((newPage: number) => {
        localStorage.setItem('currentPage', newPage.toString());
        setCurrentPage(newPage);
        window.scrollTo({
            top: 600,
            behavior: 'smooth',
        });
        if (!isLoading) {
            setShowTVLoad(true);
            const timer = setTimeout(() => {
                setShowTVLoad(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [setCurrentPage, isLoading]);


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