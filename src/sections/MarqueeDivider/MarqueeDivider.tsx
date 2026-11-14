/**
 * MarqueeDivider - animated keyword ticker between sections.
 * Uses the global Marquee component with mono-styled chips.
 */
import { Marquee } from "@/components/Marquee/Marquee";
import styles from "./MarqueeDivider.module.css";

const KEYWORDS = [
  "Next.js",
  "React Native",
  "AI agent workflows",
  "Claude API",
  "PostgreSQL",
  "Product strategy",
  "iOS & Android",
  "Internal tools",
  "Power BI",
  "Jobs-to-Be-Done",
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
