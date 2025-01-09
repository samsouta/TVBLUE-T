import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieDataType } from '../../types/MovieDataType';

type DataType = {
    status: string;
    message: string;
    data: MovieDataType[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export const SearchEngine = createApi({
    reducerPath: 'searchEngine',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://bluetv.x10.mx/api/v1/',
    }),
    tagTypes: ['search'],
    endpoints: (builder) => ({
        searchVideos: builder.query<DataType, { query: string; page: number }>({
            query: ({ query, page }) => ({
                url: 'search',
                params: { query, page, per_page: 10 },
            }),
            providesTags: ['search'],
        }),
    }),
});

export const { useSearchVideosQuery } = SearchEngine; // Use query hook
