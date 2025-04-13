// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice"
import languageReducer from "./slices/languageSlice";
import { tempThemeReducer } from "./slices/tempThemeSlice";
import { themeMiddleware } from "../middleware/themeMiddleware";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(themeMiddleware)
});

export default store;
