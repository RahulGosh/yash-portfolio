import { useCallback, useState } from "react";
import Background from "@/components/chrome/Background";
import CustomCursor from "@/components/chrome/CustomCursor";
import Navbar from "@/components/chrome/Navbar";
import PointerTracker from "@/components/chrome/PointerTracker";
import Preloader from "@/components/chrome/Preloader";
import ScrollProgress from "@/components/chrome/ScrollProgress";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";

export default function App() {
  const [ready, setReady] = useState(false);
  const onPreloaderDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={onPreloaderDone} />
      <SmoothScroll />
      <PointerTracker />
      <ScrollProgress />
      <CustomCursor />
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero ready={ready} />
        <Skills />
        <Projects />
        <Testimonials />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
