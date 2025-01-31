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
        baseUrl: `https://bluetv.x10.mx/api/v1/`
    }),
    endpoints: (builder) => ({
        getGa: builder.query<GameResponse, number>({
            query: (id) => `games/${id}`,
        }),
    })

})

export const {useGetGaQuery} = getGame;