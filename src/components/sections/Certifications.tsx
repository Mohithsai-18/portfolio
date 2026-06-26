"use client";

import React from "react";
import { Code2, Cpu } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedReveal from "../ui/AnimatedReveal";

export default function Certifications() {
  const certifications = [
    {
      title: "C Programming Certification",
      issuer: "Professional Academy",
      year: "2024",
      icon: <Code2 className="w-4 h-4 text-[#8A8A8A]" />,
      desc: "Data structures, pointer arithmetic, and algorithmic execution in C.",
    },
    {
      title: "Introduction to Python",
      issuer: "Software Foundations",
      year: "2024",
      icon: <Code2 className="w-4 h-4 text-[#8A8A8A]" />,
      desc: "Core paradigms covering functions, scripting, and data parsing structures.",
    },
    {
      title: "Verilog HDL Certification",
      issuer: "Silicon Design Lab",
      year: "2023",
      icon: <Cpu className="w-4 h-4 text-[#8A8A8A]" />,
      desc: "Hardware description language modeling, digital design and synthesis validation.",
    },
    {
      title: "VLSI Design Fundamentals",
      issuer: "Microelectronics Center",
      year: "2023",
      icon: <Cpu className="w-4 h-4 text-[#8A8A8A]" />,
      desc: "Transistor logic, circuit layout mapping and timing verification metrics.",
    },
    {
      title: "Java Programming Certification",
      issuer: "Enterprise Software Institute",
      year: "2023",
      icon: <Code2 className="w-4 h-4 text-[#8A8A8A]" />,
      desc: "Object-oriented system engineering and complex thread processing models.",
    },
  ];

  return (
    <section id="certifications" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: EDUCATION */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
              EDUCATION
            </span>
            <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight font-display mb-4">
              Academic Journey
            </h3>
          </div>

          <AnimatedReveal direction="left" delay={0.1} className="flex flex-col gap-4 w-full">
            {/* SRM */}
            <GlassCard glowColor="rgba(255, 255, 255, 0.02)" className="p-5">
              <span className="text-[8.5px] tracking-widest text-[#B7FF2A] font-display uppercase font-bold block mb-1">
                SRM Institute of Science and Technology
              </span>
              <h4 className="font-display text-[13px] font-bold text-[#F5F5F5] uppercase tracking-wider mb-1.5">
                B.Tech — Electronics & Communication Engineering
              </h4>
              <div className="flex items-center justify-between text-[11px] text-[#8A8A8A] font-sans tracking-wide mt-1.5">
                <span>2023 – Present</span>
                <span className="text-[#B7FF2A] font-bold">CGPA: 9.2 / 10.0</span>
              </div>
            </GlassCard>

            {/* Sri Chaitanya */}
            <GlassCard glowColor="rgba(255, 255, 255, 0.02)" className="p-5">
              <span className="text-[8.5px] tracking-widest text-[#B7FF2A] font-display uppercase font-bold block mb-1">
                Sai Sri Chaitanya Junior College
              </span>
              <h4 className="font-display text-[13px] font-bold text-[#F5F5F5] uppercase tracking-wider mb-1.5">
                PCM — Physics, Chemistry, Mathematics
              </h4>
              <div className="flex items-center justify-between text-[11px] text-[#8A8A8A] font-sans tracking-wide mt-1.5">
                <span>2021 – 2023</span>
                <span className="text-[#B7FF2A] font-bold">Score: 94.9%</span>
              </div>
            </GlassCard>
          </AnimatedReveal>
        </div>

        {/* Right Column: CERTIFICATIONS */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
              CERTIFICATIONS
            </span>
            <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight font-display mb-4">
              Professional Certifications
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {certifications.map((cert, idx) => (
              <AnimatedReveal 
                key={idx} 
                direction="right" 
                delay={idx * 0.05}
                className="flex w-full"
              >
                <GlassCard 
                  enableTilt={false} 
                  glowColor="rgba(255, 255, 255, 0.02)"
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-center shrink-0">
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-[12px] font-bold text-[#F5F5F5] uppercase tracking-wider leading-tight">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] text-[#8A8A8A] font-sans block mt-1">
                        {cert.issuer} — {cert.desc}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center text-[8.5px] tracking-widest font-display text-[#8A8A8A] uppercase border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0 shrink-0">
                    <span className="text-[#B7FF2A] font-bold">{cert.year}</span>
                  </div>
                </GlassCard>
              </AnimatedReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
