import { api } from "../../api/apiSlice";

interface ICredential {
  email: string;
  password: string;
}

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials: ICredential) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    userSignup: builder.mutation({
      query: (credentials: ICredential) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    addBookToWishlist: builder.mutation({
      query: ({ ...bookId }: { bookId: string }) => ({
        url: "/user/wishlist",
        method: "PATCH",
        body: bookId,
      }),
      invalidatesTags: ["wishlist"],
    }),

    getWishlist: builder.query({
      query: () => ({
        url: "/user/wishlist",
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    addBookToReadingList: builder.mutation({
      query: ({ ...book }: { bookId: string; readingState: boolean }) => ({
        url: "/user/readingList",
        method: "PATCH",
        body: book,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getReadingList: builder.query({
      query: () => ({
        url: "/user/readingList",
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useAddBookToWishlistMutation,
  useGetWishlistQuery,
  useAddBookToReadingListMutation,
  useGetReadingListQuery,
} = userApi;
