/**
 * Footer — copyright + social dock.
 * One thin border-top per brief.
 */
import { SocialIcons } from "@/components/SocialIcons/SocialIcons";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Raduan Rahman
        </p>
        <SocialIcons />
      </div>
    </footer>
  );
}
