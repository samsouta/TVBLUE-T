import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieDataType } from '../../types/MovieDataType';

type VideoProp = {
  movie:MovieDataType;
}

export const getVideoDetail = createApi({
  reducerPath: 'getVideoDetail',
  baseQuery: fetchBaseQuery({ baseUrl:'http://127.0.0.1:8000/api/v1/' }),
  endpoints: (builder) => ({
    getVideoById: builder.query<VideoProp, number>({
      query: (id) => {
        return `movies/${id}`;
      },
    }),
  }),
});

// Export the auto-generated hook for the `getMovieById` query
export const { useGetVideoByIdQuery } = getVideoDetail;