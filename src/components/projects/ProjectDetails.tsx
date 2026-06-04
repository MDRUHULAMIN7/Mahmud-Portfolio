"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {PhoneCall } from "lucide-react";
import { toast } from "sonner";
import { IProject } from "@/models/Project";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

type SerializedProject = Omit<IProject, "createdAt" | "updatedAt" | "publishDate"> & {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  publishDate: string;
};

type ProjectDetailsProps = {
  project: SerializedProject;
};

const WHATSAPP_URL = "https://wa.me/8801345347968";

const getFallbackViews = (id = "") => {
  const seed = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 1000 + (seed % 501);
};

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M3 6h6.3c2.4 0 3.9 1.2 3.9 3.1 0 1.1-.5 2-1.5 2.5 1.3.4 2.1 1.4 2.1 2.9 0 2.2-1.7 3.5-4.3 3.5H3V6Zm3 4.8h2.8c.9 0 1.4-.4 1.4-1.2s-.5-1.2-1.5-1.2H6v2.4Zm0 4.8h3.1c1 0 1.6-.5 1.6-1.3 0-.9-.6-1.3-1.7-1.3H6v2.6ZM15.2 7h5.4v1.5h-5.4V7Zm6 8.1c-.5 2-2 3.2-4.2 3.2-2.9 0-4.6-1.9-4.6-4.8 0-2.8 1.8-4.8 4.5-4.8 3 0 4.5 2.2 4.4 5.4h-6c.1 1.2.7 1.9 1.8 1.9.7 0 1.2-.3 1.5-.9h2.6Zm-2.7-2.7c-.1-1-.7-1.6-1.6-1.6s-1.5.6-1.7 1.6h3.3Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M14.3 8.7V6.9c0-.8.5-1 1.1-1h1.9V3.1C16.9 3 15.8 3 14.6 3c-2.5 0-4.2 1.5-4.2 4.3v1.4H7.6V12h2.8v9h3.5v-9h2.9l.5-3.3h-3Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M6.7 8.9H3.5V20h3.2V8.9ZM5.1 7.4A1.9 1.9 0 1 0 5.1 3.6a1.9 1.9 0 0 0 0 3.8ZM20.5 20v-6.1c0-3-1.6-4.4-3.8-4.4-1.8 0-2.6 1-3 1.7V8.9h-3.1V20h3.2v-5.5c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h2.8Z" />
  </svg>
);

const getYear = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "2026" : date.getFullYear();
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(project.likes ?? 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [liking, setLiking] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const cover = project.cover || project.thumbnailImage || project.posterImage;
  const images = useMemo(() => {
    const gallery = project.images?.length ? project.images : [cover];
    return gallery.filter(Boolean) as string[];
  }, [cover, project.images]);
  const highlights = (project.highlights || []).filter(Boolean);
  const midpoint = Math.ceil(highlights.length / 2);
  const firstHighlights = highlights.slice(0, midpoint);
  const secondHighlights = highlights.slice(midpoint);
  const category = (project.category || "Project").toUpperCase();
  const views = project.views ?? getFallbackViews(project._id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!project._id) return;
    setHasLiked(localStorage.getItem(`liked:${project._id}`) === "1");
  }, [project._id]);

  const handleLike = async () => {
    if (liking || hasLiked || !project._id) return;

    setLiking(true);
    setLikes((currentLikes) => currentLikes + 1);

    try {
      const response = await fetch(`/api/projects/${project._id}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        setLikes((currentLikes) => Math.max(0, currentLikes - 1));
        return;
      }

      localStorage.setItem(`liked:${project._id}`, "1");
      setHasLiked(true);
    } catch (error) {
      console.error("Failed to like project", error);
      setLikes((currentLikes) => Math.max(0, currentLikes - 1));
    } finally {
      setLiking(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setShareCopied(true);
    toast.success("Project link copied");
    window.setTimeout(() => setShareCopied(false), 1600);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/all-projects");
  };

  return (
    <main className="detail">
      <div className="container ">
        <div id="detail">
       

          <div className="pd-layout">
            <aside className="pd-left reveal visible">
               <button
            type="button"
            className="back reveal visible cursor-pointer text-sm"
            onClick={handleBack}
            aria-label="Go back to projects"
          >
            ← Back to projects
          </button>  <div className="pd-tag">
                {category} · {getYear(project.publishDate)}
              </div>
              <h1 className="pd-title">{project.title}</h1>
              <p className="pd-lede">{project.description || ""}</p>

              {highlights.length > 0 && (
                <>
                  {firstHighlights.length > 0 && (
                    <div className="pd-block">
                      <div className="pd-block-title">🍕 Perfect for:</div>
                      <ul className="pd-check">
                        {firstHighlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {secondHighlights.length > 0 && (
                    <div className="pd-block">
                      <div className="pd-block-title">🥡 What you&apos;ll get:</div>
                      <ul className="pd-check">
                        {secondHighlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              <div className="pd-line">
                📞 <b>WhatsApp:</b> +880 1345347968
              </div>
              <p className="pd-lede">
                Let&apos;s make your brand impossible to ignore 🎨
                <br />
                Send me your number, and I&apos;ll personally reach out to you.
              </p>
              <a className="btn-pill" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                💬 Order on WhatsApp
              </a>
            </aside>

            <section className="pd-center">
              {images.map((src, index) => (
                <div
                  className={`pd-shot reveal visible stagger-${Math.min(index + 1, 5)}`}
                  key={`${index}-${src}`}
                >
                  <Image src={src} alt={project.title} loading="lazy" width={600} height={400} />
                </div>
              ))}
            </section>

            <aside className="pd-right reveal-right visible">
              <div className="pd-stats">
                <button className="pd-stat" type="button" onClick={handleLike} disabled={liking || hasLiked}>
                  {hasLiked ? "♥" : "♡"} <span>{likes} Likes</span>
                </button>
                <div className="pd-stat">
                  👁 <span>{views.toLocaleString()} Views</span>
                </div>
                <button className="pd-stat" type="button" onClick={handleShare}>
                  ⇪ <span>{shareCopied ? "Copied" : "Share"}</span>
                </button>
              </div>

              <div className="pd-socials">
                <a href={WHATSAPP_URL} aria-label="WhatsApp" target="_blank" rel="noreferrer">
                  <PhoneCall size={18} />
                </a>
                <a href={siteConfig.social.behance} aria-label="Behance" target="_blank" rel="noreferrer">
                  <BehanceIcon />
                </a>
                <a href={siteConfig.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                  <FacebookIcon />
                </a>
                <a href={siteConfig.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                  <LinkedInIcon />
                </a>
              </div>

              <div className="pd-meta-card">
                <div className="pd-section-label">Social</div>
                <a href="mailto:mdmahmud59yy@gmail.com">mdmahmud59yy@gmail.com</a>
                <div>+880 1345 347968</div>
              </div>

              <div className="pd-cta-card">
                <h3>
                  Let&apos;s create
                  <br />
                  something bold.
                </h3>
                <a className="btn-pill" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Start a Project →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
