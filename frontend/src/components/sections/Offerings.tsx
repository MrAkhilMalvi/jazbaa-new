import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/animations/Reveal";

const offers =[
  {
    label: "Creative Expression",
    items:["Singing & Karaoke", "Music & Instrument Circles", "Dance & Movement"],
    img: "/images/Offerings/passion1.jpg",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>`,
  },
  {
    label: "Intellectual Engagement",
    items:["Book Clubs & Discussions", "Storytelling", "Open Mic Evenings"],
    img: "/images/Offerings/passion2.jpg",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  },
  {
    label: "Wellness & Mindfulness",
    items:["Meditation & Breathwork", "Mind-Body Sessions", "Wellness Walks"],
    img: "/images/Offerings/passion3.jpg",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  },
  {
    label: "Social Connection",
    items:["Community Meetups", "Themed Events & Concerts", "Friendship Circles"],
    img: "/images/other/image7.jpg",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 2l-5 5"/><path d="M21 2l-1 1"/></svg>`,
  },
];

export function Offerings() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    return () => ctx.revert();
  },[]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-36 bg-secondary/40 custom-animated">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <Reveal>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent">
              What we offer
            </p>
            <h2 className="display text-[10vw] sm:text-5xl md:text-6xl font-light mt-3 sm:mt-4 max-w-[18ch] leading-tight">
              Spaces for every <em className="italic font-medium text-accent">passion</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mt-4 md:mt-0">
              Four pillars. Endless ways to express, connect, and grow — online
              and in person.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o) => (
            <article key={o.label} className="offering-card group h-full clay overflow-hidden hover-lift flex flex-col">
              <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden">
                <img
                  src={o.img}
                  alt={o.label}
                  loading="lazy"
                  className="offering-img h-full w-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="p-5 md:p-6 flex-grow bg-card">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div dangerouslySetInnerHTML={{ __html: o.svg }} className="text-accent shrink-0" />
                  <h3 className="font-display text-xl md:text-2xl leading-tight">{o.label}</h3>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {o.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent mt-1.5" />
                      <span className="leading-snug">{it}</span>
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