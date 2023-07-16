import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the user token from Redux state
      const state = getState() as RootState;
      const token = state.userState.accessToken;

      // Set the Authorization header with the user token
      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: ["reviews", "book"],
  endpoints: () => ({}),
});
