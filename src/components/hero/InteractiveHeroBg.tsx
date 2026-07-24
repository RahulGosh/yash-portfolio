import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { pointerNX, pointerNY } from "@/lib/pointer";

const GLYPHS = [
  { char: "{ }", top: "14%", left: "10%", multY: 180, multX: -40, tilt: 25, delay: 0 },
  { char: "/>", top: "22%", right: "12%", multY: 140, multX: 50, tilt: -30, delay: 0.3 },
  { char: "λ", top: "64%", left: "8%", multY: -120, multX: 30, tilt: 35, delay: 0.6 },
  { char: "✦", top: "70%", right: "10%", multY: -160, multX: -40, tilt: -25, delay: 0.9 },
  { char: "//", top: "40%", left: "4%", multY: 90, multX: -20, tilt: 20, delay: 1.2 },
  { char: "[ ]", top: "35%", right: "5%", multY: 110, multX: 35, tilt: -20, delay: 1.5 },
];

/** Floating glyph that moves with scroll & shifts away from mouse pointer */
function GlyphItem({
  item,
  progress,
  reduced,
}: {
  item: (typeof GLYPHS)[number];
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const yScroll = useTransform(progress, [0, 1], [0, item.multY]);
  const xScroll = useTransform(progress, [0, 1], [0, item.multX]);

  const pointerX = useSpring(useTransform(pointerNX, [-0.5, 0.5], [item.tilt * -1.5, item.tilt * 1.5]), {
    stiffness: 70,
    damping: 18,
  });
  const pointerY = useSpring(useTransform(pointerNY, [-0.5, 0.5], [item.tilt * -1.5, item.tilt * 1.5]), {
    stiffness: 70,
    damping: 18,
  });

  const x = useTransform([xScroll, pointerX], ([a, b]) => `${(a as number) + (b as number)}px`);
  const y = useTransform([yScroll, pointerY], ([a, b]) => `${(a as number) + (b as number)}px`);

  return (
    <motion.div
      style={{
        top: item.top,
        left: item.left,
        right: item.right,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
      }}
      className="pointer-events-none absolute z-0 select-none font-mono text-xl font-bold text-bone/15 sm:text-2xl"
    >
      <motion.span
        animate={reduced ? undefined : { opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4 + item.delay, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        className="inline-block"
      >
        {item.char}
      </motion.span>
    </motion.div>
  );
}

/**
 * Interactive Hero Background:
 * Moves and breathes as you scroll down, shifting the grid and celestial plasma blobs
 * dynamically along the path of scrolling.
 */
export default function InteractiveHeroBg({ progress }: { progress: MotionValue<number> }) {
  const reduced = useReducedMotion();

  // Scroll parallax for cosmic plasma color fields
  const blob1Y = useTransform(progress, [0, 1], ["-10%", "50%"]);
  const blob1X = useTransform(progress, [0, 1], ["-10%", "20%"]);
  const blob2Y = useTransform(progress, [0, 1], ["10%", "-60%"]);
  const blob2X = useTransform(progress, [0, 1], ["10%", "-30%"]);
  const gridScale = useTransform(progress, [0, 1], [1, 1.25]);

  // Pointer tilt for grid and background glow
  const tiltX = useSpring(useTransform(pointerNY, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 20 });
  const tiltY = useSpring(useTransform(pointerNX, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 20 });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden style={{ perspective: 1000 }}>
      {/* Interactive traveling grid */}
      <motion.div
        style={{
          scale: reduced ? 1 : gridScale,
          rotateX: reduced ? 0 : tiltX,
          rotateY: reduced ? 0 : tiltY,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-[-10%]"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(122, 92, 255, 0.22) 1px, transparent 1px), radial-gradient(circle, rgba(75, 225, 236, 0.15) 1px, transparent 1px)",
            backgroundSize: "64px 64px, 32px 32px",
            backgroundPosition: "0 0, 16px 16px",
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 20%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* Parallax celestial plasma blobs */}
      <motion.div
        style={{ y: reduced ? 0 : blob1Y, x: reduced ? 0 : blob1X }}
        className="animate-blob absolute top-0 left-1/4 h-[55vmax] w-[55vmax] -translate-x-1/2 rounded-full opacity-[0.22] blur-[140px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_50%,#522ffe_0%,transparent_70%)]" />
      </motion.div>

      <motion.div
        style={{ y: reduced ? 0 : blob2Y, x: reduced ? 0 : blob2X }}
        className="animate-blob-2 absolute bottom-0 right-1/4 h-[50vmax] w-[50vmax] translate-x-1/3 rounded-full opacity-[0.16] blur-[130px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_50%,#ff3df2_0%,transparent_70%)]" />
      </motion.div>

      <div className="absolute top-1/2 left-1/2 h-[45vmax] w-[45vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,#4be1ec_0%,transparent_65%)] opacity-[0.08] blur-[120px]" />

      {/* Interactive floating tech runes in 3D space */}
      {GLYPHS.map((item, i) => (
        <GlyphItem key={i} item={item} progress={progress} reduced={reduced} />
      ))}
    </div>
  );
}
