/**
 * Project data - single source of truth.
 * Live shipped products first, then in-development.
 *
 * Screenshots live at /public/projects/<key>.jpg (extracted from
 * the original archive's base64 IMGS object - see _archive/index.html).
 */

export type ProjectStatus = "live" | "in-development" | "case-study";

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
  /** Optional - omitted where the launch year isn't confirmed. */
  year?: string | number;
  /** Two-color avatar gradient [from, to] */
  gradient: [string, string];
  /** Tech stack chips */
  stack: string[];
  /** Bullet highlights */
  bullets: string[];
  /** Screenshots */
  screenshots?: Screenshot[];
  /** Screenshot shape: phone screens or landscape web screens (default). */
  screenshotsAspect?: "mobile" | "wide";
  /** For projects without screenshots: the system in 3-5 steps, shown on the cover. */
  flow?: string[];
};

export const projects: Project[] = [
  {
    slug: "fanlinc",
    title: "FanLinc & FanLinc Kids",
    role: "Sparcks Inc. · Live",
    tagline: "A sports fan app built from concept to v1.0 on web, iOS and Android.",
    description:
      "Consumer sports fan community app, its FanLinc Kids companion apps, and FanLinc Studio - an internal web app for the content team.",
    status: "live",
    gradient: ["#3b82f6", "#1d4ed8"],
    stack: ["React Native", "Next.js", "TypeScript", "iOS", "Android"],
    bullets: [
      "Built the consumer fan app **from concept to v1.0** across web, iOS and Android, then iterated on real usage data",
      "Built the **FanLinc Kids** mobile apps for iOS and Android",
      "Built **FanLinc Studio**, an internal web app for the content team",
    ],
    screenshotsAspect: "mobile",
    screenshots: [
      { src: "/projects/fl1.jpg", alt: "FanLinc - Community Feed" },
      { src: "/projects/fl2.jpg", alt: "FanLinc - Live Events" },
      { src: "/projects/fl6.jpg", alt: "FanLinc - Championship Leaderboard" },
      { src: "/projects/fl7.jpg", alt: "FanLinc - User Profile & Points" },
      { src: "/projects/fl5.jpg", alt: "FanLinc - Discover & Challenges" },
    ],
  },
  {
    slug: "ai-lesson-generator",
    title: "AI Lesson Generator",
    role: "Sparcks Inc. · Internal",
    tagline: "One training video in, an auto-graded mobile course in 10 languages out.",
    description:
      "Automated pipeline that turns a single training video into an interactive, auto-graded mobile course in 10 languages.",
    status: "live",
    gradient: ["#10b981", "#047857"],
    stack: ["Claude API", "Whisper", "ffmpeg", "yt-dlp"],
    bullets: [
      "Turns one training video into an **interactive, auto-graded mobile course in 10 languages**",
      "Chains **video download, speech-to-text, media processing and LLM generation** into one repeatable workflow",
      "Replaced **hours of manual course building** per lesson",
    ],
    flow: ["Video", "Whisper", "ffmpeg", "Claude", "10-language course"],
    screenshots: [
      {
        src: "/projects/ai_lesson_generator.jpg",
        alt: "AI Lesson Generator - 'Create a course' screen where a trainer pastes a video link to build an assessed mobile course",
      },
    ],
  },
  {
    slug: "pm-platform",
    title: "Project Management Platform",
    role: "Sparcks Inc. · Internal",
    tagline: "Replaced a 15-year-old third-party system used across the company.",
    description:
      "Internal platform with time tracking, Kanban boards, Gantt scheduling, and cost and finance analytics.",
    status: "live",
    gradient: ["#f59e0b", "#b45309"],
    stack: ["Next.js", "Supabase", "Prisma", "PostgreSQL"],
    bullets: [
      "Time tracking, **Kanban boards, Gantt scheduling**, cost and finance analytics",
      "Designed the **database schema and backend logic**",
      "Replaced a **15-year-old third-party system** used across the company",
    ],
    flow: ["Time tracking", "Kanban", "Gantt", "Finance analytics"],
    screenshots: [
      {
        src: "/projects/pm_platform.jpg",
        alt: "Sparcks PM sign-in screen - 'Every hour accounted for. Every ledger ready to send.' with backdated logs, epics and Excel export",
      },
    ],
  },
  {
    slug: "sirclaims",
    title: "SirClaims",
    role: "FreeFuse USA · Product",
    tagline: "AI-powered NSA compliance and payment recovery for U.S. healthcare providers.",
    description:
      "Product analysis and requirements for an AI platform that helps providers manage No Surprises Act disputes and recover payments.",
    status: "case-study",
    gradient: ["#0ea5e9", "#0369a1"],
    stack: ["User research", "Requirements", "Roadmap", "Agile Scrum", "Jira", "Figma"],
    bullets: [
      "Ran **discovery interviews** with doctors, nurses and hospital admins, turning clinical workflows into structured requirements",
      "Defined **15+ feature modules** (IDR Case Management, Claims Center, GFE Generator, Negotiations Hub), owning roadmap, backlog and engineering handoff",
      "Helped cut **project cycle time 25%** and estimated time-to-market by **3 months**",
    ],
    screenshots: [
      {
        src: "/projects/freefuse_healence.jpg",
        alt: "Healence - AI-powered NSA compliance sign-in screen",
      },
      {
        src: "/projects/freefuse_dataflow.jpg",
        alt: "SirClaims data flow architecture - onboarding, training, analysis, feedback and tracking modules",
      },
      {
        src: "/projects/freefuse_venue.jpg",
        alt: "Venue Intelligence - philanthropy platform landing page, also from the FreeFuse work",
      },
    ],
  },
  {
    slug: "qrsnapp",
    title: "QRsnapp",
    role: "Personal · Live",
    tagline: "Branded QR codes - no signup, no watermarks.",
    description:
      "Browser-based custom QR generator with logo, color, and shape control. 14 QR types, free forever, no signup required.",
    url: "https://qrsnapp.com/",
    status: "live",
    year: 2025,
    gradient: ["#10b981", "#059669"],
    stack: ["React", "Vite", "Canvas API", "Vercel"],
    bullets: [
      "**14 QR types** - URL, vCard, Wi-Fi, calendar, location, payment, and more",
      "Custom **logo, colors, and corner shapes** with PNG / SVG / PDF export",
      "**Zero friction** - no signup, no watermarks, no usage limits",
    ],
    screenshots: [
      { src: "/projects/qrsnapp_site.jpg", alt: "QRsnapp - free QR code and barcode generator homepage" },
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
    screenshots: [
      { src: "/projects/untilthe_site.jpg", alt: "untilthe.day - countdown creator with live preview card" },
    ],
  },
  {
    slug: "sparcks",
    title: "Sparcks",
    role: "Sparcks Inc. · Live",
    tagline: "The new company website for an enterprise learning platform with 20+ years in the field.",
    description:
      "Website for Sparcks, a custom enterprise learning-management platform serving organizations with complex training, certification and compliance needs.",
    url: "https://www.sparcksglobal.com/",
    status: "live",
    gradient: ["#d6a756", "#8a6a3b"],
    stack: ["Next.js", "Vercel", "21st.dev"],
    bullets: [
      "Immersive **interactive 3D hero** with a cinematic, editorial layout",
      "Solutions, use cases, industry fit, testimonials and FAQ - structured for **enterprise buyers**",
      "Demo-request funnel plus team, blog and case-study pages",
    ],
    screenshots: [
      { src: "/projects/sparcks_site.jpg", alt: "Sparcks - enterprise learning platform homepage with 3D hero" },
    ],
  },
  {
    slug: "aurelion",
    title: "Aurelion Global",
    role: "Client site · Live",
    tagline: "Career support for international talent across the U.S. & Canada.",
    description:
      "Website for Aurelion Global, a 6-month program that rebuilds resumes, applies to jobs daily and coordinates interviews for international students and professionals.",
    url: "https://www.aurelionglobal.in/",
    status: "live",
    gradient: ["#10b981", "#0f766e"],
    stack: ["Next.js"],
    bullets: [
      "Interactive **3D Earth globe** with destination picker and career map",
      "Six-step process timeline, **pricing with fee estimator** in USD & CAD",
      "Consultation booking flow and FAQ",
    ],
    screenshots: [
      { src: "/projects/aurelion_site.jpg", alt: "Aurelion Global - 'Your career, across borders' homepage with 3D globe" },
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
      "**Live PWA + native apps** - 17 categories, dashboard, analytics, renewal alerts, dark/light mode, CSV export",
      "**Rule-based NLP/NER engine** built from scratch - parses raw emails with confidence scoring across 300+ services",
      "4-step onboarding flow with subscription auto-detection and category mapping",
    ],
    screenshots: [
      { src: "/projects/sub_landing.jpg", alt: "SubTrack - Landing page" },
      { src: "/projects/sub_dashboard.jpg", alt: "SubTrack - Dashboard" },
      { src: "/projects/sub_subs.jpg", alt: "SubTrack - Subscriptions list" },
      { src: "/projects/sub_analytics.jpg", alt: "SubTrack - Analytics view" },
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
      "**Lighthouse-powered audits** across 5 dimensions - sole PM and developer owning roadmap, PRD, and GTM",
      "**3-service monorepo** - NestJS API + Next.js 14 frontend + BullMQ worker",
      "Automated incident alerts with append-only audit log",
    ],
    screenshots: [
      { src: "/projects/web_guardian.jpg", alt: "WebGuardian - Health audit dashboard" },
    ],
  },
  {
    slug: "triptrue",
    title: "TripTrue",
    role: "Personal · In dev",
    tagline: "Road trip costs Google Maps doesn't tell you.",
    description:
      "Mobile app for true road trip cost - fuel, tolls, EV charging, hotels - with freemium pricing on Stripe + RevenueCat.",
    status: "in-development",
    year: 2025,
    gradient: ["#5e6ad2", "#8b5cf6"],
    stack: ["React Native", "Expo", "Express.js", "PostgreSQL", "Prisma", "Redis", "Google Maps API", "Stripe", "RevenueCat"],
    bullets: [
      "Calculates **true all-in road trip cost** - fuel, tolls, EV charging, hotel estimates",
      "**Free vs Pro** monetization ($4.99/mo · $19.99 lifetime) via Stripe + RevenueCat with middleware feature-gating",
      "Validated through customer discovery - addressing a documented gap in existing tools",
    ],
    screenshots: [
      { src: "/projects/triptrue.jpg", alt: "TripTrue - Cost breakdown" },
    ],
  },
];

/** FanLinc app screens, shown on the Sparcks Inc. - FanLinc experience card */
export const fanLincScreens: Screenshot[] = [
  { src: "/projects/fl1.jpg", alt: "FanLinc - Community Feed" },
  { src: "/projects/fl2.jpg", alt: "FanLinc - Live Events" },
  { src: "/projects/fl3.jpg", alt: "FanLinc - Top Fan Posts" },
  { src: "/projects/fl4.jpg", alt: "FanLinc - Player Details" },
  { src: "/projects/fl5.jpg", alt: "FanLinc - Discover & Challenges" },
  { src: "/projects/fl6.jpg", alt: "FanLinc - Championship Leaderboard" },
  { src: "/projects/fl7.jpg", alt: "FanLinc - User Profile & Points" },
];
