import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import masterRoutes from "./routes";
const RouteWithHelmet = ({ element, name }) => {
  return (
    <>
      {name && (
        <Helmet>
          <title>{`Dhruvermafz | Dashboard - ${name}`}</title>
        </Helmet>
      )}
      {element}
    </>
  );
};

const renderRoutes = (routes) => {
  return routes.flatMap(
    ({ path, name, element, requiredPermission, submenu }) => {
      // Skip rendering if path or element is missing for main route
      const mainRoute =
        path && element && path !== "#" ? (
          <Route
            key={path}
            path={path}
            element={
              requiredPermission ? (
                <PrivateRoute requiredPermission={requiredPermission}>
                  <RouteWithHelmet element={element} name={name} />
                </PrivateRoute>
              ) : (
                <RouteWithHelmet element={element} name={name} />
              )
            }
          />
        ) : null;

      // Recursively render submenu routes, if any
      const subRoutes =
        submenu && submenu.length > 0 ? renderRoutes(submenu) : [];

      return mainRoute ? [mainRoute, ...subRoutes] : subRoutes;
    }
  );
};

const Router = () => {
  return (
    <Routes>
      {renderRoutes(masterRoutes)}
      <Route
        path="*"
        element={
          <RouteWithHelmet element={<Navigate to="/404" />} name="Not Found" />
        }
      />
    </Routes>
  );
};

export default Router;
