import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
type DataType = {
  id: number;
  title: string;
  url: string;
  description: string;
};

export const getPhotoPage = createApi({
  reducerPath: 'photoApi', // a unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bluetv.x10.mx/api/v1/', // Base URL for API
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<DataType[] , void>({
      query: () => 'photos', // Endpoint to fetch photos
    }),
  }),
});

export const { useGetPhotosQuery } = getPhotoPage;
