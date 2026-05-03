/**
 * Footer — copyright + social links.
 * One thin border-top per brief.
 */
import styles from "./Footer.module.css";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raduan-rahman-redu/" },
  { label: "GitHub", href: "https://github.com/Rad-47" },
  { label: "Email", href: "mailto:raduanridu2669@gmail.com" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Raduan Rahman
        </p>
        <ul className={styles.links}>
          {socials.map((s) => {
            const isExternal = s.href.startsWith("http");
            return (
              <li key={s.href}>
                <a
                  href={s.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={styles.link}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
