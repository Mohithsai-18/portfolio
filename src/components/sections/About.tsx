"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import AnimatedReveal from "../ui/AnimatedReveal";
import GlowButton from "../ui/GlowButton";
import GlassCard from "../ui/GlassCard";

export default function About() {
  const stats = [
    { value: "15+", label: "Projects Completed" },
    { value: "2", label: "Internships" },
    { value: "10+", label: "Technologies" },
    { value: "5+", label: "Certifications" },
  ];

  return (
    <section id="about" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative">
      
      {/* Section Header */}
      <div className="mb-8">
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
          ABOUT ME
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#F5F5F5] uppercase tracking-tight font-display leading-[1.15] max-w-2xl">
          Engineering Intelligent Solutions for a Better Tomorrow
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Biography text and stats */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-[#8A8A8A] font-sans text-xs md:text-sm leading-relaxed">
          <AnimatedReveal direction="left" delay={0.1}>
            <p>
              Pre-final year ECE student at SRM Institute of Science and Technology passionate about building impactful solutions across both hardware and software.
            </p>
          </AnimatedReveal>

          <AnimatedReveal direction="left" delay={0.2}>
            <p>
              Skilled in AI/ML, embedded systems, IoT, full-stack development, and electronics design, with experience creating intelligent systems that combine real-world hardware integration with modern software engineering.
            </p>
          </AnimatedReveal>

          {/* Quick Metrics Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mb-6">
            {stats.map((stat, idx) => (
              <AnimatedReveal key={idx} direction="up" delay={0.05 * idx + 0.25}>
                <GlassCard 
                  enableTilt={false} 
                  glowColor="rgba(255, 255, 255, 0.02)" 
                  className="p-4 flex flex-col items-center justify-center text-center h-full min-h-[90px]"
                >
                  <span className="text-2xl md:text-3xl font-display font-black text-[#B7FF2A] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[9px] md:text-[10px] tracking-wider uppercase text-[#8A8A8A] mt-1 font-display leading-tight">
                    {stat.label}
                  </span>
                </GlassCard>
              </AnimatedReveal>
            ))}
          </div>

          {/* Download Resume button */}
          <AnimatedReveal direction="left" delay={0.4} className="mt-1">
            <GlowButton href="#" variant="primary" className="px-5 py-2.5 flex items-center gap-1.5 self-start">
              Download Resume
              <ArrowDown className="w-3.5 h-3.5 text-[#050505]" />
            </GlowButton>
          </AnimatedReveal>
        </div>

        {/* Right Side: Portrait Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full relative">
          <AnimatedReveal direction="right" delay={0.3} className="w-full max-w-[320px]">
            {/* Glowing Ring background layer - very soft */}
            <div className="absolute inset-0 -m-1 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(183,255,42,0.04),transparent_60%)] blur-lg pointer-events-none" />
            
            <GlassCard 
              enableTilt={true} 
              glowColor="rgba(255, 255, 255, 0.02)" 
              className="p-3"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-black/40 border border-white/5">
                <img 
                  src="/portfolio/about_profile.png" 
                  alt="Mohith Sai Portrait" 
                  className="w-full h-full object-cover object-center transition-all duration-500 ease-out transform hover:scale-[1.02]"
                />
                
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                
                {/* Neon Signature in the bottom right corner */}
                <div className="absolute bottom-5 right-5 select-none transform rotate-[-6deg] font-signature text-2xl md:text-3xl text-[#B7FF2A] tracking-wider font-bold opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Mohith Sai
                </div>
              </div>
            </GlassCard>
          </AnimatedReveal>
        </div>

      </div>
    </section>
  );
}
