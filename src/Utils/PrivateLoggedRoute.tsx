import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../Contexts/AuthContext";

function PrivateLoggedRoute() {
  const { currentUser } = useAuthentication();
  return currentUser !== null ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateLoggedRoute;
