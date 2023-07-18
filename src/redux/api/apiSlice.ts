import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-omega.vercel.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.accessToken;
      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: ["reviews", "book", "wishlist", "readingList"],
  endpoints: () => ({}),
});
