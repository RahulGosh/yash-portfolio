import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/data/content";
import type { Project } from "@/data/content";
import { ArrowUpRight, GitHubIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import SectionHeading from "./SectionHeading";

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <article className="group grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14">
      {/* Image frame */}
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <motion.div
          initial={{ clipPath: "inset(14% 10% 14% 10% round 24px)", opacity: 0, scale: reduced ? 1 : 0.94 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <Tilt max={5} className="glow-border group/frame relative rounded-3xl">
            <div ref={frameRef} className="relative overflow-hidden rounded-3xl border border-bone/10 bg-ink-2">
              {/* browser chrome */}
              <div className="relative z-10 flex items-center gap-2 border-b border-bone/8 bg-ink-3/80 px-5 py-3.5 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-4 hidden truncate rounded-md border border-bone/8 bg-ink px-3 py-1 font-mono text-[10px] tracking-wider text-bone-dim sm:block">
                  {project.live ? project.live.replace("https://", "") : project.github.replace("https://github.com/", "github.com/")}
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={`${project.name} — ${project.subtitle}`}
                  loading="lazy"
                  style={{ y: reduced ? 0 : imgY }}
                  className="h-[118%] w-full object-cover transition-transform duration-700 ease-out group-hover/frame:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                {/* view badge on hover */}
                <a
                  href={project.live ?? project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="absolute right-5 bottom-5 flex translate-y-3 items-center gap-2 rounded-full bg-bone px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-ink uppercase opacity-0 transition-all duration-400 group-hover/frame:translate-y-0 group-hover/frame:opacity-100"
                >
                  {project.live ? "Visit live" : "View code"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Copy */}
      <div className={`relative lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal>
          <span aria-hidden className="text-stroke-dim pointer-events-none absolute -top-16 -left-2 font-display text-[7rem] leading-none font-bold select-none lg:-top-20">
            {project.index}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="relative font-mono text-[11px] tracking-[0.26em] text-volt-soft uppercase">
            {project.subtitle}
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-bone sm:text-4xl">
            {project.name}
          </h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 leading-relaxed text-bone-dim">{project.description}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-md border border-bone/10 bg-bone/[0.03] px-3 py-1.5 font-mono text-[11px] tracking-wide text-bone-dim transition-colors duration-300 hover:border-volt/50 hover:text-volt-soft">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.28}>
          <div className="mt-8 flex items-center gap-7">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group/link link-draw flex items-center gap-2 font-display text-sm font-semibold text-bone"
              >
                Live demo
                <ArrowUpRight className="h-4 w-4 text-volt-soft transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group/link link-draw flex items-center gap-2 font-display text-sm font-semibold text-bone-dim hover:text-bone"
            >
              <GitHubIcon className="h-4 w-4" />
              Source
              <ArrowUpRight className="h-4 w-4 text-volt-soft transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          index="02"
          eyebrow="My Portfolio Projects"
          lines={[<>😎 Some of my</>, <>Best <span className="text-stroke">Works</span></>]}
        />
        <div className="divide-y divide-bone/6">
          {projects.map((p, i) => (
            <ProjectRow key={p.name} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
