import React, { useCallback } from 'react'
import { Pagination } from '@nextui-org/react'

type DataType = {
    lastPage: number | undefined;
    currentPage: number | undefined;
    setCurrentPage: (page: number) => void
}

const Pangination: React.FC<DataType> = ({ lastPage, currentPage, setCurrentPage }) => {

    const handlePageChange = useCallback((newPage: number) => {
        localStorage.setItem('currentPage', newPage.toString());
        setCurrentPage(newPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    }, [setCurrentPage]);


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