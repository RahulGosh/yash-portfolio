import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrambleText from "@/components/motion/ScrambleText";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setCount(100);
      const t = setTimeout(onDone, 150);
      return () => clearTimeout(t);
    }
    let value = 0;
    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 7) + 2;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setTimeout(() => setExiting(true), 350);
        setTimeout(onDone, 1250);
      }
      setCount(value);
    }, 42);
    return () => clearInterval(interval);
  }, [onDone, reduced]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 sm:px-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* top row */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase">
            <span>Portfolio — 2026</span>
            <span className="hidden sm:block">Mumbai, India</span>
            <span>Fullstack Developer</span>
          </div>

          {/* center name */}
          <div className="flex flex-col gap-3">
            <ScrambleText
              text="YASH"
              delay={120}
              className="font-display text-[clamp(3.4rem,14vw,10rem)] leading-[0.9] font-bold tracking-tight text-bone"
            />
            <div className="flex items-baseline gap-4">
              <ScrambleText
                text="PUNIWALA"
                delay={340}
                className="font-display text-[clamp(3.4rem,14vw,10rem)] leading-[0.9] font-bold tracking-tight text-stroke"
              />
              <span className="hidden h-3 w-3 shrink-0 self-center bg-volt sm:block" />
            </div>
          </div>

          {/* bottom row: counter + progress line */}
          <div className="flex flex-col gap-5">
            <div className="relative h-px w-full bg-bone/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-volt"
                style={{ width: `${count}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="flex items-end justify-between">
              <span className="font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase">
                Loading experience
              </span>
              <span className="font-display text-5xl font-bold tabular-nums text-bone sm:text-7xl">
                {count}
                <span className="text-volt">%</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
