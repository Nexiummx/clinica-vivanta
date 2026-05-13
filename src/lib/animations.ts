import type { Transition, Variants } from "framer-motion";

/** Easing premium compartido (cubic-bezier) */
export const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const durationBase = 0.8;

const baseTransition: Transition = {
  duration: durationBase,
  ease: easePremium,
};

/** Opacity 0→1 y translateY 40→0 */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

/** Solo opacity 0→1 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: baseTransition,
  },
};

/** Contenedor con stagger de 0.1s entre hijos */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/** Hover sutil scale 1.02 (usar en motion.* con spread) */
export const scaleHover = {
  whileHover: { scale: 1.02 },
  transition: baseTransition,
} as const;
