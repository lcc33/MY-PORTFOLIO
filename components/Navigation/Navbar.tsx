"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-6 bg-black/20 backdrop-blur-md border-b border-white/5">
        {/* Logo Icon Style from Image */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF4D29] rounded-full flex items-center justify-center text-white font-black text-xl transition-transform group-hover:rotate-12">
            M
          </div>
          <span className="hidden sm:block text-white font-bold tracking-tighter text-lg">
            MUHAMMAD.IS&apos;HAQ
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-black tracking-tighter text-white hover:text-[#FF4D29] transition-colors"
                  >
                    {link.name.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
            </div>
            
           
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}