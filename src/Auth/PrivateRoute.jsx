import React, { useContext } from "react";
import { AuthContext } from "../components/ontext.js/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const context = useContext(AuthContext);
  const isLogin = context.isLogin;
  return (
    <React.Fragment>
      {isLogin ? <Outlet /> : <Navigate to={`/login`} />}
    </React.Fragment>
  );
};

export default PrivateRoute;
