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
import PrivateRoute from "./PrivateRoute";
import BlogDetails from "../pages/BlogDetails";
import ComingSoon from "../pages/ComingSoon";
import Category from "../pages/Category";
import Resume from "../pages/Resume";
import CategoryDetail from "../pages/CategoryDetail";
import AdminProjectList from "../pages/AdminProjectList";
import CreateProject from "../components/admin/Projects/CreateProject";
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
  { path: "/coming", element: <ComingSoon /> },
  { path: "/categories", element: <Category /> },
  { path: "/categories/:id", element: <CategoryDetail /> },
];

// Admin routes array
const adminRoutes = [
  { path: "/admin", element: <Admin /> },
  { path: "/admin/blogs", element: <BlogPage /> },
  { path: "/admin/blogs/create", element: <CreateBlog /> },
  { path: "/admin/category", element: <AllCategory /> },
  { path: "/admin/contact", element: <AllQueries /> },
  { path: "/projects-list", element: <AdminProjectList /> },
  { path: "/project-add", element: <CreateProject /> },
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
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
