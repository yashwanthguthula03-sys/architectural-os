"use client";
import { useState, useMemo } from 'react';

// --- 1. ARCHITECTURAL DATA LAYER ---
const PAINTS = [
  { id: 'pure-white', name: 'Pure White', hex: '#EDECE6', undertone: 'Microscopic warm', desc: 'Maximizes light reflection for an airy flow.' },
  { id: 'evergreen-fog', name: 'Evergreen Fog', hex: '#95978A', undertone: 'Sage/Gray', desc: 'A chameleon hue that adapts to lighting.' },
  { id: 'billiard-green', name: 'Billiard Green', hex: '#3B4E44', undertone: 'Dense emerald', desc: 'Blurs corners for compressive, cozy depth.' },
  { id: 'powder-pink', name: 'Powder Pink', hex: '#E8D3D6', undertone: 'Soft blush', desc: 'A grounding, romantic atmospheric anchor.' },
  { id: 'light-french-gray', name: 'Light French Gray', hex: '#C2C0B8', undertone: 'Neutral greige', desc: 'Perfectly balanced architectural neutrality.' }
];

const FINISHES = [
  { id: 'matte', name: 'Ultra Matte', sheen: 'opacity-0', reflection: 'Diffused light, hides wall imperfections.' },
  { id: 'eggshell', name: 'Eggshell', sheen: 'opacity-40 mix-blend-screen', reflection: 'Soft velvet bounce, highly washable.' },
  { id: 'satin', name: 'Satin', sheen: 'opacity-70 mix-blend-screen', reflection: 'Active light reflection, draws attention.' }
];

const LIGHTING_CONDITIONS = [
  { id: 'morning', name: 'Morning (Cool)', overlay: 'bg-blue-100/20 mix-blend-overlay', shadow: 'from-blue-900/30' },
  { id: 'noon', name: 'High Noon (Direct)', overlay: 'bg-white/20 mix-blend-soft-light', shadow: 'from-black/10' },
  { id: 'evening', name: 'Evening (Warm)', overlay: 'bg-orange-300/20 mix-blend-color-burn', shadow: 'from-orange-900/40' },
  { id: 'artificial', name: 'Artificial (2700K)', overlay: 'bg-amber-400/15 mix-blend-color-dodge', shadow: 'from-black/60' }
];

export default function PaintPlanner() {
  const [activePaint, setActivePaint] = useState(PAINTS[0]);
  const [activeFinish, setActiveFinish] = useState(FINISHES[0]);
  const [activeLight, setActiveLight] = useState(LIGHTING_CONDITIONS[0]);

  // Generate perceptual insight dynamically
  const perceptualInsight = useMemo(() => {
    return `${activePaint.name} in a ${activeFinish.name.toLowerCase()} finish under ${activeLight.name.split(' ')[0].toLowerCase()} light creates a ${activePaint.undertone.toLowerCase()} presence. ${activeFinish.reflection}`;
  }, [activePaint, activeFinish, activeLight]);

  return (
    <div className="bg-[#F7F7F6] text-[#1C1D1C] min-h-[100dvh] lg:min-h-[800px] p-4 sm:p-6 lg:p-10 lg:rounded-[2rem] border-x-0 border-y lg:border border-[#EBECEB] font-sans">
      
      {/* MOBILE HEADER */}
      <header className="mb-6 lg:mb-10 px-1">
        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Surface Simulator
        </div>
        <h1 className="text-2xl lg:text-4xl font-light tracking-tight text-gray-900">Paint Planner</h1>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10">
        
        {/* LEFT/TOP: THE LOCKED ATMOSPHERIC CANVAS */}
        <div className="lg:col-span-7 relative w-full h-[380px] lg:h-[600px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/5 bg-white">
          
          {/* Base Paint Layer */}
          <div 
            className="absolute inset-0 transition-colors duration-[1500ms] ease-in-out"
            style={{ backgroundColor: activePaint.hex }}
          />

          {/* Environmental Light Overlay */}
          <div className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${activeLight.overlay}`} />

          {/* Wall Corner / Shadow Depth Engine */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${activeLight.shadow} via-transparent to-transparent opacity-60 transition-all duration-[1500ms] ease-in-out`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.15)_0%,_transparent_60%)] transition-opacity duration-1000" />

          {/* Finish Sheen (Specular Highlight) */}
          <div className={`absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/4 translate-x-1/4 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.25)_0%,_transparent_50%)] transition-all duration-[1000ms] ${activeFinish.sheen}`} />

          {/* Canvas UI: Material Tag */}
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 z-10 transition-all duration-1000">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1 text-black/40 mix-blend-color-burn">
              {activeFinish.name} / {activePaint.undertone}
            </p>
            <h2 className="text-3xl lg:text-5xl font-light tracking-tight text-gray-900 drop-shadow-sm mix-blend-color-burn">
              {activePaint.name}
            </h2>
          </div>
        </div>

        {/* RIGHT/BOTTOM: TACTILE INSTRUMENT CONTROLS */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-gray-200 shadow-sm">
          
          <div className="space-y-8">
            
            {/* 1. Architectural Palette (Horizontal Thumb Cards) */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 px-1">
                1. Architectural Palette
              </label>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                {PAINTS.map(paint => (
                  <button
                    key={paint.id}
                    onClick={() => setActivePaint(paint)}
                    className={`flex-none snap-center w-[110px] p-2 rounded-2xl border transition-all ${
                      activePaint.id === paint.id ? 'border-gray-900 bg-gray-50 shadow-md scale-105' : 'border-gray-200 bg-white opacity-80'
                    }`}
                  >
                    <div 
                      className="w-full h-14 rounded-xl mb-3 shadow-inner border border-black/5" 
                      style={{ backgroundColor: paint.hex }} 
                    />
                    <p className="text-[10px] font-bold text-left truncate text-gray-900 px-1">{paint.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Light & Time Simulator */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 px-1">
                2. Environmental Lighting
              </label>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                {LIGHTING_CONDITIONS.map(light => (
                  <button
                    key={light.id}
                    onClick={() => setActiveLight(light)}
                    className={`flex-none snap-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all ${
                      activeLight.id === light.id ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                    {light.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Finish Strip */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 px-1">
                3. Surface Finish
              </label>
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
                {FINISHES.map(finish => (
                  <button
                    key={finish.id}
                    onClick={() => setActiveFinish(finish)}
                    className={`flex-none snap-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all ${
                      activeFinish.id === finish.id ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'
                    }`}
                  >
                    {finish.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Perceptual Insight Output */}
          <div className="border-t border-gray-100 pt-5 mt-6">
            <h4 className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-sm" /> Perceptual Reality
            </h4>
            <p className="text-[11px] lg:text-xs text-gray-600 leading-relaxed min-h-[40px]">
              {perceptualInsight}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}