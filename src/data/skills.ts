/**
 * Skills - grouped lists. Engineering, AI and tooling groups follow the
 * resume's Technical Skills; product and methods groups follow the
 * product roles.
 */

export type SkillGroup = {
  label: string;
  pills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages & frameworks",
    pills: [
      "TypeScript",
      "JavaScript",
      "SQL (PostgreSQL)",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "React Native",
      "Prisma",
      "Supabase",
      "REST APIs",
    ],
  },
  {
    label: "AI & automation",
    pills: [
      "LLM APIs (Claude)",
      "RAG",
      "Prompt engineering",
      "Agent workflows",
      "Whisper",
      "ffmpeg",
      "Claude Code",
      "GitHub Copilot",
      "OpenAI Codex",
    ],
  },
  {
    label: "Data & tools",
    pills: ["Power BI", "Dashboards", "Excel", "Git", "AWS", "Docker", "Vercel", "Jira", "Figma"],
  },
  {
    label: "Product",
    pills: [
      "Product strategy",
      "Roadmapping",
      "PRD / FRS authoring",
      "MVP definition",
      "Feature prioritization",
      "Jobs-to-Be-Done",
      "User research",
      "User journey mapping",
      "Backlog management",
      "GTM",
    ],
  },
  {
    label: "Methods",
    pills: ["Agile Scrum", "Kanban", "Sprint planning", "Lean Six Sigma", "Design thinking", "Root-cause analysis"],
  },
];
