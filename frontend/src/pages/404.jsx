import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import NotFoundSVG from "../assets/img/images/404_error.webp"; // Replace with the actual SVG file path

const NotFound = () => {
  return (
    <section className="content-box-area mt-4 text-center">
      <div className="container">
        <div className="container">
          <div className="row g-4">
            <div className="card content-box-card p-4">
              <Link to="/">
                <button className="btn btn-copy">
                  <AiOutlineHome
                    style={{ color: "white" }}
                    size={30} // Adjust size as needed
                  />
                </button>
              </Link>
              <div className="card-body">
                <img
                  style={{ width: "40%" }}
                  src={NotFoundSVG}
                  className="img-fluid mb-4"
                  alt="Page not found"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
