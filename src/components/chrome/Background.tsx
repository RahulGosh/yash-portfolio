import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { pointerNX, pointerNY } from "@/lib/pointer";

/**
 * Layer 0 (deepest) — ambient gradient mesh.
 * Breathes on its own (CSS loop), drifts 2–5% with the pointer,
 * and shifts slowly with scroll. Three independent motions, one calm layer.
 */
export default function Background() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scrollY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const px1 = useSpring(useTransform(pointerNX, [-0.5, 0.5], [-18, 18]), { stiffness: 55, damping: 22 });
  const py1 = useSpring(useTransform(pointerNY, [-0.5, 0.5], [-14, 14]), { stiffness: 55, damping: 22 });
  const px2 = useSpring(useTransform(pointerNX, [-0.5, 0.5], [22, -22]), { stiffness: 50, damping: 22 });
  const py2 = useSpring(useTransform(pointerNY, [-0.5, 0.5], [16, -16]), { stiffness: 50, damping: 22 });

  const y1 = useTransform([scrollY1, py1], ([a, b]) => `${(a as number) + (b as number)}px`);
  const y2 = useTransform([scrollY2, py2], ([a, b]) => `${(a as number) + (b as number)}px`);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="bg-grid absolute inset-0" />
      <motion.div style={{ x: px1, y: reduced ? scrollY1 : y1 }} className="animate-blob absolute -top-[18%] -left-[12%] h-[58vmax] w-[58vmax] rounded-full opacity-[0.2] blur-[130px]">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_35%,#522ffe_0%,transparent_62%)]" />
      </motion.div>
      <motion.div style={{ x: px2, y: reduced ? scrollY2 : y2 }} className="animate-blob-2 absolute top-[24%] -right-[16%] h-[48vmax] w-[48vmax] rounded-full opacity-[0.13] blur-[120px]">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_60%_40%,#ff3df2_0%,transparent_60%)]" />
      </motion.div>
      <div className="absolute bottom-[-20%] left-[28%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle_at_50%_50%,#4be1ec_0%,transparent_62%)] opacity-[0.06] blur-[120px]" />
      {/* vignette — foreground glass feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_10%,transparent_40%,rgba(10,10,15,0.85)_100%)]" />
    </div>
  );
}
