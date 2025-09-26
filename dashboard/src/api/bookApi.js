import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/books`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (params) => ({
        url: "/",
        params, // Supports filtering, pagination, sorting (e.g., title, author, page, limit)
      }),
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...bookData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Books", id },
        "Books",
      ],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
