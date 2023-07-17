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
      query: (bookId: string) => ({
        url: "/user/wishlist",
        method: "POST",
        body: bookId,
      }),
    }),
    getWishlist: builder.query({
      query: () => ({
        url: "/user/wishlist",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useAddBookToWishlistMutation,
  useGetWishlistQuery,
} = userApi;
