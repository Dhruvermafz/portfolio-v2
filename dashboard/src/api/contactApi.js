// src/services/contactApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/contact`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Contacts"],

  endpoints: (builder) => ({
    // GET all contacts
    getAllContacts: builder.query({
      query: () => "/",
      providesTags: (result = []) =>
        result.length
          ? [
              ...result.map(({ _id }) => ({ type: "Contacts", id: _id })),
              { type: "Contacts", id: "LIST" },
            ]
          : [{ type: "Contacts", id: "LIST" }],
    }),

    // GET single contact
    getContactById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Contacts", id }],
    }),

    // CREATE contact
    createContact: builder.mutation({
      query: (newContact) => ({
        url: "/",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),

    // DELETE contact
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Contacts", id },
        { type: "Contacts", id: "LIST" },
      ],
    }),

    // STAR / UNSTAR contact
    starContact: builder.mutation({
      query: ({ id, isStarred }) => ({
        url: `/${id}/star`,
        method: "PATCH",
        body: { isStarred },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Contacts", id },
        { type: "Contacts", id: "LIST" },
      ],
    }),

    // FLAG / UNFLAG contact
    flagContact: builder.mutation({
      query: ({ id, isFlagged }) => ({
        url: `/${id}/flag`,
        method: "PATCH",
        body: { isFlagged },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Contacts", id },
        { type: "Contacts", id: "LIST" },
      ],
    }),
  }),
});

// Export all hooks
export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useStarContactMutation, // NEW
  useFlagContactMutation, // NEW
} = contactApi;
