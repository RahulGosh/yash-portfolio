import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hero, identity, skills } from "@/data/content";
import KineticText from "@/components/motion/KineticText";
import Magnetic from "@/components/motion/Magnetic";
import TorchLayer from "@/components/hero/TorchLayer";
import PortraitStage from "@/components/hero/PortraitStage";
import InteractiveHeroBg from "@/components/hero/InteractiveHeroBg";
import { pointerNX, pointerNY } from "@/lib/pointer";
import { ArrowUpRight, DownloadIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

const WireOrb = lazy(() => import("@/components/hero/WireOrb"));

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

function useISTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const floatingChips = [
  { text: hero.floatingChip, dot: "bg-volt-soft", mult: -65, tilt: 12, delay: 0 },
  { text: "Next.js — // SSR & App Router", dot: "bg-bone", mult: -125, tilt: -16, delay: 1.2 },
  { text: "TypeScript — // type-safe builds", dot: "bg-cyan-x", mult: -90, tilt: 14, delay: 2.4 },
];

/** Layer +2 — floating UI chips: scroll parallax + idle drift + cursor tilt. */
function FloatingChip({
  chip,
  position,
  progress,
  reduced,
}: {
  chip: (typeof floatingChips)[number];
  position: string;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const y = useTransform(progress, [0, 1], [0, chip.mult]);
  const tiltX = useSpring(useTransform(pointerNY, [-0.5, 0.5], [chip.tilt, -chip.tilt]), {
    stiffness: 120,
    damping: 17,
  });
  const tiltY = useSpring(useTransform(pointerNX, [-0.5, 0.5], [-chip.tilt * 1.3, chip.tilt * 1.3]), {
    stiffness: 120,
    damping: 17,
  });

  return (
    <motion.div style={{ y: reduced ? 0 : y, perspective: 700 }} className={`absolute ${position}`}>
      <motion.div
        style={{ rotateX: reduced ? 0 : tiltX, rotateY: reduced ? 0 : tiltY, transformStyle: "preserve-3d" }}
        className="will-change-transform"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5 + chip.delay, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
          className="flex items-center gap-2.5 rounded-xl border border-bone/10 bg-ink-2/85 px-4 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} />
          <span className="font-mono text-xs text-bone/90">{chip.text}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const time = useISTClock();
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Deep Parallax Layers for the Centered Editorial Layout
  // Behind the photo: text shifts down as we scroll down
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  // In front of the photo: text lifts up quickly, creating incredible shearing depth
  const fgTextY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const subtextY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // Orb halo scale and tilt behind the portrait
  const orbScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.82]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.9], [0.8, 0.1]);
  const compTiltX = useSpring(useTransform(pointerNY, [-0.5, 0.5], [7, -7]), { stiffness: 100, damping: 17 });
  const compTiltY = useSpring(useTransform(pointerNX, [-0.5, 0.5], [-9, 9]), { stiffness: 100, damping: 17 });

  // GSAP ScrollTrigger scrub: smooth theatrical scale-down as user leaves hero
  useEffect(() => {
    if (reduced || !innerRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        scale: 0.88,
        y: -70,
        opacity: 0.05,
        ease: "none",
        transformOrigin: "50% 40%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 34 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 34 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden pt-28 sm:pt-36"
    >
      {/* Interactive traveling background & runes */}
      <InteractiveHeroBg progress={scrollYProgress} />

      {/* Signature cursor torch reveal */}
      <TorchLayer />

      <div ref={innerRef} className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 text-center sm:px-8">
        {/* -------- Top status badge -------- */}
        <motion.div {...fadeUp(0.05)} className="mb-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-bone/10 bg-bone/[0.04] px-4 py-2 backdrop-blur-sm sm:mb-10">
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-cyan-x" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase">
            {identity.location} — <span className="tabular-nums text-bone">{time}</span> IST
          </span>
          <span className="hidden h-3 w-px bg-bone/15 sm:block" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-volt-soft uppercase">Open to work</span>
        </motion.div>

        {/* -------- Centered Editorial Stage: Overlapping Parallax Typography & Photo -------- */}
        <div className="relative my-4 flex w-full flex-col items-center justify-center sm:my-8">
          
          {/* Layer -1 (Behind Portrait): Giant typography drifting down on scroll */}
          <motion.div
            style={{ y: reduced ? 0 : bgTextY }}
            className="pointer-events-none absolute -top-12 z-0 flex w-full justify-center overflow-hidden whitespace-nowrap select-none sm:-top-16 md:-top-24"
          >
            <span className="font-display text-[clamp(4.2rem,16vw,14rem)] font-bold leading-none tracking-tight text-bone/15 text-stroke-dim">
              YASH PUNIWALA
            </span>
          </motion.div>

          {/* Layer 0: Wireframe orb & concentric rotating rings glowing behind the centered subject */}
          <motion.div
            style={{
              scale: reduced ? 1 : orbScale,
              rotateX: reduced ? 0 : compTiltX,
              rotateY: reduced ? 0 : compTiltY,
              transformStyle: "preserve-3d",
              perspective: 1100,
            }}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            aria-hidden
          >
            <div className="absolute h-80 w-80 rounded-full bg-volt/25 blur-[110px]" />
            
            {/* circular orbital text */}
            <svg viewBox="0 0 300 300" className="animate-spin-slow absolute h-[450px] w-[450px] opacity-75 sm:h-[520px] sm:w-[520px]">
              <defs>
                <path id="heroCenterCircle" d="M150,150 m-132,0 a132,132 0 1,1 264,0 a132,132 0 1,1 -264,0" />
              </defs>
              <text className="fill-bone-dim font-mono text-[11.5px] tracking-[0.42em] uppercase">
                <textPath href="#heroCenterCircle">Fullstack Developer • MERN Stack • Mumbai •&nbsp;</textPath>
              </text>
            </svg>
            
            <div className="animate-spin-slower absolute h-[360px] w-[360px] rounded-full border border-bone/10 sm:h-[420px] sm:w-[420px]">
              <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-magenta/80" />
            </div>

            <Suspense fallback={<div className="absolute h-[440px] w-[440px]" />}>
              <WireOrb className="absolute h-[440px] w-[440px] opacity-80" />
            </Suspense>
          </motion.div>

          {/* Layer +1: The Star — Centered Cursor-Reactive Portrait */}
          <div className="relative z-20 my-2">
            <PortraitStage ready={ready} progress={scrollYProgress} />
          </div>

          {/* Layer +2: Foreground kinetic typography shearing across front on scroll */}
          <motion.div
            style={{ y: reduced ? 0 : fgTextY }}
            className="relative z-30 -mt-10 sm:-mt-14 md:-mt-20"
          >
            <h1 className="font-display text-[clamp(2.6rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-bone">
              <span className="block drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]">
                <KineticText text="👋 Hello I'm" ready={ready} delay={0.2} className="text-bone-dim" />{" "}
                <KineticText text="Yash" ready={ready} delay={0.36} className="text-volt-soft" />
              </span>
              <span className="mt-1 block drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] sm:mt-2">
                <KineticText text="FullStack" ready={ready} delay={0.5} className="text-bone" />{" "}
                <KineticText text="Developer" ready={ready} delay={0.64} charClass="text-stroke" />
              </span>
            </h1>
          </motion.div>

          {/* Layer +3: Parallax floating UI chips positioned around the center composition */}
          {floatingChips.map((chip, i) => (
            <FloatingChip
              key={chip.text}
              chip={chip}
              position={[
                "top-4 -left-2 z-40 sm:left-2 lg:-left-12",
                "top-1/2 -right-2 z-40 sm:right-2 lg:-right-14",
                "bottom-8 left-4 z-40 sm:left-12 lg:left-6",
              ][i]}
              progress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>

        {/* -------- Subtext & Magnetic CTAs -------- */}
        <motion.div style={{ y: reduced ? 0 : subtextY }} className="relative z-30 mt-6 flex flex-col items-center max-w-xl sm:mt-8">
          <motion.p {...fadeUp(0.85)} className="text-base leading-relaxed text-bone-dim sm:text-lg">
            {hero.subtext}
          </motion.p>

          <motion.div {...fadeUp(1.0)} className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
            <Magnetic>
              <a
                href={identity.resumeUrl}
                download
                data-cursor="hover"
                className="group flex items-center gap-3 rounded-full bg-bone px-8 py-4 font-display text-sm font-semibold text-ink transition-all duration-300 hover:bg-volt hover:text-white hover:shadow-[0_0_44px_rgba(82,47,254,0.55)] active:scale-95"
              >
                <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                {hero.ctaPrimary}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${identity.email}`}
                data-cursor="hover"
                className="group flex items-center gap-3 rounded-full border border-bone/15 px-8 py-4 font-display text-sm font-semibold text-bone transition-all duration-300 hover:border-volt-soft hover:text-volt-soft active:scale-95"
              >
                {hero.ctaSecondary}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...fadeUp(1.15)} className="mt-12 flex items-center gap-4 font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase sm:mt-14">
            <span>Scroll to explore</span>
            <motion.span
              animate={reduced ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="block h-8 w-px bg-gradient-to-b from-volt-soft to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* -------- Bottom infinite marquee strip -------- */}
      <motion.div {...fadeUp(1.25)} className="relative z-30 mt-16 w-full border-y border-bone/8 bg-ink-2/40 py-4 backdrop-blur-sm sm:mt-20">
        <div className="pause-on-hover overflow-hidden">
          <div className="marquee-track animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
            {[...skills.map((s) => s.name), ...skills.map((s) => s.name)].map((name, i) => (
              <span key={i} className="flex items-center gap-8 font-display text-sm font-semibold tracking-[0.18em] text-bone-dim uppercase">
                {name}
                <svg width="14" height="14" viewBox="0 0 14 14" className="text-volt-soft" aria-hidden>
                  <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
