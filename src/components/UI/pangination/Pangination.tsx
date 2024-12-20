import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Pagination } from '@nextui-org/react'
import TvLoader from '../loader/TvLoader';

type DataType = {
    lastPage: number | undefined;
    currentPage: number | undefined;
    setCurrentPage: (page: number) => void
    isLoading: boolean;
}

const Pangination: React.FC<DataType> = ({ lastPage, currentPage, setCurrentPage, isLoading }) => {
    const [showTVLoad, setShowTVLoad] = useState(false);
    

    const handlePageChange = useCallback((newPage: number) => {
        localStorage.setItem('currentPage', newPage.toString());
        setCurrentPage(newPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (!isLoading) {
            setShowTVLoad(true);
            const timer = setTimeout(() => {
                setShowTVLoad(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [setCurrentPage, isLoading]);


    if (showTVLoad) return <TvLoader />
    return (
        <>
            {/* // Pagination */}
            <div className={`
                my-10 flex justify-center w-full`
            }>
                <Pagination
                    showControls
                    variant="bordered"
                    total={lastPage || 0}
                    initialPage={currentPage}
                    page={currentPage}
                    onChange={(page) => handlePageChange(page)}
                    classNames={{
                        cursor: 'text-[#ffffff]  bg-[var(--dark-blue)]',
                        item: " text-[var(--soft-blue)] border-[var(--light-blue)]",
                    }}
                />
            </div>
        </>
    )
}

export default React.memo(Pangination)