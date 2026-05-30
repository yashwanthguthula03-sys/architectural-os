"use client";
import { useMemo } from 'react';
import { useEnvironment } from '@/context/EnvironmentContext';

// --- INTERNAL PHYSICS DATABASE ---
const PAINT_PHYSICS = {
  'Nordic Fog (High LRV)': { hex: '#E5E7E6', lrv: 78, tone: 'neutral' },
  'Warm Terracotta (Mid LRV)': { hex: '#C48A71', lrv: 32, tone: 'warm' },
  'Evergreen Shadow (Low LRV)': { hex: '#2A3431', lrv: 14, tone: 'cool' },
};

export default function AtmosphereSimulator() {
  const { exposure, flooring, paint, finish, advisories } = useEnvironment();

  // 1. Base Pigment & Adaptive Typography Logic
  // @ts-ignore
  const activePaint = PAINT_PHYSICS[paint] || PAINT_PHYSICS['Nordic Fog (High LRV)'];
  const isLowLRV = activePaint.lrv < 45;
  const textColor = isLowLRV ? 'text-white/90' : 'text-[#1C1D1C]/90';
  const subTextColor = isLowLRV ? 'text-white/50' : 'text-[#1C1D1C]/50';

  // 2. Exposure Layer (Slow, sweeping drift)
  const exposureLayer = useMemo(() => {
    if (exposure === 'North-Facing') return 'bg-gradient-to-br from-blue-400/10 to-transparent mix-blend-multiply';
    if (exposure === 'South-Facing') return 'bg-gradient-to-br from-amber-500/10 to-transparent mix-blend-overlay';
    return 'bg-transparent';
  }, [exposure]);

  // 3. Floor Bounce Layer (Medium settle)
  const floorBounceLayer = useMemo(() => {
    if (flooring === 'Dark Walnut') return 'bg-gradient-to-t from-[#2A2015]/40 via-[#2A2015]/5 to-transparent mix-blend-multiply';
    if (flooring === 'Warm Oak') return 'bg-gradient-to-t from-[#C29562]/20 via-[#C29562]/5 to-transparent mix-blend-overlay';
    if (flooring === 'Polished Concrete') return 'bg-gradient-to-t from-[#9CA3AF]/15 via-[#9CA3AF]/5 to-transparent mix-blend-luminosity';
    return 'bg-transparent';
  }, [flooring]);

  // 4. Surface Finish Layer (Fast, immediate response)
  const finishLayer = useMemo(() => {
    if (finish === 'Eggshell') return 'bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-100';
    if (finish === 'Ultra Matte') return 'bg-transparent opacity-0';
    if (finish === 'Limewash') return 'bg-[url("https://www.transparenttextures.com/patterns/dust.png")] opacity-20 mix-blend-overlay'; // Subtle CSS noise simulation
    return 'bg-transparent';
  }, [finish]);

  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-[2rem] overflow-hidden border border-black/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.02)]">
      
      {/* LAYER 1: BASE PIGMENT */}
      {/* Behaves like structural paint drying - 1200ms */}
      <div 
        className="absolute inset-0 transition-colors duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ backgroundColor: activePaint.hex }}
      />

      {/* LAYER 2: FLOOR BOUNCE */}
      {/* Behaves like settling light - 1500ms */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${floorBounceLayer}`} 
      />

      {/* LAYER 3: EXPOSURE LIGHTING */}
      {/* Behaves like the sun drifting - 2500ms */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${exposureLayer}`} 
      />

      {/* LAYER 4: SURFACE FINISH SHEEN */}
      {/* Behaves like shifting your viewing angle - 400ms */}
      <div 
        className={`absolute inset-0 transition-all duration-[400ms] ease-out ${finishLayer}`} 
      />

      {/* LAYER 5: VOLUMETRIC EDGE FALLOFF (The Secret to Depth) */}
      {/* Compresses the corners to simulate architectural density */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.15)_120%)] pointer-events-none" />

      {/* LAYER 6: ADAPTIVE TYPOGRAPHY & INTELLIGENCE INJECTION */}
      <div className={`relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between transition-colors duration-[800ms] ${textColor}`}>
        
        {/* Paint Identity */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70 mb-2">
            Active Atmosphere
          </h2>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight">
            {paint.split(' (')[0]}
          </h1>
          <div className="mt-4 flex gap-4">
            <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${isLowLRV ? 'border-white/20 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              LRV {activePaint.lrv}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${isLowLRV ? 'border-white/20 bg-white/5' : 'border-black/10 bg-black/5'}`}>
              {activePaint.tone} Base
            </span>
          </div>
        </div>

        {/* Environmental Causality Output */}
        <div className="max-w-md">
          {advisories.length > 0 ? (
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <span className={`block text-[8px] font-bold uppercase tracking-[0.2em] mb-3 ${subTextColor}`}>
                System Advisory
              </span>
              <p className="text-sm leading-[1.8] font-medium tracking-tight">
                {advisories[0]}
              </p>
            </div>
          ) : (
            <p className={`text-sm leading-[1.8] font-medium tracking-tight ${subTextColor}`}>
              The current environmental variables are operating in standard architectural harmony.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}