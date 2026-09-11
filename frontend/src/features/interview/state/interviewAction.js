import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateResumePdf, getAllReport, interview, report } from "../services/api";

export const interviewUser = createAsyncThunk(
  "/api/interview",
  async (userData, thunkAPI) => {
    try {
      const res = await interview(userData);
      return res;
    } catch (error) {
     return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "something went wrong",
      );
    }
  },
);

export const reportUser = createAsyncThunk(
  "/api/report",
  async (userData, thunkAPI) => {
    try {
      const res = await report(userData);
      return res;
    } catch (error) {
     return  thunkAPI.rejectWithValue(
        error?.response?.data?.message || "something went wrong",
      );
    }
  },
);
export const getAllReportUser = createAsyncThunk("/api/", async (__, thunkAPI) => {
  try {
    const res = await getAllReport();
    return res;
  } catch (error) {
   return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "something went wrong",
    );
  }
});



export const generatedResumePdfUser = createAsyncThunk("/api/resume",async(userData,thunkAPI)=>{
  try {
    
   const res = await generateResumePdf(userData);
   return res;

  } catch (error) {
    return  thunkAPI.rejectWithValue(
      error?.response?.data?.message || "something went wrong"
      )


  } 



})


