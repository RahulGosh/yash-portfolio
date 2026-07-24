import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  return (
    <motion.div
      className="fixed top-0 left-0 z-[95] h-[2.5px] w-full origin-left bg-gradient-to-r from-volt via-magenta to-cyan-x"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
