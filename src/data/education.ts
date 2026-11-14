/**
 * Education + Certs - pulled from the original archive.
 */

export type Degree = {
  degree: string;
  school: string;
  year: string | number;
};

export const degrees: Degree[] = [
  {
    degree: "MBA, Technology and Innovation",
    school: "International Business University · Toronto, ON · GPA 3.854",
    year: 2025,
  },
  {
    degree: "Bachelor of Engineering, Mechanical Engineering",
    school: "Ahsanullah University of Science and Technology · Dhaka",
    year: 2021,
  },
];

export const certifications: string[] = [
  "IBM Generative AI",
  "Google Project Management",
  "Google Business Analysis",
  "Six Sigma Level 1",
];

export const heroStats = [
  { value: 10, suffix: "", label: "Languages per AI-built course" },
  { value: 15, suffix: " yr", label: "Legacy system replaced" },
  { value: 137, suffix: "", label: "Page PRD authored" },
  { value: 71, suffix: "", label: "Research citations" },
];
