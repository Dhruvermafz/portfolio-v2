import React from "react";
import { workExperiences } from "../../assets/data/workExperiences";
import Projects from "./Projects";
import TechnologiesIWorked from "./TechnologiesIWorked";
import Academia from "./Academia";
const WorkExperience = () => {
  return (
    <div className="col-xl-4">
      <div className="row g-4">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body work-experiance-card">
              <h3 className="card-title">Work Experience</h3>
              <div className="work-experiance-main">
                <ul className="work-experiance-slider list-unstyled">
                  {workExperiences.map((experience, index) => (
                    <li key={index}>
                      <div className="date">
                        <p>{experience.date}</p>
                      </div>
                      <div className="info">
                        <div className="icon">
                          <img
                            src={experience.icon}
                            alt={experience.company.toLowerCase()}
                          />
                        </div>
                        <div className="text">
                          <h4 className="title">{experience.company}</h4>
                          <h6 className="subtitle">{experience.position}</h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Academia />
      </div>
    </div>
  );
};

export default WorkExperience;
