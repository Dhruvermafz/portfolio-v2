// src/services/blogApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/post`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "/",
      providesTags: ["Blogs"],
    }),
    getSingleBlog: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),
    getFeaturedBlogs: builder.query({
      query: () => "/featured",
      providesTags: ["Blogs"],
    }),
    createBlog: builder.mutation({
      query: (blog) => ({
        url: "/",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["Blogs"],
    }),
    createBlogWithMarkdown: builder.mutation({
      query: (blog) => ({
        url: "/markdown",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useGetFeaturedBlogsQuery,
  useCreateBlogMutation,
  useCreateBlogWithMarkdownMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
