import pickyvibe from "../img/images/pickyvibe.jpg";
import codeclause from "../img/images/codeclause.jpg";

// workExperiences.js
export const workExperiences = [
  {
    id: "Pickyvibe",
    website: "https://pickyvibe.com/",
    date: "July 2024 - Present",
    icon: pickyvibe,
    company: "PickyVibe LLP",
    position: "Full Stack Developer",
    description:
      "Developed and maintained advanced infrastructure tools for Travel Agency using React.js, NodeJs ensuring industry-standard compliance. Skilled in system development, AWS, GraphQl, and problem-solving.",
  },
  {
    id: "CodeClause",
    website: "https://codeclause.in",
    date: "July 2023 - August 2023",
    icon: codeclause,
    company: "CodeClause",
    position: "Frontend Intern",
    description:
      "Assisted in the development of the front end of the website and worked on various frontend projects.",
  },
];

// Function to calculate total experience
export const getTotalExperience = () => {
  const now = new Date();
  let totalMonths = 0;

  workExperiences.forEach((exp) => {
    const [startMonth, startYear] = exp.date
      .split(" - ")[0]
      .split(" ")
      .map((item, index) =>
        index === 0 ? new Date(`${item} 1`).getMonth() : parseInt(item)
      );
    const startDate = new Date(startYear, startMonth, 1);

    const endDate = exp.date.includes("Present")
      ? now
      : (() => {
          const [endMonth, endYear] = exp.date
            .split(" - ")[1]
            .split(" ")
            .map((item, index) =>
              index === 0 ? new Date(`${item} 1`).getMonth() : parseInt(item)
            );
          return new Date(endYear, endMonth, 1);
        })();

    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    totalMonths += months;
  });

  // Convert months to years and round to 1 decimal place
  const totalYears = totalMonths / 12;
  console.log(totalYears);
  return totalYears.toFixed(1); // Ensure 1 decimal place
};
