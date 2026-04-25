"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export function ScrollJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGCircleElement>(null);
  const waypointsRef = useRef<SVGGElement>(null);
  const footerTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable complex animation on mobile to save performance
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const traveler = travelerRef.current;
      const waypoints = gsap.utils.toArray(".waypoint");

      if (!path || !traveler) return;

      // 1. Calculate path length for DrawSVG effect
      const length = path.getTotalLength();
      gsap.set(path, { 
        strokeDasharray: length, 
        strokeDashoffset: length,
        opacity: 1
      });

      // 2. Setup the ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom 90%",
          scrub: 1.5, // 1.5s smoothing for cinematic feel
        },
      });

      // 3. Draw the line
      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1,
      }, 0);

      // 4. Move the traveler dot along the path
      tl.to(traveler, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        duration: 1,
      }, 0);

      // 5. Waypoint Interactions (Triggered at specific progress percentages)
      // Path percentages roughly mapped to our SVG curve
      const waypointTriggers = [0.15, 0.45, 0.85]; 
      
      waypoints.forEach((wp: any, index) => {
        // Pop effect when traveler reaches the waypoint
        tl.to(wp, {
          scale: 1.8,
          transformOrigin: "center",
          fill: "#F59E0B", // Tailwind amber-500 (accent)
          duration: 0.05,
          ease: "back.out(2)"
        }, waypointTriggers[index]);

        // Reveal text labels
        tl.to(wp.nextElementSibling, {
          opacity: 1,
          y: 0,
          duration: 0.05,
        }, waypointTriggers[index]);
      });

      // 6. Parallax Background (Bonus)
      gsap.to(".parallax-bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // 7. Footer Elastic Bounce
      gsap.fromTo(".footer-connection", 
        { scaleY: 0, transformOrigin: "top" },
        { 
          scaleY: 1, 
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: footerTriggerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[250vh] bg-background overflow-hidden hidden md:block"
    >
      {/* Background Parallax Element */}
      <div className="parallax-bg absolute inset-0 opacity-30">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] right-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 className="display text-5xl font-light text-primary">Your Journey</h2>
        <p className="text-muted-foreground mt-2 uppercase tracking-widest text-xs">Follow the path</p>
      </div>

      {/* SVG Container */}
      <div className="absolute inset-0 w-full h-full flex justify-center pointer-events-none">
        <svg 
          viewBox="0 0 800 2000" 
          className="w-full max-w-[800px] h-full overflow-visible"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            {/* Soft Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Faded Background Track */}
          <path 
            d="M 400 100 C 400 400, 700 500, 700 800 C 700 1100, 100 1200, 100 1500 C 100 1800, 400 1900, 400 2000" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="text-foreground/10 stroke-dashed"
            strokeDasharray="10 10"
          />

          {/* The Animated Drawn Path */}
          <path 
            ref={pathRef}
            id="main-path"
            d="M 400 100 C 400 400, 700 500, 700 800 C 700 1100, 100 1200, 100 1500 C 100 1800, 400 1900, 400 2000" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="4" 
            className="opacity-0"
            filter="url(#glow)"
            strokeLinecap="round"
          />

          {/* Waypoints Group */}
          <g ref={waypointsRef}>
            {/* Waypoint 1 */}
            <g transform="translate(635, 620)">
              <circle className="waypoint transition-colors" r="8" fill="#333" />
              <text className="opacity-0 translate-y-4" x="30" y="5" fill="currentColor" fontSize="18" fontWeight="300" letterSpacing="2">DISCOVER</text>
            </g>

            {/* Waypoint 2 */}
            <g transform="translate(165, 1350)">
              <circle className="waypoint transition-colors" r="8" fill="#333" />
              <text className="opacity-0 translate-y-4" x="-130" y="5" fill="currentColor" fontSize="18" fontWeight="300" letterSpacing="2">CONNECT</text>
            </g>

            {/* Waypoint 3 */}
            <g transform="translate(370, 1850)">
              <circle className="waypoint transition-colors" r="8" fill="#333" />
              <text className="opacity-0 translate-y-4" x="30" y="5" fill="currentColor" fontSize="18" fontWeight="300" letterSpacing="2">GROW</text>
            </g>
          </g>

          {/* The Glowing Traveler Object */}
          <circle 
            ref={travelerRef}
            r="12" 
            fill="#fff" 
            filter="url(#glow)" 
            className="shadow-2xl"
          >
            {/* Outer ring of traveler */}
            <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Footer Connection Bounce Area */}
      <div ref={footerTriggerRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[2px] h-[100px] bg-accent footer-connection shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        <div className="w-4 h-4 rounded-full bg-accent footer-connection" />
      </div>
    </section>
  );
}