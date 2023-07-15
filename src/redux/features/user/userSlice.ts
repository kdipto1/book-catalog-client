/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
  accessToken: string;
  userId: string;
}

// Define the initial state using that type
const initialState: UserState = {
  accessToken: "string",
  userId: "",
};

export const userStateSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
    },
    removeUser: (state, action: PayloadAction<UserState>) => {
      state.accessToken = "";
      state.userId = "";
    },
  },
});

export const { loginUser } = userStateSlice.actions;

export default userStateSlice.reducer;
