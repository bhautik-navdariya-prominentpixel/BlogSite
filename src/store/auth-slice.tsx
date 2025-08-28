import { createSlice } from "@reduxjs/toolkit";
import { getLoginUser, isLogin, logout } from "../helpers/AuthHelper";
import type { SignUpModel } from "../models/SignUpModel";

const initialState: {login : boolean, user: Partial<SignUpModel>} = {
  login: isLogin(),
  user: getLoginUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.login = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.login = false;
      state.user = {};
      logout()
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
