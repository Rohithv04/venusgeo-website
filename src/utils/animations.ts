import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export { gsap, ScrollTrigger };
