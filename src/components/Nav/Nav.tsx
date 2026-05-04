"use client";

/**
 * Nav — sticky top, blurred-translucent on scroll.
 * IntersectionObserver scroll-spy highlights the active section
 * with an animated underline indicator (framer-motion layoutId).
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import styles from "./Nav.module.css";

const links = [
  { id: "work", href: "/#work", label: "Work" },
  { id: "experience", href: "/#experience", label: "Experience" },
  { id: "skills", href: "/#skills", label: "Skills" },
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
    const sections = links
      .map((l) => document.getElementById(l.id))
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
        <Link href="/" className={styles.logo} aria-label="Raduan Rahman — home">
          <span className={styles.logoMark} aria-hidden="true">
            <Image
              src="/avatar.png"
              alt=""
              width={72}
              height={72}
              className={styles.logoMarkImg}
              priority
            />
          </span>
          <span className={styles.logoText}>Raduan Rahman</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(styles.link, isActive && styles.linkActive)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={styles.linkLabel}>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className={styles.activeIndicator}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
