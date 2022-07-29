/**
 * @file user reducer
 * @author Mingze Ma
 */

import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from "src/actions/userActions";

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
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loginStatus = true;
      })
  }
});

export const {} = userSlice.actions;

export default userSlice.reducer;
