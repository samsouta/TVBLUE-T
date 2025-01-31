import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const comment = createApi({
    reducerPath : "comment",
    baseQuery : fetchBaseQuery({
        baseUrl: "https://bluetv.x10.mx/api/v1"
    }),
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: ({ id,comment }) => ({
              url: `/movies/${id}/comments`,
              method: "POST",
              body: {comment:comment}, 
            }),
          }),
          getComments: builder.query({
            query: (vidId) => `/movies/${vidId}/comments`, 
          }),
    })

})

export const {usePostCommentMutation , useGetCommentsQuery} = comment;
