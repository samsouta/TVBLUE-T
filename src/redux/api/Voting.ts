import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'js-cookie'; // Import js-cookie library

interface IncrementViewResponse {
  success: boolean;
  message: string;
  movieId: number;
  userId: number;
}

export const Voting = createApi({
  reducerPath: 'voting',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bluetv.x10.mx/api/v1/'
  }),
  tagTypes: ['api'],
  endpoints: (builder) => ({
    like: builder.mutation<IncrementViewResponse, number>({
      query: ( videoId ) => ({
        url: `/movie/${videoId}/like`,  // Change to the correct endpoint
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookie.get('token')}`,
        },
      }),
    }),
    unlike: builder.mutation<IncrementViewResponse,  number >({
      query: (videoId) => ({
        url: `/movie/${videoId}/unlike`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookie.get('token')}`,
        },
      }),
    }),
  }),
});

export const { useLikeMutation, useUnlikeMutation } = Voting;
