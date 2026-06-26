"use client";

import React, { useState } from "react";
import { Cloud, LineChart, Code2, BrainCircuit } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedReveal from "../ui/AnimatedReveal";
import GlowButton from "../ui/GlowButton";

export default function Certifications() {
  const [showAllCerts, setShowAllCerts] = useState(false);

  const featuredCerts = [
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2024",
      icon: <Cloud className="w-4 h-4 text-[#8A8A8A]" />,
    },
    {
      title: "Google Data Analytics",
      issuer: "Google",
      year: "2024",
      icon: <LineChart className="w-4 h-4 text-[#8A8A8A]" />,
    },
    {
      title: "TensorFlow Developer",
      issuer: "DeepLearning.AI",
      year: "2023",
      icon: <Code2 className="w-4 h-4 text-[#8A8A8A]" />,
    },
    {
      title: "Deep Learning Specialization",
      issuer: "DeepLearning.AI",
      year: "2023",
      icon: <BrainCircuit className="w-4 h-4 text-[#8A8A8A]" />,
    },
  ];

  const additionalCerts = [
    {
      title: "C Programming Certification",
      issuer: "Professional Academy",
      desc: "Data structures, pointer arithmetic, and algorithmic execution in C.",
    },
    {
      title: "Introduction to Python",
      issuer: "Software Foundations",
      desc: "Core paradigms covering functions, scripting, and data parsing structures.",
    },
    {
      title: "Verilog HDL Certification",
      issuer: "Silicon Design Lab",
      desc: "Hardware description language modeling, digital design and synthesis validation.",
    },
    {
      title: "VLSI Design Fundamentals",
      issuer: "Microelectronics Center",
      desc: "Transistor logic, circuit layout mapping and timing verification metrics.",
    },
    {
      title: "Java Programming Certification",
      issuer: "Enterprise Software Institute",
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
                <span className="text-[#B7FF2A] font-bold">CGPA: 9.5 / 10.0</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredCerts.map((cert, idx) => (
              <AnimatedReveal 
                key={idx} 
                direction="right" 
                delay={idx * 0.03}
                className="flex w-full"
              >
                <GlassCard 
                  enableTilt={false} 
                  glowColor="rgba(255, 255, 255, 0.02)"
                  className="p-5 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-center">
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-[11px] font-bold text-[#F5F5F5] uppercase tracking-wider leading-tight">
                        {cert.title}
                      </h4>
                      <span className="text-[9.5px] text-[#8A8A8A] font-sans block mt-0.5">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-[8.5px] tracking-widest font-display text-[#8A8A8A] uppercase border-t border-white/5 pt-2.5">
                    <span>Credential Secure</span>
                    <span className="text-[#B7FF2A] font-bold">{cert.year}</span>
                  </div>
                </GlassCard>
              </AnimatedReveal>
            ))}
          </div>

          {/* View All Certifications Button */}
          <div className="flex justify-start mt-2">
            <GlowButton 
              onClick={() => setShowAllCerts(!showAllCerts)}
              variant="secondary"
              className="px-5 py-2.5 flex items-center gap-1.5"
            >
              {showAllCerts ? "Collapse Certifications" : "View All Certifications"}
            </GlowButton>
          </div>

          {/* Expandable Certifications Vault Drawer */}
          {showAllCerts && (
            <AnimatedReveal direction="up" delay={0.1} className="w-full mt-3">
              <div className="grid grid-cols-1 gap-3 p-4 border border-white/5 bg-white/[0.01] rounded-xl">
                {additionalCerts.map((cert, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 border-b border-white/5 last:border-b-0"
                  >
                    <div>
                      <h5 className="font-display text-[12px] font-bold text-[#F5F5F5] uppercase tracking-wider">
                        {cert.title}
                      </h5>
                      <span className="text-[10px] text-[#8A8A8A] font-sans mt-0.5 block">
                        {cert.issuer} — {cert.desc}
                      </span>
                    </div>
                    <span className="text-[8.5px] tracking-widest text-[#B7FF2A] font-display font-semibold uppercase shrink-0">
                      VERIFIED SYSTEM
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedReveal>
          )}
        </div>

      </div>
    </section>
  );
}
