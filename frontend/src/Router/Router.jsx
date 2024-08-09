import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
// import Tours from "../Pages/Tours";
// import TourDetails from "../Pages/TourDetails";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import SearchResultList from "../Pages/SearchResultList";
// import ThankYou from "../Pages/ThankYou";
import About from "../pages/About";
// import FAQ from "../Shared/FAQ";
import Contact from "../pages/Contact";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import ProjectDetails from "../pages/ProjectDetails";
import NotFound from "../pages/404";
// import Gallery from "../Pages/Gallery";
// import PageNotFound from "../Pages/PageNotFound";
// import Blogs from "../Pages/Blogs";
// import BlogDetails from "../Pages/BlogDetails";
// import ScrollToTop from "../utils/scrolltoTop";

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
        {/*
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/search" element={<SearchResultList />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/gallery" element={<Gallery />} />
    
      
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </>
  );
};

export default Router;
