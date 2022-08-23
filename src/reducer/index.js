/**
 * @file root reducer
 * @author Mingze Ma
 */

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userReducer";
import orgReducer from "./orgReducer";
import reviewReducer from "./reviewReducer";


const store = configureStore({
  reducer: {
    user: userReducer,
    org: orgReducer,
    review: reviewReducer,
  },
});

export default store;
