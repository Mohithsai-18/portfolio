"use client";

import React from "react";
import { motion } from "framer-motion";
import GlowButton from "../ui/GlowButton";
import AnimatedReveal from "../ui/AnimatedReveal";

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-screen w-full relative flex flex-col justify-center items-center px-6 py-16 text-center overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center relative mt-8 md:mt-12">
        
        {/* Soft green radial background spotlight centered behind the signature name */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-[#B7FF2A]/10 rounded-full blur-[80px] pointer-events-none -z-10" />

        {/* Top Label - simple uppercase text matching reference */}
        <AnimatedReveal direction="down" delay={0.1}>
          <span className="font-display text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-[#8A8A8A] uppercase mb-4 block">
            ELECTRONICS & COMMUNICATION ENGINEERING STUDENT
          </span>
        </AnimatedReveal>

        {/* Massive Main Heading */}
        <div className="mb-6 select-none relative">
          <AnimatedReveal direction="up" delay={0.2} duration={0.8}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[0.95]">
              <span className="block bg-gradient-to-b from-[#F5F5F5] via-[#F5F5F5] to-[#A8A8A8] bg-clip-text text-transparent uppercase">
                NADIPI
              </span>
              <span className="block mt-2 text-[#B7FF2A] font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[0.95] normal-case py-2">
                Mohith Sai
              </span>
            </h1>
          </AnimatedReveal>
        </div>

        {/* Description */}
        <AnimatedReveal direction="up" delay={0.35} duration={0.8} className="max-w-xl">
          <p className="text-[#8A8A8A] text-xs md:text-[13px] leading-relaxed mb-8 md:mb-10 font-sans">
            I work across hardware and software with equal depth, combining embedded system knowledge with full-stack development and data analytics to build complete end-to-end solutions.
          </p>
        </AnimatedReveal>

        {/* CTA Buttons */}
        <AnimatedReveal direction="up" delay={0.45} className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
          <GlowButton href="#projects" variant="primary" className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-1.5 font-bold">
            <span>View My Work</span>
            <span className="text-[14px]">→</span>
          </GlowButton>
          <GlowButton href="#contact" variant="secondary" className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2">
            <span>Get In Touch</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#B7FF2A]" />
          </GlowButton>
        </AnimatedReveal>
      </div>

      {/* Scroll Indicator - matches mouse and layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          aboutSection?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div className="w-4 h-7 rounded-full border border-white/10 flex justify-center p-1 relative">
          <motion.div 
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.0 h-1.0 rounded-full bg-[#B7FF2A]"
          />
        </div>
        <span className="font-display text-[7.5px] tracking-[0.25em] uppercase text-[#8A8A8A] mt-1">
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  );
}
