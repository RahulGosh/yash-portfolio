import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { experiences } from "@/data/content";
import type { Experience as ExperienceType } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";

/** Cards drift at slightly different vertical speeds than the rail → dimensional, not flat. */
function ExperienceRow({
  exp,
  index,
  progress,
  mult,
  reduced,
}: {
  exp: ExperienceType;
  index: number;
  progress: MotionValue<number>;
  mult: number;
  reduced: boolean | null;
}) {
  const leftSide = index % 2 === 0;
  const parY = useTransform(progress, [0, 1], [0, mult]);

  return (
    <motion.div style={{ y: reduced ? 0 : parY }} className="relative grid lg:grid-cols-2 lg:gap-16">
      {/* node dot (stays on the rail — no parallax) */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.15 }}
        className="absolute top-2 left-[7px] z-10 -translate-x-1/2 lg:left-1/2"
        aria-hidden
      >
        <span className="relative block h-4 w-4 rounded-full border-2 border-volt-soft bg-ink">
          <span className="absolute inset-0 animate-ping rounded-full bg-volt-soft/50 [animation-duration:2.4s]" />
        </span>
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: reduced ? 0 : leftSide ? -56 : 56, y: reduced ? 24 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`ml-10 lg:ml-0 ${leftSide ? "lg:col-start-1 lg:pr-4 lg:text-right" : "lg:col-start-2 lg:pl-4"}`}
      >
        <div className="glow-border group rounded-2xl">
          <div className={`rounded-2xl border border-bone/8 bg-ink-2/60 p-7 backdrop-blur-md transition-colors duration-500 group-hover:border-volt/35 sm:p-8 ${leftSide ? "lg:flex lg:flex-col lg:items-end" : ""}`}>
            <div className={`flex flex-wrap items-center gap-3 ${leftSide ? "lg:justify-end" : ""}`}>
              <span className="rounded-full border border-volt/35 bg-volt/10 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-volt-soft">
                {exp.period}
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-bone">{exp.role}</h3>
            <p className="mt-1 font-mono text-sm text-volt-soft">{exp.company}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-bone-dim">{exp.description}</p>
          </div>
        </div>
      </motion.div>

      {/* ghost index on the opposite side */}
      <Reveal className={`hidden lg:block ${leftSide ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`}>
        <div className={`flex h-full items-center ${leftSide ? "justify-start pl-6" : "justify-end pr-6"}`}>
          <span className="text-stroke-dim font-display text-8xl font-bold select-none">0{index + 1}</span>
        </div>
      </Reveal>
    </motion.div>
  );
}

const PARALLAX_MULTS = [-28, 34, -22];

export default function Experience() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.78", "end 0.55"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative scroll-mt-28 py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute top-24 right-0 overflow-hidden whitespace-nowrap">
        <span className="text-stroke-dim font-display text-[clamp(5rem,16vw,13rem)] font-bold tracking-tight uppercase opacity-50 select-none">
          Work
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          index="04"
          eyebrow="Where I've shipped before"
          lines={[<>My prior Work</>, <>Experience <span aria-hidden>💼</span></>]}
        />

        <div ref={trackRef} className="relative mx-auto max-w-4xl">
          {/* rail */}
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-bone/10 lg:left-1/2 lg:-translate-x-1/2" aria-hidden>
            <motion.div
              style={{ scaleY: reduced ? 1 : lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-volt via-volt-soft to-magenta shadow-[0_0_14px_rgba(82,47,254,0.7)]"
            />
          </div>

          <div className="flex flex-col gap-14 lg:gap-20">
            {experiences.map((exp, i) => (
              <ExperienceRow
                key={exp.company}
                exp={exp}
                index={i}
                progress={scrollYProgress}
                mult={PARALLAX_MULTS[i % PARALLAX_MULTS.length]}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
