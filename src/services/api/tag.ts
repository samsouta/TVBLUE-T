import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedMovieResponse } from '../../types/MovieType';



interface GenresResponse {
    status: string;
    data: PaginatedMovieResponse;
}
type TagsPorp = {
    tag: string;
    page: number;
}


export const tag = createApi({
    reducerPath : "tags",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1/"
    }),
    endpoints: (builder) => ({
        /**
         * @fetch video by tag
         */
        findTagsVideo: builder.query<GenresResponse, TagsPorp>({
            query: ({tag,page}) => `mov/by-tag?tag=${tag}&page=${page}`,
        }),
    })

})

export const {useFindTagsVideoQuery} = tag;