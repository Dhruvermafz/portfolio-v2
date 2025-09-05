import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import NotFoundSVG from "../assets/images/404_error.webp"; // Replace with the actual SVG file path

const Error404 = () => {
  return (
    <div class="container-fluid">
      <div className="row">
        <div class="col-12">
          <div class="card o-hidden card-hover">
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
  );
};

export default Error404;
