import React from "react";
import "./calendar.css";
import contributionData from "./contribution.json";
const ContributionCalendar = () => {
  // Data from the provided JSON

  // Organize data into weeks (7 days per week)
  const weeks = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7));
  }

  // Determine color based on contribution count (mimicking GitHub's color scheme)
  const getColor = (count) => {
    if (count === 0) return "#ebedf0"; // No contributions
    if (count === 1) return "#c6e48b"; // Light green
    if (count === 2) return "#7bc96f"; // Medium green
    return "#239120"; // Dark green for 3+ contributions
  };

  return (
    <div className="contribution-calendar">
      <h2>Contribution Calendar (Apr 14, 2024 - Jun 5, 2024)</h2>
      <div className="calendar-grid">
        {/* Day labels */}
        <div className="day-labels">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        {/* Contribution grid */}
        <div className="weeks">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((day, dayIndex) => (
                <div
                  key={day.date}
                  className="day"
                  style={{ backgroundColor: getColor(day.count) }}
                  title={`${day.date}: ${day.count} contribution(s)`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="legend">
        <span>Less</span>
        <div
          className="legend-box"
          style={{ backgroundColor: "#ebedf0" }}
        ></div>
        <div
          className="legend-box"
          style={{ backgroundColor: "#c6e48b" }}
        ></div>
        <div
          className="legend-box"
          style={{ backgroundColor: "#7bc96f" }}
        ></div>
        <div
          className="legend-box"
          style={{ backgroundColor: "#239120" }}
        ></div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionCalendar;
