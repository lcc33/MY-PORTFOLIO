"use client";
import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    color: "group-hover:text-blue-400",
    glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
  },
  {
    category: "Backend & Database",
    skills: ["Node.js", "MongoDB", "Firebase"],
    color: "group-hover:text-orange-400",
    glow: "group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Docker", "Vercel"],
    color: "group-hover:text-purple-400",
    glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="bg-black py-32 px-8">
      <div className="max-w-6xl mx-auto"> 
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic"
          >
            Capabilities
          </motion.h2>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs mt-4">
            My Technical Arsenal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <h3 className={`text-sm font-mono uppercase tracking-widest mb-8 text-zinc-500 transition-colors duration-500 ${group.color}`}>
                 {group.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 rounded-xl bg-black border border-zinc-800 text-zinc-400 text-sm font-medium transition-all duration-300 group-hover:border-zinc-700 ${group.glow}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative background element */}
        <div className="mt-20 h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>
    </section>
  );
}