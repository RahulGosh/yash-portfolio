import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const IMG = "/portrait.jpg";

/**
 * Hero portrait — a stacked-depth, cursor-reactive image stage.
 * Layers (back → front):
 *  1. Duotone echo (offset, blurred, parallaxes slower on scroll) → double-exposure depth
 *  2. Grayscale base portrait inside a glass frame
 *  3. Full-colour portrait revealed only under a spring-damped cursor spotlight
 *  4. Chromatic-aberration (RGB split) copies that bloom on hover
 *  5. Scan line + animated corner brackets + label
 * Entrance: sliced clip-path reveal + sweep. Tilts more than the halo behind it → parallax.
 */
export default function PortraitStage({
  ready,
  progress,
}: {
  ready: boolean;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // normalized local pointer (0..1) for tilt
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  // local px for the spotlight mask
  const lx = useMotionValue(150);
  const ly = useMotionValue(200);
  const hover = useMotionValue(0);

  const smx = useSpring(lx, { stiffness: 130, damping: 18, mass: 0.4 });
  const smy = useSpring(ly, { stiffness: 130, damping: 18, mass: 0.4 });
  const shover = useSpring(hover, { stiffness: 120, damping: 20 });

  // stronger tilt than the halo behind → parallax between subject & backdrop
  const rotX = useSpring(useTransform(ny, [0, 1], [13, -13]), { stiffness: 110, damping: 15 });
  const rotY = useSpring(useTransform(nx, [0, 1], [-13, 13]), { stiffness: 110, damping: 15 });

  // scroll parallax — echo drifts down, subject lifts up
  const echoY = useTransform(progress, [0, 1], [0, 66]);
  const frontY = useTransform(progress, [0, 1], [0, -34]);

  // chromatic aberration intensity from hover
  const caR = useTransform(shover, [0, 1], [0, -5]);
  const caB = useTransform(shover, [0, 1], [0, 5]);
  const caO = useTransform(shover, [0, 1], [0, 0.55]);

  const spotlight = useMotionTemplate`radial-gradient(230px circle at ${smx}px ${smy}px, #000 0%, #000 32%, transparent 72%)`;

  const onMove = (e: ReactMouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    nx.set(x / rect.width);
    ny.set(y / rect.height);
    lx.set(x);
    ly.set(y);
  };

  const onEnter = () => !reduced && hover.set(1);
  const onLeave = () => {
    hover.set(0);
    nx.set(0.5);
    ny.set(0.5);
    if (ref.current) {
      lx.set(ref.current.offsetWidth / 2);
      ly.set(ref.current.offsetHeight / 2);
    }
  };

  return (
    <motion.div
      style={{ y: reduced ? 0 : frontY, perspective: 1000 }}
      className="relative z-20"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        data-cursor="hover"
        style={{
          rotateX: reduced ? 0 : rotX,
          rotateY: reduced ? 0 : rotY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-[400px] w-[300px] will-change-transform sm:h-[460px] sm:w-[344px]"
      >
        {/* Layer 1 — duotone echo (double-exposure parallax) */}
        <motion.div
          aria-hidden
          style={{ y: reduced ? 0 : echoY, transform: "translateZ(-60px)" }}
          className="absolute -inset-4 -z-10"
        >
          <div
            className="h-full w-full rounded-[26px] opacity-40 blur-[3px]"
            style={{
              backgroundImage: `url(${IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
              filter: "grayscale(1) brightness(0.5) contrast(1.2)",
              mixBlendMode: "screen",
            }}
          />
          <div className="absolute inset-0 rounded-[26px] bg-gradient-to-tr from-volt/40 via-transparent to-magenta/30 mix-blend-color" />
        </motion.div>

        {/* Frame */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 100% 0 round 22px)", opacity: 0 }}
          animate={
            ready
              ? { clipPath: "inset(0% 0% 0% 0% round 22px)", opacity: 1 }
              : reduced
                ? { opacity: 1 }
                : { clipPath: "inset(0 0 100% 0 round 22px)", opacity: 0 }
          }
          transition={{ duration: 1.15, delay: 0.55, ease: EASE }}
          className="relative h-full w-full overflow-hidden rounded-[22px] border border-bone/12 bg-ink-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Layer 2 — grayscale/duotone base */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 18%",
              filter: "grayscale(1) contrast(1.12) brightness(0.82)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-volt/25 via-transparent to-ink/30 mix-blend-color" />

          {/* Layer 3 — full colour revealed by cursor spotlight */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 18%",
              maskImage: reduced ? undefined : spotlight,
              WebkitMaskImage: reduced ? undefined : spotlight,
            }}
          />

          {/* Layer 4 — chromatic aberration copies (hover bloom) */}
          <motion.div
            aria-hidden
            className="absolute inset-0 mix-blend-screen"
            style={{
              x: caR,
              opacity: caO,
              backgroundImage: `url(${IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 18%",
              filter: "sepia(1) hue-rotate(300deg) saturate(6) brightness(1.1)",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 mix-blend-screen"
            style={{
              x: caB,
              opacity: caO,
              backgroundImage: `url(${IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center 18%",
              filter: "sepia(1) hue-rotate(150deg) saturate(6) brightness(1.1)",
            }}
          />

          {/* scanning line */}
          {!reduced && (
            <motion.div
              aria-hidden
              initial={{ y: "-10%" }}
              animate={{ y: "110%" }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-volt-soft/15 to-transparent"
            />
          )}

          {/* fine scanline texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 3px)" }}
          />

          {/* bottom label bar */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-bone/10 bg-ink/55 px-4 py-3 backdrop-blur-md">
            <span className="font-mono text-[10px] tracking-[0.24em] text-bone-dim uppercase">// yash.jpg</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-volt-soft uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan-x" />
              rendering
            </span>
          </div>

          {/* hover hint */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full border border-bone/12 bg-ink/50 px-3 py-1 font-mono text-[9px] tracking-[0.22em] text-bone-dim uppercase opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
            hover to reveal
          </div>
        </motion.div>

        {/* Layer 5 — animated corner brackets (float above frame) */}
        {[
          "top-2 left-2 border-t-2 border-l-2 rounded-tl-lg",
          "top-2 right-2 border-t-2 border-r-2 rounded-tr-lg",
          "bottom-2 left-2 border-b-2 border-l-2 rounded-bl-lg",
          "bottom-2 right-2 border-b-2 border-r-2 rounded-br-lg",
        ].map((cls, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.3 + i * 0.08 }}
            style={{ transform: "translateZ(40px)" }}
            className={`absolute h-6 w-6 border-volt-soft/80 ${cls}`}
          />
        ))}

        {/* floating monogram badge on top corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: -8 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.5 }}
          style={{ transform: "translateZ(70px)" }}
          className="absolute -top-5 -right-5 grid h-14 w-14 place-items-center rounded-2xl border border-bone/12 bg-ink-2/90 shadow-[0_0_30px_rgba(82,47,254,0.5)] backdrop-blur-md"
        >
          <span className="font-display text-lg font-bold text-bone">
            YP<span className="text-volt-soft">_</span>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
