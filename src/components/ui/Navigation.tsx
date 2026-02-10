"use client";

import { Home, Lightbulb, Briefcase, User, Mail, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#services", label: "Services", icon: Lightbulb },
  { href: "#projects", label: "Work", icon: Briefcase },
  { href: "#contact", label: "Contact", icon: Mail },
];

export default function Navigation() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState("home");

  if (isDashboard) return null;

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = ["home", "about", "services", "projects", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setActiveId(hash);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const viewportTarget = window.innerHeight * 0.35;
        let bestId = "home";
        let bestDistance = Number.POSITIVE_INFINITY;

        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportTarget);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestId = el.id || bestId;
          }
        }

        setActiveId(bestId);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [isHome]);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 p-2 rounded-full bg-white/80 dark:bg-black/80 border border-black/10 dark:border-white/10 shadow-lg backdrop-blur-lg">
        {links.map((link) => {
          const Icon = link.icon;
          const linkId = link.href === "/" ? "home" : link.href.replace("#", "");
          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "p-3 rounded-full transition-all hover:bg-black/5 dark:hover:bg-white/10 group relative",
                isHome && activeId === linkId && "bg-black/10 dark:bg-white/20"
              )}
              aria-label={link.label}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {link.label}
              </span>
            </Link>
          );
        })}
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
