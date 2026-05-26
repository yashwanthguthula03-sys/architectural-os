"use client";
import { useState } from 'react';

// --- THE PERCEPTUAL PHYSICS DATABASE ---
const COLOR_PROFILES = [
  { 
    id: 'nordic', name: 'Nordic Fog', hex: '#E5E7E6', lrv: 78, undertone: 'Cool Blue/Gray', 
    profile: 'A high-reflectance finish that reduces visual enclosure. Amplifies diffuse light to optically expand compact footprints.',
    physics: { ambientReact: 'High', directionalSheer: 'Sharp', floorBounce: 'Cooling' }
  },
  { 
    id: 'ash-olive', name: 'Ash Olive', hex: '#C2C5BB', lrv: 55, undertone: 'Muted Green/Earthy', 
    profile: 'Stabilizes under warm LEDs. Absorbs cool daylight to increase grounded feeling without creating visual heaviness.',
    physics: { ambientReact: 'Moderate', directionalSheer: 'Soft', floorBounce: 'Grounding' }
  },
  { 
    id: 'mushroom', name: 'Mushroom Taupe', hex: '#D0C8B8', lrv: 62, undertone: 'Warm Beige/Violet', 
    profile: 'Increases thermal warmth and softens shadows. Radically alters character depending on floor reflection.',
    physics: { ambientReact: 'High', directionalSheer: 'Diffused', floorBounce: 'Warming' }
  },
  { 
    id: 'slate', name: 'Coastal Slate', hex: '#9CA7B1', lrv: 35, undertone: 'Deep Cool', 
    profile: 'Absorbs harsh directional light. Creates a receding visual boundary that pushes walls backward in high-glare environments.',
    physics: { ambientReact: 'Low', directionalSheer: 'Absorptive', floorBounce: 'Deadening' }
  }
];

const AMBIENT_LAYERS = {
  daylight: { name: 'Cool Daylight', css: 'bg-white/10 mix-blend-overlay', lrvMod: 1.05 },
  warmLED: { name: 'Warm LED (3000K)', css: 'bg-[#FFD59E]/15 mix-blend-color-dodge', lrvMod: 0.95 },
  overcast: { name: 'Overcast', css: 'bg-slate-400/20 mix-blend-multiply', lrvMod: 0.85 }
};

const DIRECTIONAL_LAYERS = {
  none: { name: 'Flat Wash', css: 'opacity-0' },
  sunlight: { name: 'Direct Sunlight', css: 'bg-gradient-to-br from-white/40 via-transparent to-black/10 opacity-100' },
  cove: { name: 'Cove Wash', css: 'bg-gradient-to-b from-[#FFF0D4]/30 via-transparent to-transparent opacity-100' }
};

const FINISHES = {
  matte: { name: 'Ultra Matte', bloom: 'opacity-0' },
  eggshell: { name: 'Eggshell', bloom: 'opacity-100 mix-blend-screen' },
  limewash: { name: 'Limewash', bloom: 'opacity-40 mix-blend-overlay' }
};

const FLOORS = {
  concrete: { name: 'Concrete', bounce: 'rgba(74, 77, 81, 0.4)', acoustic: 'Hard/Reflective' },
  oak: { name: 'Warm Oak', bounce: 'rgba(139, 90, 43, 0.3)', acoustic: 'Soft/Absorptive' }
};

