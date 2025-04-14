"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
  };

  const checkSession = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sessionStatus`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data.user);
    } catch (err) {
      console.error("ERROR: Error al verificar sesión", err);
    }
  };

  useEffect(() => {
    checkSession();
    console.log(user);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
