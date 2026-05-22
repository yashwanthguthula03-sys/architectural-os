"use client";

import React, { useState, useMemo } from 'react';
import ArchitecturalCanvas from '@/components/ArchitecturalCanvas';
import { Layout, Sliders, Layers, Eye, X } from 'lucide-react';

// --- Registry & Types ---
type Climate = 'Clear Sunlight' | 'Overcast' | 'Warm Golden Hour';
type PaintFinish = 'Ultra Matte' | 'Eggshell' | 'Limewash';
type FloorMaterial = 'Oak' | 'Concrete' | 'Walnut';

const COLOR_REGISTRY: Record<string, any> = {
  'Nordic Fog': { hex: '#E5E7E6', rgb: { r: 229, g: 231, b: 230 }, lrv: 78, undertone: 'neutral', collection: 'Atmospheric Neutrals' },
  'Blue Pearl': { hex: '#C8CDD0', rgb: { r: 200, g: 205, b: 208 }, lrv: 56, undertone: 'cool', collection: 'Mineral Saturation' },
  'Desert Linen': { hex: '#D5D0C8', rgb: { r: 213, g: 208, b: 200 }, lrv: 62, undertone: 'warm', collection: 'Warm Luxury' },
  'Midnight Slate': { hex: '#2B2E33', rgb: { r: 43, g: 46, b: 51 }, lrv: 12, undertone: 'cool', collection: 'Structural Shadows' },
};

const FLOOR_REGISTRY = {
  'Oak': { hex: '#452d18', mass: 0.42 },
  'Concrete': { hex: '#28292a', mass: 0.35 },
  'Walnut': { hex: '#120804', mass: 0.18 }
};

// --- Intelligence Engine ---
const calculateSDI = (lrv: number, orientation: string, floorMass: number): string => {
  let modifier = 1.0;
  if (orientation === 'North') modifier = 0.96; 
  if (orientation === 'South') modifier = 1.04; 
  const rawScore = (lrv * 0.85 + (1 - floorMass) * 15) * modifier;
  return Math.min(Math.max(rawScore, 10.0), 99.9).toFixed(1); // Scale 0-100
};

