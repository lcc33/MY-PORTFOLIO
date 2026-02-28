"use client";
import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Tech Director",
    company_name: "Very Unreal",
    date: "Sept 2025 - Present",
    color: "bg-orange-500",
    points: [
      "Leading the technology team and overseeing all technical development efforts.",
      "Building the MVP for ZenoAI and Kentucky gaming group platform.",
      "Implementing efficient, scalable systems using FastAPI and PostgreSQL.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "ReferX",
    date: "Oct 2025 - January 2026",
    color: "bg-blue-500",
    points: [
      "Collaborating with designers and developers for seamless user experiences.",
      "Implementing responsive design and cross-device compatibility.",
      "Optimizing application performance and ensuring high code quality.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Personal Projects",
    date: "Jan 2024 – Present",
    color: "bg-purple-500",
    points: [
      "Building web applications using React.js, Next.js, and TypeScript.",
      "Designing and developing responsive UI components.",
      "Hosting and managing projects on Vercel and Pxxl space.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-black py-32 px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase"
          >
            Experience
          </motion.h2>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs mt-4">
            Professional Roadmap
          </p>
        </div>

        <div className="relative border-l border-zinc-800 ml-4 md:ml-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12 pb-20 last:pb-0 group"
            >
              {/* Timeline Dot & Glow */}
              <div className="absolute left-[-5px] top-2">
                <div className={`w-[9px] h-[9px] rounded-full ${exp.color} z-10 relative`} />
                <div className={`absolute inset-0 w-[9px] h-[9px] rounded-full ${exp.color} blur-md animate-pulse`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Date Column */}
                <div className="md:col-span-3">
                  <span className="text-zinc-500 font-mono text-sm uppercase tracking-wider">
                    {exp.date}
                  </span>
                </div>

                {/* Content Column */}
                <div className="md:col-span-9">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-zinc-400 font-medium text-lg mb-6">
                    {exp.company_name}
                  </p>
                  
                  <ul className="space-y-4">
                    {exp.points.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-zinc-500 text-sm leading-relaxed max-w-2xl">
                        <span className="text-orange-500 mt-1.5 flex-shrink-0 text-[10px]">■</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}