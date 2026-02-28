"use client";

import { motion } from "framer-motion";
import { Laptop, Code, Zap, Globe } from "lucide-react";

export default function About() {
  const highlights = [
    { icon: <Zap size={20} />, text: "Performance First" },
    { icon: <Laptop size={20} />, text: "Modern UX/UI" },
    { icon: <Code size={20} />, text: "Scalable Architecture" },
    { icon: <Globe size={20} />, text: "Global Standards" },
  ];

  return (
    <section id="about" className="bg-black py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none"
          >
            The Story.
          </motion.h2>
          <p className="text-orange-500 uppercase tracking-[0.4em] text-xs mt-6 font-bold">
            Behind the Code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Major Statement (High Impact) */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-medium text-white leading-tight tracking-tight mb-8"
            >
              I focus on building{" "}
              <span className="text-zinc-500 italic">
                clean, fast, and scalable
              </span>{" "}
              web interfaces using modern frameworks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-zinc-400 text-lg leading-relaxed max-w-2xl"
            >
              <p>
                My journey as a Frontend Developer is driven by a passion for
                performance and real-world usability. I don&apos;t just write
                code; I architect digital experiences that feel fluid and look
                premium.
              </p>
              <p>
                From leading tech efforts at{" "}
                <span className="text-white font-semibold">Very Unreal</span> to
                crafting MVPs like ZenoAI, I thrive on the challenge of turning
                complex problems into elegant, accessible solutions.
              </p>
            </motion.div>
          </div>

          {/* Right: Quick Stats/Highlights (Visual Cards) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col gap-4 group hover:border-orange-500/50 transition-all"
              >
                <div className="text-orange-500 bg-orange-500/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-white font-bold text-sm tracking-tight uppercase">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
