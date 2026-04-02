"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Adaptive particle count & spread based on screen size
  const particleCount = viewport.width < 6 ? 800 : 1400; // Fewer on mobile

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spread = viewport.width < 6 ? 22 : 35; // Tighter spread on mobile

    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * spread;
      pos[i + 1] = (Math.random() - 0.5) * spread * 1.4; // Slightly taller vertically
      pos[i + 2] = (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [particleCount, viewport.width]);

  // Mouse interaction (lighter on mobile)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slower rotation on mobile for better performance
    const speed = viewport.width < 6 ? 0.008 : 0.015;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * speed;

    // Gentle mouse influence
    pointsRef.current.rotation.x = mouse.current.y * 0.08;
    pointsRef.current.rotation.y += mouse.current.x * 0.04;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF4D29"
        size={viewport.width < 6 ? 0.14 : 0.095}   // Bigger particles on mobile
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
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

        .mono { font-family: 'Space Mono', monospace; }

        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(0.8); }
          to   { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>

      <div className="relative min-h-screen bg-black text-white mono overflow-hidden flex flex-col">

        {/* 3D Particles Background */}
        {mounted && (
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{ position: [0, 0, 15], fov: 60 }}
              gl={{
                alpha: true,
                antialias: false,
                powerPreference: "high-performance"
              }}
              style={{ background: "transparent" }}
              dpr={[1, 1.5]}           // Lower dpr on mobile for performance
            >
              <ParticleField />
            </Canvas>
          </div>
        )}

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Scanline */}
        <div className="scanline z-20" />

        {/* Main Content */}
        <section className="relative z-30 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6">
              Hi, I&apos;m Muhammad
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-tight">
              I build high-performance frontend architectures <br className="hidden md:block" />
              and interactive user interfaces.
            </p>
          </motion.div>

          {/* Scroll Indicator - Better for mobile */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
            <Link
              href="#about"
              className="block text-white/70 hover:text-white transition-colors"
            >
              <div className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center">
                <div className="w-3 h-5 border-r-2 border-b-2 border-white/70 rotate-45" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}