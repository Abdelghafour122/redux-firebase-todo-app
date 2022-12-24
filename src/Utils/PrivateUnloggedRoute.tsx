import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../App/hooks";

function PrivateUnloggedRoute() {
  const currentUser = useAppSelector((state) => state.authentication.user);
  return currentUser === null ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateUnloggedRoute;
