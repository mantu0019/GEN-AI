import { createSlice } from "@reduxjs/toolkit";
import { generatedResumePdfUser, getAllReportUser, interviewUser, reportUser } from "./interviewAction";
 

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviewData: null,
    isLoading: false,
    error: false,
  },
  extraReducers: (builder) => {
    // interviewUser
    builder
      .addCase(interviewUser.pending, (state, action) => {
        ((state.isLoading = true), (state.error = false));
      })
      .addCase(interviewUser.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.error = false),
          (state.interviewData = action.payload));
      })
      .addCase(interviewUser.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.error = action.payload || "something went wrong"));
      })

      // report User

      .addCase(reportUser.pending, (state, action) => {
        ((state.isLoading = true), (state.error = false));
      })
      .addCase(reportUser.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.interviewData = action.payload));
      })
      .addCase(reportUser.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.error = action.payload || "something went wrong"));
      })

      .addCase(getAllReportUser.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.error = false),
          (state.interviewData = action.payload));
      })
    // generate pdf Resume
     .addCase(generatedResumePdfUser.pending,(state,action)=>{
            state.isLoading = true,
            state.error = false
     }).addCase(generatedResumePdfUser.fulfilled,(state,action)=>{
       state.isLoading = false,
       state.interviewData = action.payload
     }).addCase(generatedResumePdfUser.rejected,(state,action)=>{
      state.isLoading = false,
      state.error = action.payload || "something went wrong"
     })

  },
});
export default interviewSlice.reducer;
