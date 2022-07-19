/**
 * @file root reducer
 * @author Mingze Ma
 */
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";


const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
