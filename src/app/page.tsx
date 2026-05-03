/**
 * Homepage — full content with Apple.ca polish.
 * Hero · Projects · Experience · Skills · Education · Contact
 */
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/sections/Hero/Hero";
import { Projects } from "@/sections/Projects/Projects";
import { Experience } from "@/sections/Experience/Experience";
import { Skills } from "@/sections/Skills/Skills";
import { Education } from "@/sections/Education/Education";
import { Contact } from "@/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
