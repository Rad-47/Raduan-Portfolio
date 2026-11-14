"use client";

/**
 * Hero - cinematic opener. A looping film fills a rounded full-screen
 * stage; the serif statement sits bottom-left (words rise out of a mask),
 * intro + CTAs bottom-right, and the proof stats sit on the paper just
 * below the stage. The stage eases back slightly as you scroll.
 */
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { CountUp } from "@/components/CountUp/CountUp";
import { HeroVideo } from "@/components/HeroVideo/HeroVideo";
import { heroStats } from "@/data/education";
import { EASE_OUT_EXPO } from "@/lib/motion";
import styles from "./Hero.module.css";

const WORD_STAGGER = 0.07;
const HEADLINE_DELAY = 0.35;

type Word = { text: string; isAccent?: boolean };
const HEADLINE: Word[][] = [
  [{ text: "Raduan" }, { text: "Rahman" }, { text: "builds" }],
  [{ text: "products" }, { text: "people" }],
  [{ text: "actually", isAccent: true }, { text: "use." }],
];

const rise: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.1,
      ease: EASE_OUT_EXPO,
      delay: HEADLINE_DELAY + i * WORD_STAGGER,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
  }),
};

function Headline() {
  let index = 0;
  return (
    <h1 id="hero-title" className={styles.title}>
      {HEADLINE.map((line, li) => (
        <span key={li} className={styles.line}>
          {line.map((w) => {
            const i = index++;
            return (
              <span key={w.text} className={styles.mask}>
                <motion.span
                  className={w.isAccent ? styles.accentWord : styles.word}
                  variants={rise}
                  custom={i}
                >
                  {w.text}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      id="about"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <motion.div
        className={styles.stage}
        style={reduced ? undefined : { scale: stageScale }}
        initial={reduced ? "show" : "hidden"}
        animate="show"
      >
        <HeroVideo src="/hero/hero-loop.mp4" poster="/hero/hero-poster.jpg" />

        <motion.div
          className={styles.bottom}
          style={reduced ? undefined : { y: contentY }}
        >
          <div className={styles.headBlock}>
            <motion.p className={styles.meta} variants={fadeUp} custom={0.15}>
              <span>Software Developer &amp; Product Owner</span>
              <span className={styles.metaRule} aria-hidden="true" />
              <span>Toronto, Canada</span>
            </motion.p>
            <Headline />
          </div>

          <div className={styles.aside}>
            <motion.p className={styles.lead} variants={fadeUp} custom={0.9}>
              I design, build and ship web, mobile and AI products - from a 0→1
              sports app to an AI pipeline that turns one training video into a
              course in <em>10 languages</em>.
            </motion.p>
            <motion.div className={styles.cta} variants={fadeUp} custom={1.05}>
              <a href="#work" className={styles.pill}>
                View selected work
                <span className={styles.pillIcon} aria-hidden="true">
                  →
                </span>
              </a>
              <a href="mailto:raduanridu2669@gmail.com" className={styles.mail}>
                Get in touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.dl
        className={styles.stats}
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.2 }}
      >
        {heroStats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <dt className={styles.statLabel}>{s.label}</dt>
            <dd className={styles.statValue}>
              <CountUp to={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
