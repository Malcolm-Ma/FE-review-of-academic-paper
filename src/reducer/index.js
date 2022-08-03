/**
 * @file root reducer
 * @author Mingze Ma
 */

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import orgReducer from "./orgReducer";


const store = configureStore({
  reducer: {
    user: userReducer,
    org: orgReducer,
  },
});

export default store;
