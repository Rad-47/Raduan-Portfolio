"use client";

/**
 * Projects — full-detail personal projects with screenshot strips + lightbox.
 * Replaces the minimal ProjectCard for the homepage.
 */
import { useState, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/Container/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal/Reveal";
import { Lightbox, LightboxImage } from "@/components/Lightbox/Lightbox";
import { projects, Project, Screenshot } from "@/data/projects";
import styles from "./Projects.module.css";

/** Render bullet text with **bold** segments */
function renderBullet(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 === 0 ? p : <strong key={i}>{p}</strong>));
}

export function Projects() {
  const [box, setBox] = useState<{ images: LightboxImage[]; index: number } | null>(
    null
  );

  const yearRange = useMemo(() => {
    const ys = projects.map((p) => Number(p.year)).filter(Boolean);
    const lo = Math.min(...ys);
    const hi = Math.max(...ys);
    return lo === hi ? `${lo}` : `${lo}–${hi}`;
  }, []);

  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <Container>
        <Reveal>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Selected work</span>
            <h2 id="work-heading" className={styles.title}>
              Personal projects shipped
              <br />
              <span className={styles.muted}>and in development.</span>
            </h2>
            <p className={styles.subhead}>
              Five products, three live. {yearRange}.
            </p>
          </header>
        </Reveal>

        <RevealGroup as="div" className={styles.list}>
          {projects.map((p) => (
            <RevealItem key={p.slug}>
              <ProjectRow project={p} onOpenLightbox={(images, index) => setBox({ images, index })} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      <Lightbox
        images={box?.images ?? []}
        index={box?.index ?? null}
        onClose={() => setBox(null)}
        onNavigate={(i) => box && setBox({ ...box, index: i })}
      />
    </section>
  );
}

type ProjectRowProps = {
  project: Project;
  onOpenLightbox: (images: LightboxImage[], index: number) => void;
};

function ProjectRow({ project, onOpenLightbox }: ProjectRowProps) {
  const lbImages: LightboxImage[] =
    project.screenshots?.map((s: Screenshot) => ({ src: s.src, alt: s.alt })) ?? [];

  return (
    <article
      className={styles.card}
      style={
        {
          "--card-grad-a": project.gradient[0],
          "--card-grad-b": project.gradient[1],
        } as React.CSSProperties
      }
    >
      <header className={styles.cardHead}>
        <div className={styles.cardLeft}>
          <span className={`${styles.statusDot} ${project.status === "live" ? styles.live : styles.dev}`}>
            <span className={styles.dot} aria-hidden="true" />
            {project.status === "live" ? "Live" : "In development"}
          </span>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitBtn}
            aria-label={`Visit ${project.title} live site`}
          >
            Visit
            <span className={styles.visitArrow} aria-hidden="true">↗</span>
          </a>
        )}
      </header>

      <div className={styles.body}>
        <p className={styles.description}>{project.description}</p>

        <ul className={styles.bullets}>
          {project.bullets.map((b, i) => (
            <li key={i}>{renderBullet(b)}</li>
          ))}
        </ul>

        <div className={styles.stack}>
          {project.stack.map((tech) => (
            <span key={tech} className={styles.chip}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <div className={styles.gallery}>
          <div className={styles.galleryLabel}>Screenshots</div>
          <div className={styles.thumbs}>
            {project.screenshots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={styles.thumb}
                onClick={() => onOpenLightbox(lbImages, i)}
                aria-label={`Open ${s.alt} in lightbox`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={400}
                  height={250}
                  className={styles.thumbImg}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
