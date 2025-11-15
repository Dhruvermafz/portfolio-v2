import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import ProjectDetails from "../pages/ProjectDetails";
import NotFound from "../pages/404";
import Article from "../pages/Article";
import PrivateRoute from "./PrivateRoute";
import BlogDetails from "../pages/BlogDetails";
import ComingSoon from "../pages/ComingSoon";
import Category from "../pages/Category";
import CategoryDetail from "../pages/CategoryDetail";
import ResumeCard from "../components/ResumeCard";

// Public routes
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/projects", element: <Projects /> },
  { path: "/project/:id", element: <ProjectDetails /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/itsablog/:id", element: <Article /> },
  { path: "/blogs/:id", element: <BlogDetails /> },
  { path: "*", element: <NotFound /> },
  { path: "/coming", element: <ComingSoon /> },
  { path: "/categories", element: <Category /> },
  { path: "/categories/:id", element: <CategoryDetail /> },
  { path: "/resume", element: <ResumeCard /> },
];

// Admin routes

const Router = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
