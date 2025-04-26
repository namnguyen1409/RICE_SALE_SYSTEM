// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice"
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";
import { themeMiddleware } from "../middleware/themeMiddleware";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(themeMiddleware)
});

export default store;
