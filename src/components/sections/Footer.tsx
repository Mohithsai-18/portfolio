"use client";

import React from "react";
import { Mail } from "lucide-react";
import GlowButton from "../ui/GlowButton";

export default function Footer() {
  const currentYear = 2024; // Static to match template screenshot exactly

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  const resources = [
    { name: "Resume", href: "#" },
    { name: "Certifications", href: "#certifications" },
    { name: "Github", href: "https://github.com/", external: true },
    { name: "Linkedin", href: "https://linkedin.com/", external: true },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#050505] py-20 px-6 md:px-12 relative z-10 w-full overflow-hidden">
      
      {/* Laser line flare indicator at the top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B7FF2A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Brand Block */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-black text-2xl tracking-[0.1em] text-white">
                M<span className="text-[#B7FF2A]">S</span>
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#EAEAEA]/60 leading-relaxed font-sans max-w-sm">
              Building intelligent systems that make a difference.
            </p>
          </div>

          <div className="mt-8 lg:mt-16 flex flex-col gap-6">
            {/* Social Icons Dock */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#B7FF2A]/20 flex items-center justify-center text-[#EAEAEA]/60 hover:text-[#B7FF2A] transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#B7FF2A]/20 flex items-center justify-center text-[#EAEAEA]/60 hover:text-[#B7FF2A] transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a 
                href="mailto:mohithsainadipi@gmail.com" 
                className="w-8 h-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#B7FF2A]/20 flex items-center justify-center text-[#EAEAEA]/60 hover:text-[#B7FF2A] transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Copyright */}
            <span className="text-[10px] tracking-widest text-[#EAEAEA]/30 uppercase font-display">
              © {currentYear} Mohith Sai. All rights reserved.
            </span>
          </div>
        </div>

        {/* Right Side: Columns */}
        {/* Quick Links */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="font-display text-[10px] tracking-wider uppercase text-[#EAEAEA]/50 hover:text-[#B7FF2A] transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
            Resources
          </h4>
          <ul className="flex flex-col gap-2.5">
            {resources.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-display text-[10px] tracking-wider uppercase text-[#EAEAEA]/50 hover:text-[#B7FF2A] transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Let's Connect Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
            Let's Connect
          </h4>
          <p className="text-xs text-[#EAEAEA]/50 leading-relaxed font-sans mb-3">
            Available for opportunities and collaborations.
          </p>
          <GlowButton href="#contact" variant="primary" className="px-5 py-2.5 self-start text-center">
            Get In Touch
          </GlowButton>
        </div>

      </div>

    </footer>
  );
}
