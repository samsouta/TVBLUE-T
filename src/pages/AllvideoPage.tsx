import React, { useContext } from 'react'
import { useGetallVidQuery } from '../redux/api/getVideoPage';
import { StateContext } from '../context/StateContext';
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild';
import Pangination from '../components/UI/pangination/Pangination';


const AllvideoPage: React.FC = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { setCurrentPage, currentPage } = context;
    const { data: allvid, isLoading } = useGetallVidQuery(currentPage);
    const allRamdom = allvid?.data
    const allMeta = allvid?.meta

    return (
        <div className="mt-24 mx-1 lg:mx-4">
            <div className='flex justify-center items-center'>
                <h1 className='text-[var(--light-blue)] mb-6 text-4xl lg:text-[60px] lg:text-4xl playfair-display'>
                    All Videos
                </h1>
            </div>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {
                    allRamdom?.map((item) => (
                        <HomeVideoPageChild
                            key={item?.id}
                            data={item}
                            isLoading={isLoading}
                        />
                    ))
                }
            </div>
            <Pangination
                lastPage={allMeta?.last_page}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isLoading={isLoading}
            />
        </div>
    )
}

export default AllvideoPage