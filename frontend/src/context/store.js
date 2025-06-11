// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { contactApi } from "../api/contactApi";
import { categoryApi } from "../api/categoryApi";
import { blogApi } from "../api/blogApi";
import { projectApi } from "../api/projectApi";
import { achievementApi } from "../api/achievementsApi";
import { todoApi } from "../api/todoApi";
export const store = configureStore({
  reducer: {
    [achievementApi.reducerPath]: achievementApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      achievementApi.middleware,
      userApi.middleware,
      contactApi.middleware,
      blogApi.middleware,
      projectApi.middleware,
      categoryApi.middleware,
      todoApi.middleware
    ),
});
