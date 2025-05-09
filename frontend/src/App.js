import React from "react";
import "./App.css";
import BackgroundShapes from "./components/BackgroundShapes/BackgroundShapes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Router from "./Router/Router";

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
