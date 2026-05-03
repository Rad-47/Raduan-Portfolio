/**
 * Selected Work — homepage projects section.
 * Per brief: small uppercase eyebrow + year range right + 3+ ProjectCards.
 *
 * Using all 5 personal projects per user request — live first, then in-dev.
 * The case study route (Phase 4) will be wired to /work/[slug].
 */
import { Container } from "@/components/Container/Container";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal/Reveal";
import { projects } from "@/data/projects";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  const years = projects.map((p) => Number(p.year)).filter(Boolean);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = minYear === maxYear ? `${minYear}` : `${minYear} — ${maxYear}`;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <Container>
        <Reveal>
          <header className={styles.head}>
            <h2 id="work-heading" className={styles.eyebrow}>
              Selected work
            </h2>
            <span className={styles.year}>{yearRange}</span>
          </header>
        </Reveal>

        <RevealGroup as="div" className={styles.stack}>
          {projects.map((p) => (
            <RevealItem key={p.slug}>
              <ProjectCard
                title={p.title}
                role={p.role}
                description={p.description}
                href={p.url ?? `/work/${p.slug}`}
                gradient={p.gradient}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
