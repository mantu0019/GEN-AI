import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../states/authAction";

export const useAuth = () => {
  const { isLoading, error, authData } = useSelector((state) => state.auth);
  const dispatch = useDispatch()



  const registerByUser = useCallback((data) => {
    return dispatch(registerUser(data));
  });
  const loginByUser = useCallback((data)=>{
     return dispatch(loginUser(data))
  })



  return {
    authData,
    isLoading,
    error,
    registerByUser,
    loginByUser,
  };
};
