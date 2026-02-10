"use client";

import { PenTool, Brush, LayoutGrid, Type, Sparkles, Palette } from "lucide-react";

const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "10+", label: "Happy Clients" },
  { value: "1", label: "Years Experience" },
  { value: "1", label: "Awards Won" },
];

const specialties = [
  { label: "Branding", icon: Brush },
  { label: "Typography", icon: Type },
  { label: "Editorial", icon: LayoutGrid },
  { label: "UI/UX", icon: Sparkles },
  { label: "Illustration", icon: PenTool },
  { label: "Motion Graphics", icon: Palette },
];

export default function AboutSection() {
  return (
    <section id="about" className=" py-10 lg:py-20">
      <div className="grid gap-10 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left content */}
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-orange-600/80 dark:text-orange-300/80">About Me</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
            Crafting visual systems that feel premium, clear, and alive.
          </h2>
          <p className="mt-6 text-base leading-7 text-neutral-600 dark:text-white/70">
            I&apos;m Mahmud, a graphics designer with 8+ years of experience creating compelling visual narratives for brands across industries.
            My approach blends strategy with creative excellence so every design looks beautiful and works effectively.
          </p>
          <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-white/70">
            I believe design can transform businesses and build meaningful connections with audiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {specialties.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-orange-700 dark:bg-black/40 dark:text-orange-100/90"
              >
                <Icon className="h-4 w-4 text-orange-500 dark:text-orange-300" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right stats */}
        <div className="grid gap-5 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 text-center shadow-lg shadow-black/5 dark:border-white/10 dark:bg-black/60 dark:shadow-black/40"
            >
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="text-4xl font-bold text-orange-500 md:text-5xl">{stat.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-white/60">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
