import Header from "./components/Common/Header";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Common/Sidebar";
import Footer from "./components/Common/Footer";
import AppRoutes from "./Router/Router";
import "antd/dist/reset.css";
function App() {
  const location = useLocation();
  const user = localStorage.getItem("authToken");
  const isAuthPage = [
    "/login",
    "/signup",
    "/404",
    "/reset-password/:token",
    "/forgot-password",
    "/under-maintenance",
    "/coming-soon",
    "/no-access",
    "/verify-account",
    "/*",
  ].includes(location.pathname);
  return (
    <div class="page-wrapper compact-wrapper" id="pageWrapper">
      {!isAuthPage && <Header />}
      <div class="page-body-wrapper">
        {!isAuthPage && <Sidebar />}
        <div class="page-body">
          <AppRoutes />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
