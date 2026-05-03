/**
 * Container — max-width wrapper.
 * Default 1024px; narrow=720px (good for body prose).
 * Skills applied: ui-ux-pro-max (consistent layout grid)
 */
import { ElementType, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
  as?: ElementType;
};

export function Container({
  children,
  narrow = false,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={clsx(styles.container, narrow && styles.narrow, className)}>
      {children}
    </Tag>
  );
}
