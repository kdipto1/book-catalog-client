/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  accessToken: string | null;
  userId: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
};

export const userStateSlice = createSlice({
  name: "userState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      localStorage.setItem("accessToken", action.payload.accessToken!);
      localStorage.setItem("userId", action.payload.userId!);
    },
    removeUser: (state, action: PayloadAction<UserState>) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
    },
  },
});

export const { loginUser } = userStateSlice.actions;

export default userStateSlice.reducer;
