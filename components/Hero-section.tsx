"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Code2, Cpu } from "lucide-react"; // Using icons to represent the computer/tech theme

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
        <p className="text-zinc-500 text-lg md:text-2xl max-w-2xl mx-auto leading-tight font-medium">
          I build high-performance frontend architectures{" "}
          <br className="hidden md:block" />
          and interactive user interfaces.
        </p>
      </motion.div>

      {/* 3. Central Visual (Computer/Code Replacement) */}
      <div className="relative w-full max-w-4xl aspect-video flex items-center justify-center">
        {/* Floating Code "Laptop" Representation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 w-80 h-56 md:w-[500px] md:h-[350px] bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Mock Window Header */}
          <div className="h-8 bg-zinc-800/50 flex items-center px-4 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          {/* Mock Code Lines */}
          <div className="p-6 space-y-3 font-mono text-sm">
            <div className="h-2 w-[80%] bg-blue-500/20 rounded" />
            <div className="h-2 w-[60%] bg-purple-500/20 rounded" />
            <div className="h-2 w-[90%] bg-blue-500/20 rounded" />
            <div className="h-2 w-[40%] bg-zinc-700 rounded" />
            <div className="h-2 w-[70%] bg-purple-500/20 rounded" />
          </div>
          {/* Glow Behind the "Computer" */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        </motion.div>

        {/* Floating Icons (Floating around the computer) */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-10 left-[15%] text-blue-400 opacity-80"
        >
          <Code2 size={48} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute top-20 right-[15%] text-purple-400 opacity-80"
        >
          <Terminal size={56} />
        </motion.div>

        {/* Yellow "Tag" Badge (Like the Rick W. tag in image) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/4 right-[25%] z-30 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1"
        >
          Muhammad.dev
          <div className="w-0 h-0 border-t-[8px] border-t-yellow-400 border-l-[8px] border-l-transparent absolute -bottom-1 left-2" />
        </motion.div>

        {/* The Central Glow (Replacing the boy's lighting) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      </div>

      {/* 4. Scroll Down Indicator (Bottom Right) */}
      <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2">
        <Link href="#about" className="text-zinc-500 animate-bounce">
          <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center">
            <div className="w-1 h-2 bg-zinc-500 rounded-full animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}
