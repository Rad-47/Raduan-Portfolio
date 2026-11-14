"use client";

/**
 * TiltCard - 3D perspective tilt with pointer-tracked glare.
 * Adapted from 21st.dev "Optimized Tilt Card" (sh20raj) into CSS Modules.
 *
 * Children can pop off the surface with `data-depth="40"` (px of translateZ)
 * because the card keeps `transform-style: preserve-3d`.
 * Writes CSS variables directly (no React re-render per mousemove).
 * Pointer events + measurement live on a static outer hit area, never on the
 * tilting element itself - otherwise the tilted edge slides out from under
 * the cursor, hover flips on/off, and the card jitters.
 * Disabled under prefers-reduced-motion.
 */
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./TiltCard.module.css";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Default 6. */
  maxTilt?: number;
  /** Hover scale. Default 1.01. */
  scale?: number;
  /** Glare tint, any CSS color. */
  glare?: string;
  style?: CSSProperties;
};

const TOUCH_RELEASE_MS = 380;

export function TiltCard({
  children,
  className,
  maxTilt = 6,
  scale = 1.01,
  glare = "oklch(1 0 0 / 0.55)",
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const reduced = useRef(false);
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      if (touchTimer.current !== null) clearTimeout(touchTimer.current);
    };
  }, []);

  const apply = useCallback((vars: Record<string, string>) => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
    });
  }, []);

  const track = useCallback(
    (clientX: number, clientY: number) => {
      const el = ref.current;
      if (!el || reduced.current) return;
      const rect = el.getBoundingClientRect();
      const px = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const py = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      apply({
        "--px": `${px * 100}%`,
        "--py": `${py * 100}%`,
        "--rx": `${(0.5 - py) * 2 * maxTilt}deg`,
        "--ry": `${(px - 0.5) * 2 * maxTilt}deg`,
        "--s": `${scale}`,
        "--glare": "1",
      });
    },
    [apply, maxTilt, scale],
  );

  const reset = useCallback(() => {
    apply({ "--rx": "0deg", "--ry": "0deg", "--s": "1", "--glare": "0" });
  }, [apply]);

  return (
    <div
      ref={ref}
      className={styles.hit}
      style={{ ["--glare-color" as string]: glare }}
      onPointerMove={(e) =>
        e.pointerType === "mouse" && track(e.clientX, e.clientY)
      }
      onPointerLeave={(e) => e.pointerType === "mouse" && reset()}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        if (touchTimer.current !== null) clearTimeout(touchTimer.current);
        track(t.clientX, t.clientY);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) track(t.clientX, t.clientY);
      }}
      onTouchEnd={() => {
        touchTimer.current = setTimeout(reset, TOUCH_RELEASE_MS);
      }}
    >
      <div className={clsx(styles.card, className)} style={style}>
        {children}
        <span className={styles.glare} aria-hidden="true" />
        <span className={styles.edge} aria-hidden="true" />
      </div>
    </div>
  );
}
