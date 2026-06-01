"use client";

import { useEffect, useRef } from "react";

const skills = [
  { name: "Photoshop", icon: "Ps", percentage: "95%", delay: "stagger-1" },
  { name: "Illustrator", icon: "Ai", percentage: "90%", delay: "stagger-2" },
  { name: "Premiere Pro", icon: "Pr", percentage: "92%", delay: "stagger-3" },
  { name: "After Effects", icon: "Ae", percentage: "85%", delay: "stagger-4" },
  { name: "MS Office", icon: "Of", percentage: "88%", delay: "stagger-5" },
];

export default function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null);

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

    if (skillsRef.current) {
      const revealElements = skillsRef.current.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">My Skills</div>
          <h2>Tools & Expertise</h2>
        </div>

        <div className="skills">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`skill reveal-scale ${skill.delay}`}
            >
              <div className="skill-ic">{skill.icon}</div>
              <b>{skill.percentage}</b>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
