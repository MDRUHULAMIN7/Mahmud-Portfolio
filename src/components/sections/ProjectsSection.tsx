"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { IProject } from "@/models/Project";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects?published=true");
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-10">
      <div className=" px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-orange-500/80">
            Selected Work
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
            Projects that balance beauty and clarity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            A curated set of branding, illustration, UI/UX, and retouching work crafted for real clients.
          </p>
        </motion.div>
       
        {loading ? (
          <div className="text-center text-sm text-neutral-500">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: IProject, index) => {
              const cover = project.thumbnailImage || project.posterImage;
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.06 }}
                >
                  <Link
                    href={`/projects/${project._id}`}
                    className="group relative block overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-white/10 dark:bg-neutral-950 dark:shadow-black/40"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        {cover ? (
                          <Image
                            src={cover}
                            alt={project.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                            No image
                          </div>
                        )}
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 backdrop-blur dark:bg-neutral-900/70 dark:text-orange-300">
                          <Sparkles className="h-3.5 w-3.5" />
                          Featured
                        </div>
                      </div>

                      <div className="space-y-3 p-5">
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                            {project.title}
                          </h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                          <span className="inline-flex items-center gap-2">
                            <Heart className="h-4 w-4 text-orange-500" />
                            {project.likes ?? 0} likes
                          </span>
                          <span className="rounded-full border border-orange-500/20 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300">
                            View Project
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
