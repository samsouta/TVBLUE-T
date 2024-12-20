import React, { useContext, useEffect, useMemo } from 'react'
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { StateContext } from '../../../context/StateContext';
import { useGetAllVideosQuery } from '../../../redux/api/getAllVideos';
import TvLoader from '../../UI/loader/TvLoader';
import { useGetGenChineseQuery } from '../../../redux/api/getVideoPage';


type DataType = {
  data: string[]
}

const MobileCategoryChild: React.FC<DataType> = ({ data }) => {
  const context = useContext(StateContext);
  const { data: allvid, isLoading: isAllvidLoading, error: allvidError } = useGetAllVideosQuery();
  const { data: vid, isLoading: isVidLoading, error: vidError } = useGetGenChineseQuery();
  if (!context) {
    throw new Error('StateContext not found');
  }
  const { setVideos, genCurrentPage, setCurrentPage, setGenCurrentPage } = context;

  // Memoize filtered videos based on current page and all videos
  const filteredVideos = useMemo(() => {
    if (genCurrentPage === "All") {
      return vid?.data || [];
    }
    return allvid?.filter((movie) => movie.genre === genCurrentPage) || [];
  }, [genCurrentPage, allvid, vid]);
  useEffect(() => {
    if (genCurrentPage === "All") {
      setVideos(vid?.data || []);
      setCurrentPage(vid?.meta?.current_page ?? 1);
    } else {
      setVideos(filteredVideos);
    }
  }, [genCurrentPage, filteredVideos, vid?.data]);

  // Handle loading state
  if (isAllvidLoading || isVidLoading) {
    return <TvLoader />;
  }

  // Handle error state
  if (allvidError || vidError) {
    return <p className="text-red-700 text-3xl">ERROR:: refresh the page and try again</p>;
  }
  return (
    <Breadcrumbs
      maxItems={20}

      size="lg"
      className=' w-full flex-wrap'
      onAction={(key) => setGenCurrentPage(key)}
      classNames={{
        list: "gap-2",
      }}
      itemClasses={{
        item: [
          "px-2 py-0.5 border-small text-[var(--soft-blue)] border-[var(--light-blue)] rounded-small",
          "data-[current=true]:border-[#007c8e] data-[current=true]:bg-[var(--dark-blue)] data-[current=true]:text-[var(--light-blue)] transition-colors",
        ],
        separator: "hidden",
      }}
    >
      {/* Add a custom "All" button */}
      <BreadcrumbItem
        className=' montserrat'
        key="All"
        isCurrent={genCurrentPage === "All"}
      >
        All
      </BreadcrumbItem>

      {/* Render genre buttons */}
      {data?.map((genre) => (
        <BreadcrumbItem
          key={genre}
          className='montserrat'
          isCurrent={genCurrentPage === genre}
        >
          {genre}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}

export default React.memo(MobileCategoryChild);