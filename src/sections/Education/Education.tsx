/**
 * Education + Certs.
 */
import { Container } from "@/components/Container/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal/Reveal";
import { degrees, certifications } from "@/data/education";
import styles from "./Education.module.css";

export function Education() {
  return (
    <section
      id="education"
      className={styles.section}
      aria-labelledby="edu-heading"
    >
      <Container>
        <Reveal>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Education &amp; Certs</span>
            <h2 id="edu-heading" className={styles.title}>
              Trained for both sides — strategy and ship.
            </h2>
          </header>
        </Reveal>

        <RevealGroup as="div" className={styles.degrees}>
          {degrees.map((d) => (
            <RevealItem key={d.degree}>
              <div className={styles.eduCard}>
                <h3 className={styles.degree}>{d.degree}</h3>
                <p className={styles.school}>{d.school}</p>
                <span className={styles.year}>{d.year}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className={styles.certs}>
            <span className={styles.certsLabel}>Certifications</span>
            <ul className={styles.certList}>
              {certifications.map((c) => (
                <li key={c} className={styles.cert}>
                  <span className={styles.certBullet} aria-hidden="true">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
