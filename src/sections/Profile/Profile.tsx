"use client";

/**
 * Profile - the developer summary from the resume, plus an at-a-glance
 * panel (role, what I build, stack, AI tooling, links).
 */
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container/Container";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { EASE_OUT_EXPO } from "@/lib/motion";
import styles from "./Profile.module.css";

const FACTS: { label: string; value: string }[] = [
  { label: "Role", value: "Web Developer at Sparcks Inc." },
  {
    label: "I build",
    value: "Web apps, iOS & Android apps, AI pipelines and internal tools",
  },
  {
    label: "Core stack",
    value:
      "TypeScript · React · Next.js · Node.js · NestJS · React Native · PostgreSQL",
  },
  {
    label: "AI",
    value: "Claude API · RAG · agent workflows · Whisper · Claude Code daily",
  },
  { label: "Based in", value: "Toronto, ON" },
];

const LINKS = [
  { label: "GitHub", href: "https://github.com/Rad-47" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/raduan-rahman-redu/",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.ca/citations?user=VGhsMZgAAAAJ&hl=en&oi=ao",
  },
];

export function Profile() {
  const reduced = useReducedMotion();
  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
        };

  return (
    <section
      id="profile"
      className={styles.section}
      aria-labelledby="profile-heading"
    >
      <Container>
        <SectionHeading
          id="profile-heading"
          eyebrow="Developer profile"
          title={
            <>
              From idea to working software, <em>in days.</em>
            </>
          }
        />

        <div className={styles.layout}>
          <motion.div className={styles.summary} {...reveal(0)}>
            <p className={styles.lede}>
              I&apos;m a software developer who builds internal tools, web and
              mobile apps, and AI-powered automation - from idea to working
              prototype in days, using Claude Code and other AI coding tools
              every day.
            </p>
            <p className={styles.body}>
              A Mechanical Engineering degree and two years running production
              operations at a large manufacturer give me a practical feel for
              hardware, manufacturing and the people who will use what I build.
              Add product ownership on a 0→1 app and an MBA in Technology and
              Innovation, and I can take a product from the spec to the shipped
              build.
            </p>
          </motion.div>

          <motion.aside
            className={styles.card}
            aria-label="At a glance"
            {...reveal(0.12)}
          >
            <dl className={styles.facts}>
              {FACTS.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.links}>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {l.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}
