import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  errors: { name: string; email: string; password: string };
}

const initialState: UserState = {
  user: null,
  errors: { name: "", email: "", password: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      // Check if the user data is different before setting it
      if (!state.user || state.user.email !== action.payload.email) {
        state.user = action.payload;
      }
    },
    setErrors: (
      state,
      action: PayloadAction<{ name: string; email: string; password: string }>
    ) => {
      state.errors = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.errors = { name: "", email: "", password: "" };
    },
  },
});

export const { setUser, setErrors, clearUser } = userSlice.actions;
export default userSlice.reducer;
