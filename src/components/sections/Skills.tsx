import { motion, useReducedMotion } from "framer-motion";
import { alsoWorkingWith, skills } from "@/data/content";
import { techIcons } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="relative scroll-mt-28 py-28 sm:py-36">
      {/* giant backdrop word */}
      <div aria-hidden className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 overflow-hidden whitespace-nowrap">
        <span className="text-stroke-dim font-display text-[clamp(6rem,20vw,17rem)] font-bold tracking-tight uppercase opacity-60 select-none">
          Stack
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          index="01"
          eyebrow="My Technical Skills and Expertise"
          lines={["This is my", <>Tech <span className="text-volt-soft">Stack</span></>]}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {skills.map((skill, i) => {
            const Icon = techIcons[skill.name];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: reduced ? 0 : 36, scale: reduced ? 1 : 0.92, rotate: reduced ? 0 : i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={i === 8 ? "col-span-2 sm:col-span-1" : ""}
              >
                <Tilt max={9} className="group glow-border h-full rounded-2xl">
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 5.5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                    className="relative h-full overflow-hidden rounded-2xl border border-bone/8 bg-ink-2/60 p-6 backdrop-blur-md transition-colors duration-500 group-hover:border-volt/40 group-hover:bg-ink-3/80"
                  >
                    <div className="flex items-start justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-bone/10 bg-ink/70 text-bone-dim transition-all duration-500 group-hover:border-volt/50 group-hover:text-volt-soft group-hover:shadow-[0_0_28px_rgba(82,47,254,0.35)]">
                        {Icon && <Icon className="h-6 w-6" />}
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.22em] text-bone-dim/70 uppercase transition-colors duration-500 group-hover:text-volt-soft">
                        {skill.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-bone">{skill.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-bone-dim">{skill.note}</p>
                    {/* hover corner accent */}
                    <span className="absolute right-0 bottom-0 h-10 w-10 translate-x-1/2 translate-y-1/2 rotate-45 bg-volt/0 transition-all duration-500 group-hover:bg-volt/25" />
                  </motion.div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.24em] text-bone-dim uppercase">Also in the toolbox →</span>
            {alsoWorkingWith.map((t, i) => (
              <motion.span
                key={t}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`rounded-full border px-4 py-2 font-mono text-xs tracking-wide ${
                  i === 1 ? "border-volt/40 text-volt-soft" : "border-bone/12 text-bone-dim"
                } transition-colors hover:border-volt-soft hover:text-bone`}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
