"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.6 + 0.1,
  delay: `${Math.random() * 4}s`,
  duration: `${Math.random() * 3 + 2}s`,
}));
function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STARS.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&display=swap');

        .pixel { font-family: 'Press Start 2P', monospace; }
        .mono  { font-family: 'Space Mono', monospace; }

        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(0.8); }
          to   { opacity: 0.8; transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-12px); }
        }

        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes glitch-1 {
          0%, 95%, 100% { clip-path: none; transform: none; opacity: 1; }
          96% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translateX(-4px); opacity: 0.8; }
          97% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(4px);  opacity: 0.8; }
          98% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translateX(-2px); opacity: 0.9; }
        }

        @keyframes glitch-2 {
          0%, 95%, 100% { clip-path: none; transform: none; opacity: 0; }
          96% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translateX(4px);  opacity: 0.4; color: #fff; }
          97% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(-4px); opacity: 0.4; }
          98% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translateX(2px);  opacity: 0.3; }
        }

        .glitch {
          animation: glitch-1 6s infinite;
        }

        .glitch::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          animation: glitch-2 6s infinite;
        }

        .scanline {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(255,255,255,0.03);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .float-anim {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }

        /* Noise overlay */
        .noise::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 2;
        }
      `}</style>


      {/* Main Container: This provides the black base */}
      <div className="noise relative min-h-screen bg-black text-white mono overflow-hidden flex flex-col">
        
        {/* 1. Scanline (Top Layer) */}
        <div className="scanline" />

        {/* 2. Stars (Background Layer) */}
        {mounted && <Stars />}

        {/* 3. Grid (Background Layer) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* 4. Content Section: REMOVED 'bg-black' so stars are visible */}
        <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 pointer-events-none"
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-4">
              Hi, I&apos;m Muhammad
            </h1>
            <p className="text-white text-lg md:text-2xl max-w-2xl mx-auto leading-tight font-medium">
              I build high-performance frontend architectures <br className="hidden md:block" />
              and interactive user interfaces.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 flex flex-col items-center justify-center gap-2">
            <Link href="#about" className="text-white animate-bounce">
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                <div className="w-2 h-4 bg-white rounded-full" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}