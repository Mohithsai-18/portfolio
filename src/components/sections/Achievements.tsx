"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Award } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedReveal from "../ui/AnimatedReveal";

export default function Achievements() {
  const milestones = [
    {
      title: "Winner — AI Zypher (Code Auction) SRMIST",
      desc: "Won 1st place in the flagship coding event AI Zypher, showcasing exceptional algorithmic strategy and resource management.",
      icon: <Trophy className="w-4 h-4 text-[#8A8A8A]" />,
    },
    {
      title: "Participant — Smart India Hackathon",
      desc: "Developed an AI powered solution for smart automation and IoT-based urban resilience ecosystems as a team participant.",
      icon: <Star className="w-4 h-4 text-[#8A8A8A]" />,
    },
    {
      title: "Winner — ECE Project Presentation",
      desc: "Awarded top honor for presenting innovative embedded engineering systems combining high-efficiency microcontrollers.",
      icon: <Award className="w-4 h-4 text-[#8A8A8A]" />,
    },
    {
      title: "Dean's List",
      desc: "Awarded for academic excellence, maintaining top tier grade points in ECE engineering curriculums.",
      icon: <Star className="w-4 h-4 text-[#8A8A8A]" />,
    },
  ];

  const languages = [
    { name: "Telugu", level: "Native", pct: 100 },
    { name: "English", level: "Professional", pct: 95 },
    { name: "Hindi", level: "Professional", pct: 85 },
    { name: "Tamil", level: "Basic", pct: 50 },
  ];

  return (
    <section id="achievements" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Milestones & Honors */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
              ACHIEVEMENTS
            </span>
            <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight font-display mb-4">
              Milestones & Honors
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {milestones.map((milestone, idx) => (
              <AnimatedReveal 
                key={idx} 
                direction="left" 
                delay={idx * 0.03}
                className="w-full"
              >
                <GlassCard 
                  enableTilt={false} 
                  glowColor="rgba(255, 255, 255, 0.02)"
                  className="flex gap-4 p-5"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-center shrink-0">
                    {milestone.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-[13px] font-bold text-[#F5F5F5] uppercase tracking-wider mb-1">
                      {milestone.title}
                    </h4>
                    <p className="text-[11px] text-[#8A8A8A] leading-relaxed font-sans">
                      {milestone.desc}
                    </p>
                  </div>
                </GlassCard>
              </AnimatedReveal>
            ))}
          </div>
        </div>

        {/* Right Column: Languages */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
              LANGUAGES
            </span>
            <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight font-display mb-4">
              Languages I Speak
            </h3>
          </div>

          <AnimatedReveal direction="right" delay={0.1} className="w-full">
            <GlassCard glowColor="rgba(255, 255, 255, 0.02)" className="p-6 flex flex-col gap-5">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center justify-between text-[11px] font-display tracking-wider mb-1.5">
                    <span className="font-bold text-[#F5F5F5] uppercase">{lang.name}</span>
                    <span className="text-[#8A8A8A]">{lang.level}</span>
                  </div>
                  
                  {/* Progress Bar - simple, non-glowing */}
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.pct}%` }}
                      transition={{ duration: 1.2, delay: 0.1 + idx * 0.05 }}
                      className="h-full bg-[#B7FF2A] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </GlassCard>
          </AnimatedReveal>
        </div>

      </div>
    </section>
  );
}
