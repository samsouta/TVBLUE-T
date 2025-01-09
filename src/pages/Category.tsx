import React, { useContext } from 'react'
import Pangination from '../components/UI/pangination/Pangination'
import { useGetVidPageQuery } from '../redux/api/getVideoPage'
import { StateContext } from '../context/StateContext';
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild';
import TvLoader from '../components/UI/loader/TvLoader';


const Category: React.FC = () => {

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { genCurrentPage, currentPage, setCurrentPage } = context;
    const { data, isLoading } = useGetVidPageQuery({ genre: genCurrentPage, page: currentPage })
    const vid = data?.data
    const vidMeta = data?.meta


    if (isLoading) return <TvLoader />;
    return (
        <div className="mt-24 mx-1 lg:mx-4">
            <div className='flex justify-center items-center'>
                <h1 className='text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display'>
                    {genCurrentPage}
                </h1>
            </div>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {
                    vid?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                        />
                    ))
                }
            </div>
            <Pangination
                lastPage={vidMeta?.last_page}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default Category