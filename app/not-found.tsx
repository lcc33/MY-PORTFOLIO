"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [teleported, setTeleported] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ x: number, y: number, delay: number, duration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on the client
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: i * -1.2,
      duration: 8 + Math.random() * 12
    }));
    setParticles(newParticles);
  }, []);

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 600);
  };

  const handleTeleport = () => {
    setTeleported(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center font-mono">
      {/* Subtle animated grid background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FF4D29 1px, transparent 1px), linear-gradient(90deg, #FF4D29 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Big 404 with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={triggerGlitch}
          className={`text-[180px] md:text-[240px] font-black tracking-[-0.05em] leading-none select-none transition-all duration-300 ${glitchActive ? 'glitch' : ''}`}
        >
          404
        </motion.h1>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTeleport}
            disabled={teleported}
            className="px-10 py-5 bg-white text-black font-medium text-lg tracking-wider hover:bg-orange-400 hover:text-white transition-all duration-300 disabled:opacity-70"
          >
            {teleported ? "TELEPORTING..." : "RETURN TO REALITY"}
          </motion.button>

          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border border-white/60 hover:border-white text-white font-medium text-lg tracking-wider transition-all duration-300"
            >
              GO HOME
            </motion.div>
          </Link>
        </div>

        <p className="mt-16 text-zinc-500 text-sm">
          Pro tip: Maybe you were looking for <span className="text-orange-400">hireme.muhammadishaq.xyz</span>?
        </p>
      </div>

      {/* Performance-friendly floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0.3,
            }}
            animate={{
              y: [null, -600], // Using a constant value for scroll-like effect
              opacity: [0.3, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glitch CSS */}
      <style jsx>{`
        .glitch {
          position: relative;
          color: #FF4D29;
          animation: glitch-skew 0.4s linear infinite alternate;
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(8deg); }
          20% { transform: skew(-6deg); }
          100% { transform: skew(2deg); }
        }
      `}</style>
    </div>
  );
}