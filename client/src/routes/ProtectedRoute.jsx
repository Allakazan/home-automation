import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

export const ProtectedRoute = () => {
  const { accessToken } = useAuth();

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
