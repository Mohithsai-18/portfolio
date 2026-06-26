"use client";

import React, { useRef } from "react";
import { motion, useInView, UseInViewOptions } from "framer-motion";

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

export default function AnimatedReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 30,
  once = true,
}: AnimatedRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });

  const getDirectionOffsets = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { y: 0, x: distance };
      case "right":
        return { y: 0, x: -distance };
      case "none":
      default:
        return { y: 0, x: 0 };
    }
  };

  const offsets = getDirectionOffsets();

  const variants = {
    hidden: {
      opacity: 0,
      ...offsets,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as any, // easeOutExpo
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
