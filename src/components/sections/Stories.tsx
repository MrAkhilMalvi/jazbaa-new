import { Reveal } from "@/components/animations/Reveal";
import { Quote } from "lucide-react";

const stories = [
  {
    quote: "I found my tribe through JAZBAA. The Saturday karaoke nights bring me back to who I was at 19.",
    name: "Aanya R.",
    role: "Member · Mumbai",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "It's not just a hobby group, it's a second home. I've never laughed this much at a book club.",
    name: "Vikram S.",
    role: "Volunteer · Bengaluru",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "I started attending meditation circles to disconnect. I ended up reconnecting — with myself, and with people.",
    name: "Meera K.",
    role: "Chapter Lead · Pune",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];

export function Stories() {
  return (
    <section className="py-24 md:py-36 bg-foreground text-background">
      <div className="container-editorial">
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
              <article className="h-full rounded-3xl p-8 bg-background/5 border border-background/10 backdrop-blur-sm">
                <Quote className="h-7 w-7 text-accent" />
                <p className="mt-6 font-display text-xl md:text-2xl leading-snug italic">
                  "{s.quote}"
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-sm opacity-70">{s.role}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
