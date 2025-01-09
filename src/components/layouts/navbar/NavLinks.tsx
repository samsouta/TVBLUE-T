import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';
import GenreButton from './catagoryBtn/GenreButton';
import { GenreDataType } from '../../../types/GenreDataType';
import { useGetAllgenreQuery } from '../../../redux/api/getAllGern';


const NavLinks: React.FC = () => {
  const nav = useNavigate();

  // Fetch genres using the query hook
  const { data, isLoading, isError } = useGetAllgenreQuery();
  const genreList = data?.data as GenreDataType[];


  const context = useContext(StateContext);
  if (!context) {
    throw new Error('StateContext not found');
  }
  const { setTopVid } = context;

  const handleSidebar = (path: string, text: string) => {
    const formattedPath = path.split('/').pop();
    const formattedText = text.toLocaleLowerCase();

    if (formattedText === "home") {
      nav('/');
    } else if (formattedText === 'contact') {
      nav('/contact');
    } else if (formattedPath) {
      nav(`/home/${formattedPath}`);
      setTopVid(formattedPath);
    } else {
      console.error("Formatted path is undefined");
    }
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      {genreList?.map((gen) => (
        <GenreButton
          key={gen?.id}
          name={gen?.name}
          tag={gen?.sub_genres}
        />
      ))}
    </div>
  )
}

export default NavLinks
