/**
 * Experience - work history.
 * Dates, titles and bullets follow the resume.
 * FanLinc work sits inside the Sparcks role; FreeFuse work is shown as a
 * project (SirClaims) in projects.ts.
 */
import { fanLincScreens } from "./projects";

export type Screenshot = { src: string; alt: string };

export type Gallery = {
  /** Header label above the strip (e.g. "Live app - FanLinc"). */
  label: string;
  /** "mobile" = portrait phone screens, "wide" = landscape web screens. */
  aspect: "mobile" | "wide";
  shots: Screenshot[];
};

export type BulletGroup = {
  /** Sub-heading for a body of work inside the role (e.g. "FanLinc"). */
  label: string;
  bullets: string[];
};

export type Experience = {
  company: string;
  role: string;
  date: string;
  location?: string;
  bullets: string[];
  /** Extra labelled groups of bullets, shown after the main list. */
  groups?: BulletGroup[];
  /** Screenshot strips rendered under the bullets. */
  galleries?: Gallery[];
  /** Proof links (publications, live work) shown at the end of the card. */
  links?: { label: string; href: string }[];
};

export const experiences: Experience[] = [
  {
    company: "Sparcks Inc.",
    role: "Web Developer",
    date: "May 2025 - Present",
    location: "Toronto, ON",
    bullets: [
      "Design, write, test and maintain web applications for the company's **enterprise learning platform** using React, Next.js and TypeScript",
      "Rebuild legacy websites and systems on current technologies, improving performance and maintainability; **built the new company website**",
      "Develop and release **mobile applications for iOS and Android**",
      "Build **AI products and agent workflows** that integrate LLM APIs into the platform and internal tools",
      "Integrate applications with backend services, third-party APIs and databases; debug and resolve issues across the stack",
      "Turn business and user requirements into specifications and working software, and document systems for users and administrators",
      "Build **SQL and Power BI dashboards** to track product usage and performance",
    ],
    groups: [
      {
        label: "FanLinc",
        bullets: [
          "Built **FanLinc**, a 0-to-1 consumer sports fan app, from concept to v1.0 across web, iOS and Android, plus the **FanLinc Kids** apps and **FanLinc Studio** for the content team",
          "Authored the **137-page FRS / PRD v1.0**: user journey mapping, WCAG 2.1 AA, and performance SLAs (<2s load, 10K+ concurrent sessions), driving toward **20,000 MAU** at v1.0 beta",
          "Defined the v1.0-v2.0 roadmap via **Jobs-to-Be-Done** and designed a **5-tier points economy** with earn/spend mechanics, fraud prevention and engagement loops",
          "Ran backlog refinement, sprint planning and design-to-dev handoffs (Agile Scrum · Figma · Jira · Miro)",
        ],
      },
    ],
    galleries: [
      { label: "Live app - FanLinc", aspect: "mobile", shots: fanLincScreens },
      {
        label: "Company website",
        aspect: "wide",
        shots: [
          {
            src: "/projects/sparcks_site.jpg",
            alt: "Sparcks company website, built and launched by Raduan",
          },
        ],
      },
    ],
  },
  {
    company: "Ripley's Aquarium of Canada",
    role: "Facility Security Liaison",
    date: "Apr 2024 - Present",
    location: "Toronto, ON",
    bullets: [
      "Analyzed incident, access and compliance data for recurring patterns and redesigned controls around root causes, improving **response efficiency 20%** and **cutting downtime 30%**",
    ],
  },
  {
    company: "PRAN-RFL Group",
    role: "Assistant Manager, Operations and Export",
    date: "Dec 2021 - Sep 2023",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Ran production, shipment and sales operations with a **16-person team** at a large manufacturer, lifting efficiency **20%**",
      "Traced recurring production and delivery failures to root causes and drove fixes across departments, reaching **95% on-time delivery**",
      "Managed an **$18M-$21M global portfolio** of bicycles and components across Europe, North America and Oceania, with **17% YoY revenue growth**",
      "Negotiated with **50+ suppliers** across Asia and Europe, accelerating lead times 20% and reducing procurement costs 15%",
    ],
  },
  {
    company: "Ahsanullah University of Science and Technology",
    role: "Lead Researcher",
    date: "Jul 2020 - Jul 2021",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Led a **5-person engineering research team** to two peer-reviewed journal papers, **cited 71 times**",
    ],
    links: [{ label: "View publications on Google Scholar", href: "https://scholar.google.ca/citations?user=VGhsMZgAAAAJ&hl=en&oi=ao" }],
  },
];
