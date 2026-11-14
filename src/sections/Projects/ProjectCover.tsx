/**
 * ProjectCover - the visual top of a project tile.
 *  • 2+ wide screenshots   → 3D cascading deck of browser screens
 *  • 2+ phone screenshots  → 3D fan of phones
 *  • 1 screenshot          → floating framed browser window
 *  • none                  → typographic cover: the system as a step flow
 */
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import styles from "./ProjectCover.module.css";

type ProjectCoverProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCover({ project, featured = false }: ProjectCoverProps) {
  const shots = project.screenshots ?? [];
  const isPhone = project.screenshotsAspect === "mobile";
  const tint = { "--from": project.gradient[0], "--to": project.gradient[1] } as CSSProperties;

  if (shots.length > 1) {
    return (
      <div className={`${styles.cover} ${styles.fanCover}`} style={tint}>
        <div className={styles.fan}>
          {shots.map((s, i) => (
            <div
              key={s.src}
              className={isPhone ? styles.phoneItem : styles.fanItem}
              style={{ "--i": i, "--n": shots.length } as CSSProperties}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes={isPhone ? "200px" : featured ? "(min-width: 1024px) 420px, 60vw" : "300px"}
                className={styles.img}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (shots.length === 1) {
    const s = shots[0];
    return (
      <div className={styles.cover} style={tint}>
        <div className={styles.window}>
          <div className={styles.chrome} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.windowBody}>
            <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 520px, 90vw" className={styles.img} />
          </div>
        </div>
      </div>
    );
  }

  const flow = project.flow ?? [];
  return (
    <div className={`${styles.cover} ${styles.flowCover}`} style={tint} aria-hidden="true">
      <span className={styles.flowTitle}>{project.title}</span>
      <ol className={styles.flow}>
        {flow.map((step, i) => (
          <li key={step} className={styles.step} style={{ "--i": i } as CSSProperties}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
