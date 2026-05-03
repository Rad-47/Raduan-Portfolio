"use client";

/**
 * Lightbox — minimal full-screen image viewer.
 * Keyboard: Esc closes, ←/→ navigate.
 * Click backdrop closes. Body scroll locked while open.
 */
import { useCallback, useEffect } from "react";
import Image from "next/image";
import styles from "./Lightbox.module.css";

export type LightboxImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
};

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
    },
    [isOpen, index, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, handleKey]);

  if (!isOpen || index === null) return null;
  const current = images[index];

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${current.alt}`}
    >
      <button
        type="button"
        className={styles.close}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
      >
        ✕
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width ?? 1600}
          height={current.height ?? 1000}
          className={styles.img}
          unoptimized={false}
          priority
        />
      </div>

      <div className={styles.caption}>
        <span>{current.alt}</span>
        {images.length > 1 && (
          <span className={styles.counter}>
            {index + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
}
