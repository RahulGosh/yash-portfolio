import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { FormEvent, JSX, MouseEvent as ReactMouseEvent, SVGProps } from "react";
import { contact, identity, socials } from "@/data/content";
import KineticText from "@/components/motion/KineticText";
import Magnetic from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, CheckIcon, GitHubIcon, InstagramIcon, LinkedInIcon, SparkIcon, XSocialIcon } from "@/components/icons";
import { scrollToId } from "@/lib/lenis";

const socialIcons: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  GitHub: GitHubIcon,
  "X (Twitter)": XSocialIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};

type Status = "idle" | "sending" | "sent" | "error";

function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      // Open mail client with pre-filled content
      const subject = encodeURIComponent("Project Collaboration");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:yashpuniwala@gmail.com?subject=${subject}&body=${body}`;
      // Short delay to let the mail client open, then show success
      setTimeout(() => {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      }, 600);
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-bone/10 bg-ink/70 px-4 py-3.5 text-sm text-bone placeholder:text-bone-dim/60 outline-none backdrop-blur-sm transition-all duration-300 focus:border-volt-soft focus:shadow-[0_0_0_3px_rgba(82,47,254,0.18)]";

  return (
    <form onSubmit={submit} className="glow-border relative rounded-2xl">
      <div className="rounded-2xl border border-bone/8 bg-ink-2/60 p-6 backdrop-blur-md sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-bone">Drop a quick note</h3>
          <span className="font-mono text-[10px] tracking-[0.22em] text-bone-dim uppercase">~30s to fill</span>
        </div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-10 text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-volt/15 text-volt-soft">
                <CheckIcon className="h-6 w-6" />
              </span>
              <p className="font-display text-lg font-semibold text-bone">Note received 🎉</p>
              <p className="max-w-xs text-sm text-bone-dim">
                Thanks for reaching out — expect a reply at your email soon. For anything urgent, mail{" "}
                <a href={`mailto:${identity.email}`} className="link-draw text-volt-soft">
                  {identity.email}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                data-cursor="hover"
                className="mt-2 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase underline-offset-4 hover:text-bone hover:underline"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className={inputCls} aria-label="Your name" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" required className={inputCls} aria-label="Your email" />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project — scope, stack, timeline…"
                required
                rows={4}
                className={`${inputCls} resize-none`}
                aria-label="Your message"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor="hover"
                className="group mt-1 flex items-center justify-center gap-3 rounded-xl bg-volt px-6 py-4 font-display text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_36px_rgba(82,47,254,0.55)] active:scale-[0.98] disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <SparkIcon className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
                    {status === "error" ? "Try again" : "Send it over"}
                  </>
                )}
              </button>
              {status === "error" && (
                <p className="text-center font-mono text-[11px] text-magenta">Something went wrong — try emailing directly instead.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default function Contact() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-reactive gradient field behind the closing headline
  const gx = useMotionValue(32);
  const gy = useMotionValue(24);
  const sgx = useSpring(gx, { stiffness: 70, damping: 20, mass: 0.6 });
  const sgy = useSpring(gy, { stiffness: 70, damping: 20, mass: 0.6 });
  const fieldBg = useMotionTemplate`radial-gradient(680px circle at ${sgx}% ${sgy}%, rgba(82,47,254,0.2), transparent 68%)`;

  const onMove = (e: ReactMouseEvent) => {
    if (reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    gx.set(((e.clientX - rect.left) / rect.width) * 100);
    gy.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section id="contact" ref={sectionRef} onMouseMove={onMove} className="relative scroll-mt-28 overflow-hidden pt-28 sm:pt-36">
      {/* glow floor */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[min(100%,900px)] -translate-x-1/2 rounded-[100%] bg-volt/15 blur-[120px]" />
      {/* cursor-reactive field */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: fieldBg }} />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* left: big ask */}
          <div>
            <Reveal y={14}>
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.26em] text-bone-dim uppercase">
                <span className="text-volt-soft">/05</span>
                <span className="h-px w-10 bg-volt/50" aria-hidden />
                <span>Next chapter</span>
              </div>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6.5vw,5.2rem)] leading-[1.02] font-bold tracking-tight text-bone">
              <span className="block">
                <KineticText mode="view" text="Want me on" delay={0.05} />
              </span>
              <span className="block">
                <KineticText mode="view" text="your team?" delay={0.32} />
              </span>
              <span className="block">
                <KineticText mode="view" text="Let's make it happen ✨" delay={0.58} stagger={0.02} charClass="text-volt-soft" />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md leading-relaxed text-bone-dim">
                Freelance project or full-time — if you're building something unique, I'd love to hear about it. Currently based in {identity.location}, working worldwide.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-10">
              <Magnetic strength={0.4}>
                <a
                  href={contact.mailto}
                  data-cursor="hover"
                  className="group relative flex w-fit items-center gap-4 overflow-hidden rounded-full bg-volt px-9 py-5 font-display text-base font-semibold text-white shadow-[0_0_44px_rgba(82,47,254,0.45)] transition-shadow duration-500 hover:shadow-[0_0_70px_rgba(82,47,254,0.7)] active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden />
                  {contact.cta}
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnetic>
              <a href={`mailto:${identity.email}`} className="link-draw ml-1 mt-5 block w-fit font-mono text-sm text-bone-dim hover:text-volt-soft">
                {identity.email}
              </a>
            </Reveal>

            {/* socials */}
            <Reveal delay={0.4} className="mt-12">
              <div className="flex items-center gap-3">
                {socials.map((s) => {
                  const Icon = socialIcons[s.label];
                  return (
                    <motion.a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      aria-label={s.label}
                      whileHover={reduced ? undefined : { y: -6, rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.45 }}
                      className="group grid h-12 w-12 place-items-center rounded-full border border-bone/12 bg-ink-2/60 text-bone-dim backdrop-blur-sm transition-colors duration-300 hover:border-volt-soft hover:text-volt-soft hover:shadow-[0_0_24px_rgba(82,47,254,0.35)]"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                    </motion.a>
                  );
                })}
                <span className="ml-3 font-mono text-[11px] tracking-[0.2em] text-bone-dim/70 uppercase">
                  @YashPuniwala04
                </span>
              </div>
            </Reveal>
          </div>

          {/* right: inquiry form */}
          <Reveal delay={0.25} y={44}>
            <InquiryForm />
          </Reveal>
        </div>

        {/* footer */}
        <footer className="mt-24 border-t border-bone/8 py-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <button
              onClick={() => scrollToId("home")}
              data-cursor="hover"
              className="group flex items-center gap-2.5"
              aria-label="Back to top"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-volt font-display text-sm font-bold text-white transition-transform duration-300 group-hover:rotate-[-6deg]">
                Y
              </span>
              <span className="font-display text-sm font-semibold text-bone">
                yash<span className="text-volt-soft">.dev</span>
              </span>
            </button>

            <p className="font-mono text-[11px] tracking-[0.18em] text-bone-dim uppercase">
              {contact.copyright} {year} · All rights reserved
            </p>

            <button
              onClick={() => scrollToId("home")}
              data-cursor="hover"
              className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-bone-dim uppercase transition-colors hover:text-volt-soft"
            >
              Back to top
              <motion.span animate={reduced ? undefined : { y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="inline-block">
                ↑
              </motion.span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
