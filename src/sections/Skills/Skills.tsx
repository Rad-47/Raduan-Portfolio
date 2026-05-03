/**
 * Skills — 5 grouped pill blocks.
 */
import { Container } from "@/components/Container/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal/Reveal";
import { skillGroups } from "@/data/skills";
import styles from "./Skills.module.css";

export function Skills() {
  return (
    <section
      id="skills"
      className={styles.section}
      aria-labelledby="skills-heading"
    >
      <Container>
        <Reveal>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Skills</span>
            <h2 id="skills-heading" className={styles.title}>
              The full toolkit.
            </h2>
          </header>
        </Reveal>

        <RevealGroup as="div" className={styles.grid}>
          {skillGroups.map((g) => (
            <RevealItem key={g.label}>
              <div className={styles.block}>
                <h3 className={styles.label}>{g.label}</h3>
                <div className={styles.pills}>
                  {g.pills.map((p) => (
                    <span key={p} className={styles.pill}>{p}</span>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
