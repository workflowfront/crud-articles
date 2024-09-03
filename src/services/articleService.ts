import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IArticle } from "../models/IArticle";

export const articleAPI = createApi({
  reducerPath: "articleAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7001",
  }),
  tagTypes: ["Article"],
  endpoints: (build) => ({
    fetchAllArticles: build.query<IArticle[], number>({
      query: (limit: number = 10) => ({
        url: "/articles",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Article"],
    }),
    createArticle: build.mutation<IArticle, IArticle>({
      query: (article) => ({
        url: "/articles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    updateArticle: build.mutation<IArticle, IArticle>({
      query: (article) => ({
        url: `/articles/${article.id}`,
        method: "PUT",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: build.mutation<IArticle, IArticle>({
      query: (article) => ({
        url: `/articles/${article.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});
