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
  img_path:string
};

// Define the types for the context data
type StateContextDataType = {
  searchVideos: VideoDataType[] | undefined;
  setSearchVideos: React.Dispatch<React.SetStateAction<VideoDataType[] | undefined>>;
  typePage: string;
  setTypePage: React.Dispatch<React.SetStateAction<string>>;
  genCurrentPage: string;
  setGenCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage:number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

  totalPage: number;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;

  mostView: boolean;
  setMostView: React.Dispatch<React.SetStateAction<boolean>>;
  popular: boolean;
  setPopular: React.Dispatch<React.SetStateAction<boolean>>;
  topRates: boolean;
  setTopRates: React.Dispatch<React.SetStateAction<boolean>>;
  topVid: string;
  setTopVid: React.Dispatch<React.SetStateAction<string>>;

  isOpen:boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

};

export const StateContext = createContext<StateContextDataType | undefined>(undefined);

interface StateContextProviderProps {
  children: React.ReactNode;
}

export const StateContextProvider: React.FC<StateContextProviderProps> = ({ children }) => {
  const {
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
  } = useStateContext(); // Ensure this hook is implemented correctly

  const data = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export default StateContextProvider;
