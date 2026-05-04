"use client";

/**
 * Experience — vertical timeline of jobs with FanLinc mockup gallery
 * embedded in the Blayz card (the first job).
 */
import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/Container/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal/Reveal";
import { Lightbox, LightboxImage } from "@/components/Lightbox/Lightbox";
import { experiences, Experience as Exp } from "@/data/experience";
import { fanLincScreens } from "@/data/projects";
import styles from "./Experience.module.css";

function renderBullet(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 === 0 ? p : <strong key={i}>{p}</strong>));
}

export function Experience() {
  const [box, setBox] = useState<{ images: LightboxImage[]; index: number } | null>(
    null
  );

  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="exp-heading"
    >
      <Container>
        <Reveal>
          <header className={styles.head}>
            <span className={styles.eyebrow}>Experience</span>
            <h2 id="exp-heading" className={styles.title}>
              Where I&apos;ve worked
              <br />
              <span className={styles.muted}>and what I&apos;ve shipped.</span>
            </h2>
          </header>
        </Reveal>

        <RevealGroup as="div" className={styles.timeline}>
          {experiences.map((exp, i) => (
            <RevealItem key={`${exp.company}-${i}`}>
              <ExperienceCard exp={exp} index={i} onOpen={(images, index) => setBox({ images, index })} />
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

type ExperienceCardProps = {
  exp: Exp;
  index: number;
  onOpen: (images: LightboxImage[], index: number) => void;
};

function ExperienceCard({ exp, index, onOpen }: ExperienceCardProps) {
  // Resolve the screenshot strip for this card: prefer the entry's own
  // screenshots; for the first card (Blayz) fall back to the FanLinc set
  // so existing data isn't disturbed.
  const isFanLincFallback = index === 0 && !exp.screenshots;
  const screenshots = exp.screenshots ?? (isFanLincFallback ? fanLincScreens : null);
  const aspect = exp.screenshotsAspect ?? (isFanLincFallback ? "mobile" : "wide");
  const label =
    exp.screenshotsLabel ?? (isFanLincFallback ? "Live App — FanLinc" : null);

  const lbImages: LightboxImage[] =
    screenshots?.map((s) => ({ src: s.src, alt: s.alt })) ?? [];

  return (
    <article className={styles.card}>
      <span className={styles.node} aria-hidden="true" />
      <header className={styles.cardHead}>
        <div className={styles.cardLeft}>
          <h3 className={styles.company}>{exp.company}</h3>
          <p className={styles.role}>{exp.role}</p>
        </div>
        <span className={styles.date}>{exp.date}</span>
      </header>
      <ul className={styles.bullets}>
        {exp.bullets.map((b, i) => (
          <li key={i}>{renderBullet(b)}</li>
        ))}
      </ul>

      {screenshots && screenshots.length > 0 && (
        <div className={styles.gallery}>
          {label && <div className={styles.galleryLabel}>{label}</div>}
          <div
            className={
              aspect === "wide" ? styles.wideThumbs : styles.mobileThumbs
            }
          >
            {screenshots.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={
                  aspect === "wide" ? styles.wideThumb : styles.mobileThumb
                }
                onClick={() => onOpen(lbImages, i)}
                aria-label={`Open ${s.alt} in lightbox`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={aspect === "wide" ? 480 : 200}
                  height={aspect === "wide" ? 280 : 420}
                  className={
                    aspect === "wide" ? styles.wideImg : styles.mobileImg
                  }
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
