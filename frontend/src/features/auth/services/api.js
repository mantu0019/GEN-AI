import { redirect } from "react-router";
import { authInstanceApi } from "../../../app/api";

export const register = async ({ username, email, password }) => {
  try {
    const res = await authInstanceApi.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log("something went wrong from register services", error);
    throw error
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await authInstanceApi.post("/api/auth/login", {email, password});
    return res.data;
  } catch (error) {
    console.log("something went wrong from login services", error);
    throw error

  }
};


export const getMe = async()=>{
  try {
     const res = await authInstanceApi.get("/api/auth/get-me");
     return res.data;
  } catch (error) {
    console.log("something went wrong from getMe services",error)
    throw error
  }
}

export const logOut = async()=>{
  try {
    const res = await authInstanceApi.get("/api/auth/logout")
  } catch (error) {
    console.log("something went wrong from logOut services",error)
    throw error
  }
}
