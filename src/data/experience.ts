/**
 * Experience — work history.
 * Pulled verbatim from the original archive.
 */

export type Experience = {
  company: string;
  role: string;
  date: string;
  bullets: string[];
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
      "Managed an **$18M–$21M global export portfolio** across Europe, North America, and Oceania — 95% on-time delivery and **17% YoY revenue growth** across 50+ supplier partnerships",
    ],
  },
];
