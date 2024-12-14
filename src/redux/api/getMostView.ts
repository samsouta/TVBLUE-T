import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type DataType = {
    id: number;
    title: string;
    description: string;
    genre: string;
    duration: string;
    posted_date: string;
    rating_count: string;
    rating_total: string;
    url: string;
    view_count: string;
};

type Prop = {
    data: DataType[];
};

export const getMostView = createApi({
    reducerPath: "mostviews",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),

    endpoints: (builder) => ({
        getMostViews: builder.query<Prop, string | undefined>({
            query: (path) => `/${path}`,
        }),
    })
});

export const { useGetMostViewsQuery } = getMostView;
