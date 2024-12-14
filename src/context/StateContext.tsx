import React, { createContext, useMemo } from 'react';
import { useStateContext } from './hooks/useStateContext';

type VideoDataType = {
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

// Define the types for the context data
type StateContextDataType = {
  videos: VideoDataType[];
  setVideos: React.Dispatch<React.SetStateAction<VideoDataType[]>>;
  typePage: string;
  setTypePage: React.Dispatch<React.SetStateAction<string>>;
  genCurrentPage: React.Key;
  setGenCurrentPage: React.Dispatch<React.SetStateAction<React.Key>>;
  totalPage:number;
  setTotalPage:React.Dispatch<React.SetStateAction<number>>;

  mostView: boolean;
  setMostView: React.Dispatch<React.SetStateAction<boolean>>;
  popular: boolean;
  setPopular: React.Dispatch<React.SetStateAction<boolean>>;
  topRates: boolean;
  setTopRates: React.Dispatch<React.SetStateAction<boolean>>;
  topVid: string;
  setTopVid: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const StateContext = createContext<StateContextDataType | undefined>(undefined);

interface StateContextProviderProps {
  children: React.ReactNode;
}

export const StateContextProvider: React.FC<StateContextProviderProps> = ({ children }) => {
  const {
    videos, setVideos,
    typePage, setTypePage,
    genCurrentPage, setGenCurrentPage,
    totalPage,setTotalPage,

    mostView, setMostView,
    popular, setPopular,
    topRates, setTopRates,
    topVid, setTopVid,
    currentPage, setCurrentPage
  } = useStateContext(); // Ensure this hook is implemented correctly

  const data = useMemo(
    () => ({
      videos, setVideos,
      typePage, setTypePage,
      genCurrentPage, setGenCurrentPage,
      totalPage,setTotalPage,

      mostView, setMostView,
      popular, setPopular,
      topRates, setTopRates,
      topVid, setTopVid,
      currentPage, setCurrentPage,
    }),
    [
      videos, setVideos,
      typePage, setTypePage,
      genCurrentPage, setGenCurrentPage,
      totalPage,setTotalPage,

      mostView, setMostView,
      popular, setPopular,
      topRates, setTopRates,
      topVid, setTopVid,
      currentPage, setCurrentPage,
    ]
  );

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export default StateContextProvider;
