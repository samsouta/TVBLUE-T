import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { formatGenre } from '../utils/formatGenre'
import { useGetVidPageQuery } from '../redux/api/getVideoPage'
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild'
import Pangination from '../components/UI/pangination/Pangination'
import { StateContext } from '../context/StateContext'

const MoreVid: React.FC = () => {
    const { genre } = useParams()
     const context = useContext(StateContext);
        if (!context) {
            throw new Error('StateContext not found');
        }
        const {currentPage, setCurrentPage } = context;

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
    }, [genre]);

    useEffect(() => {
        localStorage.setItem('currentPage', String(currentPage));
    }, [currentPage]);



    const { data, isLoading } = useGetVidPageQuery({ genre, page: currentPage });
    const genData = data?.data
    const genMeta = data?.meta

    return (
        <div className="mt-24 mx-1 lg:mx-4">
            <div className='flex justify-center items-center'>
                <h1 className='text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display'>
                    {formatGenre(genre)}
                </h1>
            </div>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {
                    genData?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={isLoading}
                        />
                    ))
                }
            </div>
            <Pangination
                lastPage={genMeta?.last_page}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoading={isLoading}
            />
        </div>
    )
}

export default MoreVid
