import React from "react";
import { Routes, Route } from "react-router-dom";

import masterRoutes from "./routes";
const AppRoutes = () => {
  return (
    <Routes>
      {masterRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
