import { useEffect, useRef } from "react";

/**
 * Animated aurora-style background using canvas 2D + radial gradient blobs.
 * Lightweight WebGL-feel without WebGL cost. Honors reduced motion.
 */
export function Aurora({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Read accent color from CSS var (HSL tokens like "12 100% 59%") and
    // convert to comma-separated form Canvas can parse.
    const styles = getComputedStyle(document.documentElement);
    const toHsla = (raw: string, fallback: string, a: number) => {
      const v = (raw || fallback).trim().replace(/\s+/g, " ");
      const parts = v.split(" ").filter(Boolean);
      const [hH, sS, lL] = parts.length >= 3 ? parts : fallback.split(" ");
      return `hsla(${hH}, ${sS}, ${lL}, ${a})`;
    };
    const accentRaw = styles.getPropertyValue("--accent");
    const glowRaw = styles.getPropertyValue("--accent-glow");

    const blobs = [
      { x: 0.2, y: 0.3, r: 0.55, c: toHsla(accentRaw, "12 100% 59%", 0.55), sx: 0.00018, sy: 0.00012 },
      { x: 0.8, y: 0.5, r: 0.5, c: toHsla(glowRaw, "28 100% 62%", 0.45), sx: -0.00015, sy: 0.00022 },
      { x: 0.5, y: 0.85, r: 0.6, c: toHsla(accentRaw, "12 100% 59%", 0.35), sx: 0.0002, sy: -0.00016 },
      { x: 0.3, y: 0.7, r: 0.45, c: toHsla(glowRaw, "28 100% 62%", 0.3), sx: -0.00022, sy: -0.0001 },
    ];

    const start = performance.now();
    const draw = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      blobs.forEach((b) => {
        const cx = (b.x + Math.sin(t * b.sx) * 0.12) * w;
        const cy = (b.y + Math.cos(t * b.sy) * 0.12) * h;
        const radius = b.r * Math.max(w, h) * 0.6 * intensity;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grd.addColorStop(0, b.c);
        grd.addColorStop(1, "hsla(0,0%,0%,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      });

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={"pointer-events-none absolute inset-0 w-full h-full " + className}
    />
  );
}
