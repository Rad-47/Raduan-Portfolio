"use client";

/**
 * HeroShowcase - a layered 3D composition of real shipped work.
 * Browser windows + a phone + a note card sit at different depths; they
 * fly in from far back, tilt as one scene toward the pointer, drift gently,
 * and spread apart in Z as the hero scrolls away ("exploded view").
 * Pure CSS 3D + Framer Motion - crisp screenshots, no WebGL.
 */
import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./HeroShowcase.module.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MAX_TILT_DEG = 9;
const SCROLL_SPREAD = 2.2;

type Layer = {
  key: string;
  kind: "browser" | "phone" | "note";
  src?: string;
  alt?: string;
  place: CSSProperties;
  /** Resting depth in px. */
  z: number;
  /** Idle drift period in seconds. */
  drift: number;
  delay: number;
};

const LAYERS: Layer[] = [
  {
    key: "sparcks",
    kind: "browser",
    src: "/projects/sparcks_site.jpg",
    alt: "Sparcks website homepage",
    place: { left: "0%", top: "4%", width: "76%" },
    z: -140,
    drift: 9,
    delay: 0.35,
  },
  {
    key: "aurelion",
    kind: "browser",
    src: "/projects/aurelion_site.jpg",
    alt: "Aurelion Global website homepage",
    place: { left: "26%", top: "36%", width: "72%" },
    z: 0,
    drift: 11,
    delay: 0.5,
  },
  {
    key: "fanlinc",
    kind: "phone",
    src: "/projects/fl1.jpg",
    alt: "FanLinc mobile app community feed",
    place: { left: "6%", top: "33%", width: "22%" },
    z: 140,
    drift: 8,
    delay: 0.65,
  },
  {
    key: "note",
    kind: "note",
    place: { right: "0%", top: "0%", width: "40%" },
    z: 200,
    drift: 10,
    delay: 0.8,
  },
];

function LayerContent({ layer }: { layer: Layer }) {
  if (layer.kind === "note") {
    return (
      <div className={styles.note}>
        <span className={styles.noteLabel}>
          <span className={styles.noteDot} aria-hidden="true" />
          Shipped at Sparcks
        </span>
        <p className={styles.noteText}>
          One training video in, an interactive course in <em>10 languages</em>{" "}
          out.
        </p>
      </div>
    );
  }

  const isPhone = layer.kind === "phone";
  return (
    <div className={isPhone ? styles.phone : styles.browser}>
      {!isPhone && (
        <div className={styles.chrome} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className={isPhone ? styles.phoneScreen : styles.screen}>
        <Image
          src={layer.src ?? ""}
          alt={layer.alt ?? ""}
          fill
          priority
          sizes={isPhone ? "180px" : "(min-width: 1100px) 560px, 80vw"}
          className={styles.img}
        />
      </div>
    </div>
  );
}

function ShowcaseLayer({
  layer,
  spread,
}: {
  layer: Layer;
  spread: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const z = useTransform(spread, (s) => layer.z * (1 + s * SCROLL_SPREAD));

  return (
    <motion.div
      className={styles.layer}
      style={{ ...layer.place, z: reduced ? layer.z : z }}
      initial={
        reduced ? false : { opacity: 0, y: 90, rotateX: 18, scale: 0.92 }
      }
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay: layer.delay }}
    >
      <div
        className={styles.drift}
        style={{
          animationDuration: `${layer.drift}s`,
          animationDelay: `${-layer.delay * 3}s`,
        }}
      >
        <LayerContent layer={layer} />
      </div>
    </motion.div>
  );
}

export function HeroShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 70, damping: 18, mass: 0.8 };
  const rotateY = useSpring(
    useTransform(px, [-1, 1], [-MAX_TILT_DEG, MAX_TILT_DEG]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(py, [-1, 1], [MAX_TILT_DEG * 0.7, -MAX_TILT_DEG * 0.7]),
    spring,
  );

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["center center", "end start"],
  });
  const spread = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const sceneRotate = useTransform(spread, [0, 1], [0, -14]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduced]);

  return (
    <div ref={stageRef} className={styles.stage}>
      <motion.div
        className={styles.scene}
        style={reduced ? undefined : { rotateX, rotateY, rotateZ: sceneRotate }}
      >
        {LAYERS.map((layer) => (
          <ShowcaseLayer key={layer.key} layer={layer} spread={spread} />
        ))}
      </motion.div>
      <div className={styles.floor} aria-hidden="true" />
    </div>
  );
}
