"use client";

import React from "react";
import { Code, Brain, Database, Cpu, Server, Terminal } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedReveal from "../ui/AnimatedReveal";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      icon: <Code className="w-4 h-4 text-[#B7FF2A]" />,
      skills: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
    },
    {
      title: "AI / ML",
      icon: <Brain className="w-4 h-4 text-[#B7FF2A]" />,
      skills: ["Machine Learning", "Deep Learning", "OpenCV", "TensorFlow", "Scikit-learn", "NLP"],
    },
    {
      title: "Full Stack",
      icon: <Database className="w-4 h-4 text-[#B7FF2A]" />,
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    },
    {
      title: "Embedded Systems",
      icon: <Cpu className="w-4 h-4 text-[#B7FF2A]" />,
      skills: ["Arduino", "ESP32", "Raspberry Pi", "STM32", "Embedded C", "IoT"],
    },
    {
      title: "DevOps / Cloud",
      icon: <Server className="w-4 h-4 text-[#B7FF2A]" />,
      skills: ["AWS", "Docker", "Kubernetes", "Firebase", "Git & GitHub", "CI/CD"],
    },
    {
      title: "Tools",
      icon: <Terminal className="w-4 h-4 text-[#B7FF2A]" />,
      skills: ["VS Code", "Postman", "Figma", "Linux", "Android Studio", "Power BI"],
    },
  ];

  return (
    <section id="skills" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative">
      
      {/* Section Header */}
      <div className="mb-8 text-center">
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
          SKILLS
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] uppercase tracking-tight font-display">
          My Technical Expertise
        </h2>
      </div>

      {/* 6-Column Grid Layout (Desktop-first template spec) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {skillCategories.map((category, catIdx) => (
          <AnimatedReveal 
            key={catIdx} 
            direction="up" 
            delay={catIdx * 0.04}
            className="flex w-full"
          >
            <GlassCard 
              enableTilt={false}
              glowColor="rgba(255, 255, 255, 0.02)"
              className="flex flex-col h-full p-5"
            >
              {/* Category Header */}
              <div className="flex flex-col items-center text-center mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-center mb-2 shrink-0">
                  {category.icon}
                </div>
                <h3 className="font-display text-[10.5px] font-bold tracking-wider uppercase text-[#F5F5F5] leading-tight">
                  {category.title}
                </h3>
              </div>

              {/* Horizontal Separator Line */}
              <div className="h-[1px] w-full bg-white/5 mb-3" />

              {/* Skills Vertical List with Small Bullet Dots */}
              <ul className="flex flex-col gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <li 
                    key={skillIdx} 
                    className="flex items-start gap-1.5 text-[10px] text-[#8A8A8A] font-sans tracking-wide hover:text-[#F5F5F5] transition-colors duration-200"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#B7FF2A] shrink-0 mt-1.5" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
