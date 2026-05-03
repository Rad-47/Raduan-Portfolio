"use client";

/**
 * Reveal — minimal scroll-reveal wrapper.
 * Brief: opacity 0→1, y 12→0, 0.6s, stagger children 0.08s.
 * No bouncy springs.
 *
 * Skills applied: motion-framer (subtle entrance only),
 *                 performance-ux (respects prefers-reduced-motion via useReducedMotion)
 */
import { ReactNode, ElementType } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const parent: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Delay before this element animates in (after viewport entry) */
  delay?: number;
  /** If true, animate immediately (not on viewport) */
  immediate?: boolean;
};

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  immediate = false,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView={immediate ? undefined : "show"}
      animate={immediate ? "show" : undefined}
      viewport={{ once: true, margin: "-60px" }}
      variants={child}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/** Wrap a list of children to stagger them per the brief. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay" | "immediate">) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={parent}
    >
      {children}
    </Component>
  );
}

/** Use inside <RevealGroup> as each item that should stagger in. */
export function RevealItem({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay" | "immediate">) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Component className={className} variants={child}>
      {children}
    </Component>
  );
}
