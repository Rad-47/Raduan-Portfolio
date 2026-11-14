"use client";

/**
 * Contact - closing CTA. The headline panel tilts in 3D toward the pointer,
 * the email copies to clipboard with feedback, CTAs are magnetic.
 */
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/Container/Container";
import { Magnetic } from "@/components/Magnetic/Magnetic";
import { SocialIcons } from "@/components/SocialIcons/SocialIcons";
import styles from "./Contact.module.css";

const EMAIL = "raduanridu2669@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/raduan-rahman-redu/";
const COPY_RESET_MS = 2000;
const MAX_TILT_DEG = 4;

export function Contact() {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]), spring);

  function onMove(e: React.PointerEvent) {
    const el = panelRef.current;
    if (!el || reduced || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_RESET_MS);
    } catch {
      // Clipboard blocked (permissions / insecure context) - fall back to mail client.
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <Container>
        <div className={styles.stage} onPointerMove={onMove} onPointerLeave={onLeave}>
          <motion.div
            ref={panelRef}
            className={styles.panel}
            style={reduced ? undefined : { rotateX, rotateY }}
          >
            <div className={styles.bg} aria-hidden="true">
              <div className={styles.glow} />
              <div className={styles.grid} />
            </div>

            <span className={styles.eyebrow}>What&apos;s next?</span>
            <h2 id="contact-heading" className={styles.title}>
              Let&apos;s build something
              <br />
              <em>people actually use.</em>
            </h2>
            <p className={styles.lead}>
              Hiring for product, or have an idea worth shipping? My inbox is open.
            </p>

            <div className={styles.actions}>
              <Magnetic strength={16}>
                <a href={`mailto:${EMAIL}`} className={styles.primary}>
                  Say hello
                  <span aria-hidden="true">→</span>
                </a>
              </Magnetic>
              <Magnetic strength={10}>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
                  Connect on LinkedIn ↗
                </a>
              </Magnetic>
            </div>

            <div className={styles.footerRow}>
              <button type="button" className={styles.copy} onClick={copyEmail}>
                <span className={styles.copyEmail}>{EMAIL}</span>
                <span className={styles.copyHint} aria-live="polite">
                  {copied ? "Copied ✓" : "Copy"}
                </span>
              </button>
              <SocialIcons />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
