import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}
