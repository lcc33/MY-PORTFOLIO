"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section: Main CTA Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          
          <div className="space-y-8">
            {/* "Get in touch" Header matching the icon style in the image */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <h3 className="text-white text-2xl font-bold tracking-tight">Get in touch</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <p className="text-zinc-400 text-lg max-w-sm leading-snug">
                If you want to work together on a project or just have a chat, 
                please don&apos;t hesitate to contact me via email below.
              </p>
              
              
              <div className=" flex items-center justify-center relative overflow-hidden group">
                <Image src="https://i.pinimg.com/736x/70/7b/6d/707b6d46c971c6cadf40492be03c133f.jpg" alt="Profile Image" width={200} height={128} className="object-cover rounded-full" />
               
              </div>
            </div>

            {/* Large Orange CTA Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:muhammadhabbibi24434@gmail.com"
              className="inline-block w-full md:w-auto text-center bg-[#FF4D29] hover:bg-[#e64525] text-white font-bold py-4 px-12 rounded-xl text-lg transition-colors shadow-lg shadow-orange-900/20"
            >
              Send me an email
            </motion.a>
          </div>

          {/* Right Section: Large Nav Links */}
          <div className="flex flex-col lg:items-end gap-4">
            <nav className="flex flex-col lg:items-end space-y-2">
              <Link href="#work" className="text-white text-4xl md:text-5xl font-black  tracking-tighter hover:opacity-80 transition-opacity">
                WORK
              </Link>
              <Link href="#skills" className="text-white text-4xl md:text-5xl font-black  tracking-tighter hover:text-orange-600 transition-colors">
                CAPABILITIES
              </Link>
              <Link href="#about" className="text-white text-4xl md:text-5xl font-black  tracking-tighter hover:text-orange-600 transition-colors">
                ABOUT
              </Link>
            </nav>

            {/* Social Icons matching image layout */}
            <div className="flex gap-6 mt-8 text-zinc-500">
              <Link href="https://github.com/lcc33" target="_blank" className="hover:text-white transition-colors">
                <Github size={20} />
              </Link>
              <Link href="https://www.linkedin.com/in/muhammad-is-haq-147648327/" target="_blank" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://x.com/aizenwritescode" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://www.instagram.com/muhammadcodes_/" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              
              
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs tracking-widest uppercase">
            © 2026 Muhammad.Is&apos;haq. All rights reserved.
          </p>
          <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}