import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="dot-grid">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
