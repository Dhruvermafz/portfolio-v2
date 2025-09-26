import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authToken");
      return stored ? { token: stored } : null;
    } catch {
      return null;
    }
  });

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Fixed: remove token on logout
    setUser(null);
  };

  const isLoggedIn = !!user?.token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token || null,
        role: user?.role || null,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
