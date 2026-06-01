"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    title: "YouTube Thumbnail Design",
    icon: "▶",
    description: "Click-worthy, high-CTR thumbnails crafted to boost your video views and channel growth.",
    delivery: "3-5 Days Delivery",
    delay: "stagger-1",
  },
  {
    title: "Social Media Ad Design",
    icon: "★",
    description: "Scroll-stopping ad creatives for Facebook, Instagram and more — built to convert.",
    delivery: "3-6 Days Delivery",
    delay: "stagger-2",
  },
  {
    title: "Video Editing",
    icon: "🎬",
    description: "Professional video edits with motion graphics, color grading and crisp audio for any platform.",
    delivery: "3-7 Days Delivery",
    delay: "stagger-3",
  },
];

export default function ServicesSection() {
  const servicesRef = useRef<HTMLDivElement>(null);

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

    if (servicesRef.current) {
      const revealElements = servicesRef.current.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={servicesRef}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">My Service</div>
          <h2>What I Offer</h2>
        </div>

        <div className="services">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service reveal ${service.delay}`}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              
              <div className="meta">
                <span>{service.delivery}</span>
                <a 
                  className="btn btn-primary" 
                  style={{ padding: '6px 14px' }} 
                  href="https://wa.me/8801345347968" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Order
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
