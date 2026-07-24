import type { JSX, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  ...props,
});

/* ---------- Tech icons (simplified custom marks, monochrome) ---------- */

export const ReactIcon = (props: P) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
  </svg>
);

export const NextIcon = (props: P) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9 15.5v-7l7.2 9.4M15 8.5v4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const JsIcon = (props: P) => (
  <svg {...base(props)}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10.5 9.5v4.6c0 1-.6 1.6-1.5 1.6-.7 0-1.2-.3-1.5-.8M16.8 9.7c-.4-.4-1-.6-1.6-.6-1 0-1.7.5-1.7 1.3 0 1.8 3.5 1 3.5 3 0 .9-.8 1.4-1.8 1.4-.8 0-1.4-.3-1.8-.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const TsIcon = (props: P) => (
  <svg {...base(props)}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 9.5h4.4M9.2 9.5v6M16.9 10.2c-.4-.5-1-.7-1.6-.7-1 0-1.6.5-1.6 1.2 0 1.7 3.4 1 3.4 2.9 0 .8-.7 1.3-1.7 1.3-.7 0-1.3-.2-1.7-.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const NodeIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 2.5 20.2 7v10L12 21.5 3.8 17V7L12 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9.2 15.2c.3.5.9.8 1.7.8 1 0 1.6-.5 1.6-1.5v-4M14.6 10.4v3.2c0 .8.5 1.4 1.4 1.4.8 0 1.3-.5 1.3-1.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const PrismaIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M13.2 2.3 21.6 17a.9.9 0 0 1-.8 1.4H6.4a.9.9 0 0 1-.8-1.3L11.6 2.4a.9.9 0 0 1 1.6-.1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M12.6 6.5 8.2 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const PostgresIcon = (props: P) => (
  <svg {...base(props)}>
    <ellipse cx="12" cy="6" rx="8" ry="3.2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 6v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M4 12v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const TailwindIcon = (props: P) => (
  <svg {...base(props)}>
    <path
      d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.6 7.15 14.49 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.6 13.15 9.49 12 7 12z"
      fill="currentColor"
    />
  </svg>
);

export const GitHubIcon = (props: P) => (
  <svg {...base(props)}>
    <path
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      transform="translate(4 4)"
      fill="currentColor"
    />
  </svg>
);

/* ---------- Social icons ---------- */

export const XSocialIcon = (props: P) => (
  <svg {...base(props)}>
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"
      fill="currentColor"
    />
  </svg>
);

export const LinkedInIcon = (props: P) => (
  <svg {...base(props)}>
    <path
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z"
      fill="currentColor"
    />
  </svg>
);

export const InstagramIcon = (props: P) => (
  <svg {...base(props)}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </svg>
);

/* ---------- UI icons ---------- */

export const ArrowUpRight = (props: P) => (
  <svg {...base(props)}>
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = (props: P) => (
  <svg {...base(props)}>
    <path d="M4 12h16m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DownloadIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SparkIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const QuoteIcon = (props: P) => (
  <svg {...base(props)}>
    <path d="M5 13c0-4 2.2-6.8 5.5-8l.9 1.6C9.3 7.7 8.2 9.2 8 11h2.6v7H5v-5Zm8.4 0c0-4 2.2-6.8 5.5-8l.9 1.6c-2.1 1.1-3.2 2.6-3.4 4.4H19v7h-5.6v-5Z" fill="currentColor" />
  </svg>
);

export const techIcons: Record<string, (props: P) => JSX.Element> = {
  ReactJS: ReactIcon,
  NextJS: NextIcon,
  JavaScript: JsIcon,
  TypeScript: TsIcon,
  NodeJS: NodeIcon,
  Prisma: PrismaIcon,
  PostgreSQL: PostgresIcon,
  "Tailwind CSS": TailwindIcon,
  Github: GitHubIcon,
};
