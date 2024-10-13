import React from "react";
import { Navigate } from "react-router-dom";

// A simple authentication check (replace this with your actual auth logic)
const isAuthenticated = () => {
  // Check if user is authenticated (e.g., by checking a token in localStorage or a context state)
  return localStorage.getItem("authToken") ? true : false;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
