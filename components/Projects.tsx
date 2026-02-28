"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "../constants"; // Adjust path to your index.ts
import { ExternalLink } from "lucide-react";

type ProjectCardProps = {
  project: (typeof projects)[0];
  index: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // We alternate the layout based on the index for a dynamic feel
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="w-full mb-40 group"
    >
      {/* Title & Header Section */}
      <div className="text-center mb-16">
        <motion.span 
          className="text-orange-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {project.status}
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">
          {project.name}
        </h2>
        <div className="flex justify-center gap-3">
          {project.tags.map((tag) => (
            <span key={tag.name} className="text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Image Container */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
        {/* Main Image Slot (Spans 8 columns) */}
        <div className={`lg:col-span-8 ${!isEven ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/20 transition-colors">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            {/* Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            <a 
              href={project.source_code_link}
              target="_blank"
              className="absolute bottom-8 right-8 bg-white text-black p-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-orange-500"
            >
              <ExternalLink size={24} />
            </a>
          </div>
        </div>

        {/* Content Side Slot (Spans 4 columns) */}
        <div className={`lg:col-span-4 space-y-6 ${!isEven ? 'lg:order-1 lg:text-right' : ''}`}>
          <p className="text-zinc-400 text-lg leading-relaxed font-medium">
            {project.description}
          </p>
          <div className={`flex ${!isEven ? 'justify-end' : 'justify-start'}`}>
            <div className="h-[1px] w-20 bg-orange-600" />
          </div>
          <div className="space-y-2">
             <h4 className="text-white font-bold uppercase text-sm tracking-widest">The Vision</h4>
             <p className="text-zinc-500 text-sm line-clamp-3">{project.vision}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  return (
    <section id="work" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-32">
          <div className="w-1 h-20 bg-gradient-to-b from-orange-600 to-transparent mb-8" />
          <h3 className="text-zinc-500 font-mono tracking-[0.3em] uppercase text-lg">Selected Works</h3>
        </div>

        {/* Mapping through projects */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}