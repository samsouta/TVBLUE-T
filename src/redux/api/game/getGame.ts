import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface GameResponse {
    message: string;
    game: {
        description: string,
        url: string,
        id:number
    };
}


export const getGame = createApi({
    reducerPath : "",
    baseQuery : fetchBaseQuery({
        baseUrl: `http://127.0.0.1:8000/api/`
    }),
    endpoints: (builder) => ({
        getGa: builder.query<GameResponse, number>({
            query: (id) => `games/${id}`,
        }),
    })

})

export const {useGetGaQuery} = getGame;