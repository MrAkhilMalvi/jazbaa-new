/**
 * SVG blob illustration used as a soft, animated backdrop accent.
 * Pure CSS animation, no JS, theme-aware via currentColor on accent.
 */
export function BlobBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className={"pointer-events-none absolute opacity-60 " + className}
    >
      <defs>
        <linearGradient id="blob-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.55" />
          <stop offset="100%" stopColor="hsl(var(--accent-glow))" stopOpacity="0.2" />
        </linearGradient>
        <filter id="blob-blur">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      <g filter="url(#blob-blur)">
        <path fill="url(#blob-grad)">
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M421,322Q386,394,313,424Q240,454,170,403Q100,352,108,272Q116,192,180,140Q244,88,318,118Q392,148,425,224Q458,300,421,322Z;
              M438,318Q403,386,331,418Q259,450,178,420Q97,390,108,300Q119,210,184,160Q249,110,326,128Q403,146,438,223Q473,300,438,318Z;
              M421,322Q386,394,313,424Q240,454,170,403Q100,352,108,272Q116,192,180,140Q244,88,318,118Q392,148,425,224Q458,300,421,322Z"
          />
        </path>
      </g>
    </svg>
  );
}
