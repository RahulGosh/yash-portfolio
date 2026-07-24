import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useVelocity,
} from "framer-motion";
import { testimonials } from "@/data/content";
import type { Testimonial } from "@/data/content";
import { QuoteIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";

const AVATAR_HUES = [
  "from-volt to-magenta",
  "from-cyan-x to-volt",
  "from-magenta to-cyan-x",
  "from-volt-soft to-cyan-x",
  "from-cyan-x to-magenta",
  "from-magenta to-volt",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function Card({ t, index }: { t: Testimonial; index: number }) {
  return (
    <figure className="glow-border group relative w-[340px] shrink-0 rounded-2xl sm:w-[420px]">
      <div className="flex h-full flex-col rounded-2xl border border-bone/8 bg-ink-2/70 p-7 backdrop-blur-md transition-colors duration-500 group-hover:border-volt/35">
        <div className="flex items-center justify-between">
          <QuoteIcon className="h-6 w-6 text-volt-soft" />
          <div className="flex gap-1" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" className="text-volt-soft" aria-hidden>
                <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" fill="currentColor" />
              </svg>
            ))}
          </div>
        </div>
        <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-bone/90">“{t.quote}”</blockquote>
        <figcaption className="mt-7 flex items-center gap-4 border-t border-bone/8 pt-5">
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${AVATAR_HUES[index % AVATAR_HUES.length]} font-display text-sm font-bold text-white shadow-lg`}
          >
            {initials(t.name)}
          </span>
          <div>
            <div className="font-display text-sm font-semibold text-bone">{t.name}</div>
            <div className="mt-0.5 font-mono text-[11px] tracking-wide text-bone-dim">
              {t.role} <span className="text-volt-soft">@ {t.company}</span>
            </div>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/**
 * Scroll-velocity-reactive marquee: faster scroll → faster drift.
 * Manually driven via useAnimationFrame so velocity blends smoothly.
 */
function VelocityMarquee({ items, offsetIndex, reverse }: { items: Testimonial[]; offsetIndex: number; reverse?: boolean }) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef(0);
  const hoverEase = useRef(1);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVel = useSpring(velocity, { stiffness: 45, damping: 24, mass: 0.7 });

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfRef.current = trackRef.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const half = halfRef.current;
    if (half <= 0) return;
    // hover eases drift to a stop
    hoverEase.current += ((hovered ? 0 : 1) - hoverEase.current) * Math.min(1, delta * 0.006);
    const dir = reverse ? 1 : -1;
    const base = 46; // px/s ambient drift
    const v = smoothVel.get();
    const boost = Math.max(-base * 0.85, Math.min(320, v * 0.55));
    const speed = dir * (base + boost) * hoverEase.current;
    let nx = x.get() + speed * (delta / 1000);
    while (nx <= -half) nx += half;
    while (nx >= 0) nx -= half;
    x.set(nx);
  });

  return (
    <div className="overflow-hidden" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pr-6 will-change-transform">
        {[...items, ...items].map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} index={(offsetIndex + i) % AVATAR_HUES.length} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const rowA = testimonials.slice(0, 3);
  const rowB = testimonials.slice(3);

  return (
    <section id="testimonials" className="relative scroll-mt-28 overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          index="03"
          eyebrow="Kind words from collaborators"
          align="center"
          lines={[<>Check out these</>, <>Testimonials <span aria-hidden>📢</span></>]}
        />
      </div>

      <Reveal y={40}>
        <div className="relative flex flex-col gap-6">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent sm:w-48" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent sm:w-48" />
          <VelocityMarquee items={rowA} offsetIndex={0} />
          <VelocityMarquee items={rowB} offsetIndex={3} reverse />
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-14 text-center">
        <p className="font-mono text-[11px] tracking-[0.26em] text-bone-dim uppercase">
          6 recommendations · designers · engineers · founders
        </p>
      </Reveal>
    </section>
  );
}
