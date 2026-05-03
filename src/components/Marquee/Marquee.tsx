/**
 * Marquee — horizontal infinite scroller.
 * Duplicates children for seamless loop. Pauses on hover.
 * Edges fade to background via mask.
 */
import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Marquee.module.css";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Animation duration (default 38s) */
  speedSeconds?: number;
  /** Reverse direction */
  reverse?: boolean;
};

export function Marquee({
  children,
  className,
  speedSeconds = 38,
  reverse = false,
}: MarqueeProps) {
  return (
    <div className={clsx(styles.wrap, className)} aria-hidden="true">
      <div
        className={clsx(styles.track, reverse && styles.reverse)}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        <div className={styles.row}>{children}</div>
        <div className={styles.row}>{children}</div>
      </div>
    </div>
  );
}
