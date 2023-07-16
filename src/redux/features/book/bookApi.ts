import { IBook } from "../../../types/globalTypes";
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
      providesTags: ["book"],
    }),
    getHomeBooks: builder.query({
      query: () => `/book/homeBooks`,
      providesTags: ["book"],
    }),
    getSingleBook: builder.query({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      query: (id) => ({ url: `/book/${id}` }),
      providesTags: ["book"],
    }),
    addNewBook: builder.mutation({
      query: (book: IBook) => ({
        url: "/book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["book"],
    }),
    editBookDetails: builder.mutation({
      query: ({ id, ...book }: { id: string; book: Partial<IBook> }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["book"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBooksQuery,
  useGetHomeBooksQuery,
  useGetSingleBookQuery,
  useAddNewBookMutation,
  useEditBookDetailsMutation,
} = bookApi;
