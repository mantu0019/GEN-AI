import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/states/authSlices";
import interviewSlice from "../features/interview/state/InterviewSlice";

 
export const store = configureStore({
  reducer: {
    auth: authSlice,
    interview: interviewSlice,
  },
});

 