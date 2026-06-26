"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GlowButton from "../ui/GlowButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => {
        const el = document.getElementById(item.href.replace("#", ""));
        if (!el) return { name: item.name, top: 0, height: 0 };
        const rect = el.getBoundingClientRect();
        return {
          name: item.name,
          top: rect.top + window.scrollY,
          height: rect.height
        };
      });

      const currentScroll = window.scrollY + 120;
      const currentSection = sections.find(sec => {
        return currentScroll >= sec.top && currentScroll < sec.top + sec.height;
      });

      if (currentSection) {
        setActiveItem(currentSection.name);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 px-6 md:px-12 ${
          isScrolled 
            ? "bg-[#050505]/75 backdrop-blur-md border-b border-white/5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo MS */}
          <a href="#home" className="flex items-center gap-1.5 group">
            <span className="font-display font-black text-lg tracking-[0.1em] text-[#B7FF2A]">
              MS
            </span>
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-5 md:gap-6">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveItem(item.name)}
                  className={`relative font-display text-[9.5px] tracking-[0.18em] uppercase font-bold transition-colors duration-300 py-1 ${
                    isActive ? "text-[#B7FF2A]" : "text-[#8A8A8A] hover:text-[#F5F5F5]"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeDot"
                      className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B7FF2A] shadow-[0_0_6px_#B7FF2A]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Let's Connect CTA */}
          <div className="hidden lg:flex items-center">
            <GlowButton href="#contact" variant="secondary" className="px-4 py-2 border-white/5 hover:border-[#B7FF2A]/20">
              Let's Connect
              <span className="h-1.5 w-1.5 rounded-full bg-[#B7FF2A] shadow-[0_0_5px_#B7FF2A]" />
            </GlowButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#B7FF2A] transition-colors duration-300 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[50px] z-40 bg-[#050505]/95 backdrop-blur-2xl lg:hidden flex flex-col p-6 border-t border-white/5"
          >
            <div className="flex flex-col gap-5 items-center justify-center my-auto">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.name);
                    setMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="font-display text-xs tracking-[0.2em] uppercase font-bold text-[#F5F5F5] hover:text-[#B7FF2A]"
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.03 }}
                className="w-full max-w-[180px] mt-4"
              >
                <GlowButton
                  href="#contact"
                  variant="primary"
                  className="w-full text-center py-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let's Connect
                </GlowButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
