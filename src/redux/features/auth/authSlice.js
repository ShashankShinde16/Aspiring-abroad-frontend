// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Check if user is logged in from localStorage
  name: localStorage.getItem("name") || "",
  role: localStorage.getItem("role") || "",
  user: {
    name: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", action.payload); // Update login state in localStorage
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", action.payload);
      state.name = action.payload;
    },
    SET_ROLE(state, action) {
      localStorage.setItem("role", action.payload);
      state.role = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.role = profile.role;
    },


  },
  
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_ROLE } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;

export default authSlice.reducer;
