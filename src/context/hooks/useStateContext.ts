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
    img_path:string;
};



export const useStateContext = () => {
    const [searchVideos, setSearchVideos] = useState<DataType[] | undefined>([]);

    const [typePage, setTypePage] = useState<string>('Video');
    const [genCurrentPage, setGenCurrentPage] = React.useState<string>("");
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);

    const [mostView, setMostView] = useState<boolean>(false);
    const [popular, setPopular] = useState<boolean>(false);
    const [topRates, setTopRates] = useState<boolean>(false);
    const [topVid, setTopVid] = useState<string>('');

    // mobile sidebar
    const [isOpen, setIsOpen] = useState(false);


    return {
        searchVideos, setSearchVideos,
        typePage, setTypePage,
        genCurrentPage, setGenCurrentPage,
        currentPage, setCurrentPage,
        totalPage, setTotalPage,

        mostView, setMostView,
        popular, setPopular,
        topRates, setTopRates,
        topVid, setTopVid,
        
        isOpen, setIsOpen
    };
};
