/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

// Define the state shape
interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isLoggedIn") === "true",
  user: JSON.parse(localStorage.getItem("customers") || "null"),
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticated = action.payload;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("customers", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("customers");
    },
  },
});

// Export actions
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
