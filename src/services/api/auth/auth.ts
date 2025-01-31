import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface RegisterType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string
}

interface loginType {
  email: string;
  password: string;
}

interface GoogleLoginType {
  token: string;
}

type DataType = {
  status: string;
  message: string;
  token: string;
  user: {
    email: string;
    name: string;
  };
};



export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bluetv.x10.mx/api/' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation<DataType, RegisterType>({
      query: (user) => ({
        url: `register`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'], // Optional: Use if caching is applied
    }),

    // login
    login: builder.mutation<DataType, loginType>({
      query: (user) => ({
        url: `login`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'], // Optional: Use if caching is applied
    }),

    // Google login
    googleLogin: builder.mutation<DataType, GoogleLoginType>({
      query: (data) => ({
        url: `google-login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),


    // Get user profile (requires authentication)
    getUserProfile: builder.query<DataType, void>({
      query: () => ({
        url: `v1/user-profile`, // Assuming `user-profile` is the route on your backend
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),


    logOut: builder.mutation<DataType, string>({
      query: (token) => ({
          url: `logout`,
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`, // Attach the token
          },
      }),
      invalidatesTags: ['Auth'], // Invalidate auth-related cache
  }),
  

    
  }),
});

export const { useRegisterMutation, useLoginMutation, useGoogleLoginMutation , useGetUserProfileQuery ,useLogOutMutation} = auth;
