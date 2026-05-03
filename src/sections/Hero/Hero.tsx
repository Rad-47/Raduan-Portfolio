/**
 * Hero — homepage opener.
 * Brief: StatusPill + two-tone h1 + lead + 2 CTAs + subtle radial purple glow.
 *
 * Skills applied: ui-ux-pro-max (token-driven), landing-page-conversion
 * (clear above-fold value, CTA pair), motion-framer (subtle reveal)
 */
import { Container } from "@/components/Container/Container";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import { Button } from "@/components/Button/Button";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* Subtle radial purple glow — opacity 0.3, filter blur(80px) */}
      <div className={styles.glow} aria-hidden="true" />

      <Container>
        <div className={styles.inner}>
          <Reveal>
            <StatusPill status="success">Available · Toronto, ON</StatusPill>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 id="hero-title" className={styles.title}>
              <span className={styles.bright}>Product Analyst &amp;</span>
              <span className={styles.bright}>AI Product Owner.</span>
              <span className={styles.muted}>
                Plans, writes, and ships AI products end&#8209;to&#8209;end.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.lead}>
              Background in SaaS, healthcare, and sports tech. Currently shipping
              FanLinc and four personal products from Toronto.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className={styles.cta}>
              <Button variant="primary" size="lg" href="#work">
                View work →
              </Button>
              <Button variant="secondary" size="lg" href="#contact">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
