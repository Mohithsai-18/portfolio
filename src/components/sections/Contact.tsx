"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import AnimatedReveal from "../ui/AnimatedReveal";
import GlowButton from "../ui/GlowButton";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const contactOptions = [
    {
      name: "Email",
      value: "mohithsainadipi@gmail.com",
      icon: <Mail className="w-4 h-4 text-[#8A8A8A]" />,
      href: "mailto:mohithsainadipi@gmail.com",
    },
    {
      name: "Phone",
      value: "+91 9553119756",
      icon: <Phone className="w-4 h-4 text-[#8A8A8A]" />,
      href: "tel:+919553119756",
    },
    {
      name: "Location",
      value: "Andhra Pradesh, India",
      icon: <MapPin className="w-4 h-4 text-[#8A8A8A]" />,
      href: "#",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 1850);
  };

  return (
    <section id="contact" className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Coordinates */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#B7FF2A] uppercase font-display block mb-2">
              CONTACT
            </span>
            <h3 className="text-2xl font-black text-[#F5F5F5] uppercase tracking-tight font-display mb-4">
              Let's Build Something Amazing
            </h3>
          </div>

          <AnimatedReveal direction="left" delay={0.1}>
            <p className="text-[#8A8A8A] text-xs md:text-sm leading-relaxed mb-6 font-sans">
              I'm always open to discussing new opportunities, collaborating on exciting projects, or just having a chat about technology.
            </p>
          </AnimatedReveal>

          <div className="flex flex-col gap-3">
            {contactOptions.map((opt, idx) => (
              <AnimatedReveal 
                key={idx} 
                direction="left" 
                delay={idx * 0.03 + 0.1}
                className="w-full"
              >
                <a 
                  href={opt.href} 
                  className="block w-full"
                >
                  <GlassCard 
                    enableTilt={false} 
                    glowColor="rgba(255, 255, 255, 0.02)"
                    className="flex flex-row items-center gap-3 p-5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.01] border border-white/5 flex items-center justify-center">
                      {opt.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8.5px] tracking-widest text-[#B7FF2A] font-display uppercase font-bold">
                        {opt.name}
                      </span>
                      <span className="text-[11px] text-[#8A8A8A] font-sans mt-0.5">
                        {opt.value}
                      </span>
                    </div>
                  </GlassCard>
                </a>
              </AnimatedReveal>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <AnimatedReveal direction="right" delay={0.15} className="w-full h-full">
            <GlassCard glowColor="rgba(255, 255, 255, 0.02)" className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your Name"
                    className="bg-black/70 border border-white/12 rounded-md px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#8A8A8A]/40 focus:outline-none focus:border-white/20 transition-all duration-300 font-sans"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Your Email"
                    className="bg-black/70 border border-white/12 rounded-md px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#8A8A8A]/40 focus:outline-none focus:border-white/20 transition-all duration-300 font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Subject"
                    className="bg-black/70 border border-white/12 rounded-md px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#8A8A8A]/40 focus:outline-none focus:border-white/20 transition-all duration-300 font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Your Message"
                    className="bg-black/70 border border-white/12 rounded-md px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#8A8A8A]/40 focus:outline-none focus:border-white/20 transition-all duration-300 font-sans resize-none"
                  />
                </div>

                <div className="mt-1">
                  <GlowButton 
                    variant={isSent ? "secondary" : "primary"}
                    className="w-full py-3 text-center group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-1.5 justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-[#050505]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </span>
                    ) : isSent ? (
                      <span className="text-[#B7FF2A]">Message Dispatched!</span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </GlowButton>
                </div>

              </form>
            </GlassCard>
          </AnimatedReveal>
        </div>

      </div>
    </section>
  );
}
