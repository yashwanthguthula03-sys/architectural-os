"use client";
import { useState, useMemo } from 'react';

// --- DATA LAYER ---
const ROOM_CONTEXTS = [
  { id: 'living', name: 'Living Room', reqPEI: 3, reqSlip: 'Low', theme: 'warm' },
  { id: 'bathroom', name: 'Bathroom', reqPEI: 2, reqSlip: 'High', theme: 'cool' },
  { id: 'kitchen', name: 'Kitchen', reqPEI: 4, reqSlip: 'Medium', theme: 'neutral' },
  { id: 'hallway', name: 'High-Traffic Corridor', reqPEI: 5, reqSlip: 'Medium', theme: 'neutral' }
];

const PRIORITIES = [
  { id: 'warmth', name: 'Warmth & Calmness', theme: 'warm' },
  { id: 'durability', name: 'Ultimate Durability', theme: 'cool' },
  { id: 'luxury', name: 'Luxury Aesthetic', theme: 'neutral' },
  { id: 'maintenance', name: 'Low Maintenance', theme: 'neutral' }
];

const TILE_DATABASE = [
  {
    id: 'travertine',
    name: 'Honed Travertine',
    // Simulating porous, mineral, soft, matte
    surfaceCSS: 'bg-gradient-to-br from-[#E3DFD6] to-[#C9C4B8] shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] border border-black/5',
    physical: { pei: 3, porosity: 'High (Needs Sealing)', slip: 'Medium' },
    outcome: 'Creates softened circulation acoustics while preserving warm reflected daylight within residential gathering spaces.',
    scores: { warmth: 9, durability: 6, luxury: 8, maintenance: 4 },
  },
  {
    id: 'matte-porcelain',
    name: 'Matte Porcelain Slab',
    // Simulating denser, smoother, colder
    surfaceCSS: 'bg-gradient-to-tr from-[#E8EAE9] to-[#FDFDFD] shadow-[inset_0_-2px_15px_rgba(0,0,0,0.02)] border border-[#E0E2E1]',
    physical: { pei: 5, porosity: 'Ultra-Low', slip: 'High' },
    outcome: 'Balances commercial-grade durability with softened thermal perception and extremely low visual fatigue.',
    scores: { warmth: 6, durability: 10, luxury: 7, maintenance: 10 },
  },
  {
    id: 'polished-ceramic',
    name: 'Polished Ceramic',
    // Simulating sharp reflection, glass-like
    surfaceCSS: 'bg-gradient-to-br from-[#FFFFFF] via-[#F4F4F4] to-[#EAEAEA] shadow-[inset_0_2px_4px_rgba(255,255,255,1)] border border-black/10',
    physical: { pei: 3, porosity: 'Low', slip: 'Very Low' },
    outcome: 'Maximizes directional light bounce to visually expand structural boundaries, though introduces sharp acoustic reverberation.',
    scores: { warmth: 3, durability: 5, luxury: 6, maintenance: 8 },
  },
  {
    id: 'slate',
    name: 'Natural Slate',
    // Simulating grounded, heavy, layered
    surfaceCSS: 'bg-gradient-to-br from-[#5A5D61] to-[#3A3D41] shadow-[inset_0_5px_15px_rgba(0,0,0,0.3)] border-t border-white/10',
    physical: { pei: 4, porosity: 'Medium', slip: 'Very High' },
    outcome: 'Compresses ambient light to create a deeply grounded, tactile atmosphere, lowering perceived ceiling height for intimacy.',
    scores: { warmth: 5, durability: 8, luxury: 7, maintenance: 6 },
  }
];

