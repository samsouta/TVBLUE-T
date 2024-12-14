import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type VideoDataType = {
    id:number;
    title:string;
    description:string;
    posted_date:string;
    genre:string;
    duration:string;
    view_count:string;
    rating_count:string;
    rating_total:string;
    url:string;
}

type VideoMetaType = {
    current_page:number;
    from:number;
    last_page:number;
    per_page:number;
    total:number;
}

type VideoProp = {
    data:VideoDataType[]
    meta:VideoMetaType
}

export const GetVideoPage = createApi({
    reducerPath : "getVideoPage",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),
    endpoints: (builder) => ({
        getVidPage: builder.query<VideoProp, void>({
            query: (page) => `/movies?page=${page}`,
        }),
    })

})

export const {useGetVidPageQuery} = GetVideoPage;