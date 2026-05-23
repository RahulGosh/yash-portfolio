import React from 'react'
import SectionContainer from '../sections/sectionContainer'
import SectionHeader from '../sections/sectionHeader'
import skills from "../../../data/skills.json"
import Skill from './skill'
import Image from 'next/image'

type Props = {}

const Skills = (props: Props) => {
  return (
    <SectionContainer id="skills">
        <div className='section-contents mx-[22px] md:mx-[116px]' role="region" aria-labelledby="skills-heading">
            <div id="skills-heading" className="sr-only">My Technical Skills and Expertise</div>
            <SectionHeader plainText="This is my" highlightText='Tech Stack' />
            <div className='card w-full px-[33px] py-[27px] grid grid-cols-3 sm:grid-cols-4 md:flex flex-wrap justify-center items-center gap-4 md:gap-[33px]' role="list" aria-label="Technical skills">
                {skills.map((skill, id) => (
                    <div key={id} role="listitem">
                        <Skill name={skill.name} icon={skill.icon}  />
                    </div>
                ))}
            </div>
        </div>

        <>
        <Image src="/tech_stack_grid_dark.svg" alt="Bavkground grid decoration" width={569} height={373} className='hidden dark:md:block -z-10 absolute -left-[135px] -top-[39px]' />
        <Image src="/tech_stack_grid.svg" alt="Bavkground grid light decoration" width={569} height={373} className='hidden dark:hidden md:block -z-10 absolute -left-[125px] -top-[39px]' />
      </>
    </SectionContainer>
  )
}

export default Skills