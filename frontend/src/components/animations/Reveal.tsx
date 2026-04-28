import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Scroll-triggered fade + slide up. Honors reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-120px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word mask reveal for headings (Alexandre style). */
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion(Tag as any);
  return (
<MotionTag
  className={className}
  initial={reduce ? false : "hidden"}
  whileInView="show"
  viewport={{ once: true, margin: "-120px" }}
  transition={{ staggerChildren: 0.06, delayChildren: delay }}
>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] py-[0.12em]"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              show: { y: "0%" },
            }}
            transition={{
              duration: reduce ? 0 : 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
