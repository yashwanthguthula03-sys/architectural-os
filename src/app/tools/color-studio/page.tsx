"use client";
import { useState, useMemo, useEffect } from 'react';

// --- PHYSICS & SPECTRAL DATABASE ---
// Hex codes refined to ensure their distinct chromatic identity survives the rendering stack.
const PAINT_DATABASE = [
  { id: 'nordic', name: 'Nordic Fog', hex: '#EBECEB', lrv: 78, tone: 'Neutral', 
    desc: 'A high-reflectance mineral finish that minimizes visual enclosure. Amplifies diffuse ambient light to optically expand footprints.',
    intelligence: 'Diffuse neutral undertones maintain spatial openness while actively reducing visual fatigue.'
  },
  { id: 'pearl', name: 'Blue Pearl', hex: '#C2C9CC', lrv: 56, tone: 'Cool', 
    desc: 'A thermally adaptive mid-tone. It balances directional light distribution with subtle intrinsic warmth to stabilize unpredictable environmental lighting conditions.',
    intelligence: 'Cool mineral undertones temper high solar exposure, absorbing excess warmth while preserving diffuse spatial calm.'
  },
  { id: 'clay', name: 'Clay Horizon', hex: '#C28369', lrv: 32, tone: 'Warm', 
    desc: 'A deeply grounding earth tone that absorbs ambient scatter. Lowers perceived ceiling heights to establish highly intimate, cocooning atmospheric zones.',
    intelligence: 'Heavy thermal warmth compresses ambient light scatter, creating intense atmospheric intimacy and grounding the architectural footprint.'
  },
  { id: 'obsidian', name: 'Obsidian', hex: '#262928', lrv: 12, tone: 'Absorptive', 
    desc: 'Maximum light compression. Erases structural boundaries through total shadow immersion, ideal for artificially illuminated environments.',
    intelligence: 'Total light absorption erases structural boundaries, demanding controlled architectural illumination.'
  }
];

