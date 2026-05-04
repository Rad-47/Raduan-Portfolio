"use client";

/**
 * HeroCanvas — full-bleed WebGL plane behind the hero.
 *
 * Renders a flowing simplex-noise mesh gradient with mouse parallax,
 * tuned to the existing accent palette. Pauses when offscreen and
 * falls back to a static frame under prefers-reduced-motion.
 *
 * Implemented with raw three.js (no R3F) for tight control over the
 * render loop, dpr resizing, and lifecycle.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./shader";
import styles from "./HeroCanvas.module.css";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x08090a, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 1.0 },
      uColorA: { value: new THREE.Color("#5e6ad2") },
      uColorB: { value: new THREE.Color("#8b5cf6") },
      uColorC: { value: new THREE.Color("#38bdf8") },
      uColorD: { value: new THREE.Color("#f43f5e") },
      uColorBg: { value: new THREE.Color("#08090a") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      renderer.setPixelRatio(dpr);
      renderer.setSize(rect.width, rect.height, false);
      uniforms.uResolution.value.set(rect.width, rect.height);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse parallax — smooth-lerped in the frame loop
    const target = { x: 0.5, y: 0.5 };
    function onMove(e: PointerEvent) {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    // Pause when the hero leaves the viewport
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(canvas);

    let raf = 0;
    let last = performance.now();
    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;

      if (!reduced) uniforms.uTime.value += dt;

      const m = uniforms.uMouse.value;
      m.x += (target.x - m.x) * 0.05;
      m.y += (target.y - m.y) * 0.05;

      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.veil} />
    </div>
  );
}
