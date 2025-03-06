import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenreDataType } from '../../types/GenreType';


interface GenresResponse {
    status: string;
    data: GenreDataType[];
}


export const genre = createApi({
    reducerPath : "gen",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),
    endpoints: (builder) => ({
        
        /**
         * get all genre
         */
        getAllgenre: builder.query<GenresResponse, void>({
            query: () => 'genres',
        }),

    })

})

export const {useGetAllgenreQuery} = genre;