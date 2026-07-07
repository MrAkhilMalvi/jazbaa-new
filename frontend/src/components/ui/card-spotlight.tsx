"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  className,
  ...props
}: {
  radius?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        `group/spotlight relative overflow-hidden rounded-[2rem] border
         transition-all duration-500

         bg-white border-slate-200 shadow-sm
         hover:shadow-[0_0_40px_rgba(255,106,61,0.18)]

         /* Dark Mode hover shadow adjusted to a softer, warmer orange glow */
         dark:bg-zinc-900/50 dark:border-white/10
         dark:hover:shadow-[0_0_50px_rgba(255,106,61,0.22)]`,
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* ==============================================
          🌞 LIGHT MODE SPOTLIGHT (Orange Highlight)
          ============================================== */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition duration-300 group-hover/spotlight:opacity-100 dark:hidden"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 90%
            )
          `,
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              rgba(255,106,61,0.20),
              transparent 60%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="absolute inset-0 pointer-events-none"
            colors={[
              [255, 106, 61],
              [255, 145, 77],
              [255, 195, 140],
            ]}
            dotSize={2}
          />
        )}
      </motion.div>

      {/* ==============================================
          🌙 DARK MODE SPOTLIGHT (Warm Orange Glow)
          ============================================== */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition duration-300 group-hover/spotlight:opacity-100 hidden dark:block"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              rgba(255,106,61,0.12), /* Soft orange glow instead of white */
              transparent 60%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={4}
            containerClassName="absolute inset-0 pointer-events-none opacity-40"
            colors={[
              [255, 106, 61],  // Primary orange
              [255, 145, 77],  // Lighter orange accent
              [120, 53, 4],    // Deep warm amber
            ]}
            dotSize={2}
          />
        )}
      </motion.div>

      {/* Warm background gradient overlay on hover (supports both modes) */}
      <div
        className="
          absolute inset-0 z-0 opacity-0
          group-hover/spotlight:opacity-100
          transition-opacity duration-500
          bg-gradient-to-br
          from-orange-100/30
          via-orange-50/10
          to-transparent
          
          dark:from-orange-950/15
          dark:via-orange-900/5
          dark:to-transparent
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};