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
type VideoProp = {
  data:VideoDataType[];
}

export const getVideoDetail = createApi({
  reducerPath: 'getVideoDetail',
  baseQuery: fetchBaseQuery({ baseUrl:'https://bluetv.x10.mx/api/v1' }),
  endpoints: (builder) => ({
    getVideoById: builder.query<VideoProp, number>({
      query: (id) => {
        return `/movies/${id}`;
      },
    }),
  }),
});

// Export the auto-generated hook for the `getMovieById` query
export const { useGetVideoByIdQuery } = getVideoDetail;