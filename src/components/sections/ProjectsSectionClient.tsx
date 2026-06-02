"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  _id: string;
  title: string;
  category?: string;
  thumbnailImage?: string;
  posterImage?: string;
  isFeatured?: boolean;
}

interface ProjectsSectionClientProps {
  projects: Project[];
}

export default function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projectsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "1px 1px -40px 1px" }
    );

    const revealElements = projectsRef.current.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]);

  const visibleProjects = projects;

  return (
    <section id="projects" ref={projectsRef}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Explore My Work</div>
          <h2>My Projects</h2>
        </div>

        <div className="projects" id="projectGrid">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project._id}
              {...project}
              index={index}
              showAnimation={true}
            />
          ))}
        </div>

        <div className="show-more-wrap">
          <Link href="/all-projects" className="btn btn-primary">
            Show All
          </Link>
        </div>
      </div>
    </section>
  );
}
