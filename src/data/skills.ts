/**
 * Skills — grouped pill blocks.
 * Pulled verbatim from the original archive.
 */

export type SkillGroup = {
  label: string;
  pills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Product Management",
    pills: [
      "Product Strategy",
      "Product Vision",
      "PLM",
      "Roadmapping",
      "MVP Definition",
      "Feature Prioritization",
      "GTM",
      "OKRs / KPIs",
      "Release Planning",
      "Backlog Management",
      "User Stories",
      "PRD / FRS Authoring",
      "Customer Discovery",
      "JTBD",
      "User Journey Mapping",
      "Mobile Apps",
    ],
  },
  {
    label: "AI & Emerging Tech",
    pills: [
      "Generative AI",
      "LLMs",
      "Prompt Engineering",
      "NLP",
      "AI Agents",
      "AI Workflow Automation",
      "Claude Code",
      "ChatGPT",
      "Gemini",
      "Cursor",
      "Devin AI",
      "GitHub Copilot",
    ],
  },
  {
    label: "Analytics & Research",
    pills: [
      "Requirements Elicitation",
      "User Research",
      "Competitive Analysis",
      "A/B Testing",
      "Funnel Analysis",
      "Data-Driven Decisions",
      "Power BI",
      "Google Analytics",
      "Stakeholder Management",
      "Exec Communication",
    ],
  },
  {
    label: "Built & Shipped",
    pills: [
      "React Native",
      "Next.js 14",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "REST APIs",
      "Figma",
      "Vercel",
      "GitHub",
    ],
  },
  {
    label: "Methodologies",
    pills: [
      "Agile Scrum",
      "Kanban",
      "Sprint Planning",
      "Lean Six Sigma",
      "Design Thinking",
      "Cross-Functional Leadership",
      "Jira",
      "Confluence",
      "Miro",
      "Notion",
      "Excel",
    ],
  },
];
