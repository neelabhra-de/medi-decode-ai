import { createContext, useContext, useMemo, useState } from "react";
import { authService } from "../services/mockApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ name: "Alex Mercer", email: "alex@medidecode.ai" });
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("mdai_auth") === "1");

  const login = async ({ email, password }) => {
    const data = await authService.login({ email, password });
    localStorage.setItem("token", data.token || "mock-jwt");
    localStorage.setItem("mdai_auth", "1");
    if (data.user) setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const signup = async ({ name, email, password }) => {
    const data = await authService.signup({ name, email, password });
    localStorage.setItem("token", data.token || "mock-jwt");
    localStorage.setItem("mdai_auth", "1");
    if (data.user) setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("mdai_auth");
    localStorage.removeItem("token");
  };

  const value = useMemo(() => ({ user, isAuthenticated, login, signup, logout, setUser }), [user, isAuthenticated]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
