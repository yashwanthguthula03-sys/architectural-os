// src/app/intelligence/page.tsx
"use client";
import { useState } from 'react';

// --- ARCHITECTURAL DATA LAYER ---
const ROOM_CONTEXTS = [
  { id: 'living', name: 'Living Room', reqPEI: 3, reqSlip: 'Low', desc: 'Moderate traffic, dry area. Focus on warmth and aesthetics.' },
  { id: 'bathroom', name: 'Bathroom', reqPEI: 2, reqSlip: 'High', desc: 'High moisture, low traffic. Focus on safety and easy cleaning.' },
  { id: 'kitchen', name: 'Kitchen', reqPEI: 4, reqSlip: 'Medium', desc: 'High traffic, spill risk. Focus on durability and maintenance.' },
  { id: 'hallway', name: 'High-Traffic Corridor', reqPEI: 5, reqSlip: 'Medium', desc: 'Maximum foot traffic. Focus on extreme wear resistance.' }
];

const PRIORITIES = [
  { id: 'warmth', name: 'Warmth & Calmness', focus: 'perceptual' },
  { id: 'durability', name: 'Ultimate Durability', focus: 'physical' },
  { id: 'luxury', name: 'Luxury Aesthetic', focus: 'perceptual' },
  { id: 'maintenance', name: 'Low Maintenance', focus: 'physical' }
];

const TILE_DATABASE = [
  {
    id: 'travertine', name: 'Honed Travertine', hex: '#D5D0C8',
    physical: { pei: 3, porosity: 'High (Needs Sealing)', slip: 'Medium' },
    perceptual: { warmth: 'High', lightBounce: 'Soft/Diffuse', noise: 'Low' },
    scores: { warmth: 9, durability: 6, luxury: 8, maintenance: 4 },
    note: "Honed travertine creates immense architectural warmth but requires periodic sealing to maintain its structural integrity."
  },
  {
    id: 'matte-porcelain', name: 'Matte Porcelain Slab', hex: '#E5E7E6',
    physical: { pei: 5, porosity: 'Ultra-Low', slip: 'High' },
    perceptual: { warmth: 'Medium', lightBounce: 'Minimal Glare', noise: 'Minimal' },
    scores: { warmth: 6, durability: 10, luxury: 7, maintenance: 10 },
    note: "Matte porcelain diffuses indirect light perfectly, reducing glare while offering commercial-grade abrasion resistance."
  },
  {
    id: 'polished-ceramic', name: 'Polished Ceramic', hex: '#FDFDFD',
    physical: { pei: 3, porosity: 'Low', slip: 'Very Low (Slippery)' },
    perceptual: { warmth: 'Low (Cold)', lightBounce: 'High Glare/Sharp', noise: 'Low' },
    scores: { warmth: 3, durability: 5, luxury: 6, maintenance: 8 },
    note: "Polished surfaces reflect directional light sharply, making spaces feel larger but significantly increasing slip hazards when wet."
  },
  {
    id: 'slate', name: 'Natural Slate', hex: '#4A4D51',
    physical: { pei: 4, porosity: 'Medium', slip: 'Very High' },
    perceptual: { warmth: 'Medium (Grounding)', lightBounce: 'Absorbs Light', noise: 'High' },
    scores: { warmth: 5, durability: 8, luxury: 7, maintenance: 6 },
    note: "Slate compresses light, pulling walls inward to create a deeply grounded, tactile atmosphere."
  }
];

