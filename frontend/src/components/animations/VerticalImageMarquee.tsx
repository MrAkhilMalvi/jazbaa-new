import { Marquee } from "@/components/ui/marquee";

type Props = {
  images: string[];
};

export function VerticalImageMarquee({ images }: Props) {
  // Split images array into two halves
  const firstRow = images.slice(0, Math.ceil(images.length / 2));
  const secondRow = images.slice(Math.ceil(images.length / 2));

  return (
    // Matches reference: relative flex h-[...] w-full flex-row items-center justify-center overflow-hidden
    <div className="relative flex h-[500px] md:h-[600px] w-full flex-row items-center justify-center gap-4 overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-zinc-900/40 border border-slate-100 dark:border-white/5 shadow-2xl p-4">
      
      {/* 1. LEFT COLUMN: SCROLLS UP */}
      <Marquee pauseOnHover vertical className="[--duration:25s]">
        {firstRow.map((src, index) => (
          <img
            key={`left-${index}`}
            src={src}
            alt="Community"
            className="w-full sm:w-48 h-[220px] md:h-[260px] object-cover rounded-2xl shadow-md border border-slate-200 dark:border-white/10"
          />
        ))}
      </Marquee>

      {/* 2. RIGHT COLUMN: SCROLLS DOWN (has 'reverse' prop) */}
      <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
        {secondRow.map((src, index) => (
          <img
            key={`right-${index}`}
            src={src}
            alt="Community"
            className="w-full sm:w-48 h-[220px] md:h-[260px] object-cover rounded-2xl shadow-md border border-slate-200 dark:border-white/10"
          />
        ))}
      </Marquee>

      {/* 3. TOP FADE (Matches Reference exactly) */}
      {/* Used slate-50/zinc-900 to match the background color of the container */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-slate-50 dark:from-zinc-900 to-transparent z-10"></div>
      
      {/* 4. BOTTOM FADE (Matches Reference exactly) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-50 dark:from-zinc-900 to-transparent z-10"></div>
    </div>
  );
}