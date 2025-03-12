import React from 'react'
import { useGetAllgenreQuery } from '../../../services/api/genre';
import { GenreDataType } from '../../../types/GenreType';
import NavLinkBtn from '../../UI/NavLinkBtn';



const NavLinks: React.FC = () => {

  /**
   * @description Get all genres from the API
   */
  const { data, isLoading } = useGetAllgenreQuery();
  const genreList = data?.data as GenreDataType[];



  return (
    <div className="flex items-center gap-4 lg:gap-6">
      {
        isLoading ? (
          // Loading skeleton placeholders
          [...Array(5)].map((_, index) => (
            <div key={index} className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
          ))
        ) : (
          genreList?.map((gen) => (
            <NavLinkBtn
              key={gen?.id}
              name={gen?.name}
              tag={gen?.sub_genres}
            />
          ))
        )
      }
    </div>
  )
}

export default NavLinks
