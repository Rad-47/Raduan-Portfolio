/**
 * AnimatedBackground — full-page atmospheric layer.
 * Three stacked layers (z-index -3 → -1):
 *   1. Aurora — slow-morphing radial gradients
 *   2. Dot grid — fades to center, very subtle
 *   3. Grain — SVG noise overlay for premium texture
 *
 * All pure CSS. No JS. Respects prefers-reduced-motion.
 */
import styles from "./AnimatedBackground.module.css";

export function AnimatedBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.aurora}>
        <span className={`${styles.blob} ${styles.blob1}`} />
        <span className={`${styles.blob} ${styles.blob2}`} />
        <span className={`${styles.blob} ${styles.blob3}`} />
        <span className={`${styles.blob} ${styles.blob4}`} />
      </div>
      <div className={styles.grid} />
      <div className={styles.grain} />
    </div>
  );
}
