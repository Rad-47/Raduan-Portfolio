"use client";

/**
 * Experience - scroll-drawn career timeline.
 * Pattern adapted from 21st.dev "Scroll animated timeline" (ibrandify):
 * a hairline rail fills as you scroll, a marker rides the fill, and
 * each role card tilts up from a 3D plane as it enters.
 */
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/Container/Container";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { Lightbox, type LightboxImage } from "@/components/Lightbox/Lightbox";
import { experiences } from "@/data/experience";
import { ExperienceEntry } from "./ExperienceEntry";
import styles from "./Experience.module.css";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [box, setBox] = useState<{
    images: LightboxImage[];
    index: number;
  } | null>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const headY = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="exp-heading"
    >
      <Container>
        <SectionHeading
          id="exp-heading"
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <em>made an impact</em>
            </>
          }
          subtitle="Building software and products at Sparcks today - grounded in years of engineering research and real-world operations."
        />

        <div className={styles.timelineWrap}>
          <div className={styles.rail} aria-hidden="true">
            <motion.div
              className={styles.railFill}
              style={reduced ? { scaleY: 1 } : { scaleY: progress }}
            />
            {!reduced && (
              <motion.div className={styles.cometTrack} style={{ y: headY }}>
                <span className={styles.comet} />
              </motion.div>
            )}
          </div>

          <ol ref={listRef} className={styles.list}>
            {experiences.map((exp) => (
              <ExperienceEntry
                key={`${exp.company}-${exp.date}`}
                exp={exp}
                onOpen={(images, index) => setBox({ images, index })}
              />
            ))}
          </ol>
        </div>
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
