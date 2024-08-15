import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import ProjectDetails from "../pages/ProjectDetails";
import NotFound from "../pages/404";
import Resume from "../pages/Resume";
import CreateBlog from "../components/admin/Blogs/CreateBlog";
import CreateBlogPage from "../pages/CreateBlog";
import BlogDetails from "../components/Blogs/BlogDetails";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/blog" element={<Blogs />} />
        <Route element={<NotFound />} path="/*" />
        {/* <Route path="/resume" element={<Resume />} /> */}
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/admin" element={<CreateBlogPage />} />
      </Routes>
    </>
  );
};

export default Router;