export default function TileIntelligenceEngine() {
  const [activeContext, setActiveContext] = useState(ROOM_CONTEXTS[0]);
  const [activePriority, setActivePriority] = useState(PRIORITIES[0]);

  // --- ATMOSPHERIC ENGINE ---
  // Calculates the subconscious background shift (Layer 1)
  const atmosphere = useMemo(() => {
    const isWarm = activeContext.theme === 'warm' || activePriority.theme === 'warm';
    const isCool = activeContext.theme === 'cool' || activePriority.theme === 'cool';
    
    if (isWarm && !isCool) return 'bg-[#FBF9F6] text-[#2A2825]'; // Creamy diffusion
    if (isCool && !isWarm) return 'bg-[#F2F5F7] text-[#1A2024]'; // Clinical coolness
    return 'bg-[#F7F7F6] text-[#1C1D1C]'; // Neutral baseline
  }, [activeContext, activePriority]);

  // Scoring Engine
  const sortedTiles = [...TILE_DATABASE].sort((a, b) => {
    const aFailsSlip = activeContext.reqSlip === 'High' && (a.physical.slip.includes('Low'));
    const bFailsSlip = activeContext.reqSlip === 'High' && (b.physical.slip.includes('Low'));
    if (aFailsSlip && !bFailsSlip) return 1;
    if (!aFailsSlip && bFailsSlip) return -1;
    // @ts-ignore
    return b.scores[activePriority.id] - a.scores[activePriority.id];
  });

  return (
    <div className={`min-h-[100dvh] lg:min-h-[800px] transition-colors duration-[1800ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${atmosphere}`}>
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-12 font-sans">
        
        {/* HEADER CONTROLS (Layer 2) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16 mb-12 lg:mb-20">
          
          {/* Spatial Context */}
          <div className="flex-1">
            <label className="block text-[9px] font-bold uppercase tracking-[0.25em] opacity-40 mb-5 px-1">
              1. Spatial Context
            </label>
            <div className="flex flex-wrap gap-3">
              {ROOM_CONTEXTS.map(ctx => (
                <button 
                  key={ctx.id} onClick={() => setActiveContext(ctx)}
                  className={`px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    activeContext.id === ctx.id 
                    ? 'bg-black/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] scale-100' 
                    : 'bg-transparent text-current opacity-50 hover:opacity-80 scale-[0.98]'
                  }`}
                >
                  {ctx.name}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Priority */}
          <div className="flex-1">
            <label className="block text-[9px] font-bold uppercase tracking-[0.25em] opacity-40 mb-5 px-1">
              2. Primary Priority
            </label>
            <div className="flex flex-wrap gap-3">
              {PRIORITIES.map(pri => (
                <button 
                  key={pri.id} onClick={() => setActivePriority(pri)}
                  className={`px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    activePriority.id === pri.id 
                    ? 'bg-black/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] scale-100' 
                    : 'bg-transparent text-current opacity-50 hover:opacity-80 scale-[0.98]'
                  }`}
                >
                  {pri.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ANALYSIS GRID (Layer 3 & 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
          {sortedTiles.map((tile, index) => {
            const isBest = index === 0;
            const failsSlip = activeContext.reqSlip === 'High' && tile.physical.slip.includes('Low');
            const failsPEI = tile.physical.pei < activeContext.reqPEI;
            const hasWarning = failsSlip || failsPEI;

            return (
              <div 
                key={tile.id} 
                className={`relative rounded-[2rem] p-8 lg:p-10 transition-all duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
                  isBest 
                  // The "Breathing" Card
                  ? 'bg-white/80 backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.06)] border border-white/40 scale-[1.01]' 
                  // Standard Cards (Recessed)
                  : 'bg-white/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-transparent scale-100 opacity-70 hover:opacity-100 hover:bg-white/60'
                }`}
              >
                
                {/* Surface Identity */}
                <div className="flex items-start gap-6 mb-8">
                  {/* The Simulated Material Surface */}
                  <div className={`w-14 h-14 rounded-full flex-shrink-0 transition-transform duration-[1500ms] ${tile.surfaceCSS} ${isBest ? 'scale-110' : 'scale-100'}`} />
                  
                  <div>
                    {isBest && (
                      <span className="block text-[8px] font-bold uppercase tracking-[0.3em] opacity-40 mb-1.5">
                        System Recommendation
                      </span>
                    )}
                    <h3 className="text-xl lg:text-2xl font-light tracking-tight opacity-90 leading-tight">{tile.name}</h3>
                  </div>
                </div>

                {/* The Emotional/Architectural Outcome (The Moat) */}
                <div className={`mb-10 transition-all duration-[1200ms] ${isBest ? 'opacity-100' : 'opacity-60'}`}>
                  <p className="text-[13px] leading-[1.8] opacity-80">
                    {tile.outcome}
                  </p>
                  {hasWarning && (
                    <p className="text-[9px] font-bold uppercase tracking-widest text-red-600/80 mt-4">
                      Environmental Conflict: Incompatible with spatial context.
                    </p>
                  )}
                </div>

                {/* Technical Reality (Layer 4) */}
                <div className="space-y-4 pt-8 border-t border-black/[0.04]">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Wear Resistance</span>
                    <span className={`text-[10px] font-bold tracking-widest ${failsPEI ? 'text-red-600/80' : 'opacity-80'}`}>Class {tile.physical.pei}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Porosity Profile</span>
                    <span className="text-[10px] font-bold tracking-widest opacity-80">{tile.physical.porosity}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Friction Yield</span>
                    <span className={`text-[10px] font-bold tracking-widest ${failsSlip ? 'text-red-600/80' : 'opacity-80'}`}>{tile.physical.slip}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}