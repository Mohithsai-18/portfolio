"use client";

import dynamic from "next/dynamic";

// Dynamically import ThreeScene with SSR disabled to prevent hydration issues
const DynamicThreeScene = dynamic(
  () => import("./DuneScene"),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505] flex items-center justify-center">
        {/* Cinematic subtle progress indicator */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-[2px] bg-[#1A1A1A] overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-[#B7FF2A] animate-[drift_1.5s_infinite_linear]" />
          </div>
          <span className="text-[10px] tracking-[0.2em] text-[#EAEAEA]/40 uppercase font-display">
            Initializing AI Ecosystem
          </span>
        </div>
      </div>
    )
  }
);

export default function SceneCanvas() {
  return <DynamicThreeScene />;
}
