/**
 * Homepage — Phase 3 build.
 * Sections in order: Nav · Hero · Selected Work · About · Contact · Footer
 */
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/sections/Hero/Hero";
import { SelectedWork } from "@/sections/SelectedWork/SelectedWork";
import { About } from "@/sections/About/About";
import { Contact } from "@/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
