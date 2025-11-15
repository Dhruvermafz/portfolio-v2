import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "../api/userApi"; // <-- make sure this hook exists

const AuthContext = createContext(undefined);

/**
 * AuthProvider
 * -------------------------------------------------
 * 1. Reads token from localStorage on mount
 * 2. Calls /user/me **only when a token exists**
 * 3. Keeps the user object in sync with the API
 * 4. Provides login / logout helpers
 */
export const AuthProvider = ({ children }) => {
  // ---------- token ----------
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("authToken") || null;
    } catch {
      return null;
    }
  });

  // ---------- fetch current user ----------
  const {
    data: userFromApi,
    isLoading: loadingUser,
    isError: userError,
    error: userErrorObj,
    refetch,
  } = useGetCurrentUserQuery(undefined, {
    skip: !token, // skip when there is no token
  });

  // ---------- derived user object ----------
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userFromApi && token) {
      setUser({
        id: userFromApi.id,
        name: userFromApi.username, // <-- Header uses `name`
        username: userFromApi.username,
        email: userFromApi.email,
        role: userFromApi.role || "user",
        avatar: userFromApi.photo || "https://example.com/default-avatar.png",
        photo: userFromApi.photo,
        createdAt: userFromApi.createdAt,
        updatedAt: userFromApi.updatedAt,
      });
    } else if (!token) {
      setUser(null);
    }
  }, [userFromApi, token]);

  // ---------- login / logout ----------
  const login = (jwtToken) => {
    if (!jwtToken) return;
    localStorage.setItem("authToken", jwtToken);
    setToken(jwtToken);
    // user will be fetched automatically by useGetCurrentUserQuery
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  // ---------- public API ----------
  const value = {
    user, // full user object (or null)
    token, // raw JWT
    isLoggedIn: !!token && !!user,
    isLoading: loadingUser,
    isError: userError,
    error: userErrorObj,
    login,
    logout,
    refetchUser: refetch, // manual refresh if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth – throw if used outside <AuthProvider>
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
