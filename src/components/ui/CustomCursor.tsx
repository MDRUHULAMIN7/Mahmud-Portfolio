"use client";
import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, label";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = 0;
    let targetY = 0;
    let rafId = 0;

    const activate = () => {
      cursor.classList.add("active");
    };

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      activate();
    };

    const tick = () => {
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(var(--cursor-scale, 1))`;
      rafId = window.requestAnimationFrame(tick);
    };

    const handleDown = () => {
      cursor.classList.add("pressed");
    };

    const handleUp = () => {
      cursor.classList.remove("pressed");
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        document.body.classList.add("cursor-hover");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        document.body.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    tick();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div id="cursor" ref={cursorRef} aria-hidden="true">
      <div id="cursor-dot" />
    </div>
  );
}