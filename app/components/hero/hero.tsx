"use client";

import Image from "next/image";
import React from "react";
import Reveal from "../reveal";
import toast, { Toaster } from "react-hot-toast";
import { FiDownload, FiMail } from "react-icons/fi";
import CodeEditor from "./codeEditor";

type Props = {};

const Hero = (props: Props) => {
  const handleDownload = () => {
    try {
      // Replace with your actual resume file path
      const resumeUrl = "/yashpuniwala fullstack resume.pdf";
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Yash_Puniwala_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show beautiful toast after download
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-semibold">📄 Resume downloaded!</span>
          <span className="text-sm opacity-80">
            Thank you for your interest in my work!
          </span>
          <span className="text-sm opacity-80">
            Let's discuss how I can contribute to your team ✨
          </span>
        </div>,
        {
          duration: 5000,
          position: "bottom-center",
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "16px",
          },
          iconTheme: {
            primary: "#6366f1",
            secondary: "#fff",
          },
        }
      );
    } catch (error) {
      toast.error("Failed to download resume. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <section className="relative flex flex-row items-center z-20 mx-auto md:gap-[37px] md:mx-10">
      <Toaster />
      <div className="flex flex-col gap-[13px] items-center md:gap-[34px] md:my-[58px] md:items-start">
        <Reveal initialX={-25}>
          <h1 className="text-2xl/1 text-center font-semibold block md:text-[40px] md:text-start md:inline" role="heading" aria-level={1}>
            <span className="-ml-3">👋</span> Hello I'm Yash Puniwala{" "}
            <span className="block text-[27px] highlight mt-2 md:text-[45px] md:inline md:mt-0">
              FullStack Developer
            </span>
          </h1>
        </Reveal>
        <Reveal initialX={-30} delay={0.2}>
          <p className="text-center text-sm mx-6 md:text-[22px] md:text-start md:mx-0" role="text">
            I'm obsessed with code and helping startups create unique and
            helpful products.
          </p>
        </Reveal>

        <div className="flex gap-4">
          <Reveal initialX={-40} delay={0.4}>
            <button
              onClick={handleDownload}
              className="self-center bg-primary text-white p-2.5 rounded-lg flex gap-2.5 items-center text-sm md:self-start md:text-xl/6 hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              <FiDownload className="text-lg" />
              Download Resume
            </button>
          </Reveal>
          <Reveal initialX={-40} delay={0.4}>
            <a
              className="self-center bg-secondary text-white p-2.5 rounded-lg flex gap-2.5 items-center text-sm md:self-start md:text-xl/6 hover:bg-secondary-dark transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30"
              href="mailto:yashpuniwala@gmail.com"
            >
              <FiMail className="text-lg" />
              Let's Chat
            </a>
          </Reveal>
        </div>
      </div>

      <CodeEditor />
    </section>
  );
};

export default Hero;