import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage as the default storage engine
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice";

// Combine reducers for persistence
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  employee: employeeReducer,
});

// Configure Redux Persist
const persistConfig = {
  key: "root", // Key for the persisted data in storage
  storage, // Define the storage engine (localStorage here)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor instance
export const persistor = persistStore(store);

// Export types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
