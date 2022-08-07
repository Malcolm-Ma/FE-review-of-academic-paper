/**
 * @file user reducer
 * @author Mingze Ma
 */

import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo, logout } from "src/actions/userActions";
import authUtil from "src/util/authUtil";

const initialState = {
  userInfo: {},
  loginStatus: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.userInfo = {};
        state.loginStatus = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loginStatus = true;
      })
      .addCase(logout.fulfilled, (state) => {
        authUtil.removeAuthToken();
        state.userInfo = {};
        state.loginStatus = false;
      })
  }
});

export const {} = userSlice.actions;

export default userSlice.reducer;
