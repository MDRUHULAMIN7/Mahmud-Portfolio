"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ExternalLink, ArrowLeft, Sparkles, Layers } from "lucide-react";
import { IProject } from "@/models/Project";
import { useEffect, useState } from "react";

type SerializedProject = Omit<IProject, "createdAt" | "updatedAt" | "publishDate"> & {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  publishDate: string;
};

export default function ProjectDetails({ project }: { project: SerializedProject }) {
  const cover = project.thumbnailImage || project.posterImage;
  const hasGallery = project.elementsImages && project.elementsImages.length > 0;
  const [likes, setLikes] = useState(project.likes ?? 0);
  const [liking, setLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!project._id) return;
    const key = `liked:${project._id}`;
    setHasLiked(localStorage.getItem(key) === "1");
  }, [project._id]);

  const handleLike = async () => {
    if (liking || hasLiked || !project._id) return;
    setLiking(true);
    setLikes((prev) => prev + 1);
    try {
      const res = await fetch(`/api/projects/${project._id}/like`, {
        method: "POST",
      });
      if (!res.ok) {
        setLikes((prev) => Math.max(0, prev - 1));
        return;
      }
      localStorage.setItem(`liked:${project._id}`, "1");
      setHasLiked(true);
    } catch (err) {
      console.error("Failed to like project", err);
      setLikes((prev) => Math.max(0, prev - 1));
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-black dark:via-neutral-950 dark:to-black">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <button
            onClick={handleLike}
            disabled={liking || hasLiked}
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs text-gray-600 shadow-sm shadow-black/5 hover:bg-black/5 disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15"
          >
            <Heart className="h-3 w-3" />
            {likes} {likes === 1 ? "like" : "likes"}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          className="space-y-8"
        >
          <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/85 p-6 shadow-2xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-70" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 backdrop-blur dark:bg-neutral-900/70 dark:text-orange-300">
                <Sparkles className="h-3.5 w-3.5" />
                Project Details
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-3xl text-base text-neutral-600 dark:text-neutral-300">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {project.accessibleLink && (
                  <a
                    href={project.accessibleLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    View Live
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">
                  <Layers className="h-3.5 w-3.5" />
                  Crafted for impact
                </span>
              </div>
            </div>
          </div>

          {cover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="relative w-full overflow-hidden rounded-3xl border border-black/5 bg-white/70 shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-neutral-900"
            >
              {/* No fixed aspect ratio; image keeps natural height */}
              <div className="relative w-full">
                <Image
                  src={cover}
                  alt={`${project.title} cover`}
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </motion.div>
          )}

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
              className="rounded-3xl border border-black/5 bg-white/70 p-5 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-neutral-950"
            >
              <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">Before</h2>
              <p className="text-sm mb-4 text-neutral-500 dark:text-neutral-400">
                These elements were used to build the Project.
              </p>
              {hasGallery ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.elementsImages.map((url, idx) => (
                    <motion.div
                      key={`${project._id}-el-${idx}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.04 }}
                      className="relative w-full overflow-hidden rounded-xl border border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900"
                    >
                      {/* Original aspect ratio */}
                      <div className="relative w-full">
                        <Image
                          src={url}
                          alt={`${project.title} element ${idx + 1}`}
                          width={300}
                          height={300}
                          className="h-auto w-full"
                          style={{ objectFit: "contain" }}
                          sizes="(min-width: 1024px) 16vw, 40vw"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-black/10 p-6 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
                  Elements not added yet. These usually show the pieces used to craft the poster or thumbnail.
                </div>
              )}

            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="rounded-3xl border border-black/5 bg-white/70 p-5 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-neutral-950"
            >
              <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">After</h2>
              <p className="text-sm mb-4 text-neutral-500 dark:text-neutral-400">
                Those Before elements here used to build the Project.
              </p>
              {project.posterImage ? (
                <div className="relative w-full overflow-hidden rounded-2xl border border-black/5 bg-white dark:border-white/10 dark:bg-neutral-900">
                  {/* Maintains original aspect ratio */}
                  <div className="relative w-full">
                    <Image
                      src={project.posterImage}
                      alt={`${project.title} poster`}
                      width={800}
                      height={1000}
                      className="h-auto w-full"
                      style={{ objectFit: "contain" }}
                      sizes="(min-width: 1024px) 30vw, 80vw"
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-black/10 p-6 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
                  No poster image yet. The thumbnail is the primary visual for this project.
                </div>
              )}

            </motion.div>

            
          </div>
        </motion.div>
      </div>
    </div>
  );
}
