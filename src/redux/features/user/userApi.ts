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
  }),
  overrideExisting: false,
});

export const { useUserLoginMutation, useUserSignupMutation } = userApi;
