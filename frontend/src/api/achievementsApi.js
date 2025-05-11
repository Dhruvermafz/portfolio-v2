// src/services/achievementApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
export const achievementApi = createApi({
  reducerPath: "achievementApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/achievements` }),
  tagTypes: ["Achievements"],
  endpoints: (builder) => ({
    getAllAchievements: builder.query({
      query: () => "/",
      providesTags: ["Achievements"],
    }),
    getAchievementById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Achievements", id }],
    }),
    createAchievement: builder.mutation({
      query: (newData) => ({
        url: "/",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Achievements"],
    }),
    updateAchievement: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Achievements", id },
      ],
    }),
    deleteAchievement: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Achievements", id }],
    }),
  }),
});

export const {
  useGetAllAchievementsQuery,
  useGetAchievementByIdQuery,
  useCreateAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
} = achievementApi;
