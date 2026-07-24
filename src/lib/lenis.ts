import type Lenis from "lenis";

type LenisHolder = {
  instance: Lenis | null;
};

const holder: LenisHolder = { instance: null };

export function setLenis(instance: Lenis | null) {
  holder.instance = instance;
}

export function getLenis(): Lenis | null {
  return holder.instance;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (holder.instance) {
    holder.instance.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
