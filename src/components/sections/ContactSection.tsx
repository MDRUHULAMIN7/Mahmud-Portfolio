"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function ContactSection() {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<{
    name: string;
    email: string;
    subject?: string;
    message: string;
  }>();
  const contactRef = useRef<HTMLDivElement>(null);
  
  const onSubmit = async (data: { name: string; email: string; subject?: string; message: string }) => {
    try {
      await axios.post("/api/messages", data);
      toast.success("Message sent — I will get back to you soon!");
      reset();
    } catch (error) {
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data as { error?: string })?.error
          : undefined;
      if (message?.toLowerCase().includes("email") || message?.toLowerCase().includes("limit")) {
        setError("email", { type: "server", message });
      }
      toast.error(message || "Failed to send message");
    }
  };

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

    if (contactRef.current) {
      const revealElements = contactRef.current.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
      );
      revealElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={contactRef}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Contact</div>
          <h2>Let&apos;s Create Something Bold</h2>
        </div>

        <div className="contact">
          {/* Contact Info - Left */}
          <div className="contact-info reveal-left">
            <p>Have a project in mind? Reach out and let&apos;s start a conversation. I&apos;m here to help bring your ideas to life.</p>
            
            <div className="contact-item">
              <div className="ic">📱</div>
              <div>
                <b>WhatsApp</b>
                <br />
                <a href="https://wa.me/8801345347968">+880 1345 347968</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="ic">✉</div>
              <div>
                <b>Email</b>
                <br />
                <a href="mailto:mdmahmud59yy@gmail.com">mdmahmud59yy@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="ic">📍</div>
              <div>
                <b>Available</b>
                <br />
                Worldwide — Remote
              </div>
            </div>
          </div>

          {/* Contact Form - Right */}
          <form
            id="contactForm"
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form reveal-right"
          >
            <input 
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              required
            />
            {errors.name && <span className="text-sm text-red-400">{errors.name.message}</span>}

            <input 
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Your Email"
              required
            />
            {errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}

            <input 
              {...register("subject")}
              placeholder="Subject"
            />

            <textarea 
              {...register("message", { required: "Message is required" })}
              rows={4}
              placeholder="Your Message"
              required
            />
            {errors.message && <span className="text-sm text-red-400">{errors.message.message}</span>}

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
