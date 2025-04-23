import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";
import { COOKIE_AUTH_TOKEN_KEY } from "@/lib/constants";


export const TaskQueries = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4204/api/v1/tasks",
    prepareHeaders: (headers) => {
      const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["TASK"],
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (taskData) => {
        return {
          url: "/create",
          method: "POST",
          body: taskData,
        };
      },
      invalidatesTags: ["TASK"],
    }),
    updateTask: builder.mutation<any, { taskData: any; taskId: string }>({
      query: ({ taskData, taskId }) => {
        return {
          url: `/${taskId}`,
          method: "PUT",
          body: taskData,
        };
      },
      invalidatesTags: ["TASK"],
    }),
    taskById: builder.query({
      query: (taskId) => {
        return {
          url: `/${taskId}`,
        };
      },
    }),
  }),
});

export const { useCreateTaskMutation, useUpdateTaskMutation, useTaskByIdQuery } = TaskQueries;
