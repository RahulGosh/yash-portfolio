import Script from 'next/script';

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yash Puniwala",
    "jobTitle": "Fullstack Developer",
    "description": "Experienced Fullstack Developer specializing in React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL & Prisma",
    "url": "https://yashpuniwala.vercel.app",
    "image": "https://yashpuniwala.vercel.app/profile_picture.png",
    "email": "yashpuniwala@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://github.com/YashPuniwala",
      "https://x.com/YashPuniwala04",
      "https://www.linkedin.com/in/yash-puniwala-788922287/",
      "https://www.instagram.com/yash_hetalpuniwala/"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "MERN Stack",
      "Fullstack Development",
      "Frontend Development",
      "Backend Development",
      "Web Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Fullstack Developer",
      "occupationLocation": {
        "@type": "City",
        "name": "Mumbai"
      },
      "skills": [
        "React",
        "Next.js", 
        "Node.js",
        "TypeScript",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
        "JavaScript"
      ]
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Software Development"
    },
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "Evently - Event Management Platform",
        "description": "Next.js event platform with admin CRUD, Google/GitHub auth, and Prisma/PostgreSQL",
        "url": "https://evently-orcin-mu.vercel.app/"
      },
      {
        "@type": "CreativeWork", 
        "name": "Forever Ecommerce",
        "description": "Full-featured e-commerce app with React and Node.js",
        "url": "https://ecommerce-frontend-1234.netlify.app/"
      }
    ]
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}