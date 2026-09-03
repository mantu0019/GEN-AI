import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/api";

export const registerUser = createAsyncThunk(
  "/api/register",
  async (userData, thunkAPI) => {
    try {
      const res = await register(userData);
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "something went wrong");
    }
  },
);
 
export const loginUser = createAsyncThunk(
  "/api/login",
  async (userData, thunkAPI) => {
    try {
      const res =await  login(userData);
      return res
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "something went wrong login");
    }
  },
);