export default function ArchitecturalColorStudio() {
  const [activeColor, setActiveColor] = useState<string>('Nordic Fog');
  const [activeClimate, setActiveClimate] = useState<Climate>('Overcast');
  const [activeFloor, setActiveFloor] = useState<FloorMaterial>('Concrete');
  const [activeOrientation, setActiveOrientation] = useState<'North' | 'South' | 'East' | 'West'>('North');
  const [activeFinish, setActiveFinish] = useState<PaintFinish>('Ultra Matte');
  
  const [showReport, setShowReport] = useState(false);

  const currentColor = COLOR_REGISTRY[activeColor];
  const currentFloor = FLOOR_REGISTRY[activeFloor];
  const sdiScore = useMemo(() => calculateSDI(currentColor.lrv, activeOrientation, currentFloor.mass), [activeColor, activeOrientation, activeFloor]);
  const isDark = currentColor.lrv < 40;

  // Concise, architectural copy. No subjective adjectives.
  const generateSynthesisText = () => {
    if (currentColor.lrv > 70) return `A high-reflectance finish that reduces visual enclosure. Amplifies diffuse light to optically expand compact footprints while maintaining thermal neutrality.`;
    if (currentColor.lrv < 30) return `A low-reflectance material that absorbs ambient daylight. Creates architectural grounding and intimate enclosure without relying on heavy saturation.`;
    return `A thermally adaptive mid-tone. Balances directional light distribution with subtle warmth to stabilize unpredictable environmental lighting.`;
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-gray-900 font-sans antialiased selection:bg-gray-300 relative">
      
      {/* --- HEADER --- */}
      <nav className="w-full max-w-[1500px] mx-auto pt-10 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-gray-900">
            Architectural <span className="text-gray-500 font-normal">Color Studio</span>
          </h1>
        </div>
        <div className="flex gap-8 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar border-b border-gray-300 sm:border-none">
          {(['Clear Sunlight', 'Overcast', 'Warm Golden Hour'] as const).map((c) => (
            <button
              key={c} onClick={() => setActiveClimate(c)}
              className={`text-[10px] uppercase tracking-[0.2em] pb-1 transition-all whitespace-nowrap ${
                activeClimate === c ? 'text-gray-900 border-b border-gray-900 font-bold' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      {/* --- MAIN WORKSPACE --- */}
      <main className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
        
        {/* LEFT: VISUALIZER */}
        <div className="lg:col-span-8 relative flex flex-col gap-6">
          <div className={`relative h-[500px] md:h-[640px] w-full rounded-[2rem] overflow-hidden shadow-2xl border transition-all duration-1000 ${isDark ? 'bg-[#0f1011] border-gray-800' : 'bg-white border-gray-300'}`}>
            <ArchitecturalCanvas colorHex={currentColor.hex} climate={activeClimate} finish={activeFinish} floor={activeFloor} />
            
            <div className="absolute top-10 left-10 pointer-events-none z-10">
              <span className={`text-[9px] font-bold uppercase tracking-[0.4em] block mb-2 transition-colors duration-1000 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                {currentColor.collection}
              </span>
              <h2 className={`text-4xl font-light tracking-tight transition-colors duration-1000 ${isDark ? 'text-white/95' : 'text-gray-900/90'}`}>
                {activeColor}
              </h2>
            </div>
          </div>

          {/* DOCK */}
          <div className="w-full z-20 flex justify-center -mt-16">
            <div className={`w-max backdrop-blur-2xl border rounded-3xl p-5 shadow-xl flex items-center gap-10 transition-colors duration-1000 ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/70 border-white/50'}`}>
              
              <div className="flex gap-4">
                {Object.keys(COLOR_REGISTRY).map((name) => (
                  <button
                    key={name} onClick={() => setActiveColor(name)}
                    className={`w-6 h-6 rounded-full transition-all border ${activeColor === name ? 'ring-1 ring-offset-4 ring-gray-900 scale-110' : 'border-black/10 opacity-80 hover:scale-105'}`}
                    style={{ backgroundColor: COLOR_REGISTRY[name].hex }}
                  />
                ))}
              </div>

              <div className={`w-[1px] h-6 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}></div>

              <div className="flex items-center gap-5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Finish</span>
                {(['Ultra Matte', 'Eggshell', 'Limewash'] as const).map((f) => (
                  <button key={f} onClick={() => setActiveFinish(f)} className={`text-[10px] uppercase tracking-wider transition-all ${activeFinish === f ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-400 hover:text-gray-700'}`}>{f}</button>
                ))}
              </div>

              <div className={`w-[1px] h-6 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}></div>

              <div className="flex items-center gap-5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Floor</span>
                {(['Oak', 'Concrete', 'Walnut'] as const).map((m) => (
                  <button key={m} onClick={() => setActiveFloor(m)} className={`text-[10px] uppercase tracking-wider transition-all ${activeFloor === m ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-400 hover:text-gray-700'}`}>{m}</button>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT: INTELLIGENCE CORE */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#FAFAFA] rounded-[2rem] border border-gray-200 p-8 shadow-lg flex flex-col h-full">
            
            <section className="mb-10">
              <div className="flex items-center gap-2 text-gray-400 mb-3">
                <Layout className="w-3.5 h-3.5" />
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em]">Architectural Profile</h3>
              </div>
              <p className="text-[13px] leading-relaxed text-gray-700">
                {generateSynthesisText()}
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Sliders className="w-3.5 h-3.5" />
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em]">Technical Specification</h3>
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">HEX</span>
                  <span className="text-[11px] font-mono text-gray-900">{currentColor.hex.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">sRGB</span>
                  <span className="text-[11px] font-mono text-gray-900">{currentColor.rgb.r}, {currentColor.rgb.g}, {currentColor.rgb.b}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Reflectance</span>
                  <span className="text-[12px] font-medium text-gray-900">{currentColor.lrv} LRV</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-1">Undertone</span>
                  <span className="text-[12px] capitalize text-gray-900">{currentColor.undertone}</span>
                </div>
              </div>
            </section>

            {/* SIGNATURE IDENTITY: SDI GRAPH */}
            <section className="mb-10">
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Layers className="w-3.5 h-3.5" />
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em]">Ecosystem Metric</h3>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-medium text-gray-600 uppercase tracking-widest">Spatial Diffusion Index</span>
                <span className="text-3xl font-light text-gray-900 tracking-tight">{sdiScore}</span>
              </div>
              
              {/* Minimalist Monochromatic Vector Graph */}
              <svg viewBox="0 0 200 40" className="w-full h-12 mt-4 opacity-70">
                <path d={`M 0 35 Q 100 ${40 - (parseFloat(sdiScore) * 0.4)} 200 5`} fill="none" stroke="#111827" strokeWidth="1" />
                <circle cx={parseFloat(sdiScore) * 2} cy={35 - (parseFloat(sdiScore) * 0.15)} r="2" fill="#111827" />
                <line x1={parseFloat(sdiScore) * 2} y1={35 - (parseFloat(sdiScore) * 0.15)} x2={parseFloat(sdiScore) * 2} y2="40" stroke="#111827" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
            </section>

            <section className="mt-auto">
              <button
                onClick={() => setShowReport(true)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white text-[10px] tracking-[0.2em] uppercase py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-3.5 h-3.5" />
                Preview Architectural Report
              </button>
            </section>

          </div>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full pb-10 text-center text-gray-400 text-[10px] font-medium tracking-[0.2em] uppercase">
        © 2026 Architectural Color Studio • Environmental Intelligence Platform
      </footer>

      {/* --- REPORT PREVIEW MODAL (ARCHIVAL AESTHETIC) --- */}
      {showReport && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
          <div className="bg-[#fdfcfb] w-full max-w-3xl max-h-full overflow-y-auto shadow-2xl relative">
            <button onClick={() => setShowReport(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-12 sm:p-20 font-serif">
              <header className="mb-16 border-b border-gray-300 pb-12">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gray-400 block mb-6">Generated Specification</span>
                <h2 className="text-3xl font-light text-gray-900 mb-2">Environmental Integration Report</h2>
                <p className="text-sm text-gray-500 font-sans">{activeOrientation}-Facing Exposure • {activeClimate}</p>
              </header>

              <div className="grid grid-cols-2 gap-12 mb-16">
                <div>
                  <h4 className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2">Primary Material</h4>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-8 border border-gray-300" style={{ backgroundColor: currentColor.hex }}></div>
                    <span className="text-lg text-gray-900">{activeColor}</span>
                  </div>
                  <p className="font-sans text-xs text-gray-500 mt-2">Finish: {activeFinish}</p>
                </div>
                <div>
                  <h4 className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2">Grounding Substrate</h4>
                  <p className="text-lg text-gray-900 mb-2">{activeFloor} Flooring</p>
                  <p className="font-sans text-xs text-gray-500">Thermal Mass Coefficient: {currentFloor.mass}</p>
                </div>
              </div>

              <div className="mb-16">
                <h4 className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-2">Spatial Diffusion Index (SDI)</h4>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-light text-gray-900">{sdiScore}</span>
                  <span className="font-sans text-sm text-gray-500">/ 100</span>
                </div>
              </div>

              <div>
                <h4 className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-200 pb-2">Perceptual Physics</h4>
                <p className="text-[15px] leading-loose text-gray-800">
                  {generateSynthesisText()}
                </p>
              </div>

              <div className="mt-24 pt-8 border-t border-gray-300 font-sans flex justify-between items-center opacity-50">
                <span className="text-[9px] uppercase tracking-widest">Architectural Color Studio</span>
                <span className="text-[9px] uppercase tracking-widest font-mono">System V1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}