"use client";

/**
 * SpotlightCard — wrapper that adds a cursor-follow radial highlight,
 * a subtle 3D tilt toward the cursor, and a soft lift on hover.
 *
 * - Spotlight: tracked via --mx/--my CSS vars
 * - Tilt: rotateX/rotateY on the card based on cursor offset, lerped
 * - Lift: gentle translateZ + shadow boost while hovered
 * Honors prefers-reduced-motion (no tilt) and coarse pointers (no tilt).
 */
import { ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./SpotlightCard.module.css";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Color of the spotlight glow (default uses --accent) */
  color?: string;
  /** Spotlight radius in px (default 380) */
  size?: number;
  /** Max tilt angle in degrees (default 5). Set to 0 to disable. */
  tilt?: number;
};

export function SpotlightCard({
  children,
  className,
  color,
  size = 380,
  tilt = 5,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || tilt <= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const target = { rx: 0, ry: 0, hover: 0 };
    const current = { rx: 0, ry: 0, hover: 0 };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      // Tilt toward cursor: positive Y on top → negative rotateX (top tips back)
      target.ry = (px - 0.5) * 2 * tilt;
      target.rx = -(py - 0.5) * 2 * tilt;
      target.hover = 1;
    };
    const onLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.hover = 0;
    };

    const tick = () => {
      const k = 0.15;
      current.rx += (target.rx - current.rx) * k;
      current.ry += (target.ry - current.ry) * k;
      current.hover += (target.hover - current.hover) * k;
      el.style.setProperty("--rx", `${current.rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${current.ry.toFixed(2)}deg`);
      el.style.setProperty("--hover", current.hover.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [tilt]);

  return (
    <div
      ref={ref}
      className={clsx(styles.card, className)}
      style={
        {
          "--spot-color": color ?? "rgba(94, 106, 210, 0.18)",
          "--spot-size": `${size}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.spot} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
