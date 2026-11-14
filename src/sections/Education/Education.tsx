/**
 * Education + Certs - minimalist, matching reference aesthetic.
 */
import { Container } from "@/components/Container/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal/Reveal";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
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
        <SectionHeading
          id="edu-heading"
          eyebrow="Education & certs"
          title={
            <>
              Trained for both sides - <em>strategy and ship.</em>
            </>
          }
        />

        <RevealGroup as="div" className={styles.degrees}>
          {degrees.map((d) => (
            <RevealItem key={d.degree}>
              <div className={styles.eduRow}>
                <span className={styles.year}>{d.year}</span>
                <div className={styles.eduBody}>
                  <h3 className={styles.degree}>{d.degree}</h3>
                  <p className={styles.school}>{d.school}</p>
                </div>
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
