import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

/** 3D perspective tilt that tracks the cursor, with a moving glare highlight. */
export default function Tilt({ children, className, max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["-60%", "60%"]);
  const glareY = useTransform(py, [0, 1], ["-60%", "60%"]);

  const onMove = (e: ReactMouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform([glareX, glareY], ([gx, gy]) => {
            const x = typeof gx === "string" ? gx : `${gx}%`;
            const y = typeof gy === "string" ? gy : `${gy}%`;
            return `radial-gradient(420px circle at calc(50% + ${x}) calc(50% + ${y}), rgba(122,92,255,0.16), transparent 65%)`;
          }),
        }}
      />
    </motion.div>
  );
}
