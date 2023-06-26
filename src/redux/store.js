import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import articleReducer from "./articleReducer";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    articleReducer: articleReducer,
  },
});
