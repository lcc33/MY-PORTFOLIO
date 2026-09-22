"use client";

import About from "@/components/About";
import Experience from "@/components/Experience";
import HeroSection from "@/components/Hero-section";
import Footer from "@/components/Navigation/Footer";
import Navbar from "@/components/Navigation/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Portfolio() {
  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#FF4D29]/30">
      <Navbar />
      <div className="flex flex-col gap-0">
        <HeroSection />
        <About />
        <Projects />
        <Skills />
        <Experience />
      </div>
      <Footer />
    </main>
  );
}