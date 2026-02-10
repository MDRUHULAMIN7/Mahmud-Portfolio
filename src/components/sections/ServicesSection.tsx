"use client";
import { motion } from "framer-motion";
import { Copy, PenTool, Monitor, Image, Sparkles, Layers, Wand2 } from "lucide-react";

const services = [
  {
    title: "Brand Identity",
    icon: Copy,
    subtitle: "Make your brand instantly recognizable.",
    description: "Strategic visual systems that stay consistent across print, web, and social.",
    includes: ["Logo suite", "Color & typography", "Brand guidelines"],
  },
  {
    title: "Illustration",
    icon: PenTool,
    subtitle: "Custom art that tells your story.",
    description: "Bespoke illustrations that add personality and elevate your message.",
    includes: ["Editorial art", "Mascots & icons", "Social graphics"],
  },
  {
    title: "UI/UX Design",
    icon: Monitor,
    subtitle: "Elegant interfaces that convert.",
    description: "User-centered flows, clean layouts, and pixel-perfect UI systems.",
    includes: ["Wireframes", "High-fidelity UI", "Design systems"],
  },
  {
    title: "Photo Editing",
    icon: Image,
    subtitle: "Premium retouching with a natural feel.",
    description: "Color grading, cleanup, and composite work for commercial quality.",
    includes: ["Retouching", "Background cleanup", "Creative composites"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-10 ">
      <div className=" px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-orange-500/80">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
            Design that looks premium and works harder
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            From brand identity to UI/UX and illustration, each service is built to tell your story,
            boost clarity, and deliver a consistent visual system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-white/10 dark:bg-neutral-950 dark:shadow-black/40"
              >
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured
                  </div>

                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500/15 to-red-500/15 text-orange-500 dark:text-orange-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{service.title}</h3>
                      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 dark:text-orange-300">
                          <Layers className="h-3.5 w-3.5" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-300">
                    <Wand2 className="h-4 w-4" />
                    Custom quotes in 24 hours
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
