"use client";
import { useState } from 'react';

// --- DATA LAYER ---
const LIGHTING_LAYERS = [
  { id: 'ambient', name: 'Ambient Wash', lumens: 1200, wattage: 15, active: true },
  { id: 'task', name: 'Directional Task', lumens: 800, wattage: 10, active: false },
  { id: 'accent', name: 'Architectural Accent', lumens: 400, wattage: 5, active: false }
];

const KELVIN_ZONES = [
  { temp: 2700, name: 'Warm Dim', feel: 'Deep relaxation, high thermal softness.', color: 'rgba(255, 169, 87, 0.9)' },
  { temp: 3000, name: 'Halogen Neutral', feel: 'Balanced residential standard. Clean but inviting.', color: 'rgba(255, 197, 143, 0.9)' },
  { temp: 4000, name: 'Cool White', feel: 'High visual acuity. Perfect for task focus and kitchens.', color: 'rgba(255, 235, 214, 0.9)' },
  { temp: 5500, name: 'Daylight', feel: 'Clinical precision. Mimics noon sunlight, high alertness.', color: 'rgba(235, 245, 255, 0.9)' }
];

export default function LightingIntelligence() {
  const [kelvin, setKelvin] = useState<number>(3000);
  const [intensity, setIntensity] = useState<number>(80);
  const [layers, setLayers] = useState(LIGHTING_LAYERS);

  // Derived state for the simulation
  const activeZone = KELVIN_ZONES.reduce((prev, curr) => 
    Math.abs(curr.temp - kelvin) < Math.abs(prev.temp - kelvin) ? curr : prev
  );
  
  const totalLumens = layers.filter(l => l.active).reduce((sum, l) => sum + l.lumens, 0) * (intensity / 100);
  const totalWatts = layers.filter(l => l.active).reduce((sum, l) => sum + l.wattage, 0);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  return (
    <div className="bg-[#F7F7F6] text-[#1C1D1C] lg:min-h-[800px] p-4 sm:p-6 lg:p-10 lg:rounded-[2rem] border-x-0 border-y lg:border border-[#EBECEB] font-sans shadow-inner">
      
      {/* HEADER */}
      <header className="mb-6 lg:mb-10 px-1">
        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Simulation Engine
        </div>
        <h1 className="text-2xl lg:text-4xl font-light tracking-tight text-gray-900">Lighting Intelligence</h1>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10">
        
        {/* LEFT: THE LOCKED ATMOSPHERIC CANVAS */}
        <div className="lg:col-span-7 relative w-full h-[380px] lg:h-[600px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#111]">
          
          {/* Base Darkness */}
          <div className="absolute inset-0 bg-black transition-opacity duration-1000" style={{ opacity: 1 - (intensity / 100) }} />
          
          {/* Active Kelvin Wash */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-out mix-blend-screen blur-3xl lg:blur-[100px]"
            style={{ 
              backgroundColor: activeZone.color,
              opacity: intensity / 100,
              transform: `scale(${0.8 + (intensity / 200)})` 
            }}
          />

          {/* Environmental Readout Overlay */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/60 mb-1">Current Output</p>
              <div className="flex items-end gap-4">
                <span className="text-3xl lg:text-4xl font-light tracking-tight">{Math.round(totalLumens)}</span>
                <span className="text-xs font-medium pb-1 text-white/80">Lumens</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: TACTILE INSTRUMENT PANEL */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-gray-200 shadow-sm">
          
          {/* 1. Layer Orchestration (Horizontal Snap on Mobile) */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
              1. Spatial Layers
            </label>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {layers.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`flex-none snap-center px-5 py-4 w-[140px] lg:w-full lg:flex lg:justify-between lg:items-center rounded-xl border text-left transition-all ${
                    layer.active ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-gray-50 text-gray-400 border-gray-200'
                  }`}
                >
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest mb-1">{layer.name}</span>
                    <span className={`text-[9px] ${layer.active ? 'text-gray-400' : 'text-gray-400'}`}>{layer.wattage}W</span>
                  </div>
                  <div className={`hidden lg:block w-3 h-3 rounded-full ${layer.active ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Kelvin Calibration Slider */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                2. Thermal Calibration
              </label>
              <span className="text-lg font-light text-gray-900">{kelvin}K</span>
            </div>
            
            {/* Custom Touch-Friendly Range Input */}
            <div className="relative w-full h-12 flex items-center">
              <input 
                type="range" min="2700" max="6500" step="100"
                value={kelvin} onChange={(e) => setKelvin(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-orange-300 via-yellow-100 to-blue-200 rounded-full appearance-none cursor-pointer focus:outline-none"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>

            {/* Perceptual Insight */}
            <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-900 mb-1">{activeZone.name}</span>
              <span className="text-[11px] text-gray-600 leading-relaxed">{activeZone.feel}</span>
            </div>
          </div>

          {/* 3. Output Intensity Slider */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                3. Dimming Curve
              </label>
              <span className="text-lg font-light text-gray-900">{intensity}%</span>
            </div>
            <div className="relative w-full h-12 flex items-center">
              <input 
                type="range" min="0" max="100" step="1"
                value={intensity} onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none accent-gray-900"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}