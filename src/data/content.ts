export const identity = {
  name: "Yash Puniwala",
  title: "Fullstack Developer",
  location: "Mumbai, India",
  email: "yashpuniwala@gmail.com",
  site: "https://yashpuniwala.vercel.app",
  seoTitle: "Yash Puniwala - Fullstack Developer | MERN Stack Expert | Mumbai",
  seoDescription:
    "Experienced Fullstack Developer specializing in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL & Prisma. Based in Mumbai. Available for freelance projects and full-time opportunities.",
  themeColor: "#522ffe",
  resumeUrl: "/resume.pdf",
} as const;

export const socials = [
  { label: "GitHub", handle: "YashPuniwala", url: "https://github.com/YashPuniwala" },
  { label: "X (Twitter)", handle: "@YashPuniwala04", url: "https://x.com/YashPuniwala04" },
  { label: "LinkedIn", handle: "yash-puniwala", url: "https://www.linkedin.com/in/yash-puniwala-788922287/" },
  { label: "Instagram", handle: "@yash_hetalpuniwala", url: "https://www.instagram.com/yash_hetalpuniwala/" },
] as const;

export const navLinks = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Experience", id: "experience" },
  { label: "Contact Me", id: "contact" },
] as const;

export const hero = {
  headline: "👋 Hello I'm Yash Puniwala FullStack Developer",
  subtext:
    "I'm obsessed with code and helping startups create unique and helpful products.",
  ctaPrimary: "Download Resume",
  ctaSecondary: "Let's Chat",
  floatingChip: "React.js — // Building interactive UIs",
} as const;

export type Skill = {
  name: string;
  tag: string;
  note: string;
};

export const skills: Skill[] = [
  { name: "ReactJS", tag: "UI LIBRARY", note: "Component-driven, interactive UIs" },
  { name: "NextJS", tag: "FRAMEWORK", note: "SSR, App Router, fullstack React" },
  { name: "JavaScript", tag: "LANGUAGE", note: "The language I think in" },
  { name: "TypeScript", tag: "LANGUAGE", note: "Type-safe, scalable codebases" },
  { name: "NodeJS", tag: "RUNTIME", note: "Fast, event-driven servers" },
  { name: "Prisma", tag: "ORM", note: "Typed data access, clean schemas" },
  { name: "PostgreSQL", tag: "DATABASE", note: "Reliable relational data" },
  { name: "Tailwind CSS", tag: "STYLING", note: "Rapid, consistent design systems" },
  { name: "Github", tag: "WORKFLOW", note: "CI, reviews, clean commits" },
];

export const alsoWorkingWith = ["MongoDB", "Express", "Framer Motion"];

export type Project = {
  index: string;
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  live?: string;
  github: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Streamify",
    subtitle: "Language Exchange Social Platform",
    description:
      "Full-stack language exchange social platform with JWT authentication, onboarding, friend requests, real-time 1:1 chat, and video calling. Built language-based user matching, Stream Chat/Video integration, group/community backend APIs, and theme personalization using React, TypeScript, Express, MongoDB, and Stream SDK.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/projects/streamify.jpg",
    live: "https://streamifychatyyyy.netlify.app/",
    github: "https://github.com/YashPuniwala/streamify",
  },
  {
    index: "02",
    name: "LMS Course Mern Stack",
    subtitle: "Modern Learning Management System",
    description:
      "A modern Learning Management System built with the MERN stack. Allows users to browse, enroll, and watch premium courses. Features include user authentication, course search, video playback, and Stripe payment integration. Designed with a clean UI and real-time data handling.",
    tech: ["React", "Tailwind CSS", "TypeScript", "MongoDB"],
    image: "/projects/lms.jpg",
    live: "https://lms-course-manage.netlify.app/",
    github: "https://github.com/YashPuniwala/LMS",
  },
  {
    index: "03",
    name: "Archi-Touch",
    subtitle: "Interior Design Studio Website",
    description:
      "Advanced animated website for interior design services using Framer Motion. Fully responsive with smooth transitions and interactive elements to showcase design portfolio.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    image: "/projects/architouch.jpg",
    live: "https://archi-touch-one.vercel.app/",
    github: "https://github.com/YashPuniwala/archi-touch",
  },
  {
    index: "04",
    name: "Served",
    subtitle: "AI-Powered Recipe Platform",
    description:
      "AI-powered full-stack recipe platform that scans pantry images using Google Gemini AI to detect ingredients and generate personalized recipes instantly. Features include AI recipe search, cuisine/category browsing, favorites collections, PDF recipe exports, Clerk authentication, subscription tiers, and secure production-ready architecture using Next.js, Strapi CMS, Neon PostgreSQL, and Arcjet.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/projects/served.jpg",
    github: "https://github.com/YashPuniwala/ai-recipe-platform",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Yash delivered exceptional frontend work with remarkable attention to detail. His ability to turn complex ideas into smooth, interactive user experiences impressed our entire design team.",
    name: "Ananya Sharma",
    role: "Senior UI/UX Designer",
    company: "PixelCraft",
  },
  {
    quote:
      "Working with Yash was seamless. His React expertise and clean coding practices significantly improved our application's performance and maintainability.",
    name: "Arjun Mehta",
    role: "Software Engineer",
    company: "TechNova",
  },
  {
    quote:
      "Yash consistently exceeded expectations throughout our project. He communicated clearly, delivered on time, and solved technical challenges with confidence.",
    name: "Priya Kapoor",
    role: "Product Manager",
    company: "InnovateX",
  },
  {
    quote:
      "Yash quickly understood our architecture and contributed high-quality code from day one. His dedication and problem-solving mindset made him a valuable part of the team.",
    name: "Rohan Verma",
    role: "Engineering Lead",
    company: "CloudSphere",
  },
  {
    quote:
      "The level of polish Yash brought to our frontend interfaces was outstanding. He perfectly balanced design aesthetics with responsive functionality.",
    name: "Sneha Iyer",
    role: "Creative Director",
    company: "StudioHive",
  },
  {
    quote:
      "Yash helped us launch our platform faster than expected. His technical expertise, responsiveness, and commitment to quality made the collaboration extremely successful.",
    name: "Aditya Nair",
    role: "Founder",
    company: "BuildStack",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    company: "Yashi IT Services",
    role: "Frontend Developer",
    period: "Dec 2025 - Mar 2026",
    description:
      "Developed a pest control management platform serving internal business operations and customer management workflows. Integrated technician photo/signature capture, manual reporting, and automated PDF generation while improving operational efficiency and real-time data handling.",
  },
  {
    company: "CodeNest Solutions",
    role: "Fullstack Developer",
    period: "Aug 2025 - Nov 2025",
    description:
      "Built and maintained fullstack web applications using React, Node.js, Express, and MongoDB. Developed authentication systems, REST APIs, admin dashboards, and responsive frontend interfaces while optimizing application performance and scalability.",
  },
  {
    company: "Archi-Touch",
    role: "Frontend Developer",
    period: "Feb 2025 - Aug 2025",
    description:
      "Designed and developed a responsive interior design business website with advanced animations and modern UI/UX practices. Improved engagement through interactive landing pages, optimized responsiveness across devices, and enhanced rendering performance.",
  },
];

export const contact = {
  heading: "Want me on your team? Let's make it happen ✨",
  cta: "Let's get in touch",
  mailto: `mailto:yashpuniwala@gmail.com?subject=${encodeURIComponent("Project Collaboration")}`,
  copyright: "Copyright © Yash Puniwala",
} as const;
