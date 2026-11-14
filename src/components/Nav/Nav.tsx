"use client";

/**
 * Nav - reference-style top bar.
 * Logo monogram + email on the left, nav links on the right.
 * Each link has a doubled-text slide-up hover effect (label appears twice;
 * one slides up, the duplicate rises into view).
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Nav.module.css";

const links = [
  { id: "profile", href: "/#profile", label: "Profile", isSecondary: true },
  { id: "experience", href: "/#experience", label: "Experience", isSecondary: true },
  { id: "work", href: "/#work", label: "Work" },
  { id: "skills", href: "/#skills", label: "Skills", isSecondary: true },
  { id: "contact", href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["profile", "experience", "work", "skills", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={clsx(styles.nav, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo} aria-label="Raduan Rahman - home">
            <span className={styles.logoMark}>RR</span>
          </Link>
          <a
            href="mailto:raduanridu2669@gmail.com"
            className={styles.email}
          >
            raduanridu2669@gmail.com
          </a>
        </div>

        <nav className={styles.links} aria-label="Primary">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  styles.link,
                  isActive && styles.linkActive,
                  link.isSecondary && styles.secondary
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={styles.linkInner}>
                  <span className={styles.linkText}>{link.label}</span>
                  <span className={styles.linkTextDup} aria-hidden="true">
                    {link.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
