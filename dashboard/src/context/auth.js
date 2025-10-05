import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../api/userApi";

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

  // Fetch user details if token exists
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserByIdQuery("me", {
    skip: !user?.token,
  });

  useEffect(() => {
    console.log("userData:", userData); // Debug API response
    if (userData) {
      setUser((prev) => ({
        ...prev,
        id: userData.id,
        name: userData.username, // Map username to name
        avatar: userData.photo || "https://example.com/default-avatar.png", // Fallback avatar
        role: userData.role || "user", // Default role
      }));
    }
  }, [userData]);

  const login = (token, userDetails) => {
    localStorage.setItem("authToken", token);
    setUser({
      token,
      id: userDetails.id,
      name: userDetails.username,
      avatar: userDetails.photo || "https://example.com/default-avatar.png",
      role: userDetails.role || "user",
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token || null,
        role: user?.role || null,
        login,
        logout,
        isLoggedIn: !!user?.token,
        isLoading,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
