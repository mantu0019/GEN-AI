import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/states/authSlices";
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
