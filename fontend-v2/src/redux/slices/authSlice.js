import { createSlice } from "@reduxjs/toolkit";

const savedState = JSON.parse(localStorage.getItem("auth")) || {
  isAuthenticated: false,
  user: null,
  token: null,
};

const initialState = savedState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },
    updateToken(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
