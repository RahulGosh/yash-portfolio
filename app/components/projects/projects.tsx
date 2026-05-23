"use client";

import React, { useState } from "react";
import SectionContainer from "../sections/sectionContainer";
import SectionHeader from "../sections/sectionHeader";
import projects from "../../../data/projects.json";
import Project from "./project";
import Image from "next/image";

type Props = {};

const Projects = (props: Props) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const toggleProjects = () => {
    if (visibleCount >= projects.length) {
      setVisibleCount(4); // Collapse to initial state
    } else {
      setVisibleCount((prev) => prev + 4); // Show next 4
    }
  };

  const isAllShown = visibleCount >= projects.length;

  return (
    <SectionContainer id="projects">
      <div
        className="section-contents mx-6 md:mx-[64px]"
        role="region"
        aria-labelledby="projects-heading"
      >
        <div id="projects-heading" className="sr-only">
          My Portfolio Projects
        </div>
        <SectionHeader plainText="😎 Some of my" highlightText="Best Works" />

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 place-items-center"
          role="list"
          aria-label="Portfolio projects"
        >
          {projects.slice(0, visibleCount).map((project, id) => {
            const links = project.links || [];

            return (
              <div key={id} className="w-full max-w-[440px]" role="listitem">
                <Project
                  thumbnail={project.thumbnail}
                  title={project.title}
                  links={links}
                  description={project.description}
                  languageIcons={project.languageIcons}
                />
              </div>
            );
          })}
        </div>

        {/* Show More / Hide Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={toggleProjects}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">
              {isAllShown ? "Hide Projects" : "View More Projects"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg
              className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Background Decorations */}
      <Image
        src="/projects_highlight.svg"
        alt="Background Highlight Decoration"
        width={558}
        height={558}
        className="absolute hidden md:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-70"
      />
      <Image
        src="/projects_highlight_mobile.svg"
        alt="Mobile Background Highlight Decoration"
        width={321}
        height={520}
        className="absolute md:hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-70"
      />
    </SectionContainer>
  );
};

export default Projects;
