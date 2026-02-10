"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function IntroAnimation() {
  const comp = useRef(null);
  const [complete, setComplete] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("introSeen") === "1";
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setComplete(true);
      return;
    }
    sessionStorage.setItem("introSeen", "1");
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        onComplete: () => setComplete(true),
      });

      // Animate shapes first
      t1.from(".shape", {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "back.out(1.2)",
      })
      .from("#intro-hi", {
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: "power3.out",
      }, "-=0.4")
      .from("#intro-name", {
        opacity: 0,
        x: -50,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.25")
      .from("#intro-subtitle", {
        opacity: 0,
        scale: 0.8,
        duration: 1.1,
        ease: "power3.out",
      }, "-=0.35")
      .to([".shape", "#intro-hi", "#intro-name", "#intro-subtitle"], {
        opacity: 0,
        y: -30,
        duration: 1.1,
        delay: 0.1,
      })
      .to("#intro-slider", {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
      });

    }, comp);

    return () => ctx.revert();
  }, [complete, pathname]);

  if (pathname !== "/" || complete) return null;

  return (
    <div ref={comp} className="fixed inset-0 z-50 pointer-events-none">
      <div 
        id="intro-slider"
        className="absolute inset-0 bg-linear-to-br from-neutral-950 via-neutral-900 to-black flex items-center justify-center z-50 overflow-hidden"
      >
        {/* Animated geometric shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="shape absolute top-20 left-20 w-32 h-32 border-4 border-orange-500 rounded-full" />
          <div className="shape absolute top-40 right-32 w-24 h-24 bg-linear-to-br from-orange-500 to-red-500 rotate-45" />
          <div className="shape absolute bottom-32 left-40 w-40 h-40 border-4 border-red-400" />
          <div className="shape absolute bottom-20 right-20 w-28 h-28 rounded-full bg-linear-to-tr from-orange-600/50 to-red-600/50" />
          <div className="shape absolute top-1/2 left-1/4 w-16 h-16 border-4 border-orange-400 rotate-12" />
          <div className="shape absolute top-1/3 right-1/4 w-20 h-20 bg-red-500/30 rounded-full" />
        </div>

        {/* Main text content */}
        <div className="text-center space-y-4 relative z-10">
          <h2 id="intro-hi" className="text-2xl md:text-3xl font-light text-orange-400 tracking-wide">
            Hi, this is
          </h2>
          <h1 id="intro-name" className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
            <span className="bg-linear-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
              Mahmud
            </span>
          </h1>
          <p id="intro-subtitle" className="text-lg md:text-xl text-gray-400 font-light tracking-wider">
            Graphics Designer
          </p>
        </div>

        {/* linear overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-orange-500/5 via-transparent to-red-500/5" />
      </div>
    </div>
  );
}
