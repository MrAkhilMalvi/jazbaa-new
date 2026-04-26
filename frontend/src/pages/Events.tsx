import { useMemo, useState } from "react";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Karaoke", "Music", "Dance", "Books", "Meditation", "Open Mic"] as const;

type Cat = (typeof categories)[number];

interface Evt {
  title: string;
  cat: Exclude<Cat, "All">;
  date: string;
  time: string;
  location: string;
  format: "Online" | "In-Person";
  img: string;
}

const events: Evt[] = [
  { title: "Sunday Karaoke Night", cat: "Karaoke", date: "May 18, 2026", time: "7:00 PM", location: "Bandra, Mumbai", format: "In-Person", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80" },
  { title: "Acoustic Jam Circle", cat: "Music", date: "May 22, 2026", time: "6:30 PM", location: "Indiranagar, Bengaluru", format: "In-Person", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=80" },
  { title: "Free Movement Workshop", cat: "Dance", date: "May 25, 2026", time: "5:00 PM", location: "Online", format: "Online", img: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=80" },
  { title: "Book Club: 'The Midnight Library'", cat: "Books", date: "May 28, 2026", time: "11:00 AM", location: "Koregaon Park, Pune", format: "In-Person", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80" },
  { title: "Sunrise Meditation Circle", cat: "Meditation", date: "May 30, 2026", time: "6:00 AM", location: "Online", format: "Online", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80" },
  { title: "Open Mic: Storytelling Edition", cat: "Open Mic", date: "Jun 04, 2026", time: "8:00 PM", location: "Hauz Khas, Delhi", format: "In-Person", img: "https://images.unsplash.com/photo-1499415479124-43c32433a620?auto=format&fit=crop&w=900&q=80" },
  { title: "Bollywood Dance Social", cat: "Dance", date: "Jun 08, 2026", time: "7:30 PM", location: "Powai, Mumbai", format: "In-Person", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80" },
  { title: "Songwriting Lab", cat: "Music", date: "Jun 12, 2026", time: "5:00 PM", location: "Online", format: "Online", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80" },
];

const Events = () => {
  const [filter, setFilter] = useState<Cat>("All");
  const filtered = useMemo(
    () => (filter === "All" ? events : events.filter((e) => e.cat === filter)),
    [filter]
  );

  return (
    <>
      <section className="pt-40 pb-12">
        <div className="container-editorial">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Events</p>
          </Reveal>
          <RevealText
            as="h1"
            text="Experience the joy of living your passion."
            className="display text-5xl md:text-7xl lg:text-[6rem] font-light mt-6 max-w-[16ch]"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Hosted periodically — online and in person — so you can engage at your convenience.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-editorial">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300",
                  filter === c
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground/40"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <article className="group h-full rounded-3xl overflow-hidden bg-card border border-border hover-lift">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={e.img}
                      alt={e.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 glass text-xs px-3 py-1 rounded-full">
                      {e.cat}
                    </span>
                    <span className={cn(
                      "absolute top-4 right-4 text-xs px-3 py-1 rounded-full",
                      e.format === "Online" ? "bg-accent text-accent-foreground" : "bg-foreground text-background"
                    )}>
                      {e.format}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{e.title}</h3>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {e.date} · {e.time}</p>
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {e.location}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-5 -ml-3 group/btn">
                      Register <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No events in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
