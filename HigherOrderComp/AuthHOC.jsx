import React, { useEffect } from "react";
import useGlobalStore from "../store/global";
const AuthHOC = ({ children }) => {
  const getAuthStatus = useGlobalStore((state) => state.getAuthStatus);
  useEffect(() => {
    getAuthStatus();
  }, []);
  return <>{children}</>;
};

export default AuthHOC;
