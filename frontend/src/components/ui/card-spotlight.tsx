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
        "group/spotlight relative overflow-hidden rounded-[2rem] border transition-colors duration-300",

        // 🌞 LIGHT MODE
        "bg-white border-slate-200 shadow-sm",

        // 🌙 DARK MODE
        "dark:bg-zinc-900/50 dark:border-white/10 dark:shadow-none",

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
              transparent 80%
            )
          `,
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              rgba(255,106,61,0.12), /* Light Mode Orange Color */
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
              [255, 106, 61], // accent orange
              [255, 180, 120], // soft warm
            ]}
            dotSize={2}
          />
        )}
      </motion.div>

      {/* ==============================================
          🌙 DARK MODE SPOTLIGHT (Subtle Premium Glow)
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
              rgba(255,255,255,0.03), /* Dark Mode Subtle White Glow */
              transparent 60%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={4}
            containerClassName="absolute inset-0 pointer-events-none opacity-50"
            colors={[
              [255, 255, 255], // subtle white dots
              [161, 161, 170], // slate gray dots
            ]}
            dotSize={2}
          />
        )}
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};