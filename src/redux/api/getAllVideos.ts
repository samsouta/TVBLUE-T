import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type DataType = {
    id: number;
    title: string;
    description: string;
    genre:string;
    duration: string;
    posted_date: string;
    rating_count: string;
    rating_total: string;
    url: string;
    view_count: string;
};

export const getAllVideos = createApi({
    reducerPath: 'getallvideos', // Name of the API slice
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bluetv.x10.mx/api/v1/' }), // Base URL
    endpoints: (builder) => ({
        getAllVideos: builder.query<DataType[], void>({
            query: () => 'allvideos', // Endpoint path for fetching all videos
        }),
    }),
});

export const { useGetAllVideosQuery } = getAllVideos; // Exporting the auto-generated hook
