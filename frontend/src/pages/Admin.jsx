import React from "react";
import AppBar from "../components/admin/AppBar/Appbar";
import PopularCategories from "../components/admin/Dashboard/PopularCategories";
import ProgressCard from "../components/admin/Dashboard/ProgressCard";
const Admin = () => {
  return (
    <div className="admin-container">
      {/* Include the AppBar component */}
      <div className="main-content">
        <section className="content-box-area mt-4 text-center">
          <div className="container">
            <div className="row g-4">
              <div className="card content-box-card p-4">
                <div className="card-body">
                  {/* Main content will be added here */}
                  <AppBar />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
