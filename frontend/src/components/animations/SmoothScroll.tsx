import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/** Inertia/smooth scroll wrapper. Disabled on touch + reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Respect user OS preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    // Touch devices already have perfect native momentum scrolling.
    // Running JS smooth scroll on mobile often causes the "stuck" feeling.
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    // THE FIX: Removed the conflicting 'duration' and 'easing' properties.
    // Relying purely on 'lerp' creates an instant response with a buttery smooth stop.
    const lenis = new Lenis({
      lerp: 0.08, // 0.08 is the perfect sweet spot (lower = slower, higher = faster)
      wheelMultiplier: 1,
      smoothWheel: true,
      orientation: "vertical",
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Clean up on unmount so it doesn't break React Router navigation
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}