/**
 * Project data — single source of truth.
 * Live shipped products first, then in-development.
 *
 * Screenshots live at /public/projects/<key>.jpg (extracted from
 * the original archive's base64 IMGS object — see _archive/index.html).
 */

export type ProjectStatus = "live" | "in-development";

export type Screenshot = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  tagline: string;
  description: string;
  /** Public live URL */
  url?: string;
  status: ProjectStatus;
  year: string | number;
  /** Two-color avatar gradient [from, to] */
  gradient: [string, string];
  /** Tech stack chips */
  stack: string[];
  /** Bullet highlights */
  bullets: string[];
  /** Screenshots */
  screenshots?: Screenshot[];
};

export const projects: Project[] = [
  {
    slug: "qrsnapp",
    title: "QRsnapp",
    role: "Personal · Live",
    tagline: "Branded QR codes — no signup, no watermarks.",
    description:
      "Browser-based custom QR generator with logo, color, and shape control. 14 QR types, free forever, no signup required.",
    url: "https://qrsnapp.com/",
    status: "live",
    year: 2025,
    gradient: ["#10b981", "#059669"],
    stack: ["React", "Vite", "Canvas API", "Vercel"],
    bullets: [
      "**14 QR types** — URL, vCard, Wi-Fi, calendar, location, payment, and more",
      "Custom **logo, colors, and corner shapes** with PNG / SVG / PDF export",
      "**Zero friction** — no signup, no watermarks, no usage limits",
    ],
  },
  {
    slug: "untilthe-day",
    title: "untilthe.day",
    role: "Personal · Live",
    tagline: "Beautiful countdown timers for moments that matter.",
    description:
      "Designer-themed countdown pages for weddings, trips, and life events. 10 themes, timezone-smart, shareable in 60 seconds.",
    url: "https://untilthe.day/",
    status: "live",
    year: 2025,
    gradient: ["#f43f5e", "#fb923c"],
    stack: ["Next.js", "Tailwind", "PostgreSQL", "Vercel"],
    bullets: [
      "**10 designer themes** auto-selected by event keyword",
      "**Timezone-smart** displays + 100+ holidays across 7 countries",
      "Permanent shareable links with **secret edit tokens** + rich social preview cards",
    ],
  },
  {
    slug: "subtrack",
    title: "SubTrack",
    role: "Personal · Live",
    tagline: "Subscription tracker that reads your inbox.",
    description:
      "Installable PWA + native iOS/Android with a rule-based NLP engine that parses subscription emails across 300+ services.",
    url: "https://subcription-tracker-project.vercel.app/",
    status: "live",
    year: 2025,
    gradient: ["#06b6d4", "#0ea5e9"],
    stack: ["React 18", "Vite", "Tailwind CSS", "Recharts", "Capacitor 6", "Vercel"],
    bullets: [
      "**Live PWA + native apps** — 17 categories, dashboard, analytics, renewal alerts, dark/light mode, CSV export",
      "**Rule-based NLP/NER engine** built from scratch — parses raw emails with confidence scoring across 300+ services",
      "4-step onboarding flow with subscription auto-detection and category mapping",
    ],
    screenshots: [
      { src: "/projects/sub_landing.jpg", alt: "SubTrack — Landing page" },
      { src: "/projects/sub_dashboard.jpg", alt: "SubTrack — Dashboard" },
      { src: "/projects/sub_subs.jpg", alt: "SubTrack — Subscriptions list" },
      { src: "/projects/sub_analytics.jpg", alt: "SubTrack — Analytics view" },
    ],
  },
  {
    slug: "webguardian",
    title: "WebGuardian",
    role: "Personal · In dev",
    tagline: "Lighthouse-powered website health monitoring.",
    description:
      "B2B SaaS for website health & uptime audits. Automated incident alerts, append-only audit log, sole PM and developer.",
    status: "in-development",
    year: 2025,
    gradient: ["#f59e0b", "#ef4444"],
    stack: ["Next.js 14", "NestJS", "PostgreSQL", "Redis", "BullMQ", "Lighthouse", "Clerk", "Resend"],
    bullets: [
      "**Lighthouse-powered audits** across 5 dimensions — sole PM and developer owning roadmap, PRD, and GTM",
      "**3-service monorepo** — NestJS API + Next.js 14 frontend + BullMQ worker",
      "Automated incident alerts with append-only audit log",
    ],
    screenshots: [
      { src: "/projects/web_guardian.jpg", alt: "WebGuardian — Health audit dashboard" },
    ],
  },
  {
    slug: "triptrue",
    title: "TripTrue",
    role: "Personal · In dev",
    tagline: "Road trip costs Google Maps doesn't tell you.",
    description:
      "Mobile app for true road trip cost — fuel, tolls, EV charging, hotels — with freemium pricing on Stripe + RevenueCat.",
    status: "in-development",
    year: 2025,
    gradient: ["#5e6ad2", "#8b5cf6"],
    stack: ["React Native", "Expo", "Express.js", "PostgreSQL", "Prisma", "Redis", "Google Maps API", "Stripe", "RevenueCat"],
    bullets: [
      "Calculates **true all-in road trip cost** — fuel, tolls, EV charging, hotel estimates",
      "**Free vs Pro** monetization ($4.99/mo · $19.99 lifetime) via Stripe + RevenueCat with middleware feature-gating",
      "Validated through customer discovery — addressing a documented gap in existing tools",
    ],
    screenshots: [
      { src: "/projects/triptrue.jpg", alt: "TripTrue — Cost breakdown" },
    ],
  },
];

/** FanLinc mockups embedded inside the Blayz experience card */
export const fanLincScreens: Screenshot[] = [
  { src: "/projects/fl1.jpg", alt: "FanLinc — Community Feed" },
  { src: "/projects/fl2.jpg", alt: "FanLinc — Live Events" },
  { src: "/projects/fl3.jpg", alt: "FanLinc — Top Fan Posts" },
  { src: "/projects/fl4.jpg", alt: "FanLinc — Player Details" },
  { src: "/projects/fl5.jpg", alt: "FanLinc — Discover & Challenges" },
  { src: "/projects/fl6.jpg", alt: "FanLinc — Championship Leaderboard" },
  { src: "/projects/fl7.jpg", alt: "FanLinc — User Profile & Points" },
];
