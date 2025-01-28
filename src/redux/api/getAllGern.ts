import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenreDataType } from '../../types/GenreDataType';


interface GenresResponse {
    status: string;
    data: GenreDataType[];
}


export const GetAllGenre = createApi({
    reducerPath : "getallgenre",
    baseQuery : fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/v1/"
    }),
    endpoints: (builder) => ({
        getAllgenre: builder.query<GenresResponse, void>({
            query: () => 'genres',
        }),
    })

})

export const {useGetAllgenreQuery} = GetAllGenre;