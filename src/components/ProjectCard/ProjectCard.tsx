/**
 * ProjectCard — horizontal card per brief spec.
 * 64px gradient avatar | title + role pill + description | arrow
 * Skills applied: micro-interactions (hover state, arrow slide),
 *                 ui-ux-pro-max (token-driven spacing, type)
 */
import { CSSProperties } from "react";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

export type ProjectCardProps = {
  title: string;
  role: string;
  description: string;
  href: string;
  /** [from, to] hex colors for the avatar's 135deg linear gradient */
  gradient: [string, string];
  /** Override the letter shown in the avatar; defaults to title[0] */
  initial?: string;
};

export function ProjectCard({
  title,
  role,
  description,
  href,
  gradient,
  initial,
}: ProjectCardProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const cardStyle = {
    "--card-accent": gradient[0],
    "--card-grad-a": gradient[0],
    "--card-grad-b": gradient[1],
  } as CSSProperties;

  const inner = (
    <>
      <span className={styles.avatar} aria-hidden="true">
        {initial ?? title[0]}
      </span>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.rolePill}>{role}</span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
        style={cardStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.card} style={cardStyle}>
      {inner}
    </Link>
  );
}
