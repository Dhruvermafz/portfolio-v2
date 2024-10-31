import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import ProjectDetails from "../pages/ProjectDetails";
import NotFound from "../pages/404";
import LoginIn from "../pages/LoginIn";
import Admin from "../pages/Admin";
import Article from "../pages/Article";
import BlogPage from "../components/admin/Blogs/BlogPage";
import AllCategory from "../components/admin/Category/AllCategory";
import AllQueries from "../components/admin/Contact/AllQueries";
import SignUp from "../components/admin/Auth/SignUp";
import CreateBlog from "../components/admin/Blogs/CreateBlog";
import PrivateRoute from "./PrivateRoute"; // Assuming you have the PrivateRoute component
import BlogDetails from "../pages/BlogDetails";

// Public routes array
const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/projects", element: <Projects /> },
  { path: "/project/:id", element: <ProjectDetails /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/blogsOfItsABlog/:id", element: <Article /> },
  { path: "/blogs/:id", element: <BlogDetails /> },
  { path: "/login", element: <LoginIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "*", element: <NotFound /> },
];

// Admin routes array
const adminRoutes = [
  { path: "/admin", element: <Admin /> },
  { path: "/admin/blogs", element: <BlogPage /> },
  { path: "/admin/blogs/create", element: <CreateBlog /> },
  { path: "/admin/category", element: <AllCategory /> },
  { path: "/admin/contact", element: <AllQueries /> },
];

const Router = () => {
  return (
    <Routes>
      {/* Map through publicRoutes and create Route components */}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Map through adminRoutes and wrap them in PrivateRoute */}
      {adminRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoute>{route.element}</PrivateRoute>}
        />
      ))}
    </Routes>
  );
};

export default Router;
