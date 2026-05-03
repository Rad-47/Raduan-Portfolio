"use client";

/**
 * Hero — Apple.ca-grade opener with parallax + aurora text.
 * Status pill · location → giant display name (aurora gradient last name)
 * → role tags → tagline → CTAs → 4-stat bar with animated counters.
 */
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/Container/Container";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import { Button } from "@/components/Button/Button";
import { Reveal } from "@/components/Reveal/Reveal";
import { CountUp } from "@/components/CountUp/CountUp";
import { AuroraText } from "@/components/AuroraText/AuroraText";
import { heroStats } from "@/data/education";
import styles from "./Hero.module.css";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: orbs drift up faster than content as we scroll past hero
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <section
      ref={ref}
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      {/* Floating accent orbs (parallax) */}
      <motion.div
        className={styles.orb1}
        style={prefersReduced ? undefined : { y: orbY }}
        aria-hidden="true"
      />
      <motion.div
        className={styles.orb2}
        style={prefersReduced ? undefined : { y: orbY }}
        aria-hidden="true"
      />

      <Container>
        <motion.div
          className={styles.inner}
          style={prefersReduced ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          <Reveal>
            <StatusPill status="success">
              Toronto, ON · Available for BA / AI PO roles
            </StatusPill>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 id="hero-title" className={`${styles.title} display`}>
              <span className={styles.name}>Raduan</span>
              <span className={styles.surname}>
                <AuroraText speedSeconds={9}>Rahman</AuroraText>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={styles.roles}>
              <span className={`${styles.roleTag} ${styles.r1}`}>Product Analyst</span>
              <span className={`${styles.roleTag} ${styles.r2}`}>AI Product Owner</span>
              <span className={`${styles.roleTag} ${styles.r3}`}>Builder</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className={styles.lead}>
              MBA (Technology, Innovation &amp; Entrepreneurship) + B.Eng. Certified
              in Generative AI &amp; PMP. Currently shipping FanLinc &amp;
              WebGuardian — with experience across SaaS, healthcare AI, and sports
              tech.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className={styles.cta}>
              <Button variant="primary" size="lg" href="mailto:raduanridu2669@gmail.com">
                Get in touch ↗
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

          <Reveal delay={0.25}>
            <ul className={styles.stats}>
              {heroStats.map((s) => (
                <li key={s.label} className={styles.stat}>
                  <div className={styles.statValue}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                </li>
              ))}
            </ul>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}
