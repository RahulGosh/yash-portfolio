"use client"

import React, { useEffect, useRef } from 'react'
import {motion, useMotionTemplate, useMotionValue} from "framer-motion"
import Reveal from '../reveal';

type Props = {
  icon: string;
  name: string;
}

const Skill = ({icon, name}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const xDistance = useMotionValue(0)
  const yDistance = useMotionValue(0)
  const mask = useMotionTemplate`radial-gradient(100px 100px at ${xDistance}px ${yDistance}px, #000, transparent)`

  const handleMouseMove = (e: MouseEvent) => {
    if(!ref.current) return 

    const clientReact = ref.current.getBoundingClientRect()

    xDistance.set(e.x - clientReact.x);
    yDistance.set(e.y - clientReact.y);
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])
  
  return (
    <Reveal duration={1.5}>
      {/* Mobile-only simple icon */}
      <div className='md:hidden flex items-center justify-center p-4'>
        <img src={icon} alt={`${name} icon`} className='w-12 h-12' />
      </div>
      
      {/* Desktop version with all effects (hidden on mobile) */}
      <div className='hidden md:relative md:flex md:gap-2 md:p-2 md:border-primary md:border md:rounded-lg md:h-[46px]'>
        <motion.div ref={ref} className='absolute inset-0 border-2 border-purple-500 darK:border-purple-300 rounded-lg' style={{maskImage: mask, WebkitMaskImage: mask}}>
        </motion.div>
        <img src={icon} alt={`${name} icon`} />
        <p className='text-lg'>{name}</p>
      </div>
    </Reveal>
  )
}

export default Skill