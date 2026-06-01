"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  category?: string;
  thumbnailImage?: string;
  posterImage?: string;
}

interface ProjectsSectionClientProps {
  projects: Project[];
}

const PROJECTS_PER_PAGE = 6;

export default function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
  const [displayed, setDisplayed] = useState(1);
  const [loading, setLoading] = useState(false);
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
  }, [projects, displayed]);

  const visibleProjects = projects.slice(0, displayed);
  const hasMore = displayed < projects.length;

  if (loading) {
    return (
      <section id="projects">
        <div className="container text-center text-muted">Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" ref={projectsRef}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Explore My Work</div>
          <h2>My Projects</h2>
        </div>

        <div className="projects" id="projectGrid">
          {visibleProjects.map((project, index) => {
            const imageSrc = project.thumbnailImage || project.posterImage || '/photo2.png';
            return (
              <Link
                key={project._id}
                href={`/projects/${project._id}`}
                className="project reveal"
                style={{ transitionDelay: `${Math.min(index, 5) * 0.08}s` }}
              >
                <div className="thumb">
                  <Image
                    src={imageSrc}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>

                <div className="body">
                  <div className="tag">{project.category || 'Project'}</div>
                  <h4>
                    {project.title}
                    <span className="arrow">&rarr;</span>
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>

        {hasMore && (
          <div className="show-more-wrap">
            <button
              onClick={() => setDisplayed((prev) => prev + PROJECTS_PER_PAGE)}
              className="btn btn-primary"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
