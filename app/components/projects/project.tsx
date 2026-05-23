"use client";

import Image from "next/image";
import React, { MouseEventHandler, useState } from "react";
import Reveal from "../reveal";
import { useMotionValue, useSpring, motion, useTransform } from "framer-motion";

type Props = {
  thumbnail: string;
  title: string;
  links: {
    url: string;
    label: string;
  }[];
  description: string;
  languageIcons: string[];
};

const Project = ({
  thumbnail,
  title,
  links,
  description,
  languageIcons,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const xRotation = useTransform(ySpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const yRotation = useTransform(xSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget;
    const clientRect = target.getBoundingClientRect();

    const xPos = (e.clientX - clientRect.left) / clientRect.width - 0.5;
    const yPos = (e.clientY - clientRect.top) / clientRect.height - 0.5;

    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Get links for rendering
  const linksToRender = links;

  return (
    <Reveal initialX={-50} delay={0.5}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transformStyle: "preserve-3d",
          rotateX: xRotation,
          rotateY: yRotation,
        }}
        className="group relative h-full w-full max-w-[440px] mx-auto"
      >
        {/* Main Card */}
        <div className="relative h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#1a1a1a] dark:via-[#1e1e1e] dark:to-[#252525] rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:border-gray-300/70 dark:hover:border-gray-600/70">
          {/* Thumbnail with Overlay */}
          <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-6 group-hover:scale-[1.02] transition-transform duration-300">
            <Image
              src={thumbnail}
              alt={`Thumbnail for ${title}`}
              fill
              className="object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="flex flex-col h-full">
            {/* Title */}
            <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
              {description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {languageIcons.map((icon, iconId) => (
                <motion.div
                  key={iconId}
                  className="relative w-8 h-8 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-200"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={icon}
                    alt="Tech Icon"
                    fill
                    className="object-contain p-1"
                  />
                </motion.div>
              ))}
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap gap-2 relative z-10">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-[5px] py-[3px] gap-1 bg-[#b9b9b9] bg-opacity-[24%] rounded text-[14px] hover:bg-opacity-40 transition-all"
                >
                  <span className="hidden md:block">{link.label}</span>
                  <img
                    src="link_arrow.svg"
                    alt="Link Arrow"
                    className="block dark:hidden w-4 h-4"
                  />
                  <img
                    src="link_arrow_dark.svg"
                    alt="Link Arrow"
                    className="hidden dark:block w-4 h-4"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Reveal>
  );
};

export default Project;
