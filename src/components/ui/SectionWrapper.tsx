"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 px-4 md:px-8 max-w-7xl mx-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-4xl border border-black/10 bg-white text-neutral-900 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-neutral-950 dark:text-white dark:shadow-black/30"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,120,80,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,80,120,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,140,80,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,80,0.14)_1px,transparent_1px)] bg-size-[48px_48px]" />
        <div className="relative z-10 p-6 md:p-10 lg:p-12">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
