import { configureStore } from "@reduxjs/toolkit";
import bucketReducer from "./redux/bucketReducer";
import resturentReducer from "./redux/resturentReducer";

export const store = configureStore({
  reducer: {
    backet: bucketReducer,
    resturant: resturentReducer,
  },
});
