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
