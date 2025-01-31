import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActressType } from '../../../types/Actress';
import { MovieResponseType } from '../../../types/MovieDataType';

interface ActressResponse {
    current_page: number;
    data : ActressType[];
    first_page_url: string;
    from: string;
    last_page: string;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: string;
    total: number;
}

type ActressMoviesWithIdResponse = {
    actress: ActressType;  // Changed from array to single object
    movies: {
        current_page: number;
        data: MovieResponseType[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
}


export const getActress = createApi({
    reducerPath : "actress",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),
    endpoints: (builder) => ({
        getActress: builder.query<ActressResponse, number>({
            query: (page) => `actresses?page=${page}`,
        }),
        getAllActress: builder.query<ActressResponse, void>({
            query: () => `act/names/all`,
        }),
        getActressWithId: builder.query<ActressMoviesWithIdResponse, {id:number , page: number}>({
            query: ({id,page}) => `actresses/${id}?page=${page}`,
        }),
    })

})

export const {useGetActressQuery,useGetActressWithIdQuery,useGetAllActressQuery} = getActress;