export default function IntelligencePage() {
  const [activeContext, setActiveContext] = useState(ROOM_CONTEXTS[0]);
  const [activePriority, setActivePriority] = useState(PRIORITIES[0]);

  // Scoring Engine: Determine Best Fit
  const sortedTiles = [...TILE_DATABASE].sort((a, b) => {
    const aFailsSlip = activeContext.reqSlip === 'High' && (a.physical.slip.includes('Low'));
    const bFailsSlip = activeContext.reqSlip === 'High' && (b.physical.slip.includes('Low'));
    if (aFailsSlip && !bFailsSlip) return 1;
    if (!aFailsSlip && bFailsSlip) return -1;
    // @ts-ignore
    return b.scores[activePriority.id] - a.scores[activePriority.id];
  });

  return (
    <div className="max-w-[1400px] mx-auto pt-12 pb-24 px-8 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <header className="mb-16">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          Architectural Advisory
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-4 text-gray-900">Tile Intelligence Engine</h1>
        <p className="text-gray-500 leading-relaxed text-sm max-w-2xl">
          Evaluate materials based on their physical engineering and perceptual impact. Select your spatial context to generate performance recommendations.
        </p>
      </header>

      {/* CONTROL DASHBOARD */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16 bg-[#FDFDFD] p-10 rounded-[2rem] border border-gray-200 shadow-sm">
        <div className="flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">
            1. Spatial Context
          </label>
          <div className="flex flex-wrap gap-3">
            {ROOM_CONTEXTS.map(ctx => (
              <button 
                key={ctx.id} 
                onClick={() => setActiveContext(ctx)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                  activeContext.id === ctx.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-200'
                }`}
              >
                {ctx.name}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-5 leading-relaxed max-w-sm">
            {activeContext.desc}
          </p>
        </div>

        <div className="flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 pb-2">
            2. Primary Priority
          </label>
          <div className="flex flex-wrap gap-3">
            {PRIORITIES.map(pri => (
              <button 
                key={pri.id} 
                onClick={() => setActivePriority(pri)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                  activePriority.id === pri.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-200'
                }`}
              >
                {pri.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ANALYSIS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sortedTiles.map((tile, index) => {
          const isBest = index === 0;
          const failsSlip = activeContext.reqSlip === 'High' && tile.physical.slip.includes('Low');
          const failsPEI = tile.physical.pei < activeContext.reqPEI;
          const hasWarning = failsSlip || failsPEI;

          return (
            <div 
              key={tile.id} 
              className={`relative bg-[#FDFDFD] rounded-[1.5rem] p-8 transition-all duration-700 border ${
                isBest ? 'border-gray-900 shadow-xl lg:-translate-y-4' : 'border-gray-200 shadow-sm opacity-60 hover:opacity-100'
              }`}
            >
              {isBest && (
                <div className="absolute -top-3 left-8 bg-[#1C1D1C] text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  Optimal Match
                </div>
              )}

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: tile.hex }} />
                <div>
                  <h3 className="text-xl font-light tracking-tight text-gray-900">{tile.name}</h3>
                  {hasWarning && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">
                      Warning: Not suitable for {activeContext.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-10">
                {/* Physical Reality */}
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5 border-b border-gray-100 pb-2">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-sm" /> Physical Reality
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-50 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">PEI Wear Rating</span>
                      <span className={`text-xs font-bold ${failsPEI ? 'text-red-500' : 'text-gray-900'}`}>Class {tile.physical.pei}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-50 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Porosity</span>
                      <span className="text-xs font-bold text-gray-900">{tile.physical.porosity}</span>
                    </div>
                    <div className="flex justify-between items-end pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Slip Resistance</span>
                      <span className={`text-xs font-bold ${failsSlip ? 'text-red-500' : 'text-gray-900'}`}>{tile.physical.slip}</span>
                    </div>
                  </div>
                </div>

                {/* Perceptual Reality */}
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5 border-b border-gray-100 pb-2">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-sm" /> Perceptual Reality
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-50 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Thermal Warmth</span>
                      <span className="text-xs font-bold text-gray-900">{tile.perceptual.warmth}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-gray-50 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Light Bounce</span>
                      <span className="text-xs font-bold text-gray-900">{tile.perceptual.lightBounce}</span>
                    </div>
                    <div className="flex justify-between items-end pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-500">Visual Noise</span>
                      <span className="text-xs font-bold text-gray-900">{tile.perceptual.noise}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intelligence Note */}
              <div className={`mt-10 pt-6 border-t transition-all duration-700 ${isBest ? 'border-gray-200' : 'border-transparent opacity-0'}`}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Environmental Insight</p>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-inner">
                  {tile.note}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}