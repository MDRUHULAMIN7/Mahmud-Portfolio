"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Service" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isDashboard || isAdmin) return null;

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        {/* Brand Logo */}
        <Link href="/" className="brand">
          MD <span>MAHMUD</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" id="navLinks">
          {links.map((link) => (
            <a
              key={link.label}
              href={isHome ? link.href : `/${link.href}`}
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
         
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="menu-toggle"
          id="menuToggle"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            const navLinks = document.getElementById("navLinks");
            if (navLinks) {
              navLinks.classList.toggle("open");
            }
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
