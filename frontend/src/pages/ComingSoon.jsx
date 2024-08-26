import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import ComingSoonSVG from "../assets/img/images/ComingSoon.webp";
import { Link } from "react-router-dom";
const ComingSoon = () => {
  return (
    <section className="content-box-area mt-4 text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card content-box-card p-4">
              <div className="card-body">
                <img
                  src={ComingSoonSVG}
                  alt=""
                  style={{ width: "40%" }}
                  className="img-fluid mb-4"
                />
              </div>
              <p className="lead">
                I'm working hard to code features on portfolio. Stay tuned!
              </p>
              <p>
                In the meantime, you can explore our other pages or contact us
                for more information.
              </p>
              <Link to="/">
                <button className="btn btn-copy">Go Back Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
