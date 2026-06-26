"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

// Components imports
import SceneCanvas from "../components/three/SceneCanvas";
import Navbar from "../components/sections/Navbar";
import SocialSidebar from "../components/sections/SocialSidebar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Certifications from "../components/sections/Certifications";
import Achievements from "../components/sections/Achievements";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

export default function Home() {
  // Initialize Lenis smooth scrolling client-side
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutQuart
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-transparent">
      
      {/* Volumetric immersive 3D Flowing Sand Dunes background */}
      <SceneCanvas />

      {/* Floating vertical sidebar containing social links */}
      <SocialSidebar />

      {/* Primary header navbar */}
      <Navbar />

      {/* Full Page Section Composers */}
      <div className="flex flex-col relative w-full z-10">
        
        {/* Hero Landing */}
        <Hero />

        {/* Section 1: Who Am I details */}
        <About />

        {/* Section 2: holographic Skill categories */}
        <Skills />

        {/* Section 3: Completed & Ongoing Project Showcases */}
        <Projects />

        {/* Section 4: professional Experience timeline */}
        <Experience />

        {/* Section 5: Verification Certifications Vault */}
        <Certifications />

        {/* Section 6: Milestones, Academic journeys & Language specs */}
        <Achievements />

        {/* Section 7: Communication Hub Form & cards */}
        <Contact />

        {/* Infinite sci-fi quotes & signature blocks */}
        <Footer />
        
      </div>
    </main>
  );
}
