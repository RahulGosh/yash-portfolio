import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { pointerNX, pointerNY, pointerX, pointerY, setPointerLive, prefersFinePointer } from "@/lib/pointer";

/** Single window-level pointer listener feeding the shared motion values. */
export default function PointerTracker() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !prefersFinePointer()) return;
    const onMove = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      pointerNX.set(e.clientX / window.innerWidth - 0.5);
      pointerNY.set(e.clientY / window.innerHeight - 0.5);
      setPointerLive(true);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      setPointerLive(false);
    };
  }, [reduced]);

  return null;
}
