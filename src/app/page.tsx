/**
 * Homepage - 3D work-showcase hero · keyword band · developer profile · experience timeline · project bento
 * · skills sphere · education · contact.
 */
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/sections/Hero/Hero";
import { MarqueeDivider } from "@/sections/MarqueeDivider/MarqueeDivider";
import { Profile } from "@/sections/Profile/Profile";
import { Experience } from "@/sections/Experience/Experience";
import { Projects } from "@/sections/Projects/Projects";
import { Skills } from "@/sections/Skills/Skills";
import { Education } from "@/sections/Education/Education";
import { Contact } from "@/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeDivider />
        <Profile />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
