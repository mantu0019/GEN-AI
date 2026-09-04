import React, { useEffect } from "react";
import { useAuth } from "../features/auth/hook/useAuth";

const AuthInitializer = ({ children }) => {
  const { getMeByUser } = useAuth();

  useEffect(() => {
    getMeByUser();
  }, [getMeByUser]);

  return children;
};

export default AuthInitializer;
