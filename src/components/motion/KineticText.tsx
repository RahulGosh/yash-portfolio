import { useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { pointerX, pointerY, pointerLive, prefersFinePointer } from "@/lib/pointer";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
const RADIUS = 175;

type CharProps = {
  ch: string;
  index: number;
  delay: number;
  stagger: number;
  flip: boolean;
  repel: number;
  mode: "mount" | "view";
  ready: boolean;
  charClass?: string;
  reduced: boolean | null;
};

function KineticChar({ ch, index, delay, stagger, flip, repel, mode, ready, charClass, reduced }: CharProps) {
  const innerRef = useRef<HTMLSpanElement>(null);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const sx = useSpring(tx, { stiffness: 130, damping: 16, mass: 0.35 });
  const sy = useSpring(ty, { stiffness: 130, damping: 16, mass: 0.35 });

  // Cursor repel — chars gently push away from the pointer, spring-damped.
  useMotionValueEvent(pointerX, "change", () => {
    if (reduced || repel <= 0 || !pointerLive || !prefersFinePointer() || !innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - pointerX.get();
    const dy = cy - pointerY.get();
    const dist = Math.hypot(dx, dy);
    if (dist > RADIUS || dist === 0) {
      if (tx.get() !== 0) tx.set(0);
      if (ty.get() !== 0) ty.set(0);
      return;
    }
    const falloff = 1 - dist / RADIUS;
    const push = repel * falloff * falloff;
    tx.set((dx / dist) * push);
    ty.set((dy / dist) * push);
  });

  const d = delay + index * stagger;
  const initial = { opacity: 0, rotateX: flip ? 84 : 0, y: flip ? "0.42em" : "0.5em", filter: "blur(8px)" };
  const shown = { opacity: 1, rotateX: 0, y: "0em", filter: "blur(0px)" };
  const transition = { duration: 0.72, delay: d, ease: EASE };

  return (
    <motion.span
      className="inline-block will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
      initial={reduced ? { opacity: 1, rotateX: 0, y: "0em", filter: "none" } : initial}
      {...(mode === "mount"
        ? { animate: ready ? shown : initial, transition }
        : {
            whileInView: reduced ? undefined : shown,
            viewport: { once: true, margin: "-60px" },
            transition,
          })}
    >
      <motion.span ref={innerRef} style={{ display: "inline-block", x: sx, y: sy }} className={charClass}>
        {ch}
      </motion.span>
    </motion.span>
  );
}

type KineticTextProps = {
  text: string;
  className?: string;
  charClass?: string;
  /** Base delay before the first character lands. */
  delay?: number;
  /** Per-character stagger. */
  stagger?: number;
  /** 3D rotateX flip-in vs simple rise. */
  flip?: boolean;
  /** Max cursor-repel offset in px. */
  repel?: number;
  /** "mount": animate when `ready` flips true (hero). "view": animate on scroll into view. */
  mode?: "mount" | "view";
  ready?: boolean;
};

/** Character-split kinetic text: staggered 3D flip-in + live cursor repel. */
export default function KineticText({
  text,
  className,
  charClass,
  delay = 0,
  stagger = 0.032,
  flip = true,
  repel = 6.5,
  mode = "mount",
  ready = true,
}: KineticTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className} style={{ perspective: 700 }} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => {
            const i = charIndex++;
            return (
              <KineticChar
                key={ci}
                ch={ch}
                index={i}
                delay={delay}
                stagger={stagger}
                flip={flip}
                repel={repel}
                mode={mode}
                ready={ready}
                charClass={charClass}
                reduced={reduced}
              />
            );
          })}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
