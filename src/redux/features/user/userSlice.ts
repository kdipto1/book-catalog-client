/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  accessToken: string | null;
  userId: string | null;
}
interface IUserState {
  accessToken: string;
  userId: string;
}

const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
};

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<IUserState>) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.userId);
      state.accessToken = localStorage.getItem("accessToken");
      state.userId = localStorage.getItem("userId");
    },
    removeUser: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      state.accessToken = null;
      state.userId = null;
    },
  },
});

export const { loginUser, removeUser } = userStateSlice.actions;

export default userStateSlice.reducer;
