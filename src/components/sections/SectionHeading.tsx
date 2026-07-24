import type { ReactNode } from "react";
import { LineMask, Reveal } from "@/components/motion/Reveal";

type Props = {
  index: string;
  eyebrow: string;
  lines: ReactNode[];
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({ index, eyebrow, lines, align = "left", className = "" }: Props) {
  const centered = align === "center";
  return (
    <div className={`mb-14 sm:mb-20 ${centered ? "text-center" : ""} ${className}`}>
      <Reveal y={14}>
        <div className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.26em] text-bone-dim uppercase ${centered ? "justify-center" : ""}`}>
          <span className="text-volt-soft">/{index}</span>
          <span className="h-px w-10 bg-volt/50" aria-hidden />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <h2 className="mt-5 font-display text-[clamp(2.3rem,6vw,4.6rem)] leading-[1.02] font-bold tracking-tight text-bone">
        <LineMask lines={lines} />
      </h2>
    </div>
  );
}
