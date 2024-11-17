/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state shape
interface AuthState {
  isAuthenticated: boolean;
  user: any | null; // Adjust this type based on what user data you store
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isLoggedIn") === "true", // Check if the user is logged in
  user: JSON.parse(localStorage.getItem("user") || "null"), // Load user data from localStorage
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
    },
  },
});

// Export actions
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
