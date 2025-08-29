import Header from "./components/Common/Header";
import Sidebar from "./components/Common/Sidebar";
import Footer from "./components/Common/Footer";
import AppRoutes from "./Router/Router";
function App() {
  return (
    <div class="page-wrapper compact-wrapper" id="pageWrapper">
      <Header />
      <div class="page-body-wrapper">
        <Sidebar />
        <div class="page-body">
          <AppRoutes />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
