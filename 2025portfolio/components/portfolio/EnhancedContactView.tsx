"use client";

import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { BackButton } from "./BackButton";
import { HolographicSection } from "./HolographicSection";
import { contactInfo } from "@/data/contact";

const iconMap = {
  Mail,
  Linkedin,
  Github,
};

interface EnhancedContactViewProps {
  onBack: () => void;
}

export const EnhancedContactView = ({ onBack }: EnhancedContactViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<HTMLDivElement>(null);

  // Removed entrance animation to prevent chips from disappearing

  return (
    <div ref={containerRef} className="w-full max-w-3xl">
      <Card
        className="relative bg-slate-800/95 backdrop-blur-xl border-2 border-cyan-400/60 shadow-2xl"
        style={{
          boxShadow:
            "0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(34, 211, 238, 0.2)",
        }}
      >
        <div className="absolute top-6 left-6 z-30">
          <BackButton onClick={onBack} />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center pt-4">
            Let&apos;s Connect
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div ref={contactItemsRef} className="grid gap-6 md:grid-cols-2">
            {contactInfo.map((contact, index) => {
              const Icon = iconMap[contact.icon as keyof typeof iconMap];
              return (
                <HolographicSection
                  key={index}
                  variant={
                    index % 3 === 0
                      ? "primary"
                      : index % 3 === 1
                      ? "secondary"
                      : "accent"
                  }
                  delay={index * 0.2}
                >
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item group block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="contact-icon p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 font-mono uppercase tracking-wide">
                          {contact.title}
                        </h3>
                        <p className="text-sm text-cyan-300">
                          {contact.subtitle}
                        </p>
                      </div>
                      <Send className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </a>
                </HolographicSection>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-6 font-mono text-sm">
              <span className="text-cyan-400">&gt;</span> I&apos;m always
              interested in hearing about new projects and opportunities.
            </p>
            <button
              className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg overflow-hidden font-bold uppercase tracking-wider text-white border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              onClick={() => window.open(contactInfo[0].href, "_blank")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <Send className="w-4 h-4" />
                Get In Touch
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
