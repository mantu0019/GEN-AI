import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAction";
 
const authSlice = createSlice({
    name:"auth",
    initialState:{
        authData:null,
        isLoading:false,
        error:null
     },
     
     extraReducers:(builder)=>{

      builder.addCase(registerUser.pending,(state,action)=>{
        state.isLoading = true,
        state.error =  null

      })
      
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.authData = action.payload
        state.error = null
      })
      
      
      .addCase(registerUser.rejected,(state,action)=>{
        state.isLoading = false,
        state.error = action.payload  || "something went wrong"
      })
      
  // login

      .addCase(loginUser.pending,(state,action)=>{
        state.isLoading = true,
        state.error = null
      })
      
      .addCase(loginUser.fulfilled,(state,action)=>{
          state.isLoading = false;
        state.authData = action.payload;
      })
      
      .addCase(loginUser.rejected,(state,action)=>{
        state.isLoading = false,
        state.error = action.payload || "something went wrong loginnnnnn"
      })

 

     }





})



export default authSlice.reducer;