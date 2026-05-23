"use client";

import React from 'react';

// --- STRICT TYPESCRIPT INTERFACES ---
// This acts as the blueprint. It guarantees Vercel knows exactly what 'color' contains.
export interface ColorInfo {
  id: string;
  name: string;
  hex: string; // <-- This is what Vercel was looking for
  lrv: number;
  undertone: string;
  profile: string;
  physics: {
    ambientReact: string;
    directionalSheer: string;
    floorBounce: string;
  };
}

interface AtmosphericIntelligenceProps {
  color: ColorInfo;
  ambientName: string;
  floorName: string;
  floorAcoustic: string;
}

// --- COMPONENT ---
export default function AtmosphericIntelligence({ 
  color, 
  ambientName, 
  floorName, 
  floorAcoustic 
}: AtmosphericIntelligenceProps) {
  
  // Safe RGB parsing for dynamic UI accents
  // (We use fallback values to ensure it never crashes the render)
  const r = parseInt(color.hex.slice(1, 3), 16) || 0;
  const g = parseInt(color.hex.slice(3, 5), 16) || 0;
  const b = parseInt(color.hex.slice(5, 7), 16) || 0;

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative overflow-hidden shadow-inner">
      
      {/* Dynamic Atmospheric Glow based on the active color's RGB values */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-[1500ms] ease-in-out"
        style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
      />

      {/* Header */}
      <h3 className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 relative z-10">
        <span className="w-1.5 h-1.5 bg-gray-300 rounded-sm" /> Undertone Physics
      </h3>
      
      {/* Dynamic Intelligence Readout */}
      <p className="text-sm leading-relaxed text-gray-700 min-h-[60px] transition-opacity duration-1000 relative z-10">
        {color.profile} The <strong>{color.undertone.toLowerCase()}</strong> undertones exhibit a <strong>{color.physics.ambientReact.toLowerCase()} reaction</strong> to {ambientName.toLowerCase()}, creating a {color.physics.floorBounce.toLowerCase()} environmental grounding effect against the {floorName.toLowerCase()} base with {floorAcoustic.toLowerCase()} acoustics.
      </p>

    </div>
  );
}