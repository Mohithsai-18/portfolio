"use client";

import React, { useState, useEffect } from "react";
import { Mail, FileText } from "lucide-react";

export default function SocialSidebar() {
  const [activeIdx, setActiveIdx] = useState(0);

  const socials = [
    {
      name: "GitHub",
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      href: "https://github.com/",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      href: "https://linkedin.com/",
    },
    {
      name: "Email",
      icon: <Mail className="w-3.5 h-3.5" />,
      href: "mailto:mohithsainadipi@gmail.com",
    },
    {
      name: "Resume",
      icon: <FileText className="w-3.5 h-3.5" />,
      href: "#",
    },
  ];

  const sections = ["home", "about", "skills", "projects", "experience", "achievements", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveIdx(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* LEFT SIDEBAR (Socials + Vertical Line + Top Green Dot) */}
      <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4">
        {/* Top Glowing Dot representing alignment focus */}
        <div className="h-1.5 w-1.5 rounded-full bg-[#B7FF2A] shadow-[0_0_8px_#B7FF2A]" />
        
        {/* Top vertical connector line */}
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#B7FF2A]/50 to-white/10" />

        {/* Social Icons Stack */}
        <div className="flex flex-col gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              title={social.name}
              className="text-[#8A8A8A] hover:text-[#B7FF2A] transition-colors duration-200 p-1 flex items-center justify-center"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom vertical line running to bottom margin */}
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* RIGHT SIDEBAR (Vertical Dot Scroll Indicators) */}
      <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center justify-center">
        {/* Track Line */}
        <div className="relative flex flex-col items-center gap-4.5 py-4">
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/5" />
          
          {sections.map((sectName, idx) => {
            const isActive = activeIdx === idx;
            return (
              <a
                key={sectName}
                href={`#${sectName}`}
                className="relative z-10 flex items-center justify-center w-4 h-4 cursor-pointer group"
                title={`Navigate to ${sectName}`}
              >
                {isActive ? (
                  // Active indicator ring + dot matching reference
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-2.5 h-2.5 rounded-full border border-[#B7FF2A]/80 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF2A] border border-[#B7FF2A]/50" />
                  </div>
                ) : (
                  // Inactive dot matching reference
                  <span className="w-1 h-1 rounded-full bg-[#8A8A8A]/40 group-hover:bg-[#8A8A8A] transition-colors duration-200" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
