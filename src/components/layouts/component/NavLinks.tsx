import React from 'react'
import { useGetAllgenreQuery } from '../../../services/api/genre';
import { GenreDataType } from '../../../types/GenreType';
import NavLinkBtn from '../../UI/NavLinkBtn';



const NavLinks: React.FC = () => {

  // Fetch genres using the query hook
  const { data } = useGetAllgenreQuery();
  const genreList = data?.data as GenreDataType[];



  return (
    <div className="flex items-center gap-4 lg:gap-6">
      {genreList?.map((gen) => (
        <NavLinkBtn
          key={gen?.id}
          name={gen?.name}
          tag={gen?.sub_genres}
        />
      ))}
    </div>
  )
}

export default NavLinks
