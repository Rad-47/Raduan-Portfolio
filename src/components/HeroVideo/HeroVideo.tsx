"use client";

/**
 * HeroVideo - full-bleed looping background film with a legibility scrim
 * and a pause/play control (WCAG 2.2.2: moving content longer than 5s
 * must be pausable).
 *
 * - Poster paints instantly; the compressed loop (≈0.9 MB) streams after.
 * - Respects prefers-reduced-motion: starts paused on the poster.
 * - Pauses itself while scrolled offscreen to save battery/CPU.
 */
import { useEffect, useRef, useState } from "react";
import styles from "./HeroVideo.module.css";

type HeroVideoProps = {
  src: string;
  poster: string;
};

export function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      userPaused.current = true;
      video.pause();
      setIsPaused(true);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (userPaused.current) return;
      if (entry.isIntersecting) {
        video.play().catch(() => setIsPaused(true));
      } else {
        video.pause();
      }
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => setIsPaused(true));
      setIsPaused(false);
    } else {
      userPaused.current = true;
      video.pause();
      setIsPaused(true);
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-label={isPaused ? "Play background video" : "Pause background video"}
      >
        {isPaused ? (
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <rect x="4" y="3.5" width="2.6" height="9" rx="0.6" fill="currentColor" />
            <rect x="9.4" y="3.5" width="2.6" height="9" rx="0.6" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  );
}
