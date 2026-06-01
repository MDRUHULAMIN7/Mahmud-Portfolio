"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "550+", label: "Projects Completed", delay: "stagger-1" },
  { value: "450+", label: "Satisfied Clients", delay: "stagger-2" },
  { value: "5+", label: "Years Experience", delay: "stagger-3" },
];

export default function AboutSection() {
  const aboutRef = useRef<HTMLDivElement>(null);

  // Initialize reveal animations
  useEffect(() => {
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

    if (aboutRef.current) {
      const revealElements = aboutRef.current.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={aboutRef}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">About Me</div>
          <h2>Get to Know Me Better</h2>
        </div>

        <div className="about-grid reveal">
          <div className="about">
            <p>I&apos;m Md Mahmud, a passionate Graphics Designer and Video Editor with over 5 years of professional experience. I help brands create scroll-stopping visuals, premium video edits, and high-converting ad creatives. From YouTube thumbnails to full social media campaigns, every project is crafted with precision and creative care.</p>
            <p>I work daily with Adobe Photoshop, Illustrator, Premiere Pro, After Effects and Microsoft Office tools to deliver client-ready results.</p>
            
            <a className="btn btn-primary" href="#services">My Service</a>

            <div className="stats">
              {stats.map((stat) => (
                <div key={stat.label} className={`stat reveal-scale ${stat.delay}`}>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
