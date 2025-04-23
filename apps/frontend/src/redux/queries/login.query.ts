import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";
import { COOKIE_AUTH_TOKEN_KEY } from "@/lib/constants";
//type UserTag = "USER";

export const LoginQueries = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4204/api/v1' 
    }),
    tagTypes: ["USER"],
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (signupData) => ({
                url: "/auth/signup",
                method: "POST",
                body: signupData
            }),
        }),
        loginUser: builder.mutation({
            query: (loginData) => ({
                url: "/auth/signin",
                method: "POST",
                body: loginData
            }),
            invalidatesTags: ["USER"]
        }),
        getUserDetailsById: builder.query({
            query: (userId) => {
              const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
              return {
                url: `/user/${userId}`,
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            },
            providesTags: ["USER"]
        }),
        logoutUserByToken: builder.mutation({
            query: () => {
              const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
              return {
                url: "/auth/signout",
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            },
        })
    })
})

export const { useSignupUserMutation, useLoginUserMutation, useGetUserDetailsByIdQuery, useLogoutUserByTokenMutation } = LoginQueries;
