"use client";

import { motion } from "framer-motion";
import { MoveRight, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

      {/* Main two-column layout */}
      <div className="z-10 mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left column - Text content */}
        <div className="space-y-6 text-center lg:text-left md:space-y-10">
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
                className="mx-auto lg:mx-0 mt-4 h-1.5 w-[min(200px,60%)] rounded-full bg-linear-to-r from-orange-500 to-red-500 sm:h-2"
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
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
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
            className="pt-2"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex"
            >
              <Link
                href="#projects"
                className="group relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-orange-500 via-red-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-2xl shadow-orange-500/50 transition-all duration-300 overflow-hidden sm:w-auto sm:px-10 sm:py-5 sm:text-base lg:text-lg"
              >
                <span className="absolute inset-0 bg-linear-to-r from-orange-600 via-red-600 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">Explore My Work</span>
                <MoveRight className="relative w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right column - Image */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative flex justify-center lg:justify-end min-h-0"
        >
          <div className="relative w-70 sm:w-85 md:w-100 lg:w-105 xl:w-120 flex items-stretch">
            {/* Accent frame behind image */}
            <div className="absolute -right-3  w-full h-full rounded-2xl border-2 border-orange-400/40 dark:border-orange-500/30" />

            {/* Subtle gradient accent bar */}
            <div className="absolute -left-2 top-8 bottom-8 w-1 rounded-full bg-linear-to-b from-orange-500 to-red-500 opacity-60" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl flex-1">
              <Image
                src="/photo2.png"
                alt="Mahmud - Graphics Designer & Visual Artist"
                width={480}
                height={720}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Name tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute -bottom-5 left-6 bg-white dark:bg-neutral-900 rounded-xl px-4 py-2.5 shadow-lg border border-neutral-200 dark:border-neutral-800"
            >
              <p className="text-sm font-bold text-neutral-900 dark:text-white">Mahmud</p>
              <p className="text-[11px] font-medium text-orange-600 dark:text-orange-400">Graphics Designer</p>
            </motion.div>

            {/* Projects count tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-white dark:bg-neutral-900 rounded-xl px-3.5 py-2.5 shadow-lg border border-neutral-200 dark:border-neutral-800"
            >
              <p className="text-lg font-bold text-neutral-900 dark:text-white">29+</p>
              <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Projects</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

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
    </section>
  );
}
