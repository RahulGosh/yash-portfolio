"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Reveal from "./reveal";
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  const updatePos = (e: MouseEvent) => {
    if (!ref.current) return;

    const { top, left } = ref.current.getBoundingClientRect();

    posX.set(e.x - left);
    posY.set(e.y - top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updatePos);

    return () => {
      window.removeEventListener("mousemove", updatePos);
    };
  }, []);

  return (
    <Reveal initialY={40} delay={0.5}>
      <section
        ref={ref}
        id="contact"
        className="card relative items-center mx-6 flex flex-col px-[33px] py-[27px] z-30 gap-[54px] md:gap-[35px] mb-[67px] md:mb-[42px] group overflow-hidden"
        role="region"
        aria-labelledby="contact-heading"
      >
        <div id="contact-heading" className="sr-only">Contact Information</div>
        <div className="flex flex-col md:flex-row gap-5 md:justify-between md:w-full">
          <h2 className="font-semibold text-[22px] md:text-[40px] md:max-w-[462px]" role="heading" aria-level={2}>
            Want me on your team? Let&#8217;s make it happen ✨
          </h2>
          <div className="flex flex-col gap-5 items-center md:items-end">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=yashpuniwala@gmail.com&su=Project%20Collaboration&body=Hi%20Yash%2C%0A%0AI%20would%20like%20to%20discuss%20a%20potential%20project%20with%20you.%20Please%20let%20me%20know%20your%20availability%20for%20a%20brief%20chat.%0A%0ARegards%2C%0A[Your%20Name]"
              target="_blank"
              rel="noopener noreferrer"
              className="self-center md:self-start bg-primary text-white p-2.5 rounded flex gap-2.5 items-center text-lg md:text-xl/1 font-normal"
              aria-label="Send email to Yash Puniwala for project collaboration"
            >
              Let's get in touch
              <img src="/mail_icon.svg" alt="Mail icon" />
            </a>
            <div className="flex flex-row gap-1" role="list" aria-label="Social media links">
              <a
                href="https://github.com/YashPuniwala"
                className="contact-button" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Yash Puniwala's GitHub profile"
                role="listitem"
              >
                <Image
                  src="/github_logo_dark.svg"
                  alt="Github icon"
                  height={16}
                  width={17}
                  className="hidden dark:block"
                />
                <Image
                  src="/github_logo.svg"
                  alt="Github icon"
                  height={16}
                  width={17}
                  className="dark:hidden"
                />
              </a>

              <a
                href="https://x.com/YashPuniwala04"
                className="contact-button"
                target="_blank"
              >
                <Image
                  src="/twitter_icon_dark.svg"
                  alt="Twitter icon"
                  height={14}
                  width={17}
                  className="hidden dark:block"
                />
                <Image
                  src="/twitter_icon.svg"
                  alt="Twitter icon"
                  height={14}
                  width={17}
                  className="dark:hidden"
                />
              </a>

              <a
                href="https://www.instagram.com/yash_hetalpuniwala/"
                className="contact-button"
                target="_blank"
              >
                <Image
                  src="/instagram_light_icon.svg"
                  alt="Instagram icon"
                  height={30}
                  width={30}
                  className="hidden dark:block"
                />
                <Image
                  src="/instagram_icon.svg"
                  alt="Instagram icon"
                  height={30}
                  width={30}
                  className="dark:hidden"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/yash-puniwala-788922287/"
                className="contact-button"
                target="_blank"
              >
                <Image
                  src="/linkdin_dark_icon.svg"
                  alt="Linkdin icon"
                  height={30}
                  width={30}
                  className="hidden dark:block"
                />
                <Image
                  src="/linkdin_light_icon.svg"
                  alt="Linkdin icon"
                  height={30}
                  width={30}
                  className="dark:hidden"
                />
              </a>
            </div>
          </div>
        </div>
        <small>Copyright &copy; Yash Puniwala 2025</small>

        <motion.div
          className="absolute w-64 h-64 bg-gradient-radial from-violet-700/100 to-transparent rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition duration-300"
          style={{ left: posX, top: posY, transform: "translate(-50%, -50%)" }}
        ></motion.div>
      </section>
    </Reveal>
  );
};

export default Contact;
