import { Reveal } from "@/components/animations/Reveal";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stories = [
  {
    quote: "I found my tribe through JAZBAA. The Saturday karaoke nights bring me back to who I was at 19.",
    name: "Aanya R.",
    role: "Member · Mumbai",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=85",
  },
  {
    quote: "It's not just a hobby group, it's a second home. I've never laughed this much at a book club.",
    name: "Vikram S.",
    role: "Volunteer · Bengaluru",
    img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=300&q=85",
  },
  {
    quote: "I started attending meditation circles to disconnect. I ended up reconnecting — with myself, and with people.",
    name: "Meera K.",
    role: "Chapter Lead · Pune",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=85",
  },
];

export function Stories() {
  return (
    <section className="relative py-24 md:py-36 bg-foreground text-background overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, hsl(var(--accent) / 0.25), transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--accent-glow) / 0.18), transparent 50%)",
        }}
      />
      <div className="container-editorial relative">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Community stories
          </p>
          <h2 className="display text-4xl md:text-6xl font-light mt-4 max-w-[18ch]">
            Real people. Real <em className="italic font-medium text-accent">JAZBAA</em>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-3xl p-8 bg-background/5 border border-background/10 backdrop-blur-sm relative overflow-hidden"
              >
                <Quote className="h-8 w-8 text-accent" />
                <p className="mt-6 font-display text-xl md:text-2xl leading-snug italic">
                  "{s.quote}"
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-accent/40"
                  />
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-sm opacity-70">{s.role}</p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
