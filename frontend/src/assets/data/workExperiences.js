import pickyvibe from "../img/images/pickyvibe.jpg";
import codeclause from "../img/images/codeclause.jpg";
import rocklime from "../img/images/rocklime.gif";

// Month mapping (0-based index for JS Dates)
const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

// Work Experiences
export const workExperiences = [
  {
    id: "Rocklime",
    website: "https://rocklime.com",
    date: "Feb 2025 - Present",
    icon: rocklime,
    company: "Rocklime Media",
    position: "Full Stack Developer",
    description:
      "Developed dashboards and website with inventory and quotations system using different technologies. Updated websites and refactured old written codebases with more code complexity.",
  },
  {
    id: "Pickyvibe",
    website: "https://pickyvibe.com/",
    date: "Jul 2024 - Feb 2025",
    icon: pickyvibe,
    company: "PickyVibe LLP",
    position: "Full Stack Developer Intern",
    description:
      "Developed and maintained advanced infrastructure tools for Travel Agency using React.js, Node.js, ensuring industry-standard compliance. Skilled in system development, AWS, GraphQL, and problem-solving.",
  },
  {
    id: "CodeClause",
    website: "https://codeclause.in",
    date: "Jul 2023 - Aug 2023",
    icon: codeclause,
    company: "CodeClause",
    position: "Frontend Developer Intern",
    description:
      "Assisted in the development of the front end of the website and worked on various frontend projects.",
  },
];

// Function to calculate total experience
export const getTotalExperience = () => {
  const now = new Date();
  let totalMonths = 0;

  workExperiences.forEach((exp) => {
    const dateRange = exp.date.split(" - ");
    if (dateRange.length < 1) return;

    // Start date parsing
    const [startMonthAbbr, startYearRaw] = dateRange[0].split(" ");
    const startMonth = monthMap[startMonthAbbr]; // Convert abbreviation to month index
    const startYear = parseInt(startYearRaw, 10);

    if (isNaN(startYear) || startMonth === undefined) {
      console.error(`Invalid start date: ${exp.date}`);
      return;
    }

    const startDate = new Date(startYear, startMonth, 1);

    // End date parsing
    let endDate = now; // Default to "Present"
    if (dateRange[1] && dateRange[1].trim().toLowerCase() !== "present") {
      const [endMonthAbbr, endYearRaw] = dateRange[1].split(" ");
      const endMonth = monthMap[endMonthAbbr];
      const endYear = parseInt(endYearRaw, 10);

      if (!isNaN(endYear) && endMonth !== undefined) {
        endDate = new Date(endYear, endMonth, 1);
      } else {
        console.error(`Invalid end date: ${exp.date}`);
      }
    }

    // Calculate months of experience
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    totalMonths += Math.max(0, months); // Ensure no negative values
  });

  // Convert months to years (1 decimal place)
  const totalYears = (totalMonths / 12).toFixed(1);
  console.log(`Total Experience: ${totalYears} years`);
  return totalYears;
};
