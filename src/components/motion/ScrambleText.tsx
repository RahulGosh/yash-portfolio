import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#$%&";

/** Decode-scramble text effect. */
export default function ScrambleText({
  text,
  className,
  delay = 0,
  speed = 28,
  startOnMount = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  startOnMount?: boolean;
}) {
  const reduced = useReducedMotion();
  const [output, setOutput] = useState(reduced ? text : "");
  const frame = useRef(0);

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      return;
    }
    if (!startOnMount) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      frame.current = 0;
      interval = setInterval(() => {
        frame.current += 1;
        const progress = frame.current;
        const revealed = Math.floor(progress / 2.4);
        if (revealed >= text.length) {
          setOutput(text);
          if (interval) clearInterval(interval);
          return;
        }
        let next = text.slice(0, revealed);
        for (let i = revealed; i < text.length; i++) {
          next += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOutput(next);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, speed, reduced, startOnMount]);

  return (
    <span className={className} aria-label={text}>
      {output || "\u00A0"}
    </span>
  );
}
