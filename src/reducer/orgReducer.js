/**
 * @file Org reducer
 * @author Mingze Ma
 */
import { createSlice } from "@reduxjs/toolkit";
import { getOrgInfo } from "src/actions/orgActions";
import _ from "lodash";

const initialState = {
  orgInfo: {},
  hasError: false,
  fetched: false,
  message: '',
};

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrgInfo.pending, (state, action) => {
        state = _.cloneDeep(initialState);
      })
      .addCase(getOrgInfo.fulfilled, (state, action) => {
        state.orgInfo = action.payload;
        state.fetched = true;
        state.hasError = false;
      })
      .addCase(getOrgInfo.rejected, (state, action) => {
        console.log('--action--\n', action);
        state.orgInfo = action.payload || {};
        state.fetched = true;
        state.hasError = true;
        state.message = action.error.message;
      })
  },
});

export const {} = orgSlice.actions;

export default orgSlice.reducer;
