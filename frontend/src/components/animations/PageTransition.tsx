import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Hardware-accelerated, snappier configurations
const variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25, // Snappy entry transition
      ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier easeOutCubic
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.18, // Extra quick exit to reduce lag feel
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
} as const ;

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
}