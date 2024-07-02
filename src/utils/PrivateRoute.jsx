import {} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../constant";
function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
