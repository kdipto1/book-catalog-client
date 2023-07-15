import { api } from "../../api/apiSlice";

interface SearchFormData {
  searchTerm: string;
  genre: string;
  publicationYear: string;
  sortBy?: string;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (arg: SearchFormData) => {
        const queryParams = new URLSearchParams();
        if (arg.searchTerm) queryParams.append("searchTerm", arg.searchTerm);
        if (arg.genre) queryParams.append("genre", arg.genre);
        if (arg.publicationYear)
          queryParams.append("publicationYear", arg.publicationYear);
        if (arg.sortBy) queryParams.append("sortBy", arg.sortBy);

        return {
          url: `/book${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
          }`,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetBooksQuery } = bookApi;
