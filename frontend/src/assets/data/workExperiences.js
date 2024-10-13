import pickyvibe from "../img/images/pickyvibe.jpg";
import codeclause from "../img/images/codeclause.jpg";

// workExperiences.js
export const workExperiences = [
  {
    id: "Pickyvibe",
    website: "https://pickyvibe.com/",
    date: "July 2024 - Present",
    icon: pickyvibe,
    company: "PickVibe LLP",
    position: "Full Stack Developer Intern",
    description:
      "aasdasDLKsadgasldglasDGlasDGaLSD   asdsaldhsalduhasLDuaSDhasODhasODUaISUDh",
  },
  {
    id: "CodeClause",
    website: "https://codeclause.in",
    date: "July 2023 - August 2023",
    icon: codeclause,
    company: "CodeClause",
    position: "Frontend Intern",
    description: "dddfsdfsfsdfsd",
  },
];

// Function to calculate total experience
export const getTotalExperience = () => {
  const now = new Date();
  let totalMonths = 0;

  workExperiences.forEach((exp) => {
    const startDate = new Date(exp.date.split(" - ")[0]);
    const endDate = exp.date.includes("Present")
      ? now
      : new Date(exp.date.split(" - ")[1]);
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth();
    totalMonths += months;
  });

  return (totalMonths / 12).toFixed(1); // Return total years with 1 decimal place
};
