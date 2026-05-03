/**
 * Contact CTA — single line + email button. Per brief: do not overdesign.
 */
import { Container } from "@/components/Container/Container";
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
        <Reveal>
          <h2 id="contact-heading" className={styles.line}>
            Let&apos;s build something good together.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className={styles.cta}>
            <Button
              variant="primary"
              size="lg"
              href="mailto:raduanridu2669@gmail.com"
            >
              raduanridu2669@gmail.com →
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="https://www.linkedin.com/in/raduan-rahman-redu/"
            >
              LinkedIn
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
