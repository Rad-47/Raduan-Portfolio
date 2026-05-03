/**
 * About / Now — short paragraph + a "Currently" status line.
 * Per brief: one paragraph + one current-state line.
 */
import { Container } from "@/components/Container/Container";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <Container>
        <Reveal>
          <h2 id="about-heading" className={styles.eyebrow}>
            About
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className={styles.paragraph}>
            I&apos;m Raduan — a Product Analyst and AI Product Owner based in
            Toronto. I write 100&#8209;page PRDs, prototype the hard parts in code,
            and ship the product. My background spans SaaS, healthcare AI, and
            sports tech, with an MBA in Technology &amp; Innovation and a
            B.Eng. in Mechanical Engineering. PMP and IBM Generative AI
            certified.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.now}>
            <span className={styles.nowLabel}>Currently</span>
            <span className={styles.nowText}>
              AI Product Owner at Blayz Technologies, building FanLinc — a 0-to-1
              consumer mobile app heading to 20K MAU at v1.0 beta.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
