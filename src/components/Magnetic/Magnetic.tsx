"use client";

/**
 * Magnetic - wraps any interactive element with a subtle "magnetic" hover.
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

/** Stop animating once within this many px of the target. */
const SETTLE_PX = 0.05;

export function Magnetic({
  children,
  strength = 10,
  ease = 0.18,
  as = "span",
  className,
}: Props) {
  const outerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let running = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      inner.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      const settled =
        Math.abs(target.x - current.x) < SETTLE_PX &&
        Math.abs(target.y - current.y) < SETTLE_PX;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    // Measured on the static outer box, so the pull never feeds back into
    // its own position (which made buttons vibrate near the cursor).
    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      const rect = outer.getBoundingClientRect();
      const dx = pe.clientX - (rect.left + rect.width / 2);
      const dy = pe.clientY - (rect.top + rect.height / 2);
      const half = Math.hypot(rect.width, rect.height) / 2;
      const distance = Math.min(Math.hypot(dx, dy) / half, 1);
      target.x = (dx / half) * strength * (1 - distance * 0.4);
      target.y = (dy / half) * strength * (1 - distance * 0.4);
      wake();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    outer.addEventListener("pointermove", onMove);
    outer.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      outer.removeEventListener("pointermove", onMove);
      outer.removeEventListener("pointerleave", onLeave);
      inner.style.transform = "";
    };
  }, [strength, ease]);

  const Tag = as;
  return (
    <Tag
      ref={outerRef as React.Ref<HTMLSpanElement & HTMLDivElement>}
      className={className}
      style={{ display: "inline-block" }}
    >
      <Tag
        ref={innerRef as React.Ref<HTMLSpanElement & HTMLDivElement>}
        style={{ display: "inline-block", willChange: "transform" }}
      >
        {children}
      </Tag>
    </Tag>
  );
}
