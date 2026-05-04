"use client";

/**
 * Magnetic — wraps any interactive element with a subtle "magnetic" hover.
 * The child translates toward the cursor when the cursor is near, easing
 * back to center when the cursor leaves. Pure CSS transforms, no layout shift.
 */
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Maximum pull distance in px. Default 10. */
  strength?: number;
  /** Lerp factor (0..1). Higher = snappier. Default 0.18. */
  ease?: number;
  /** Wrap with an inline-block span (default) or a flex item. */
  as?: "span" | "div";
  className?: string;
};

export function Magnetic({
  children,
  strength = 10,
  ease = 0.18,
  as = "span",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = pe.clientX - cx;
      const dy = pe.clientY - cy;
      // Normalize over the bounding-box half-diagonal so the pull
      // saturates near the edge, not at infinity.
      const half = Math.hypot(rect.width, rect.height) / 2;
      const distance = Math.min(Math.hypot(dx, dy) / half, 1);
      target.x = (dx / half) * strength * (1 - distance * 0.4);
      target.y = (dy / half) * strength * (1 - distance * 0.4);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const tick = () => {
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [strength, ease]);

  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<HTMLSpanElement & HTMLDivElement>}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </Tag>
  );
}
