import React from "react";
import Hero from "./hero/hero";
import Skills from "./skills/skills";
import Projects from "./projects/projects";
import Testimonials from "./testimonials/testimonials";
import Experiences from "./experiences/experiences";
import Contact from "./contact";

type Props = {};

const Sections = (props: Props) => {
  return (
    <main className="flex flex-col gap-16 md:gap-[142px] w-full md:max-w-screen-lg pt-32 md:pt-[12rem] px-4 md:px-0 mx-auto">
      <Hero />
      <Skills />
      <Projects />
      <Testimonials />
      <Experiences />
      <Contact />
    </main>
  );
};

export default Sections;