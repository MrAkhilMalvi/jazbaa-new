import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/animations/Reveal";

const offers = [
  {
    label: "Creative Expression",
    items: ["Singing & Karaoke", "Music & Instrument Circles", "Dance & Movement"],
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1100&q=85",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>`,
  },
  {
    label: "Intellectual Engagement",
    items: ["Book Clubs & Discussions", "Storytelling", "Open Mic Evenings"],
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1100&q=85",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  },
  {
    label: "Wellness & Mindfulness",
    items: ["Meditation & Breathwork", "Mind-Body Sessions", "Wellness Walks"],
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1100&q=85",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  },
  {
    label: "Social Connection",
    items: ["Community Meetups", "Themed Events & Concerts", "Friendship Circles"],
    img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1100&q=85",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 2l-5 5"/><path d="M21 2l-1 1"/></svg>`,
  },
];

export function Offerings() {
  const sectionRef = useRef<HTMLElement>(null);

useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // WRAP IN GSAP CONTEXT
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".offering-card");
      const images = gsap.utils.toArray(".offering-img");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        images,
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    // CRITICAL: Prevent bugs on unmount
    return () => ctx.revert();
  },[]);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-secondary/40 custom-animated">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              What we offer
            </p>
            <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[18ch]">
              Spaces for every <em className="italic font-medium text-accent">passion</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground max-w-md">
              Four pillars. Endless ways to express, connect, and grow — online
              and in person.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => (
            <article key={o.label} className="offering-card group h-full clay overflow-hidden hover-lift">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={o.img}
                  alt={o.label}
                  loading="lazy"
                  className="offering-img h-full w-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div dangerouslySetInnerHTML={{ __html: o.svg }} className="text-accent" />
                  <h3 className="font-display text-2xl">{o.label}</h3>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {o.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="h-1 w-3 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
