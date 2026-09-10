import { createSlice } from "@reduxjs/toolkit";
import { getMeUser, loginUser, logOutUser, registerUser } from "./authAction";
 
 
const authSlice = createSlice({
    name:"auth",
    initialState:{
        authData:null,
        isLoading:true,
        error:null
     },
     
     extraReducers:(builder)=>{
   // register


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
      
      // getMe
      
      .addCase(getMeUser.pending,(state,action)=>{
        state.isLoading = true,
        state.error   = null;
      })
      
      
      .addCase(getMeUser.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.authData = action.payload,
        state.error = null

      })
      
      
      .addCase(getMeUser.rejected,(state,action)=>{
        state.isLoading = false,
        state.error = action.payload || "something went wrong"
      })
       //logout
      
      .addCase(logOutUser.fulfilled,(state,action)=>{
        state.isLoading = false,
        state.authData = action.payload,
        state.error = null
       }) 
   
     }

 


})



export default authSlice.reducer;