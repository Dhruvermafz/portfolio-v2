import React from "react";
import codeclause from "../../assets/img/images/codeclause.jpg";
import pickyvibe from "../../assets/img/images/pickyvibe.jpg";
import Projects from "./Projects";
const WorkExperience = () => {
  const workExperiences = [
    {
      date: "July 2024 - Present",
      icon: pickyvibe,
      company: "PickVibe Pvt Ltd.",
      position: "Full Stack Developer Intern",
    },
    {
      date: "July 2023 - August 2023",
      icon: codeclause,
      company: "CodeClause",
      position: "Frontend Intern",
    },
  ];

  const expertiseAreas = [
    { icon: "assets/img/icons/figma.svg", title: "React" },
    { icon: "assets/img/icons/notion.svg", title: "NodeJs" },
    { icon: "assets/img/icons/mico.svg", title: "Javascript" },
    { icon: "assets/img/icons/framer.svg", title: "Next.Js" },
    { icon: "assets/img/icons/webflow.svg", title: "Django" },
    { icon: "assets/img/icons/zeplin.svg", title: "Python" },
    { icon: "assets/img/icons/zeplin.svg", title: "HTML & CSS" },
    { icon: "assets/img/icons/zeplin.svg", title: "Sql" },
    { icon: "assets/img/icons/zeplin.svg", title: "Figma" },
    { icon: "assets/img/icons/zeplin.svg", title: "Postman" },
    { icon: "assets/img/icons/zeplin.svg", title: "Firebase" },
  ];

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
        <div className="col-lg-12">
          <div className="card expertise-card">
            <div className="card-body">
              <h3 className="card-title">My Expert Area</h3>
              <div className="expertise-main mt-24">
                <div className="row g-3">
                  {expertiseAreas.map((expertise, index) => (
                    <div
                      className="col-xl-4 col-md-4 col-sm-6 col-6"
                      key={index}
                    >
                      <div className="expertise-item">
                        <div className="image text-center">
                          <img
                            src={expertise.icon}
                            alt={expertise.title.toLowerCase()}
                          />
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
      </div>
    </div>
  );
};

export default WorkExperience;
