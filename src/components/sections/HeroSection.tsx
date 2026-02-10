"use client";

import { motion } from "framer-motion";
import { MoveRight, Sparkles } from "lucide-react";
import { useState } from "react";

// Design tool logos as SVG paths (simplified)
const ToolCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function HeroSection() {
  const [isOpen,] = useState(true);

  return (
    <section id="home" className="relative flex sm:min-h-svh items-center justify-center overflow-hidden px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      {/* Dynamic linear background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-orange-50 via-red-50/50 to-orange-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-0 h-[min(38rem,80vw)] w-[min(38rem,80vw)] rounded-full bg-linear-to-br from-orange-400/20 to-transparent blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 h-[min(34rem,80vw)] w-[min(34rem,80vw)] rounded-full bg-linear-to-tl from-red-400/20 to-transparent blur-3xl"
        />
      </div>

      {/* Floating Design Tools */}
      <div className="absolute inset-0 hidden overflow-hidden pointer-events-none lg:block">
        {/* Photoshop Icon - Top Left */}
        <ToolCard delay={0.2} className="absolute top-20 left-8 md:left-20">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <span className="text-white font-bold text-2xl md:text-3xl">Ps</span>
          </motion.div>
        </ToolCard>

        {/* Illustrator Icon - Top Right */}
        <ToolCard delay={0.4} className="absolute top-32 right-8 md:right-24">
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 md:w-18 md:h-18 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-2xl shadow-orange-500/50 flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <span className="text-white font-bold text-xl md:text-2xl">Ai</span>
          </motion.div>
        </ToolCard>

        {/* Figma Icon - Left Middle */}
        <ToolCard delay={0.6} className="absolute top-1/2 left-4 md:left-16 -translate-y-1/2">
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl shadow-purple-500/50 flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="white">
              <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/>
              <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"/>
              <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"/>
              <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"/>
              <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"/>
            </svg>
          </motion.div>
        </ToolCard>

        {/* After Effects Icon - Right Middle */}
        <ToolCard delay={0.8} className="absolute top-1/3 right-4 md:right-12">
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-purple-600 to-purple-700 rounded-2xl shadow-2xl shadow-purple-600/50 flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <span className="text-white font-bold text-2xl md:text-3xl">Ae</span>
          </motion.div>
        </ToolCard>

        {/* XD Icon - Bottom Left */}
        <ToolCard delay={1} className="absolute bottom-32 left-8 md:left-32">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 md:w-18 md:h-18 bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl shadow-2xl shadow-pink-500/50 flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <span className="text-white font-bold text-xl md:text-2xl">Xd</span>
          </motion.div>
        </ToolCard>

        {/* Premiere Pro Icon - Bottom Right */}
        <ToolCard delay={1.2} className="absolute bottom-24 right-8 md:right-28">
          <motion.div
            animate={{ 
              y: [0, 18, 0],
              x: [0, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl shadow-purple-500/50 flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <span className="text-white font-bold text-2xl md:text-3xl">Pr</span>
          </motion.div>
        </ToolCard>

        {/* Floating particles/dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 rounded-full bg-linear-to-r from-orange-500 to-red-500"
            style={{
              left: `${20 + i * 15}%`,
              bottom: '10%',
            }}
          />
        ))}
      </div>

      <div className="z-10 mx-auto w-full max-w-5xl space-y-6 text-center md:space-y-10">
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border-2 border-orange-500/30 bg-white/90 px-4 py-2 text-xs shadow-xl shadow-orange-500/20 backdrop-blur-md dark:bg-neutral-900/90 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-orange-500" : "bg-red-500"}`} 
          />
          <span className="text-sm font-semibold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {isOpen ? "Available for work" : "Busy at moment"}
          </span>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-4 md:space-y-6"
        >
          {/* Creative greeting */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block"
          >
            <div className="rounded-full border border-orange-500/20 bg-linear-to-r from-orange-500/10 to-red-500/10 px-4 py-2 sm:px-6">
              <span className="text-base font-light text-neutral-700 dark:text-neutral-300 sm:text-lg md:text-xl">
                👋 Hi, I am
              </span>
            </div>
          </motion.div>
          
          {/* Name with creative effect */}
          <div className="relative">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[0.95] tracking-tight sm:text-[clamp(3rem,7vw,7rem)] lg:text-[clamp(4rem,6vw,9rem)]"
            >
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-linear-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text text-transparent blur-lg opacity-50">
                  Mahmud
                </span>
                <span className="relative bg-linear-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Mahmud
                </span>
              </span>
            </motion.h1>
            
            {/* Underline decoration */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mx-auto mt-4 h-1.5 w-[min(200px,60%)] rounded-full bg-linear-to-r from-orange-500 to-red-500 sm:h-2"
            />
          </div>

          {/* Animated subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <p className="text-[clamp(1.25rem,4vw,2.5rem)] font-bold text-neutral-800 dark:text-neutral-200">
              Graphics Designer & Visual Artist
            </p>
            
            {/* Creative tagline */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-orange-500" />
              </motion.div>
              <p className="max-w-2xl px-2 text-[clamp(0.95rem,2.4vw,1.125rem)] font-light text-neutral-600 dark:text-neutral-400">
                Transforming ideas into stunning visual experiences
              </p>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-red-500" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="pt-4 md:pt-8"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-orange-500 via-red-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-2xl shadow-orange-500/50 transition-all duration-300 overflow-hidden sm:w-auto sm:px-10 sm:py-5 sm:text-base lg:text-lg"
          >
            <span className="absolute inset-0 bg-linear-to-r from-orange-600 via-red-600 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Explore My Work</span>
            <MoveRight className="relative w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-2" />
          </motion.button>
        </motion.div>

        {/* Scroll indicator with style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-orange-500 rounded-full"
              />
            </div>
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}