import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface GenresResponse {
    genres: string[];
}


export const GetAllGenre = createApi({
    reducerPath : "getallgenre",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),
    endpoints: (builder) => ({
        getAllgenre: builder.query<GenresResponse, void>({
            query: () => '/genres',
        }),
    })

})

export const {useGetAllgenreQuery} = GetAllGenre;