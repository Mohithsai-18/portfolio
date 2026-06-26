"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import AnimatedReveal from "../ui/AnimatedReveal";

export default function Experience() {
  const experiences = [
    {
      role: "ML Intern",
      company: "Prodigy InfoTech",
      period: "2025",
      desc: "Developed machine learning models, optimized data pipelines, and conducted predictive analysis.",
      side: "left",
    },
    {
      role: "HR Broker Intern",
      company: "NoBroker",
      period: "2025 (3 Months)",
      desc: "Worked on recruitment coordination, database updates, and remote HR onboarding systems for a duration of 3 months.",
      side: "right",
    },
    {
      role: "Web Development Intern",
      company: "Brainwave",
      period: "2024",
      desc: "Developed responsive web applications, designed interactive UI components, and integrated front-end interfaces.",
      side: "left",
    },
    {
      role: "Web Development Intern",
      company: "CodSoft",
      period: "2023",
      desc: "Created modern UI/UX interfaces and dynamic web applications.",
      side: "right",
    },
  ];

  return (
    <section id="experience" className="py-16 px-6 md:px-12 max-w-6xl mx-auto w-full z-10 relative">
      
      {/* Section Header */}
      <div className="mb-8 text-center">
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
          EXPERIENCE
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] uppercase tracking-tight font-display">
          My Professional Journey
        </h2>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative mt-12 pl-6 md:pl-0">
        
        {/* Central vertical timeline track - thin and non-glowy */}
        <div className="absolute left-[20px] md:left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-[#B7FF2A]/50 via-white/5 to-transparent -translate-x-1/2" />

        <div className="flex flex-col gap-8 relative">
          {experiences.map((exp, idx) => {
            const isLeft = exp.side === "left";
            
            return (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-stretch relative ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node marker - very thin and minimal */}
                <div className="absolute left-[-26px] md:left-1/2 top-5 h-3.5 w-3.5 rounded-full bg-[#050505] border-2 border-[#B7FF2A] -translate-x-1/2 z-20 shadow-[0_0_6px_rgba(183,255,42,0.2)]" />

                {/* Spacing placeholder for grid alignment */}
                <div className="w-full md:w-1/2 hidden md:block" />

                {/* Connection horizontal line */}
                <div className={`hidden md:block absolute top-[28px] h-[1px] bg-white/5 w-8 z-0 ${
                  isLeft ? "left-[calc(50%-32px)]" : "right-[calc(50%-32px)]"
                }`} />

                {/* Glass card content container */}
                <AnimatedReveal 
                  direction={isLeft ? "left" : "right"} 
                  delay={idx * 0.03}
                  className="w-full md:w-[calc(50%-32px)] z-10"
                >
                  <GlassCard 
                    enableTilt={false} 
                    glowColor="rgba(255, 255, 255, 0.02)"
                    className="p-5 relative"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-display text-[13px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                          {exp.role}
                        </h4>
                        <span className="text-[10px] text-[#8A8A8A] font-sans block mt-0.5">
                          {exp.company}
                        </span>
                      </div>
                      
                      {/* Year Badge */}
                      <span className="text-[9px] tracking-wider font-display text-[#B7FF2A] bg-white/[0.01] border border-white/5 px-2 py-0.5 rounded font-bold shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-[#8A8A8A] leading-relaxed font-sans">
                      {exp.desc}
                    </p>
                  </GlassCard>
                </AnimatedReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
