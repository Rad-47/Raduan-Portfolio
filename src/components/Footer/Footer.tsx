/**
 * Footer - reference-style: huge name, contact + social columns, signoff.
 */
import { SocialIcons } from "@/components/SocialIcons/SocialIcons";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <h2 className={`${styles.bigName} display`}>RADUAN RAHMAN</h2>

        <div className={styles.grid}>
          <div className={styles.col}>
            <span className={styles.colLabel}>Email</span>
            <a
              href="mailto:raduanridu2669@gmail.com"
              className={styles.colValue}
            >
              raduanridu2669@gmail.com
            </a>
          </div>
          <div className={styles.col}>
            <span className={styles.colLabel}>Location</span>
            <span className={styles.colValue}>Toronto, ON · Canada</span>
          </div>
          <div className={styles.col}>
            <span className={styles.colLabel}>Social</span>
            <SocialIcons />
          </div>
        </div>

        <p className={styles.signoff}>
          <span>Designed &amp; developed by Raduan Rahman</span>
          <span className={styles.signoffYear}>{year}</span>
        </p>
      </div>
    </footer>
  );
}
