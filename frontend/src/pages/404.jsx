import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import NotFoundSVG from "../assets/img/images/404-Error.png";
const NotFound = () => {
  return (
    <section className="content-box-area mt-4 text-center">
      <div className="container">
        <div className="container">
          <div className="row g-4">
            <div className="card content-box-card p-4">
              <div className="card-body">
                <Link to="/" className="btn btn-primary">
                  <AiOutlineHome className="me-2" />
                  Go to Homepage
                </Link>

                {/* <NotFoundSVG className="img-fluid mb-4" alt="Page not found" /> */}
                <img src={NotFoundSVG} alt="" className="img-fluid mb-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
