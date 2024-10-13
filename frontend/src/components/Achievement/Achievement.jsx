import React, { useState } from "react";
import { achievements } from "../../assets/data/achievements";
import { FaPlus, FaMinus } from "react-icons/fa";

const Achievement = () => {
  // State to track which accordion item is expanded
  const [expandedId, setExpandedId] = useState(null);

  // Toggle function to expand/collapse an item
  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="frequently-asked-questions">
      <h2 className="main-common-title">Achievements</h2>
      <div className="achievements-main">
        <div className="accordion" id="accordionExample">
          {achievements.map((achievement) => (
            <div className="accordion-item" key={achievement.id}>
              <h4 className="accordion-header" id={`heading${achievement.id}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  aria-expanded={expandedId === achievement.id}
                  aria-controls={`collapse${achievement.id}`}
                  onClick={() => toggleAccordion(achievement.id)}
                >
                  {achievement.title}
                  <span className="ms-auto">
                    <span className="icon ms-4">
                      {expandedId === achievement.id ? <FaMinus /> : <FaPlus />}
                    </span>
                  </span>
                </button>
              </h4>
              <div
                id={`collapse${achievement.id}`}
                className={`accordion-collapse collapse ${
                  expandedId === achievement.id ? "show" : ""
                }`}
                aria-labelledby={`heading${achievement.id}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>{achievement.description}</p>
                  <p>{achievement.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievement;
