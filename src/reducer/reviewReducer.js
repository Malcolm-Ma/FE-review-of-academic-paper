/**
 * @file review reducer
 * @author Mingze Ma
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bidding: {
    summaryShouldUpdate: false,
  },
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    notifyUpdate(state) {
      state.bidding.summaryShouldUpdate = true;
    },
    resetFlag(state) {
      state.bidding.summaryShouldUpdate = false;
    }
  },
});

export const { notifyUpdate, resetFlag } = reviewSlice.actions
export default reviewSlice.reducer
