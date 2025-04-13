// src/redux/reducers/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";

const savedLang = localStorage.getItem("app-language") || "en-us";


const languageSlice = createSlice({
  name: "language",
  initialState: {
    currentLang: savedLang,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.currentLang = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem("app-language", action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
