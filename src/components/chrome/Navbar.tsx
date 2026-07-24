import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navLinks } from "@/data/content";
import { scrollToId } from "@/lib/lenis";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.35, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed top-4 left-1/2 z-[80] w-[min(100%-2rem,64rem)] -translate-x-1/2"
      >
        <motion.nav
          animate={{
            backgroundColor: scrolled ? "rgba(14,14,22,0.72)" : "rgba(14,14,22,0)",
            borderColor: scrolled ? "rgba(237,236,244,0.1)" : "rgba(237,236,244,0)",
            backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
            paddingTop: scrolled ? 8 : 14,
            paddingBottom: scrolled ? 8 : 14,
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between rounded-full border px-5 sm:px-6"
        >
          {/* Logo */}
          <button
            onClick={() => go("home")}
            data-cursor="hover"
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-volt font-display text-sm font-bold text-white shadow-[0_0_24px_rgba(82,47,254,0.55)] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
              Y
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-bone sm:block">
              yash<span className="text-volt-soft">.dev</span>
            </span>
          </button>

          {/* Desktop links with sliding active pill */}
          <div className="relative hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                data-cursor="hover"
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                  active === link.id ? "text-bone" : "text-bone-dim hover:text-bone"
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-bone/10 bg-bone/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          <a
            href="mailto:yashpuniwala@gmail.com"
            data-cursor="hover"
            className="hidden items-center gap-2 rounded-full bg-bone px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-ink uppercase transition-all duration-300 hover:bg-volt hover:text-white hover:shadow-[0_0_28px_rgba(82,47,254,0.6)] active:scale-95 md:flex"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan-x" />
            Hire me
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            data-cursor="hover"
            aria-label="Toggle menu"
            className="relative z-[90] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }} className="block h-[1.5px] w-6 bg-bone" />
            <motion.span animate={{ opacity: open ? 0 : 1, x: open ? 10 : 0 }} className="block h-[1.5px] w-6 bg-bone" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }} className="block h-[1.5px] w-6 bg-bone" />
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3.5rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3.5rem) 3rem)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[75] flex flex-col justify-center bg-ink-2/98 px-8 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -36 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                  onClick={() => go(link.id)}
                  className="group flex items-baseline gap-4 py-2 text-left"
                >
                  <span className="font-mono text-xs text-volt-soft">0{i + 1}</span>
                  <span className="font-display text-4xl font-bold tracking-tight text-bone transition-colors group-hover:text-volt-soft">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase"
            >
              yashpuniwala@gmail.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
