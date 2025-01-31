import React from 'react'
import GenreButton from '../../../UI/catagoryBtn/GenreButton';
import { GenreDataType } from '../../../../types/GenreDataType';
import { useGetAllgenreQuery } from '../../../../services/api/Genre/getAllGern';


const NavLinks: React.FC = () => {

  // Fetch genres using the query hook
  const { data } = useGetAllgenreQuery();
  const genreList = data?.data as GenreDataType[];



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
