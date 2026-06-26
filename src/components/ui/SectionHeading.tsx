"use client";

import React from "react";
import AnimatedReveal from "./AnimatedReveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isLeft = align === "left";

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${isLeft ? "items-start text-left" : "items-center text-center"} ${className}`}>
      <AnimatedReveal direction={isLeft ? "left" : "up"} delay={0.1} distance={20}>
        {/* Micro Label */}
        <span className="font-display text-[10px] md:text-xs tracking-[0.3em] text-[#B7FF2A] font-bold uppercase mb-3 block glow-text-green">
          // {label}
        </span>
      </AnimatedReveal>

      <AnimatedReveal direction={isLeft ? "left" : "up"} delay={0.2} distance={30}>
        {/* Massive Headline */}
        <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#EAEAEA] uppercase">
          {title}
        </h2>
      </AnimatedReveal>

      <AnimatedReveal direction="none" delay={0.4} duration={1.2}>
        {/* Glowing Decorative Line Accent */}
        <div className={`h-[2px] w-12 bg-gradient-to-r from-[#B7FF2A] to-transparent mt-4 ${isLeft ? "" : "mx-auto"}`} />
      </AnimatedReveal>
    </div>
  );
}
