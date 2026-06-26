"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(183, 255, 42, 0.08)"
  enableTilt?: boolean;
  variant?: "default" | "bubble";
  enableHoverScale?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  layoutId?: string;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.02)",
  enableTilt = false,
  variant = "bubble",
  enableHoverScale = true,
  onClick,
  layoutId,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Relative mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateXVal = ((y - centerY) / centerY) * -3;
      const rotateYVal = ((x - centerX) / centerX) * 3;
      
      setRotateX(rotateXVal);
      setRotateY(rotateYVal);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const springTransition = { 
    type: "spring" as const, 
    stiffness: 120, 
    damping: 18, 
    mass: 0.8 
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      layoutId={layoutId}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        scale: enableHoverScale && isHovered ? 1.08 : 1.0,
        zIndex: enableHoverScale && isHovered ? 20 : 10,
      }}
      transition={springTransition}
      className={`${variant === "bubble" ? "bubble-glass" : "glass-panel glass-panel-hover rounded-xl"} relative overflow-hidden flex flex-col p-6 w-full cursor-pointer select-none ${className}`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {/* Background Radial Glow Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
        }}
      />
      
      {/* Inner reflection shine lines */}
      <div className={`absolute inset-0 pointer-events-none border border-white/5 ${variant === "bubble" ? "rounded-[40px]" : "rounded-xl"}`} />
      
      {/* Card Content container */}
      <div style={{ transform: "translateZ(15px)" }} className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
