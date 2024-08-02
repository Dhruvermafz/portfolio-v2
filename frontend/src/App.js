import logo from "./logo.svg";
import "./App.css";
import BackgroundShapes from "../components/BackgroundShapes/BackgroundShapes";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
function App() {
  return (
    <div id="page-content">
      <Header />
      <main>
        <BackgroundShapes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
