import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "./components/JsonLd";

const inter = Inter({subsets: ["latin"]})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yashpuniwala.vercel.app"),
  title: "Yash Puniwala - Fullstack Developer | MERN Stack Expert | Mumbai",
  description:
    "Experienced Fullstack Developer specializing in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL & Prisma. Based in Mumbai. Available for freelance projects and full-time opportunities.",
  keywords: [
    "fullstack developer",
    "MERN stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "frontend developer",
    "backend developer",
    "web developer",
    "JavaScript developer",
    "Mumbai",
    "freelance developer",
    "Yash Puniwala",
    "Potfolio",
    "Fullstack Developer Potfolio",
    "React Developer Potfolio",
    "Frontend Developer Potfolio",
    "Backend Developer Potfolio",
    "Mern Stack Developer Potfolio",
  ],
  authors: [{ name: "Yash Puniwala" }],
  creator: "Yash Puniwala",
  publisher: "Yash Puniwala",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashpuniwala.vercel.app",
    siteName: "Yash Puniwala - Fullstack Developer",
    title: "Yash Puniwala - Fullstack Developer | MERN Stack Expert | Mumbai",
    description:
      "Experienced Fullstack Developer specializing in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL & Prisma. Based in Mumbai.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yash Puniwala - Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Puniwala - Fullstack Developer | MERN Stack Expert",
    description:
      "Experienced Fullstack Developer specializing in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL & Prisma.",
    images: ["/og-image.png"],
    creator: "@YashPuniwala04",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://yashpuniwala.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#522ffe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} antialiased dark`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
