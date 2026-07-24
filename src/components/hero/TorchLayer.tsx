import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { prefersFinePointer } from "@/lib/pointer";

/**
 * Signature layer — cursor torch reveal.
 * A hidden violet "dimension" (grid + glows + pattern type) is only visible
 * inside a spring-damped radial mask that follows the cursor.
 */
export default function TorchLayer() {
  const reduced = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const tx = useMotionValue(-600);
  const ty = useMotionValue(-600);
  const x = useSpring(tx, { stiffness: 110, damping: 18, mass: 0.5 });
  const y = useSpring(ty, { stiffness: 110, damping: 18, mass: 0.5 });
  const to = useMotionValue(0);
  const opacity = useSpring(to, { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (reduced || !prefersFinePointer()) return;
    const onMove = (e: MouseEvent) => {
      const el = layerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      const inside = lx > -80 && lx < rect.width + 80 && ly > -80 && ly < rect.height + 80;
      tx.set(lx);
      ty.set(ly);
      to.set(inside ? 1 : 0);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, tx, ty, to]);

  const mask = useMotionTemplate`radial-gradient(300px circle at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 42%, transparent 70%)`;

  if (reduced) return null;

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <motion.div style={{ opacity, maskImage: mask, WebkitMaskImage: mask }} className="absolute inset-0">
        {/* violet grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(122,92,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(122,92,255,0.16) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
        {/* glows */}
        <div className="absolute top-[16%] left-[12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(82,47,254,0.5),transparent_65%)] blur-[40px]" />
        <div className="absolute right-[8%] bottom-[10%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,61,242,0.32),transparent_65%)] blur-[50px]" />
        {/* pattern type */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 whitespace-nowrap">
          <span className="font-display text-[clamp(4rem,11vw,9rem)] font-bold tracking-tight uppercase" style={{ WebkitTextStroke: "1px rgba(122,92,255,0.5)", color: "transparent" }}>
            depth ✦ motion ✦ code ✦ depth
          </span>
        </div>
      </motion.div>
    </div>
  );
}
