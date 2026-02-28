import { motion } from "framer-motion";

export default function Loading() {
  const words = "Yokoso".split("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816]">
      <div className="relative flex flex-col items-center">
        {/* Animated Text */}
        <div className="flex mb-4">
          {words.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
              className="text-white text-5xl sm:text-7xl font-bold tracking-tighter"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Decorative Progress Line */}
        <div className="w-48 h-[2px] bg-white/10 overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-[#915EFF] to-transparent"
          />
        </div>

        {/* Cyberpunk Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
          <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>
      </div>
    </div>
  );
}
