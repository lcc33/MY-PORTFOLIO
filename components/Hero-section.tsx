"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SplineScreen from "./SplineScreen";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* 2. Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 mb-12"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-4">
          Hi, I&apos;m Muhammad
        </h1>
        <p className="text-white-900 text-lg md:text-2xl max-w-2xl mx-auto leading-tight font-medium">
          I build high-performance frontend architectures{" "}
          <br className="hidden md:block" />
          and interactive user interfaces.
        </p>
      </motion.div>

      <SplineScreen />

      {/* 4. Scroll Down Indicator (Bottom Right) */}
      <div className="absolute bottom-10 flex flex-col items-center justify-center gap-2">
        <Link href="#about" className="text-white animate-bounce">
          <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
            <div className="w-2 h-4 bg-white rounded-full animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}
