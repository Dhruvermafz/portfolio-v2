import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../context/auth";
const PrivateRoute = ({ children }) => {
  const user = useAuth(); // Decode token to check for authentication

  // If no user is returned, redirect to login
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
