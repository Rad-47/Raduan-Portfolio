/**
 * Component preview route — temporary showcase for Phase 2 sign-off.
 * Will be removed (or moved behind a flag) before production.
 */
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { StatusPill } from "@/components/StatusPill/StatusPill";
import { Nav } from "@/components/Nav/Nav";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { Footer } from "@/components/Footer/Footer";
import styles from "./preview.module.css";

export default function PreviewPage() {
  return (
    <>
      <Nav />
      <Container>
        <header className={styles.header}>
          <div className={styles.eyebrow}>PHASE 2 PREVIEW</div>
          <h1 className={styles.title}>Component library</h1>
          <p className={styles.lead}>
            Each component built per the Linear design system spec. Sign off
            here, then we wire them into the homepage in Phase 3.
          </p>
        </header>

        {/* Buttons */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Button</h2>

          <div className={styles.subhead}>Sizes</div>
          <div className={styles.row}>
            <Button variant="primary" size="sm">sm — 28px</Button>
            <Button variant="primary" size="md">md — 32px</Button>
            <Button variant="primary" size="lg">lg — 36px</Button>
          </div>

          <div className={styles.subhead}>Variants (lg)</div>
          <div className={styles.row}>
            <Button variant="primary" size="lg">View work →</Button>
            <Button variant="secondary" size="lg">Resume</Button>
            <Button variant="ghost" size="lg">Ghost</Button>
          </div>

          <div className={styles.subhead}>States</div>
          <div className={styles.row}>
            <Button variant="primary" size="md">Default</Button>
            <Button variant="primary" size="md" disabled>Disabled</Button>
            <Button variant="secondary" size="md">Tab into me</Button>
          </div>
        </section>

        {/* StatusPill */}
        <section className={styles.section}>
          <h2 className={styles.h2}>StatusPill</h2>
          <div className={styles.row}>
            <StatusPill status="success">Available · Toronto, ON</StatusPill>
            <StatusPill status="warning">In review</StatusPill>
            <StatusPill status="danger">Closed for new work</StatusPill>
          </div>
        </section>

        {/* ProjectCard */}
        <section className={styles.section}>
          <h2 className={styles.h2}>ProjectCard</h2>
          <div className={styles.cardStack}>
            <ProjectCard
              title="FanLinc"
              role="AI PO · Blayz"
              description="Sports community platform — 0 to 1, currently in beta with a 137-page PRD and 5-tier points economy."
              href="/work/fanlinc"
              gradient={["#5e6ad2", "#8b5cf6"]}
            />
            <ProjectCard
              title="SubTrack"
              role="Personal · PWA"
              description="Subscription tracker — installable PWA + native iOS/Android with rule-based NLP for email parsing."
              href="/work/subtrack"
              gradient={["#10b981", "#06b6d4"]}
            />
            <ProjectCard
              title="WebGuardian"
              role="Personal · B2B SaaS"
              description="Lighthouse-powered website health & uptime monitoring — sole PM and developer."
              href="/work/webguardian"
              gradient={["#f59e0b", "#ef4444"]}
            />
          </div>
        </section>

        {/* Container */}
        <section className={styles.section}>
          <h2 className={styles.h2}>Container</h2>
          <div className={styles.containerDemo}>
            <div className={styles.demoBox}>default — max-width 1024px</div>
          </div>
          <Container narrow as="div" className={styles.demoNarrow}>
            <div className={styles.demoBox}>narrow — max-width 720px</div>
          </Container>
        </section>
      </Container>
      <Footer />
    </>
  );
}
