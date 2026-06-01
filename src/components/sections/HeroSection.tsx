"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  heroImageUrl?: string;
}

export default function HeroSection({ heroImageUrl = "/photo2.png" }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

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

    if (heroRef.current) {
      const revealElements = heroRef.current.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero">
      {/* Blob Animation Background */}
      <div className="hero-blob"></div>

      <div className="container hero-grid">
        {/* Left Column - Text Content */}
        <div>
          <div className="greet">Hi There,</div>
          <h1>Im <span className="green">Md Mahmud</span></h1>
          <p>Professional Graphics Designer & Video Editor with 5+ years of experience crafting eye-catching designs, scroll-stopping ads, and engaging video edits that grow brands.</p>
          
          <div className="hero-cta">
            <a className="btn btn-primary" href="https://wa.me/8801345347968" target="_blank" rel="noopener noreferrer">
              Contact Me
            </a>
            <a className="btn btn-ghost" href="#projects">
              View My Projects
            </a>
          </div>
        </div>

        {/* Right Column - Photo */}
        <div className="hero-photo">
          <div className="photo-frame">
            <Image
              src={heroImageUrl}
              alt="Md Mahmud - Graphics Designer & Video Editor"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="photo-badge">
              <div className="badge-name">Md Mahmud</div>
              <div className="badge-role">Designer · Rajshahi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
