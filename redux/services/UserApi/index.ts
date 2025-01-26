import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import prepareHeaders from "#/redux/prepareHeaders";
import { response, user } from "./userApi";

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_HOST + "/Users",

    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<response, user>({
      query: (params) => ({
        url: `/Login`,
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = userApi;
