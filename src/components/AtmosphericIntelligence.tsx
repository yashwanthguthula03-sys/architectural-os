"use client";

import React from 'react';
import { ColorIntelligence } from '@/types/color-intelligence';

export default function AtmosphericIntelligence({ color }: { color: ColorIntelligence }) {
  const r = parseInt(color.hex.slice(1, 3), 16);
  const g = parseInt(color.hex.slice(3, 5), 16);
  const b = parseInt(color.hex.slice(5, 7), 16);

  // Dynamic Architectural Synthesis based on color attributes
  const generateArchitecturalNote = () => {
    if (color.lrv > 70) return `${color.name} acts as a profound spatial expander. By reflecting a high volume of ambient daylight, it dissolves harsh corner shadows and pushes walls visually outward, making it an essential specification for compact or north-facing layouts requiring illumination balance without risking overexposure.`;
    if (color.lrv < 40) return `${color.name} functions as an atmospheric grounding agent. Its low reflectance intentionally absorbs excess daylight to create a sense of deep architectural enclosure. Best utilized in transitional spaces, bedrooms, or areas where intimate, cinematic contrast is prioritized over raw spatial volume.`;
    return `${color.name} provides a masterful middle-ground in environmental rendering. Its balanced reflectance holds shadows beautifully without appearing stark, allowing natural light to sweep across the material rather than aggressively bouncing off it. Ideal for primary living corridors.`;
  };

  return (
    <div className="flex flex-col h-full text-gray-900">
      
      <section className="mb-8">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Architectural Profile</h3>
        <p className="text-[13px] leading-relaxed text-gray-700 font-medium">
          {generateArchitecturalNote()}
        </p>
      </section>

      <hr className="border-gray-200 mb-8" />

      <section className="mb-8">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Technical Specifications</h3>
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">HEX Code</p>
            <p className="text-[13px] font-mono font-medium">{color.hex.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">RGB (sRGB)</p>
            <p className="text-[13px] font-mono font-medium">{r}, {g}, {b}</p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Light Reflectance</p>
            <p className="text-[13px] font-semibold">{color.lrv}<span className="text-gray-400 font-normal text-[11px] ml-1">LRV</span></p>
          </div>
          <div>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Undertone Bias</p>
            <p className="text-[13px] font-medium capitalize">{color.temperature}</p>
          </div>
        </div>
      </section>

      <hr className="border-gray-200 mb-8" />

      <section className="mb-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-5">Spatial Intelligence</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Thermal Spectrum</span>
            <span className="text-[11px] text-gray-900 font-medium capitalize">{color.temperature}</span>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-gray-200 to-orange-200 rounded-full relative">
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gray-900 rounded-full shadow-sm transition-all duration-1000"
              style={{ left: color.temperature === 'cool' ? '20%' : color.temperature === 'warm' ? '80%' : '50%' }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Volume Expansion</span>
            <span className="text-[11px] text-gray-900 font-medium">{color.lrv} <span className="text-gray-400 font-normal">LRV</span></span>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gray-800 transition-all duration-1000"
              style={{ width: `${color.lrv}%` }}
            />
          </div>
        </div>
      </section>

    </div>
  );
}