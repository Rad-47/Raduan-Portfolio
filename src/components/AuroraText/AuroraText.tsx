/**
 * AuroraText — color-shifting gradient text.
 * Uses background-clip:text + animated gradient position.
 * Works as inline element.
 */
import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./AuroraText.module.css";

type AuroraTextProps = {
  children: ReactNode;
  className?: string;
  /** Slow down or speed up the shift (default 8s) */
  speedSeconds?: number;
};

export function AuroraText({
  children,
  className,
  speedSeconds = 10,
}: AuroraTextProps) {
  return (
    <span
      className={clsx(styles.aurora, className)}
      style={{ animationDuration: `${speedSeconds}s` }}
    >
      {children}
    </span>
  );
}
