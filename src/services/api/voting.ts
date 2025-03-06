import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'js-cookie'; // Import js-cookie library

interface IncrementViewResponse {
  success: boolean;
  message: string;
  movieId: number;
  userId: number;
}

type LikeCountProp = {
  like_count: number;
};

interface videoViewResponse {
  success: boolean;
  message: string;
}

export const voting = createApi({
  reducerPath: 'vote',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bluetv.x10.mx/api/v1/'
  }),
  tagTypes: ['api'],
  endpoints: (builder) => ({
    /**
     *  @post like movie by id and user id
     */
    like: builder.mutation<IncrementViewResponse, number>({
      query: (videoId) => ({
        url: `/movie/${videoId}/like`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookie.get('token')}`,
        },
      }),
    }),

    /**
     * @post unlike movie by id and user id
     */
    unlike: builder.mutation<IncrementViewResponse, number>({
      query: (videoId) => ({
        url: `/movie/${videoId}/unlike`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookie.get('token')}`,
        },
      }),
    }),

    /**
     * @get like count by id
     */
    getLikeCount: builder.query<LikeCountProp, number>({
      query: (id) => `/movie/${id}/like-count`,
    }),

    /**
     * @post
     */
    incrementView: builder.mutation<videoViewResponse, { videoId: number }>({
      query: ({ videoId }) => ({
        url: `/movie/${videoId}/view`,
        method: 'POST',
      }),
    }),



  }),
});

export const {
  useLikeMutation,
  useUnlikeMutation,
  useGetLikeCountQuery,
  useIncrementViewMutation
} = voting;
