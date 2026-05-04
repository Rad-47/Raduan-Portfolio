/**
 * Experience — work history.
 * Pulled verbatim from the original archive.
 */

export type Experience = {
  company: string;
  role: string;
  date: string;
  bullets: string[];
  /** Optional screenshot strip rendered under the bullets. */
  screenshots?: { src: string; alt: string }[];
  /** Header label above the screenshot strip (e.g. "Live App", "Selected work"). */
  screenshotsLabel?: string;
  /** Layout of the screenshot strip. "mobile" = portrait phone mockups,
   *  "wide" = landscape web/diagram screens. Defaults to "mobile". */
  screenshotsAspect?: "mobile" | "wide";
};

export const experiences: Experience[] = [
  {
    company: "Blayz Technologies — FanLinc",
    role: "Product Analyst · Product Owner",
    date: "JAN 2026 — PRESENT",
    bullets: [
      "Own the full **product lifecycle** for FanLinc — 0-to-1 consumer mobile app (iOS/Android) — driving toward **20,000 MAU** at v1.0 beta",
      "Authored the **137-page FRS / PRD v1.0** — single source of truth covering user journey mapping, WCAG 2.1 AA, and performance SLAs (<2s load, 10K+ concurrent sessions)",
      "Defined full roadmap v1.0–v2.0 via **Jobs-to-Be-Done**: Community Feed, Live Streaming, Prediction Challenges, Fantasy League, Gamification, Loyalty Points Engine",
      "Designed a **5-tier points economy** with earn/spend mechanics, fraud prevention, and engagement loop logic",
      "Cross-functional leadership — backlog refinement, sprint planning, design-to-dev handoffs (Agile Scrum · Figma · Jira · Miro)",
    ],
  },
  {
    company: "Sparck Inc.",
    role: "Business Analyst Intern · Product & Features",
    date: "MAY 2025 — JUL 2025",
    bullets: [
      "Authored requirements for an **AI-driven analytics feature** — accelerated release by **20%**",
      "Engagement analysis delivered a **15% lift in feature adoption**",
    ],
    screenshotsLabel: "Selected work",
    screenshotsAspect: "wide",
    screenshots: [
      {
        src: "/projects/sparck_1.png",
        alt: "Sparck — AI-driven analytics product feature",
      },
    ],
  },
  {
    company: "FreeFuse USA",
    role: "Product Analyst (Promoted from Intern)",
    date: "MAR 2025 — JAN 2026",
    bullets: [
      "Led product analysis for **SirClaims** — AI-powered NSA compliance & payment recovery platform for U.S. healthcare providers",
      "Conducted **user research & discovery interviews** with doctors, nurses, and hospital admins — translating clinical workflows into structured requirements",
      "Defined and documented **15+ feature modules** (IDR Case Management, Claims Center, GFE Generator, Negotiations Hub) — owning roadmap, backlog, and engineering handoff",
      "Contributed to a **25% reduction in project cycle time** via tighter requirements elicitation and Agile Scrum delivery",
      "Reduced estimated time-to-market by **3 months** through customer discovery and UX constraint mapping",
    ],
    screenshotsLabel: "Selected work",
    screenshotsAspect: "wide",
    screenshots: [
      {
        src: "/projects/freefuse_dataflow.jpg",
        alt: "SirClaims data flow architecture — onboarding, training, analysis, feedback, tracking modules feeding the main database",
      },
      {
        src: "/projects/freefuse_venue.jpg",
        alt: "Venue Intelligence — philanthropy platform landing page connecting nonprofits, venues, vendors and sponsors",
      },
      {
        src: "/projects/freefuse_healence.jpg",
        alt: "Healence — AI-powered NSA compliance and payment recovery sign-in screen for healthcare providers",
      },
    ],
  },
  {
    company: "Ripley's Aquarium of Canada",
    role: "Facility Security Liaison",
    date: "APR 2024 — PRESENT",
    bullets: [
      "Analyzed incident & compliance data — improved response efficiency by **20%**, reduced operational downtime by **30%**",
    ],
  },
  {
    company: "PRAN-RFL Group",
    role: "Assistant Manager · Operations & Export Business",
    date: "DEC 2021 — SEP 2023",
    bullets: [
      "Spearheaded an **$18M–$21M global portfolio** of bicycles and components across Europe, North America, and Oceania — **95% on-time shipments** and **17% YoY revenue growth**",
      "Directed the full lifecycle of **mountain, BMX, city, kids', and hybrid models** — integrating R&D, production, and marketing for superior product–market alignment",
      "Cultivated and negotiated partnerships with **50+ suppliers** across Asia and Europe — accelerating lead times by **20%** and reducing procurement costs by **15%** through strategic sourcing",
      "Revamped export logistics and trade documentation (**PO, PI, CI, sales contracts**) — shortening clearance cycles by **25%** while sustaining **100% trade compliance**",
      "Collaborated cross-functionally with R&D and marketing to launch **new bicycle lines for European markets** — expanding retailer partnerships and brand footprint",
      "Curtailed document processing time by **20%** by building a streamlined workflow for PO, PI, CI, sales contracts, and shipment documentation",
    ],
  },
];
