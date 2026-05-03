/**
 * Contact CTA — single line + email + LinkedIn + GitHub.
 */
import { Container } from "@/components/Container/Container";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import { Button } from "@/components/Button/Button";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className={styles.center}>
          <Reveal>
            <StatusPill status="success">Open to opportunities</StatusPill>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 id="contact-heading" className={`${styles.title} display`}>
              Let&apos;s build
              <br />
              <span className={styles.muted}>something good.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.lead}>
              Looking for BA and AI Product Owner roles in Toronto or fully
              remote at companies with Canadian presence.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className={styles.cta}>
              <Button
                variant="primary"
                size="lg"
                href="mailto:raduanridu2669@gmail.com"
              >
                raduanridu2669@gmail.com ↗
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="https://www.linkedin.com/in/raduan-rahman-redu/"
              >
                LinkedIn
              </Button>
              <Button variant="secondary" size="lg" href="https://github.com/Rad-47">
                GitHub
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
