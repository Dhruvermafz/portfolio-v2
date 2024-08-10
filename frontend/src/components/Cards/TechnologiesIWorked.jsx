import React from "react";
import { FaArrowRight } from "react-icons/fa";
import expertiseAreas from "../../assets/data/technologies";
const TechnologiesIWorked = () => {
  const limitedTechnologies = expertiseAreas.slice(0, 6);
  return (
    <div className="col-lg-12">
      <div className="card card-projects">
        <div className="card-body">
          <h3 className="card-title">My Expert Area</h3>
          <a class="link-btn" href="/about">
            {" "}
            See All Services
            <FaArrowRight />
          </a>
          <div className="expertise-main mt-24">
            <div className="row g-3">
              {limitedTechnologies.map((expertise, index) => (
                <div className="col-xl-4 col-md-4 col-sm-6 col-6" key={index}>
                  <div className="expertise-item">
                    <div className="image text-center">
                      {/* Render the icon component */}
                      <expertise.icon size={40} color="white" />
                    </div>
                    <div className="text">
                      <h4 className="title">{expertise.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesIWorked;
