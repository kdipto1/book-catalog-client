import { IBook, IBookFormValues, IReviews } from "../../../types/globalTypes";
import { api } from "../../api/apiSlice";

interface SearchFormData {
  page?: string;
  limit?: string;
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
        if (arg.page) queryParams.append("page", arg.page);
        if (arg.limit) queryParams.append("limit", arg.limit);

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
      query: (id: string) => ({ url: `/book/${id}` }),
      providesTags: ["book", "reviews"],
    }),
    addNewBook: builder.mutation({
      query: (book: IBookFormValues) => ({
        url: "/book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["book"],
    }),
    editBookDetails: builder.mutation({
      query: ({ id, book }: { id: string; book: Partial<IBook> }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["book"],
    }),
    addBookReview: builder.mutation({
      query: ({ id, review }: { id: string; review: Partial<IReviews> }) => ({
        url: `/book/addReview/${id}`,
        method: "PATCH",
        body: review,
      }),
      invalidatesTags: ["book", "reviews"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
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
  useDeleteBookMutation,
  useAddBookReviewMutation,
} = bookApi;
