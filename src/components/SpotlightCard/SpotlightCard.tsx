"use client";

/**
 * SpotlightCard — wrapper that adds a cursor-follow radial highlight.
 * Tracks mouse position via CSS variables (--mx, --my) on hover.
 * Pure pointer events; no layout shift.
 */
import { ReactNode, useRef } from "react";
import clsx from "clsx";
import styles from "./SpotlightCard.module.css";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Color of the spotlight glow (default uses --accent) */
  color?: string;
  /** Spotlight radius in px (default 380) */
  size?: number;
};

export function SpotlightCard({
  children,
  className,
  color,
  size = 380,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={clsx(styles.card, className)}
      style={
        {
          "--spot-color": color ?? "rgba(94, 106, 210, 0.18)",
          "--spot-size": `${size}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.spot} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
