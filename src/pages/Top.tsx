import React, { useContext } from 'react'
import { StateContext } from '../context/StateContext';
import { useGetMostViewsQuery } from '../redux/api/getMostView';
import TopChild from '../components/UI/top/TopChild';
import { useParams } from 'react-router-dom';

const Top: React.FC = () => {
    const { title } = useParams();
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { topVid } = context;
    const { data, isLoading, error } = useGetMostViewsQuery(topVid);
    const errorToPass: null | undefined = error ? null : undefined;

    return (
        <div className='mt-28 px-2'>
            <div className='flex justify-center mb-6'>
                <h1 className='text-4xl text-[var(--light-blue)] merriweather-black'>{title}</h1>
            </div>
            <div className="flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    data?.data.map((item) => (
                        <TopChild
                            key={item?.id}
                            data={item}
                            isLoading={isLoading}
                            error={errorToPass}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Top;
