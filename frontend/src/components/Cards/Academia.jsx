import React from "react";
import academicDetails from "../../assets/data/academia";

const Academia = () => {
  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body work-experiance-card">
          <h3 className="card-title">Academic Background</h3>
          <div className="work-experiance-main">
            <ul className="work-experiance-slider list-unstyled">
              {academicDetails.map((academic, index) => (
                <li key={index}>
                  <div className="date">
                    <p>{academic.year}</p>
                  </div>
                  <div className="info">
                    <div className="icon">
                      <img
                        src={academic.icon}
                        alt={academic.title.toLowerCase().replace(" ", "-")}
                      />
                    </div>
                    <div className="text">
                      <h4 className="title">{academic.title}</h4>
                      <h6 className="subtitle">{academic.description}</h6>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academia;
