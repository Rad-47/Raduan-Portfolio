/**
 * StatusPill — small signal element ("● Available · Toronto, ON")
 * Skills applied: micro-interactions (pulse animation on dot)
 */
import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./StatusPill.module.css";

type Status = "success" | "warning" | "danger";

type StatusPillProps = {
  children: ReactNode;
  status?: Status;
  className?: string;
};

export function StatusPill({
  children,
  status = "success",
  className,
}: StatusPillProps) {
  return (
    <span className={clsx(styles.pill, styles[status], className)}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
