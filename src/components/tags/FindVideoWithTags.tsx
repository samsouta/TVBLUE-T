import React from 'react'
import { useFindTagsVideoQuery } from '../../redux/api/home/getTagVideo';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import TVSkeleton from '../UI/loader/TVSkeleton';
import HomeVideoPageChild from '../UI/home/HomeVideoPageChild';

type TagProps = {
    isTag: string;
};

const FindVideoWithTags: React.FC<TagProps> = ({isTag}) => {
    const { data, isLoading } = useFindTagsVideoQuery({ tag: isTag || '', page: 1 });
    const videos = data?.data?.data || [];
    const nav = useNavigate();

    const handleMoreVid = () => {
        nav(`/tags/${isTag}`);
        // Save genre to localStorage
        localStorage.setItem('selectedTag', isTag);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div>
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                    {isTag}
                </h1>
                <span
                    onClick={handleMoreVid}
                    className="text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center"
                >
                    <span className="montserrat font-bold lg:text-xl text-md">ပိုမိုကြည့်ရန်/More</span>
                    <FaArrowRight className="text-sm md:text-lg" />
                </span>
            </div>

            {/* Video Grid Section */}
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {isLoading ? (
                    // Show skeleton loader when loading
                    <>
                        {[...Array(10)].map((_, index) => (
                            <TVSkeleton key={index} />
                        ))}
                    </>
                ) : (
                    // Render videos when data is available
                    videos.map((item) => (
                        <HomeVideoPageChild key={item?.id} data={item} />
                    ))
                )}
            </div>
        </div>
    )
}

export default FindVideoWithTags