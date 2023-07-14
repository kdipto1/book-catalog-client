import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/book",
    }),
  }),
  overrideExisting: false,
});

export const { useGetBooksQuery } = bookApi;
