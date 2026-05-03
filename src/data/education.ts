/**
 * Education + Certs — pulled from the original archive.
 */

export type Degree = {
  degree: string;
  school: string;
  year: string | number;
};

export const degrees: Degree[] = [
  {
    degree: "MBA — Technology, Innovation & Entrepreneurship",
    school: "International Business University · Toronto, ON",
    year: 2025,
  },
  {
    degree: "B.Eng — Mechanical Engineering",
    school: "Ahsanullah University of Science & Technology · Dhaka",
    year: 2021,
  },
];

export const certifications: string[] = [
  "Google Project Management (PMP)",
  "IBM Generative AI",
  "Six Sigma Level 1",
  "Google Business Analysis",
];

export const heroStats = [
  { value: 137, suffix: "", label: "Page PRD authored" },
  { value: 15, suffix: "+", label: "Feature modules defined" },
  { value: 25, suffix: "%", label: "Cycle time reduction" },
  { value: 5, suffix: "×", label: "Apps shipped / in dev" },
];
