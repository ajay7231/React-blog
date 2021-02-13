import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../config/useSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
