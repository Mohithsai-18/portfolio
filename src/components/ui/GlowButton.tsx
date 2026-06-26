"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  target?: string;
  rel?: string;
}

export default function GlowButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  target,
  rel,
}: GlowButtonProps) {
  // Thinner padding, compact font layout
  const baseStyles = "relative inline-flex items-center justify-center font-display text-[10px] tracking-[0.18em] uppercase font-bold px-5 py-2.5 rounded-md overflow-hidden transition-all duration-300 cursor-pointer";
  
  const variants = {
    primary: "bg-[#B7FF2A] text-[#050505] border border-[#B7FF2A] hover:bg-[#B7FF2A]/95 shadow-[0_0_8px_rgba(183,255,42,0.1)] hover:shadow-[0_0_12px_rgba(183,255,42,0.2)]",
    secondary: "bg-white/[0.02] text-[#F5F5F5] border border-white/5 hover:border-[#B7FF2A]/30 hover:bg-white/[0.04]",
  };

  const buttonContent = (
    <>
      {/* Background radial accent glow on hover for secondary buttons */}
      {variant === "secondary" && (
        <span className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(183,255,42,0.03),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`${baseStyles} ${variants[variant]} group ${className}`}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} group ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {buttonContent}
    </motion.button>
  );
}
