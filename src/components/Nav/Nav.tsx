"use client";

/**
 * Nav — sticky top, becomes blurred-translucent on scroll.
 * Skills applied: micro-interactions (scroll state), performance-ux (passive listener)
 *
 * Note: Phase 2 uses anchor links to homepage sections.
 * Phase 4 will add real /work/[slug], /about routes if needed.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./Nav.module.css";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={clsx(styles.nav, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Raduan Rahman — home">
          <span className={styles.logoMark} aria-hidden="true" />
          <span className={styles.logoText}>Raduan Rahman</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href.split("#")[0]));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(styles.link, isActive && styles.linkActive)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
