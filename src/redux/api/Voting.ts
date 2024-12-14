import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Voting = createApi({
  reducerPath: "vote",
  tagTypes: ["api"],
  baseQuery: fetchBaseQuery({ baseUrl: `https://bluetv.x10.mx/api/v1` }),
  endpoints: (builder) => ({
    // Define a mutation for sending votes to the server
    voteVideo: builder.mutation({
      query: ({ videoId, voteType }) => ({
        url: `/movies/${videoId}/vote`, // Assuming the endpoint to vote is like `/movies/{id}/vote`
        method: "POST",
        body: { type: voteType },// This will be the data you send (e.g., vote type)
      }),
    }),
  }),
});

export const { useVoteVideoMutation } = Voting;