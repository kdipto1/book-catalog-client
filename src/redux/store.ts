import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/count/counterSlice";
import { api } from "./api/apiSlice";
import userStateSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userState: userStateSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
