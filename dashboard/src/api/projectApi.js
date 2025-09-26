// src/services/projectApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/projects`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => "/",
      providesTags: ["Projects"],
    }),
    getProjectById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    createProject: builder.mutation({
      query: (newProject) => ({
        url: "/",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Projects", id }],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
