"use client";

/**
 * Projects - bento grid of 3D tilt cards.
 * Featured project spans the full row; the rest pair up.
 * Covers open the lightbox when the project has screenshots.
 */
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container/Container";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { TiltCard } from "@/components/TiltCard/TiltCard";
import { Lightbox, type LightboxImage } from "@/components/Lightbox/Lightbox";
import { projects, type Project } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { renderBold } from "@/lib/render-bold";
import { ProjectCover } from "./ProjectCover";
import styles from "./Projects.module.css";

const FEATURED = new Set(["fanlinc", "sirclaims", "subtrack"]);
// Featured cards span a full row, so each sits before an even number of pairs.
const ORDER = [
  "fanlinc",
  "ai-lesson-generator",
  "pm-platform",
  "sparcks",
  "aurelion",
  "sirclaims",
  "qrsnapp",
  "untilthe-day",
  "subtrack",
  "webguardian",
  "triptrue",
];

const CATEGORY_BY_SLUG: Record<string, string> = {
  qrsnapp: "Web tool",
  "untilthe-day": "Web app",
  subtrack: "PWA · iOS · Android",
  fanlinc: "Web · iOS · Android",
  "ai-lesson-generator": "AI pipeline",
  "pm-platform": "Internal platform",
  sirclaims: "Healthcare AI · B2B",
  sparcks: "Company website",
  aurelion: "Client website",
  webguardian: "B2B SaaS",
  triptrue: "Mobile app",
};

const rank = (slug: string) => {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
};
const ordered = [...projects].sort((a, b) => rank(a.slug) - rank(b.slug));
const liveCount = projects.filter((p) => p.status === "live").length;

const STATUS: Record<
  Project["status"],
  { label: string; className: "live" | "dev" | "study" }
> = {
  live: { label: "Live", className: "live" },
  "in-development": { label: "In development", className: "dev" },
  "case-study": { label: "Product case study", className: "study" },
};

export function Projects() {
  const [box, setBox] = useState<{
    images: LightboxImage[];
    index: number;
  } | null>(null);

  return (
    <section
      id="work"
      className={styles.section}
      aria-labelledby="work-heading"
    >
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve <em>shipped</em>
            </>
          }
          subtitle={`${projects.length} things I've built - apps, AI pipelines, internal platforms and websites. ${liveCount} are live or in daily use. Hover to explore, click a screen to zoom.`}
        />

        <ul className={styles.grid}>
          {ordered.map((p, i) => (
            <ProjectTile
              key={p.slug}
              project={p}
              index={i}
              featured={FEATURED.has(p.slug)}
              onOpen={(images) => setBox({ images, index: 0 })}
            />
          ))}
        </ul>

        <a
          href="https://github.com/Rad-47"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.more}
        >
          <span>More on GitHub</span>
          <span className={styles.moreArrow} aria-hidden="true">
            ↗
          </span>
        </a>
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

type ProjectTileProps = {
  project: Project;
  index: number;
  featured: boolean;
  onOpen: (images: LightboxImage[]) => void;
};

function ProjectTile({ project, index, featured, onOpen }: ProjectTileProps) {
  const reduced = useReducedMotion();
  const shots = project.screenshots ?? [];
  const statusClass = STATUS[project.status].className;

  return (
    <motion.li
      className={featured ? styles.itemFeatured : styles.item}
      initial={reduced ? false : { opacity: 0, y: 60, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        ease: EASE_OUT_EXPO,
        delay: featured ? 0 : (index % 2) * 0.12,
      }}
    >
      <TiltCard className={styles.card} maxTilt={featured ? 3 : 5}>
        <article className={featured ? styles.innerFeatured : styles.inner}>
          <div className={styles.coverWrap} data-depth="40">
            {shots.length > 0 ? (
              <button
                type="button"
                className={styles.coverBtn}
                onClick={() =>
                  onOpen(shots.map((s) => ({ src: s.src, alt: s.alt })))
                }
                aria-label={`View ${shots.length} screenshot${shots.length > 1 ? "s" : ""} of ${project.title}`}
              >
                <ProjectCover project={project} featured={featured} />
              </button>
            ) : (
              <ProjectCover project={project} />
            )}
          </div>

          <div className={styles.body} data-depth="20">
            <div className={styles.metaRow}>
              <span className={styles[statusClass]}>
                <span className={styles.dot} aria-hidden="true" />
                {STATUS[project.status].label}
              </span>
              <span className={styles.category}>
                {CATEGORY_BY_SLUG[project.slug] ?? "Project"}
              </span>
              {project.year && (
                <span className={styles.year}>{project.year}</span>
              )}
            </div>

            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.tagline}>{project.tagline}</p>

            {featured && (
              <ul className={styles.bullets}>
                {project.bullets.map((b) => (
                  <li key={b}>{renderBold(b)}</li>
                ))}
              </ul>
            )}

            <ul className={styles.stack} aria-label="Tech stack">
              {project.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            {project.url && (
              <a
                aria-label={`Visit ${project.title} live site (opens in new tab)`}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visit}
              >
                Visit live site
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </article>
      </TiltCard>
    </motion.li>
  );
}
