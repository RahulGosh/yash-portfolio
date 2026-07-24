import { motionValue } from "framer-motion";

/**
 * Global, spring-friendly pointer store.
 * Raw motion values are updated by a single window listener (PointerTracker);
 * consumers derive their own springs so every layer damps independently.
 * Stays at 0 / viewport-center on touch devices and reduced motion.
 */

/** Normalized pointer position, -0.5 … 0.5 (viewport relative). */
export const pointerNX = motionValue(0);
export const pointerNY = motionValue(0);

/** Absolute pointer position in px (viewport relative). */
export const pointerX = motionValue(window.innerWidth / 2);
export const pointerY = motionValue(window.innerHeight / 2);

/** True once a fine pointer has actually moved — layers can gate on this. */
export let pointerLive = false;
export function setPointerLive(v: boolean) {
  pointerLive = v;
}

export function prefersFinePointer(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}
