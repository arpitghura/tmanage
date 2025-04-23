import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookies from 'js-cookie';
import { COOKIE_AUTH_TOKEN_KEY } from '../../lib/constants';


export const UserQueries = createApi({
  reducerPath: 'userDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4204/api/v1/users',
    prepareHeaders: (headers) => {
      const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      console.log(headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserData: builder.query<any, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: 'GET',
      }),
    }),
    updateUserData: builder.mutation<any,  { userId: string; data: any }>({
      query: ({userId, data}) => ({
        url: `/${userId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getAllUserTasks: builder.query<any, { userId: string; limit: number; offset: number }>({
      query: ({ userId, limit, offset }) => ({
        url: `/${userId}/tasks`,
        method: 'GET',
        params: { limit, offset },
      }),
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useGetAllUserTasksQuery,
} = UserQueries;