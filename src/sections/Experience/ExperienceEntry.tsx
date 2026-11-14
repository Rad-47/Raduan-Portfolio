"use client";

/**
 * ExperienceEntry - one role on the timeline: node, date, 3D flip-in card,
 * optional labelled bullet groups and screenshot strips.
 */
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LightboxImage } from "@/components/Lightbox/Lightbox";
import type { Experience, Gallery } from "@/data/experience";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { renderBold } from "@/lib/render-bold";
import styles from "./Experience.module.css";

type OpenLightbox = (images: LightboxImage[], index: number) => void;

function GalleryStrip({
  gallery,
  onOpen,
}: {
  gallery: Gallery;
  onOpen: OpenLightbox;
}) {
  const isWide = gallery.aspect === "wide";
  const images: LightboxImage[] = gallery.shots.map((s) => ({
    src: s.src,
    alt: s.alt,
  }));
  return (
    <div className={styles.gallery}>
      <div className={styles.galleryLabel}>{gallery.label}</div>
      <div className={isWide ? styles.wideThumbs : styles.mobileThumbs}>
        {gallery.shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={isWide ? styles.wideThumb : styles.mobileThumb}
            onClick={() => onOpen(images, i)}
            aria-label={`Open ${s.alt} in lightbox`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={isWide ? 480 : 200}
              height={isWide ? 280 : 420}
              className={styles.thumbImg}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

type ExperienceEntryProps = {
  exp: Experience;
  onOpen: OpenLightbox;
};

export function ExperienceEntry({ exp, onOpen }: ExperienceEntryProps) {
  const reduced = useReducedMotion();
  const isCurrent = /present/i.test(exp.date);

  return (
    <li className={styles.entry}>
      <motion.span
        className={styles.node}
        aria-hidden="true"
        initial={reduced ? false : { scale: 0.4, opacity: 0.3 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ margin: "-45% 0px -45% 0px" }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      />

      <div className={styles.dateCol}>
        <span className={styles.date}>{exp.date}</span>
        {isCurrent && <span className={styles.now}>Current</span>}
      </div>

      <motion.article
        className={styles.card}
        initial={reduced ? false : { opacity: 0, rotateX: -28, y: 60 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO }}
      >
        <header className={styles.cardHead}>
          <h3 className={styles.role}>{exp.role}</h3>
          <p className={styles.company}>
            {exp.company}
            {exp.location && (
              <span className={styles.location}> · {exp.location}</span>
            )}
          </p>
        </header>

        <ul className={styles.bullets}>
          {exp.bullets.map((b) => (
            <li key={b}>{renderBold(b)}</li>
          ))}
        </ul>

        {exp.groups?.map((group) => (
          <div key={group.label} className={styles.group}>
            <h4 className={styles.groupLabel}>{group.label}</h4>
            <ul className={styles.bullets}>
              {group.bullets.map((b) => (
                <li key={b}>{renderBold(b)}</li>
              ))}
            </ul>
          </div>
        ))}

        {exp.galleries?.map((gallery) => (
          <GalleryStrip key={gallery.label} gallery={gallery} onOpen={onOpen} />
        ))}

        {exp.links && exp.links.length > 0 && (
          <div className={styles.links}>
            {exp.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.proofLink}
              >
                {l.label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </motion.article>
    </li>
  );
}
