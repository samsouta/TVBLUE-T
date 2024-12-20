import React, { useContext } from 'react'
import { StateContext } from '../context/StateContext';
import { useGetMostViewsQuery } from '../redux/api/getMostView';
import { useParams } from 'react-router-dom';
import HomeVideoPageChild from '../components/UI/home/HomeVideoPageChild';

type DataType = {
    id: number;
    description: string;
    posted_date: string;
    rating_count: string;
    rating_total: string;
    title: string;
    url: string;
    img_path: string;
    view_count: string;
    duration: string;
  }

const Top: React.FC = () => {
    const { title } = useParams();
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { topVid } = context;
    const { data, isLoading, error } = useGetMostViewsQuery(topVid);
    const vid = data?.data || [] as DataType[]
    const errorToPass: null | undefined = error ? null : undefined;

    return (
        <div className='mt-28 px-2'>
            <div className='flex justify-center mb-6'>
                <h1 className='text-4xl text-[var(--light-blue)] merriweather-black'>{title}</h1>
            </div>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {
                    vid.map((item) => (
                        <HomeVideoPageChild
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