export default function ColorStudio() {
  const [activePaint, setActivePaint] = useState(PAINT_DATABASE[1]); // Defaulting to Blue Pearl for testing
  const [activeFinish, setActiveFinish] = useState('EGGSHELL');
  const [activeFloor, setActiveFloor] = useState('WALNUT');
  const [activeExposure, setActiveExposure] = useState('NORTH');
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [sdiDrift, setSdiDrift] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSdiDrift((Math.random() * 0.8 - 0.4)), 3000);
    return () => clearInterval(interval);
  }, []);

  const baseSDI = activePaint.lrv + (activeFinish === 'EGGSHELL' ? 5 : 0) - (activeFloor === 'WALNUT' ? 12 : 0);
  const currentSDI = (baseSDI + sdiDrift).toFixed(1);

  // --- LOCAL LUMINANCE ADAPTIVE TYPOGRAPHY ---
  const isLowLuminance = activePaint.lrv < 50;
  const textColor = isLowLuminance ? 'text-[#FDFDFD] drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]' : 'text-[#2B2B2B] drop-shadow-[0_1px_12px_rgba(255,255,255,0.8)]';

  // --- 1. SPECTRAL GEOMETRY (Atmosphere THROUGH Pigment) ---
  // Using color-burn instead of multiply. This darkens the wall by intensifying the base pigment's color, preserving the blue/warm undertones instead of turning them grey.
  const structuralGeometry = `
    bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05)_0%,_transparent_45%),
        linear-gradient(to_bottom,_rgba(0,0,0,0.25)_0%,_transparent_20%),
        linear-gradient(100deg,_transparent_72%,_rgba(0,0,0,0.03)_72.1%,_rgba(0,0,0,0.35)_100%),
        linear-gradient(to_top,_rgba(0,0,0,0.4)_0%,_transparent_15%)]
    mix-blend-color-burn opacity-70
  `;

  // --- 2. EMOTIONAL FOCAL GRAVITY (Directional Daylight) ---
  // Using overlay allows the light to interact with the pigment's saturation.
  const daylightAnchor = useMemo(() => {
    if (activeExposure === 'NORTH') {
      return 'bg-[radial-gradient(ellipse_at_0%_15%,_rgba(170,205,255,0.4)_0%,_rgba(170,205,255,0.05)_40%,_transparent_70%)] mix-blend-overlay';
    }
    return 'bg-[radial-gradient(ellipse_at_0%_15%,_rgba(255,200,140,0.45)_0%,_rgba(255,200,140,0.1)_45%,_transparent_75%)] mix-blend-overlay';
  }, [activeExposure]);

  // --- 3. MATERIAL FLOOR BOUNCE ---
  const floorBounce = useMemo(() => {
    if (activeFloor === 'WALNUT') return 'bg-[linear-gradient(to_top,_rgba(35,20,10,0.8)_0%,_rgba(35,20,10,0.15)_25%,_transparent_55%)] mix-blend-multiply';
    if (activeFloor === 'OAK') return 'bg-[linear-gradient(to_top,_rgba(190,130,70,0.5)_0%,_rgba(190,130,70,0.05)_30%,_transparent_60%)] mix-blend-overlay';
    return 'bg-[linear-gradient(to_top,_rgba(160,160,160,0.3)_0%,_transparent_45%)] mix-blend-overlay';
  }, [activeFloor]);

  // --- 4. MINERAL TACTILITY & SHEEN ---
  const finishPhysics = useMemo(() => {
    if (activeFinish === 'EGGSHELL') return 'bg-[radial-gradient(ellipse_at_35%_35%,_rgba(255,255,255,0.15)_0%,_transparent_55%)]';
    if (activeFinish === 'ULTRA MATTE') return 'bg-transparent opacity-0';
    // Limewash introduces strong textural breakup
    return 'bg-[url("https://www.transparenttextures.com/patterns/white-wall-3.png")] opacity-20 mix-blend-overlay';
  }, [activeFinish]);

  return (
    <div className="min-h-screen bg-[#F3F4F3] font-sans pb-12 lg:pb-0 relative overflow-hidden">
      
      {/* Global CSS for Ambient Breathing */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ambientBreathe {
          0% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0.85; transform: scale(1); }
        }
        .animate-ambient {
          animation: ambientBreathe 8s ease-in-out infinite;
        }
      `}} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 flex flex-col lg:flex-row gap-6 lg:gap-8 h-[calc(100vh-6rem)]">
        
        {/* ========================================================= */}
        {/* LEFT: THE SPATIAL PERCEPTION ENGINE */}
        {/* ========================================================= */}
        <div className="flex-1 relative flex flex-col justify-end overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] group rounded-[4px]">
          
          {/* Base Pigment */}
          <div className="absolute inset-0 transition-colors duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ backgroundColor: activePaint.hex }} />
          
          {/* Micro-Mineral Texture (Cures the "digital screen" flat look globally) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

          {/* Floor Bounce (Causality) */}
          <div className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${floorBounce}`} />
          
          {/* Spectral Geometry (Corner Crease & Ceiling) */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${structuralGeometry}`} />
          
          {/* Directional Daylight Bloom (Focal Gravity + Ambient Breathing) */}
          <div className={`absolute inset-0 transition-all duration-[3000ms] ease-out animate-ambient origin-top-left ${daylightAnchor}`} />
          
          {/* Finish Sheen */}
          <div className={`absolute inset-0 transition-all duration-500 ease-out ${finishPhysics}`} />

          {/* Embedded & Anchored Typography */}
          <div className={`absolute top-12 left-12 transition-all duration-[1200ms] ${textColor} z-10 mix-blend-normal`}>
            <h3 className="text-[7px] font-bold uppercase tracking-[0.6em] opacity-80 mb-3">Atmospheric Tone</h3>
            <h1 className="text-4xl font-light tracking-widest">{activePaint.name}</h1>
          </div>

          {/* ========================================================= */}
          {/* THE MODULAR ARCHITECTURAL RAIL */}
          {/* ========================================================= */}
          <div className="relative z-20 w-full bg-[#121212]/95 backdrop-blur-3xl border-t border-white/5 p-6 lg:p-8 flex flex-col gap-6 transform translate-y-0 transition-transform duration-500">
            
            {/* Rail 1: Material Layer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-6">
              <div className="flex items-center gap-6">
                <span className="text-[6px] font-bold uppercase tracking-[0.5em] text-white/20 w-12">Pigment</span>
                <div className="flex gap-5">
                  {PAINT_DATABASE.map(paint => (
                    <button 
                      key={paint.id}
                      onClick={() => setActivePaint(paint)}
                      className={`w-7 h-7 rounded-full transition-all duration-500 ${activePaint.id === paint.id ? 'scale-110 ring-1 ring-white/30 ring-offset-4 ring-offset-[#121212]' : 'scale-100 hover:scale-105 opacity-40 hover:opacity-100'}`}
                      style={{ 
                        backgroundColor: paint.hex,
                        boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.4), inset 0 -4px 6px rgba(0,0,0,0.7), 0 6px 12px rgba(0,0,0,0.9)',
                        border: '1px solid rgba(0,0,0,0.8)',
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/stucco.png")'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[6px] font-bold uppercase tracking-[0.5em] text-white/20 w-12">Finish</span>
                {['ULTRA MATTE', 'EGGSHELL', 'LIMEWASH'].map(f => (
                  <button key={f} onClick={() => setActiveFinish(f)} className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-colors ${activeFinish === f ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Rail 2: Environmental Layer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <span className="text-[6px] font-bold uppercase tracking-[0.5em] text-white/20 w-12">Floor</span>
                {['OAK', 'CONCRETE', 'WALNUT'].map(f => (
                  <button key={f} onClick={() => setActiveFloor(f)} className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-colors ${activeFloor === f ? 'text-white' : 'text-white/30 hover:text-white/60'}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[6px] font-bold uppercase tracking-[0.5em] text-white/20 w-12">Sun</span>
                {['NORTH', 'SOUTH'].map(e => (
                  <button key={e} onClick={() => setActiveExposure(e)} className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-colors ${activeExposure === e ? 'text-[#C29562]' : 'text-white/30 hover:text-white/60'}`}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT: LIVING ARCHITECTURAL ADVISORY PANEL */}
        {/* ========================================================= */}
        <div className="w-full lg:w-[380px] bg-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] border border-gray-100 p-8 lg:p-10 flex flex-col justify-between rounded-[4px]">
          
          <div>
            <div className="mb-10">
              <h4 className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
                Architectural Profile
              </h4>
              <p className="text-xs leading-[1.9] text-[#2B2B2B] tracking-tight">
                {activePaint.desc}
              </p>
            </div>

            <div className="mb-10">
              <h4 className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-5">
                Technical Specification
              </h4>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-b border-gray-100 pb-8">
                <div>
                  <span className="block text-[7px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">HEX</span>
                  <span className="text-[10px] font-mono tracking-wider text-[#2B2B2B]">{activePaint.hex}</span>
                </div>
                <div>
                  <span className="block text-[7px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">LRV</span>
                  <span className="text-[10px] font-mono tracking-wider text-[#2B2B2B]">{activePaint.lrv}</span>
                </div>
              </div>
            </div>
            
            {/* LIVING INTELLIGENCE ZONE */}
            <div className="mb-10 p-6 bg-[#F9FAFA] border border-gray-100 rounded-[2px] shadow-inner animate-in fade-in duration-1000" key={activePaint.id}>
               <span className="block text-[7px] font-bold uppercase tracking-widest text-gray-400 mb-3">System Causality</span>
               <p className="text-[10px] uppercase tracking-widest leading-[1.9] text-[#2B2B2B]">
                 {activePaint.intelligence}
               </p>
            </div>

            <div>
              <h4 className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">
                Ecosystem Metric
              </h4>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Spatial Diffusion Index</span>
                <span className="text-3xl font-light tracking-tight text-[#2B2B2B]">{currentSDI}</span>
              </div>
              <div className="h-8 relative w-full border-b border-gray-200 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-60" style={{ transform: `translateY(${sdiDrift * -10}px) rotate(${sdiDrift}deg)`, transition: 'all 3s ease-in-out' }} />
              </div>
            </div>
          </div>

          <button className="w-full py-3.5 bg-[#121212] text-white/80 hover:text-white hover:bg-black border border-black/10 text-[8px] font-medium uppercase tracking-[0.4em] rounded-[2px] transition-all shadow-md mt-6">
            Compile Specification
          </button>
        </div>
      </div>
    </div>
  );
}