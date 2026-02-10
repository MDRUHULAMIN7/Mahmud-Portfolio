"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Facebook, Mail, MessageCircle, Sparkles, Phone } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.7 11.3c.9-.5 1.6-1.4 1.6-2.6 0-2.3-1.6-3.4-4.4-3.4H2v14h5.2c3.1 0 5-1.4 5-3.9 0-2-1.1-3.3-2.5-3.1Zm-4.5-4h1.6c1.5 0 2.2.6 2.2 1.7 0 1.2-.8 1.8-2.2 1.8H5.2V7.3Zm1.9 9H5.2v-3.4h1.9c1.7 0 2.6.6 2.6 1.7 0 1.1-.8 1.7-2.6 1.7Zm9.7-9.8h-4.9V4.6h4.9v1.9Zm-2.5 2c-2.7 0-4.3 1.8-4.3 4.6 0 2.9 1.6 4.7 4.4 4.7 2 0 3.4-1 3.9-2.7h-2c-.2.6-.8 1-1.8 1-1.2 0-2-.7-2-2h5.8c.1-3.3-1.4-5.6-4-5.6Zm-1.9 3.6c.1-1.1.9-1.8 2-1.8s1.8.7 1.9 1.8h-3.9Z" />
  </svg>
);

export default function ContactSection() {
  const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<{
    name: string;
    email: string;
    message: string;
  }>();
  
  const onSubmit = async (data: { name: string; email: string; message: string }) => {
    try {
      await axios.post("/api/messages", data);
      toast("Message sent!");
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

  const socials = [
    // {
    //   name: "LinkedIn",
    //   href: "https://www.linkedin.com/in/your-profile",
    //   value: "linkedin.com/in/your-profile",
    //   Icon: Linkedin,
    // },
    {
      name: "Behance",
      href: "https://www.behance.net/mdmahmud121",
      value: "behance.net/mdmahmud121",
      Icon: BehanceIcon,
    },
    {
      name: "Gmail",
      href: "mailto:mdmahamud59yy@gmail.com",
      value: "mdmahamud59yy@gmail.com",
      Icon: Mail,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/8801903001637",
      value: "+880 1903-001637",
      Icon: MessageCircle,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/mahmudmir32",
      value: "facebook.com/mahmudmir32",
      Icon: Facebook,
    },
  ];

  return (
    <section id="contact" className="py-10">
      <div className=" px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-orange-500/80">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
            Let&apos;s build something bold together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            Share your idea, timeline, and goals. I will reply quickly with a clear plan and a custom quote.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-neutral-950 dark:shadow-black/40"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">
              <Sparkles className="h-3.5 w-3.5" />
              Available for projects
            </div>
            <h3 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
              Contact Channels
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Choose any platform below. I&apos;m active and respond fast.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {socials.map(({ name, href, value, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-50 hover:text-neutral-900 hover:shadow-md dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span>{name}</span>
                    <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-700 dark:text-orange-200">
              <Phone className="h-4 w-4" />
              WhatsApp / Call: +880 1903-001637
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="space-y-6 rounded-3xl border border-black/10 bg-white p-8 shadow-2xl shadow-black/5 dark:border-white/10 dark:bg-neutral-950 dark:shadow-black/40"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">Name</label>
              <input 
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-xl border border-black/5 bg-black/5 p-3 text-sm outline-none transition-colors focus:border-orange-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="Your Name"
              />
              {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">Email</label>
              <input 
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full rounded-xl border border-black/5 bg-black/5 p-3 text-sm outline-none transition-colors focus:border-orange-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="your@email.com"
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-200">Message</label>
              <textarea 
                {...register("message", { required: "Message is required" })}
                rows={4}
                className="w-full rounded-xl border border-black/5 bg-black/5 p-3 text-sm outline-none transition-colors focus:border-orange-500/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="Tell me about your project..."
              />
              {errors.message && <span className="text-sm text-red-500">{errors.message.message}</span>}
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-linear-to-r from-orange-500 via-red-500 to-orange-500 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/40 transition-all duration-300 hover:opacity-90"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
