import { createSlice } from "@reduxjs/toolkit";
import { getAllReportUser, interviewUser, reportUser } from "./interviewAction";
 
const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviewData: null,
    isLoading: false,
    error: false,
  },
  extraReducers:(builder)=>{
      // interviewUser 
      builder.addCase(interviewUser.pending,(state,action)=>{
         state.isLoading = true,
         state.error = false
     }).addCase(interviewUser.fulfilled,(state,action)=>{
       state.isLoading = false,
      state.error = false,
      state.interviewData = action.payload
      }).addCase(interviewUser.rejected,(state,action)=>{
      state.isLoading = false,
      state.error  =   action.payload  ||  "something went wrong"
     })

 // report User

.addCase(reportUser.pending,(state,action)=>{
  state.isLoading = true,
  state.error = false
}).addCase(reportUser.fulfilled,(state,action)=>{
  state.isLoading = false,
  state.interviewData = action.payload
}).addCase(reportUser.rejected,(state,action)=>{
  state.isLoading = false,
  state.error = action.payload || "something went wrong"
})
 

.addCase(getAllReportUser.pending,(state,action)=>{
   state.isLoading = true,
   state.error = false

 
}).addCase(getAllReportUser.fulfilled,(state,action)=>{
  state.isLoading = false,
  state.error = false,
  state.interviewData = action.payload
}).addCase(getAllReportUser.rejected,(state,action)=>{
  state.isLoading = false,
  state.error = action.payload || "something went wrong"
})
  
}









});
export default interviewSlice.reducer
