import React from "react";
import experiences from "../../../data/experience.json";
import SectionContainer from "../sections/sectionContainer";
import SectionHeader from "../sections/sectionHeader";
import Experience from "./experience";
import Image from "next/image";

const Experiences = () => {
  return (
    <SectionContainer id="experience">
      <div className="section-contents mb-[66px] md:mb-[43px] md:mx-[64px]" role="region" aria-labelledby="experience-heading">
        <div id="experience-heading" className="sr-only">My Work Experience</div>
        <SectionHeader
          plainText="💼 My prior"
          highlightText="Work Experience"
        />

        <div className="w-full px-6 md:px-[52px] flex flex-col gap-5" role="list" aria-label="Work experience">
          {experiences.map((experience, id) => (
            <div key={id} role="listitem">
              <Experience
                id={id}
                image={experience.image}
                company={experience.company}
                role={experience.role}
                description={experience.description}
                dates={experience.dates}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="circle-icon h-14 w-14 top-[77px] right-1.5 md:top-[153px] md:right-[90px] -z-10">
        <Image src="/bracket_icon.svg" alt="Bracket icon" width={23} height={23}  />
      </div>
      <div className="circle-icon h-14 w-14 left-1.5 bottom-0 md:left-[90px] -z-10">
        <Image src="/electricity_icon.svg" alt="Electricity icon" width={23} height={23}  />
      </div>
    </SectionContainer>
  );
};

export default Experiences;
