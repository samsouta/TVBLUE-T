import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActressType } from '../../types/ActressTypes';
import { MovieResponseType } from '../../types/MovieType';

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


export const actress = createApi({
    reducerPath : "actress",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),
    endpoints: (builder) => ({
        /**
         * @get  all actress data with pagination
         */
        getActress: builder.query<ActressResponse, number>({
            query: (page) => `actresses?page=${page}`,
        }),
        
        /**
         * @get actress name with id
         */
        getAllActress: builder.query<ActressResponse, void>({
            query: () => `act/names/all`,
        }),

        /**
         * @get actress with id
         */
        getActressWithId: builder.query<ActressMoviesWithIdResponse, {id:number , page: number}>({
            query: ({id,page}) => `actresses/${id}?page=${page}`,
        }),
    })

})

export const {useGetActressQuery,useGetActressWithIdQuery,useGetAllActressQuery} = actress;