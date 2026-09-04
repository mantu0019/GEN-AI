import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeUser, loginUser, logOutUser, registerUser } from "../states/authAction";

export const useAuth = () => {
  const { isLoading, error, authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
 
  const registerByUser = useCallback((data) => {
    return dispatch(registerUser(data));
  },[dispatch]);
  const loginByUser = useCallback((data)=>{
     return dispatch(loginUser(data))
  },[dispatch]);

  const getMeByUser = useCallback(()=>{
    return dispatch(getMeUser())
  },[dispatch]);
  const logOutByUser = useCallback(()=>{
    return dispatch(logOutUser());
  },[dispatch])



  return {
    authData,
    isLoading,
    error,
    registerByUser,
    loginByUser,
    getMeByUser,
    logOutByUser
  };
};
