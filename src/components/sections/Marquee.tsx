const items = [
  "Sing.",
  "Dance.",
  "Read.",
  "Breathe.",
  "Connect.",
  "Create.",
  "Play.",
  "Belong.",
  "Live your JAZBAA.",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <section
      aria-hidden
      className="relative py-10 border-y border-border/60 bg-background overflow-hidden"
    >
      <div className="flex marquee-track gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display italic text-4xl md:text-6xl font-light text-foreground/80 flex items-center gap-12"
          >
            {t}
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
