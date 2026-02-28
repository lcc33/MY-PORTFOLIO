"use client";
import React, { useEffect, useState } from "react";
// FIX: Use Next.js navigation hooks instead of react-router-dom
import { usePathname } from "next/navigation"; 
import About from "@/components/About";
import Experience from "@/components/Experience";
import HeroSection from "@/components/Hero-section";
import Loading from "@/components/Loading";
import Footer from "@/components/Navigation/Footer";
import Navbar from "@/components/Navigation/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Portfolio() {
  const pathname = usePathname(); // Next.js equivalent to location.pathname
  
  // Initialize state based on the current path
  const [landingLoading, setLandingLoading] = useState(() => {
    return pathname === "/";
  });

  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => {
        setLandingLoading(false);
      }, 3000); 

      return () => clearTimeout(timer);
    } 
  }, [pathname]);

  if (landingLoading) {
    return <Loading />;
  }
  
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