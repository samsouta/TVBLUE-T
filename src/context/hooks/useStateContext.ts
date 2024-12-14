import React, { useState } from "react";

type DataType = {
    id: number;
    title: string;
    description: string;
    posted_date: string;
    genre: string;
    duration: string;
    view_count: string;
    rating_count: string;
    rating_total: string;
    url: string;
  };
type VideoProp = {
    videos: DataType[];
    setVideos: React.Dispatch<React.SetStateAction<DataType[]>>;
}


export const useStateContext = () => {
    const [videos, setVideos] = useState<VideoProp[]>([]);
    const [currentPage,setCurrentPage] = useState<number>(1)
    const [typePage, setTypePage] = useState<string>('Video');
    const [genCurrentPage, setGenCurrentPage] = React.useState<React.Key>("All");
    const [totalPage,setTotalPage] = useState<number>(0);

    const [mostView, setMostView] = useState<boolean>(false);
    const [popular, setPopular] = useState<boolean>(false);
    const [topRates, setTopRates] = useState<boolean>(false);
    const [topVid, setTopVid] = useState<string>('');

    return {
        videos, setVideos,
        typePage, setTypePage,
        genCurrentPage, setGenCurrentPage,
        totalPage,setTotalPage,

        mostView, setMostView,
        popular, setPopular,
        topRates, setTopRates,
        topVid, setTopVid,
        currentPage,setCurrentPage

    };
};