export default function StudioPage() {
  const [activeColor, setActiveColor] = useState(COLOR_PROFILES[0]);
  const [activeAmbient, setActiveAmbient] = useState<keyof typeof AMBIENT_LAYERS>('daylight');
  const [activeDirectional, setActiveDirectional] = useState<keyof typeof DIRECTIONAL_LAYERS>('sunlight');
  const [activeFinish, setActiveFinish] = useState<keyof typeof FINISHES>('matte');
  const [activeFloor, setActiveFloor] = useState<keyof typeof FLOORS>('concrete');
  
  // Progressive Disclosure State for Mobile
  const [isMetricsExpanded, setIsMetricsExpanded] = useState(false);

  // SDI Calculation
  const rawSDI = (activeColor.lrv * AMBIENT_LAYERS[activeAmbient].lrvMod);
  const spatialDiffusionIndex = Math.min(Math.max(rawSDI, 0), 100).toFixed(1);

  return (
    <div className="max-w-[1400px] mx-auto pt-6 pb-12 px-4 sm:px-6 lg:pt-12 lg:pb-24 lg:px-8 animate-in fade-in duration-700">
      
      {/* HEADER: Typographic Compression */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-6 lg:mb-12 px-1 lg:px-2 gap-2 lg:gap-6">
        <div>
          <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 lg:mb-4">
            Perceptual Simulation Engine
          </div>
          <h1 className="text-2xl lg:text-4xl font-light tracking-tight text-gray-900">Color & Lighting Studio</h1>
        </div>
      </header>

      {/* WORKSPACE GRID: Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 lg:h-[760px]">
        
        {/* LEFT: LAYERED LUMINESCENCE CANVAS (Anchored Height on Mobile) */}
        <div className="relative w-full h-[380px] lg:h-full lg:col-span-8 rounded-[1.5rem] lg:rounded-[2rem] shadow-sm lg:shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col justify-between p-6 lg:p-10 border border-black/5 bg-[#1C1D1C]">
          
          <div className="absolute inset-0 transition-colors duration-[1000ms] lg:duration-[1500ms] ease-in-out" style={{ backgroundColor: activeColor.hex }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] opacity-40 mix-blend-multiply transition-opacity duration-[1000ms]" />
          <div className={`absolute inset-0 transition-all duration-[1000ms] ${AMBIENT_LAYERS[activeAmbient].css}`} />
          <div className={`absolute inset-0 transition-all duration-[1000ms] ${DIRECTIONAL_LAYERS[activeDirectional].css}`} />
          <div className={`absolute top-0 left-1/4 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_0%,_transparent_60%)] transition-all duration-[1000ms] ${FINISHES[activeFinish].bloom}`} />
          
          {/* GPU DIET: blur-md on mobile, blur-xl on desktop */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[30%] transition-colors duration-[1000ms] mix-blend-multiply blur-md lg:blur-xl"
            style={{ backgroundImage: `linear-gradient(to top, ${FLOORS[activeFloor].bounce}, transparent)` }}
          />

          <div className="relative z-10 transition-all duration-1000">
            <p className={`text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 lg:mb-2 ${activeColor.lrv < 40 ? 'text-white/60' : 'text-black/40'}`}>
              Mineral Saturation / {activeColor.undertone.split('/')[0]}
            </p>
            {/* Typographic Compression */}
            <h2 className={`text-3xl lg:text-5xl font-light tracking-tight drop-shadow-sm ${activeColor.lrv < 40 ? 'text-white' : 'text-gray-900'}`}>
              {activeColor.name}
            </h2>
          </div>

          {/* DESKTOP ONLY: Floating Control Dock */}
          <div className="hidden lg:flex relative z-10 self-center bg-white/95 backdrop-blur-xl px-10 py-5 rounded-full shadow-2xl items-center gap-12 border border-white/50">
            <div className="flex gap-5">
              {COLOR_PROFILES.map((color) => (
                <button 
                  key={color.id} onClick={() => setActiveColor(color)}
                  className={`w-6 h-6 rounded-full shadow-inner transition-transform duration-300 ${activeColor.id === color.id ? 'ring-2 ring-gray-400 ring-offset-2 scale-110' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <div className="flex items-center gap-6 border-l border-gray-200 pl-10">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Finish</span>
              {(Object.keys(FINISHES) as Array<keyof typeof FINISHES>).map((f) => (
                <button 
                  key={f} onClick={() => setActiveFinish(f)}
                  className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeFinish === f ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {FINISHES[f].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT (BOTTOM ON MOBILE): CONTROLS & INTELLIGENCE */}
        <div className="lg:col-span-4 bg-[#FDFDFD] border border-gray-200/80 rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-10 shadow-sm flex flex-col justify-between gap-8 lg:gap-0">
          
          <div className="space-y-8 lg:space-y-10">
            
            {/* 1. LIGHTING INSTRUMENT PANEL (Larger touch targets on mobile) */}
            <div>
              <h3 className="flex items-center gap-2 lg:gap-3 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 lg:mb-6 border-b border-gray-100 pb-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-sm" /> Light Stacking
              </h3>
              
              <div className="space-y-5 lg:space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {(Object.keys(AMBIENT_LAYERS) as Array<keyof typeof AMBIENT_LAYERS>).map((a) => (
                      <button key={a} onClick={() => setActiveAmbient(a)} className={`text-xs lg:text-[10px] px-4 py-2.5 lg:px-3 lg:py-1.5 rounded-xl lg:rounded-md border transition-all ${activeAmbient === a ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>
                        {AMBIENT_LAYERS[a].name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {(Object.keys(DIRECTIONAL_LAYERS) as Array<keyof typeof DIRECTIONAL_LAYERS>).map((d) => (
                      <button key={d} onClick={() => setActiveDirectional(d)} className={`text-xs lg:text-[10px] px-4 py-2.5 lg:px-3 lg:py-1.5 rounded-xl lg:rounded-md border transition-all ${activeDirectional === d ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>
                        {DIRECTIONAL_LAYERS[d].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. MOBILE ONLY: TACTILE MATERIAL DOCK */}
            <div className="lg:hidden -mx-6 px-6 pt-2 pb-4 border-t border-gray-100">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                 <span className="w-1 h-1 bg-gray-300 rounded-full" /> Substrate & Finish
              </p>
              
              {/* Horizontal Scroll: Snap Mandatory */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {COLOR_PROFILES.map((color) => (
                  <button
                    key={color.id} onClick={() => setActiveColor(color)}
                    className={`flex-none w-[120px] snap-center p-2 rounded-2xl border transition-all ${activeColor.id === color.id ? 'border-gray-900 bg-gray-50 shadow-md' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="w-full h-12 rounded-xl mb-3 shadow-inner" style={{ backgroundColor: color.hex }} />
                    <p className="text-[11px] font-bold text-left truncate text-gray-900">{color.name}</p>
                    <p className="text-[9px] font-medium text-gray-400 text-left truncate">{color.undertone.split('/')[0]}</p>
                  </button>
                ))}
              </div>
              
              {/* Finish Strip */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 mt-3 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {(Object.keys(FINISHES) as Array<keyof typeof FINISHES>).map((f) => (
                  <button 
                    key={f} onClick={() => setActiveFinish(f)}
                    className={`flex-none px-5 py-2.5 snap-center rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${activeFinish === f ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}
                  >
                    {FINISHES[f].name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. PROGRESSIVE DISCLOSURE: INTELLIGENCE PANEL */}
            <div className="bg-gray-50/50 lg:bg-gray-50 p-5 lg:p-6 rounded-[1.2rem] lg:rounded-xl border border-gray-100">
              <p className="text-xs lg:text-sm leading-relaxed text-gray-700 transition-all duration-500">
                The {activeColor.undertone.toLowerCase()} undertones exhibit a <strong>{activeColor.physics.ambientReact.toLowerCase()} reaction</strong> to {AMBIENT_LAYERS[activeAmbient].name.toLowerCase()}, creating a {activeColor.physics.floorBounce.toLowerCase()} grounding effect.
              </p>

              {/* Mobile Toggle Button */}
              <button 
                className="lg:hidden w-full mt-4 py-3 border border-gray-200 bg-white rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-600 transition-active active:scale-[0.98]"
                onClick={() => setIsMetricsExpanded(!isMetricsExpanded)}
              >
                {isMetricsExpanded ? 'Collapse Diagnostics' : 'Reveal Spatial Metrics'}
              </button>

              {/* The Expandable Graph (Always visible on lg) */}
              <div className={`${isMetricsExpanded ? 'block' : 'hidden lg:block'} pt-6 mt-6 border-t border-gray-200/60 lg:border-none lg:pt-4 lg:mt-4`}>
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500">Spatial Diffusion Index</p>
                  <p className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                    {spatialDiffusionIndex}
                  </p>
                </div>
                <div className="w-full h-10 lg:h-12 relative px-2">
                  <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <line x1="0" y1="18" x2="100" y2="10" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1={spatialDiffusionIndex} y1="12" x2={spatialDiffusionIndex} y2="24" stroke="#9CA3AF" strokeWidth="0.5" strokeDasharray="1 2" className="transition-all duration-[1000ms] ease-in-out"/>
                    <circle cx={spatialDiffusionIndex} cy={18 - (parseFloat(spatialDiffusionIndex) * 0.08)} r="1.5" fill="#111827" className="transition-all duration-[1000ms] ease-in-out"/>
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}