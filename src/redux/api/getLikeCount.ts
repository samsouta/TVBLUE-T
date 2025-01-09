import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



type Prop = {
    like_count:number
};

export const getLikeCount = createApi({
    reducerPath: "likecount",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),

    endpoints: (builder) => ({
        getLikeCount: builder.query<Prop, number>({
            query: (id) => `/movie/${id}/like-count`,
        }),
    })
});

export const { useGetLikeCountQuery } = getLikeCount;
