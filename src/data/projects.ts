/**
 * Project data — single source of truth.
 * Live shipped products first, then in-development.
 *
 * `slug` powers the case study route (Phase 4) at /work/[slug]
 * `gradient` is [from, to] for the 64px ProjectCard avatar.
 */

export type ProjectStatus = "live" | "in-development";

export type Project = {
  slug: string;
  title: string;
  role: string;
  description: string;
  /** Public live URL (for "Visit →" buttons + external link cards) */
  url?: string;
  /** Internal case study route — defaults to /work/{slug} */
  caseStudyHref?: string;
  status: ProjectStatus;
  year: string | number;
  gradient: [string, string];
};

export const projects: Project[] = [
  {
    slug: "qrsnapp",
    title: "QRsnapp",
    role: "Personal · Live",
    description:
      "Browser-based custom QR generator — branded codes with logo, color, and shape. 14 QR types, no signup, free forever.",
    url: "https://qrsnapp.com/",
    status: "live",
    year: 2025,
    gradient: ["#10b981", "#059669"], // lime → emerald
  },
  {
    slug: "untilthe-day",
    title: "untilthe.day",
    role: "Personal · Live",
    description:
      "Beautiful countdown timers for the moments that matter — 10 designer themes, timezone-smart, shareable in 60 seconds.",
    url: "https://untilthe.day/",
    status: "live",
    year: 2025,
    gradient: ["#f43f5e", "#fb923c"], // rose → orange
  },
  {
    slug: "subtrack",
    title: "SubTrack",
    role: "Personal · Live",
    description:
      "Subscription tracker — installable PWA + native iOS/Android with a rule-based NLP engine for 300+ services.",
    url: "https://subcription-tracker-project.vercel.app/",
    status: "live",
    year: 2025,
    gradient: ["#06b6d4", "#0ea5e9"], // cyan → sky
  },
  {
    slug: "webguardian",
    title: "WebGuardian",
    role: "Personal · In dev",
    description:
      "B2B SaaS for website health & uptime — Lighthouse audits across 5 dimensions, 3-service monorepo, sole PM and developer.",
    status: "in-development",
    year: 2025,
    gradient: ["#f59e0b", "#ef4444"], // amber → red
  },
  {
    slug: "triptrue",
    title: "TripTrue",
    role: "Personal · In dev",
    description:
      "Road trip cost calculator — fuel, tolls, EV charging, hotels. Free vs Pro on Stripe + RevenueCat.",
    status: "in-development",
    year: 2025,
    gradient: ["#5e6ad2", "#8b5cf6"], // indigo → violet
  },
];
