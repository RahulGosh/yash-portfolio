"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    setIsDarkMode(
      savedTheme ? savedTheme === "dark" : prefersDark
    );
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, isMounted]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (!isMounted) {
    return (
      <button
        className="fixed top-[58px] left-6 md:top-16 md:left-auto md:right-[42px] w-9 h-[18px] bg-[#1a1a1a] rounded-lg z-50 flex items-center justify-end px-1"
        aria-label="Theme toggle"
      >
        <div className="w-[14px] h-[14px]" /> {/* Placeholder */}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-[58px] left-6 md:top-16 md:left-auto md:right-[42px] w-9 h-[18px] bg-[#1a1a1a] dark:bg-[#efefef] rounded-lg z-50 flex items-center justify-end dark:justify-start px-1"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Image src="/sun_icon.svg" alt="Sun icon" height={14} width={14} />
      ) : (
        <Image src="/moon_icon.svg" alt="Moon icon" height={14} width={19} />
      )}
    </button>
  );
};

export default ThemeToggle;