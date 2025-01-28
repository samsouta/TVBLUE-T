import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  MovieResponseType } from '../../../types/MovieDataType';


interface GenresResponse {
    status: string;
    data: MovieResponseType;
}
type TagsPorp = {
    tag: string;
    page: number;
}


export const getTagVideo = createApi({
    reducerPath : "tagVideo",
    baseQuery : fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/v1/"
    }),
    endpoints: (builder) => ({
        findTagsVideo: builder.query<GenresResponse, TagsPorp>({
            query: ({tag,page}) => `mov/by-tag?tag=${tag}&page=${page}`,
        }),
    })

})

export const {useFindTagsVideoQuery} = getTagVideo;