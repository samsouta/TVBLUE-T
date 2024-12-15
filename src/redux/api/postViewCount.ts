import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IncrementViewResponse {
  success: boolean;
  message: string;
}


export const postViewCount = createApi({
  reducerPath: 'view', 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bluetv.x10.mx/api/v1' }), 
  tagTypes: ['api'], 
  endpoints: (builder) => ({
    incrementView: builder.mutation<IncrementViewResponse, { videoId: number }>({
      query: ({ videoId }) => ({
        url: `/movies/${videoId}/view`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useIncrementViewMutation } = postViewCount;
