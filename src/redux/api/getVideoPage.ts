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
    img_path:string;
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
        getVidPage: builder.query<VideoProp, { genre: string | undefined; page?: number }>({
            query: ({ genre, page = 1 }) => `/movies?genre=${genre}&page=${page}`,
        }),
        getallVid: builder.query<VideoProp, number | undefined>({
            query: (page) => `/movies?page=${page}`,
        }),

        //get each other
        getGenChinese: builder.query<VideoProp, number | undefined>({
            query: (page) => `/movies?genre=chinese&page=${page}`,
        }),

        getGenJavUn: builder.query<VideoProp, number | undefined>({
            query: (page) => `/movies?genre=uncensoredjav&page=${page}`,
        }),
        getGenRussia: builder.query<VideoProp, number | undefined>({
            query: (page) => `/movies?genre=russia&page=${page}`,
        }),
        getGenCutesiro: builder.query<VideoProp, number | undefined>({
            query: (page) => `/movies?genre=cutesiro&page=${page}`,
        }),
        getGenpremiumav: builder.query<VideoProp, number | undefined>({
            query: (page) => `/movies?genre=premiumav&page=${page}`,
        }),
    })

})

export const {
    useGetGenChineseQuery,useGetGenJavUnQuery,useGetVidPageQuery,
    useGetGenRussiaQuery,useGetGenCutesiroQuery,useGetGenpremiumavQuery,
    useGetallVidQuery,
} = GetVideoPage;