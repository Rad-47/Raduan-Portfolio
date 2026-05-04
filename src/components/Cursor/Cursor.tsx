"use client";

/**
 * Cursor — custom cursor for fine-pointer devices.
 *
 * Two layers:
 *   1. A precise dot that sits exactly on the pointer
 *   2. A larger soft ring that lerps toward the pointer for a trailing feel
 *
 * The ring scales up and brightens when hovering interactive elements
 * (anchors, buttons, inputs, [data-cursor]). On touch and reduced-motion
 * devices the cursor is suppressed and the system pointer remains.
 */
import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const target = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let active = false;

    const HOVER_SELECTOR = "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']";

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!active) {
        active = true;
        ring.classList.add(styles.visible);
        dot.classList.add(styles.visible);
      }
      const t = e.target as Element | null;
      const isHover = !!(t && t.closest && t.closest(HOVER_SELECTOR));
      ring.classList.toggle(styles.hover, isHover);
    };
    const onLeave = () => {
      active = false;
      ring.classList.remove(styles.visible);
      dot.classList.remove(styles.visible);
    };
    const onDown = () => ring.classList.add(styles.down);
    const onUp = () => ring.classList.remove(styles.down);

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("cursor-active");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
