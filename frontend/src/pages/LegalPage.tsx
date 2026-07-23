import { Reveal } from "@/components/animations/Reveal";

type LegalSection = {
  title: string;
  body?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-[#fbfaf8] dark:bg-black transition-colors duration-300">
      <section className="px-4 pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="mx-auto max-w-[980px]">
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/50">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
              {title}
            </h1>
            {intro ? (
              <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 dark:text-white/70 md:text-xl">
                {intro}
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-24 md:pb-32">
        <div className="mx-auto max-w-[980px] space-y-6">
          {sections.map((section) => (
            <Reveal key={section.title}>
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-zinc-900/70 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h2>

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base font-medium leading-8 text-slate-600 dark:text-white/70 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base font-medium leading-7 text-slate-600 dark:text-white/70 md:text-lg">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
