import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import cookies from "js-cookie";
import { COOKIE_AUTH_TOKEN_KEY } from "@/lib/constants";

export const TeamQueries = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4204/api/v1/team",
    prepareHeaders: (headers) => {
      const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // getTeam: builder.query<Team[], void>({
    // query: () => ''
    // }),
    createTeam: builder.mutation<any, any>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),
    // updateTeam: builder.mutation<Team, Partial<Team>>({
    // query: body => ({
    //     url: '',
    //     method: 'PATCH',
    //     body
    // })
    // }),
    // deleteTeam: builder.mutation<Team, Partial<Team>>({
    // query: body => ({
    //     url: '',
    //     method: 'DELETE',
    //     body
    // })
    // })
  }),
});
