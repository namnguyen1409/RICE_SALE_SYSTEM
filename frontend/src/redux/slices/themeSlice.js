// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadGoogleFont } from "../../utils/loadGoogleFont";

const savedTheme = JSON.parse(localStorage.getItem("theme")) || {};

const initialState = {
  themeMode: savedTheme.themeMode || "light",
  primaryColor: savedTheme.primaryColor || "#1677ff",
  fontSize: savedTheme.fontSize || 14,
  fontFamily: savedTheme.fontFamily || "Roboto",
  borderRadius: savedTheme.borderRadius || 6,
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("theme", JSON.stringify(state));
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      saveToLocalStorage(state);
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      saveToLocalStorage(state);
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      saveToLocalStorage(state);
    },
    setFontFamily: (state, action) => {
      loadGoogleFont(action.payload);
      state.fontFamily = action.payload;
      saveToLocalStorage(state);
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export const {
  setThemeMode,
  setPrimaryColor,
  setFontSize,
  setFontFamily,
  setBorderRadius,
} = themeSlice.actions;

export default themeSlice.reducer;
