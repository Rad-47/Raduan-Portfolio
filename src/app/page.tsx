import styles from "./page.module.css";

/**
 * Phase 1 verification page.
 * Confirms tokens.css loads, Inter Variable renders, accent purple appears.
 * Will be replaced in Phase 3 with the real homepage.
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.label}>PHASE 1 — DESIGN SYSTEM FOUNDATION</div>
      <h1 className={styles.h1}>Raduan Rahman</h1>
      <p className={styles.lead}>
        Product Analyst &amp; AI Product Owner in Toronto. Tokens loaded, Inter
        Variable rendering, accent ready.
      </p>
      <div className={styles.swatches}>
        <span className={styles.swatch} style={{ background: "var(--bg-primary)" }}>
          --bg-primary
        </span>
        <span className={styles.swatch} style={{ background: "var(--bg-secondary)" }}>
          --bg-secondary
        </span>
        <span className={styles.swatch} style={{ background: "var(--bg-tertiary)" }}>
          --bg-tertiary
        </span>
        <span
          className={styles.swatch}
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          --accent
        </span>
      </div>
    </main>
  );
}
