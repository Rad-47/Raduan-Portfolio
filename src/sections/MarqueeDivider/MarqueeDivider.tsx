/**
 * MarqueeDivider — animated keyword ticker between sections.
 * Uses the global Marquee component with mono-styled chips.
 */
import { Marquee } from "@/components/Marquee/Marquee";
import styles from "./MarqueeDivider.module.css";

const KEYWORDS = [
  "Product Strategy",
  "AI / LLMs",
  "PRD Authoring",
  "Jobs-to-Be-Done",
  "Agile Scrum",
  "User Research",
  "React Native",
  "Next.js · NestJS",
  "Prompt Engineering",
  "Roadmapping",
  "GTM",
  "User Journey Mapping",
];

export function MarqueeDivider() {
  return (
    <section className={styles.section} aria-hidden="true">
      <Marquee speedSeconds={42}>
        {KEYWORDS.map((k, i) => (
          <span key={`${k}-${i}`} className={styles.item}>
            <span className={styles.label}>{k}</span>
            <span className={styles.dot}>✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
