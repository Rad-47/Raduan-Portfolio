"use client";

/**
 * TagSphere - words distributed on a Fibonacci sphere, rendered in real
 * 3D (CSS transforms, depth-sorted opacity/scale). Auto-rotates, follows
 * the pointer, and can be dragged/flung. Transforms are written straight
 * to the DOM each frame - no React re-render in the loop.
 *
 * Decorative only (aria-hidden): the same items are listed in readable
 * form elsewhere on the page.
 */
import { useEffect, useRef } from "react";
import styles from "./TagSphere.module.css";

type TagSphereProps = {
  tags: string[];
  /** Sphere radius as a fraction of the container width. Default 0.43. */
  radiusRatio?: number;
};

const AUTO_SPIN = 0.0025;
const DRAG_GAIN = 0.005;
const FRICTION = 0.94;
const HOVER_GAIN = 0.00006;

type Vec3 = { x: number; y: number; z: number };

function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

export function TagSphere({ tags, radiusRatio = 0.43 }: TagSphereProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = fibonacciSphere(tags.length);

    let radius = wrap.offsetWidth * radiusRatio;
    const ro = new ResizeObserver(() => {
      radius = wrap.offsetWidth * radiusRatio;
    });
    ro.observe(wrap);

    // Rotation state (radians) + velocity.
    let ax = 0.3;
    let ay = 0;
    let vx = 0;
    let vy = AUTO_SPIN;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let hoverX = 0;
    let hoverY = 0;

    function draw() {
      const sx = Math.sin(ax);
      const cx = Math.cos(ax);
      const sy = Math.sin(ay);
      const cy = Math.cos(ay);
      points.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        // Rotate around Y then X.
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const scale = 0.55 + depth * 0.45;
        el.style.transform = `translate3d(${x1 * radius}px, ${y2 * radius}px, ${z2 * radius}px) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(0.15 + depth * 0.85);
        el.style.zIndex = String(Math.round(depth * 100));
        el.dataset.front = depth > 0.82 ? "1" : "0";
      });
    }

    let raf = 0;
    let visible = true;
    function tick() {
      if (!dragging) {
        vx *= FRICTION;
        vy = vy * FRICTION + AUTO_SPIN * (1 - FRICTION) + hoverX * HOVER_GAIN;
        vx += hoverY * HOVER_GAIN * 0.5;
      }
      ax += vx;
      ay += vy;
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    }

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      wrap.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      hoverX = e.clientX - (rect.left + rect.width / 2);
      hoverY = -(e.clientY - (rect.top + rect.height / 2));
      if (!dragging) return;
      vy = (e.clientX - lastX) * DRAG_GAIN;
      vx = -(e.clientY - lastY) * DRAG_GAIN;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    const onLeave = () => {
      hoverX = 0;
      hoverY = 0;
    };

    draw();
    if (!reduced) {
      wrap.addEventListener("pointerdown", onDown);
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerup", onUp);
      wrap.addEventListener("pointercancel", onUp);
      wrap.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [tags, radiusRatio]);

  return (
    <div ref={wrapRef} className={styles.sphere} aria-hidden="true">
      <div className={styles.core} />
      <div className={styles.ringA} />
      <div className={styles.ringB} />
      {tags.map((t, i) => (
        <span
          key={t}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={styles.tag}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
