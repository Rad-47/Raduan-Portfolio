"use client";

/**
 * Skills - interactive 3D tag sphere beside grouped, readable skill lists.
 * The sphere is decorative; the lists carry the content for everyone.
 */
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/Container/Container";
import { SectionHeading } from "@/components/SectionHeading/SectionHeading";
import { TagSphere } from "@/components/TagSphere/TagSphere";
import { skillGroups } from "@/data/skills";
import { EASE_OUT_EXPO } from "@/lib/motion";
import styles from "./Skills.module.css";

const SPHERE_PER_GROUP = 8;

// A balanced sample from every group so the sphere reads as "the whole me".
const SPHERE_TAGS = Array.from(
  new Set(skillGroups.flatMap((g) => g.pills.slice(0, SPHERE_PER_GROUP))),
);

export function Skills() {
  const reduced = useReducedMotion();

  return (
    <section
      id="skills"
      className={styles.section}
      aria-labelledby="skills-heading"
    >
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="Toolkit"
          title={
            <>
              Strategy to <em>ship</em>
            </>
          }
          subtitle="Product craft, AI fluency and enough engineering to build it myself. Drag the sphere."
        />

        <div className={styles.layout}>
          <motion.div
            className={styles.sphereCol}
            initial={
              reduced ? false : { opacity: 0, scale: 0.85, rotateY: -30 }
            }
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          >
            <TagSphere tags={SPHERE_TAGS} />
          </motion.div>

          <div className={styles.groups}>
            {skillGroups.map((g, i) => (
              <motion.div
                key={g.label}
                className={styles.group}
                initial={reduced ? false : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.8,
                  ease: EASE_OUT_EXPO,
                  delay: i * 0.06,
                }}
              >
                <h3 className={styles.groupLabel}>
                  <span className={styles.groupIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {g.label}
                </h3>
                <ul className={styles.pills}>
                  {g.pills.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
