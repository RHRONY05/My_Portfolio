import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HeroCinemaCanvas } from "@/components/hero/HeroCinemaCanvas";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroCinemaCanvas />

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
