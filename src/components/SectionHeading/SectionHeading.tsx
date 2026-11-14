"use client";

/**
 * SectionHeading - eyebrow + display title that tilts up from a 3D plane
 * as it scrolls into view (scroll-linked, not time-based).
 */
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 45%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <header ref={ref} className={clsx(styles.head, align === "center" && styles.center, className)}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowLine} aria-hidden="true" />
        {eyebrow}
      </span>
      <motion.h2
        id={id}
        className={styles.title}
        style={reduced ? undefined : { rotateX, y, opacity }}
      >
        {title}
      </motion.h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
