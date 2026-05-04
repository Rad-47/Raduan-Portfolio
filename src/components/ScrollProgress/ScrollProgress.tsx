"use client";

/**
 * ScrollProgress — thin top bar that fills as the page scrolls.
 * Uses framer-motion's useScroll + useSpring for buttery progress.
 */
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });

  return <motion.div className={styles.bar} style={{ scaleX }} aria-hidden="true" />;
}
