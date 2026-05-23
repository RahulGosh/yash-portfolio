import Image from "next/image";
import React from "react";

type Props = {};

const TopBackground = (props: Props) => {
  return (
    <>
      {/* Floating icons container */}
      <div className="absolute w-full max-w-[360px] md:max-w-screen-lg h-[285px] md:h-[656px] top-[120px] md:top-11 left-1/2 -translate-x-1/2 md:overflow-x-hidden z-10">
        <div className="w-full h-full relative">
          {/* Rocket icon */}
          <div className="circle-icon top-[-43px] left-[100px] md:top-28 md:left-72">
            <Image
              src="/rocket_icon.svg"
              alt="Rocket Icon"
              width={18}
              height={18}
              className="md:w-[23px] md:h-[23px]"
            />
          </div>
          
          {/* Bracket icon */}
          <div className="circle-icon top-[120px] -left-[1.5rem] md:top-64 md:left-0">
            <Image
              src="/bracket_icon.svg"
              alt="Bracket Icon"
              width={18}
              height={18}
              className="md:w-[23px] md:h-[23px]"
            />
          </div>
          
          {/* Github icon */}
          <div className="circle-icon top-[200px] left-[245px] md:top-[500px] md:left-[27rem]">
            <Image
              src="/github_icon.svg"
              alt="Github Icon"
              width={18}
              height={18}
              className="md:w-[23px] md:h-[23px]"
            />
          </div>
        </div>
      </div>

      {/* Desktop dark mode highlight */}
      <img
        src="/top_highlight.svg"
        alt="Top dark mode background highlight"
        width={809}
        height={877}
        className="absolute top-[-515px] hidden dark:md:block left-1/2 -translate-x-1/2"
      />
      
      {/* Mobile dark mode highlight */}
      <img
        src="/top_highlight_mobile.svg"
        alt="Top dark mode background highlight for mobile"
        width={429}
        height={465}
        className="absolute top-[-180px] dark:block md:dark:hidden left-1/2 -translate-x-1/2"
      />

      {/* Light mode backgrounds */}
      <div className="absolute top-0 w-full h-[600px] md:h-[795px] bg-repeat-x bg-[url('/top_bg_mobile_light.svg')] md:bg-[url('/top_bg_light.svg')] bg-[auto_auto] dark:hidden" />
      
      {/* Dark mode backgrounds */}
      <div className="absolute top-0 w-full h-[600px] md:h-[795px] bg-repeat-x bg-[url('/top_bg_mobile_dark.svg')] md:bg-[url('/top_bg_dark.svg')] bg-[auto_auto] hidden dark:block" />
    </>
  );
};

export default TopBackground;