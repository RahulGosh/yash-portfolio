import React from "react";
import SectionContainer from "../sections/sectionContainer";
import SectionHeader from "../sections/sectionHeader";
import testimonials from "../../../data/testimonials.json";
import Testimonial from "./testimonial";

const Testimonials = () => {
  return (
    <SectionContainer id="testimonials">
      <div className="section-contents">
        <SectionHeader
          plainText="📢 Check out these"
          highlightText="Testimonials"
        />
        <div className="w-full overflow-x-clip pb-4">
          <div className="w-max flex items-stretch gap-4 md:gap-6 overflow-x-clip px-4 md:px-8 animate-scroll hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, id) => (
              <Testimonial
                key={id}
                image={testimonial.image}
                name={testimonial.name}
                role={testimonial.role}
                description={testimonial.description}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Testimonials;