import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import BackgroundShapes from "./components/BackgroundShapes/BackgroundShapes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Router from "./Router/Router";
import Navbar from "./components/Header/Navbar";
import Loading from "./components/Loader/Loading";
function App() {
  return (
    <div id="page-content">
      <Header />

      <main>
        <Router />
        <BackgroundShapes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
