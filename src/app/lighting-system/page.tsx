'use client';

import React, { useState } from 'react';

// --- ARCHITECTURAL DATA & PHYSICS ECOSYSTEM ---

type RoomKey = 'living' | 'bedroom' | 'dining' | 'kitchen' | 'office';
type MaterialKey = 'oak' | 'walnut' | 'limestone' | 'marble';
type KelvinKey = '1800K' | '2000K' | '2200K' | '2400K' | '2500K' | '2700K' | '3000K' | '3200K' | '3500K' | '4000K' | '4500K' | '5000K' | '6500K';

const rooms = {
  living: { label: 'Living Room', fixtures: { ambient: 'Cove Bounce', task: 'Floor Lamp', accent: 'Wall Grazer' } },
  bedroom: { label: 'Primary Bedroom', fixtures: { ambient: 'Curtain Wash', task: 'Reading Spot', accent: 'Bedside Glow' } },
  dining: { label: 'Dining Space', fixtures: { ambient: 'Ambient Fill', task: 'Focal Pendant', accent: 'Sideboard Wash' } },
  kitchen: { label: 'Kitchen', fixtures: { ambient: 'General Flood', task: 'Under-cabinet', accent: 'Island Cone' } },
  office: { label: 'Home Office', fixtures: { ambient: 'Ceiling Bounce', task: 'Desk Articulation', accent: 'Shelf Graze' } }
};

const materials = {
  oak: { name: 'White Oak', bounce: 'from-[#8B5A2B]/50 to-transparent blur-2xl', base: '#2a1e12', absorb: 'bg-black/0', shadow: 'opacity-40', type: 'diffuse' },
  walnut: { name: 'Rich Walnut', bounce: 'from-[#3a200d]/10 to-transparent blur-lg', base: '#0f0905', absorb: 'bg-black/70', shadow: 'opacity-90', type: 'absorb' },
  limestone: { name: 'Soft Limestone', bounce: 'from-[#d4c5b0]/40 to-transparent blur-3xl', base: '#2a2824', absorb: 'bg-black/10', shadow: 'opacity-30', type: 'matte' },
  marble: { name: 'Polished Marble', bounce: 'from-white/30 via-white/5 to-transparent blur-md', base: '#1a1c1e', absorb: 'bg-black/20', shadow: 'opacity-70', type: 'specular' }
};

// Expanded Kelvin Library with Psychological Mapping
const kelvinLibrary = {
  '1800K': { name: 'Candlelight', hex: '#ff7900', feels: 'Intimate, Romantic', best: 'Luxury Lounges' },
  '2000K': { name: 'Flame', hex: '#ff8912', feels: 'Deep, Atmospheric', best: 'Fine Dining' },
  '2200K': { name: 'Golden Hour', hex: '#ffa957', feels: 'Luxurious, Warm', best: 'Boutique Hotels' },
  '2400K': { name: 'Fireplace', hex: '#ffba7a', feels: 'Cozy, Private', best: 'Primary Bedrooms' },
  '2500K': { name: 'Boutique', hex: '#ffc489', feels: 'Inviting, Rich', best: 'High-end Retail' },
  '2700K': { name: 'Residential', hex: '#ffd6aa', feels: 'Balanced, Comfortable', best: 'Living Rooms' },
  '3000K': { name: 'Modern Neutral', hex: '#ffe6cc', feels: 'Clean, Welcoming', best: 'Modern Homes' },
  '3200K': { name: 'Hospitality', hex: '#ffedd6', feels: 'Crisp Warmth', best: 'Hotel Lobbies' },
  '3500K': { name: 'Hybrid', hex: '#fff4e5', feels: 'Airy, Productive', best: 'Home Offices' },
  '4000K': { name: 'Task Focus', hex: '#ffffff', feels: 'Alert, Efficient', best: 'Kitchens' },
  '4500K': { name: 'Studio', hex: '#f0f7ff', feels: 'Clear, Neutral', best: 'Workspaces' },
  '5000K': { name: 'Daylight', hex: '#e2f1ff', feels: 'Technical, Clinical', best: 'Studios' },
  '6500K': { name: 'Precision', hex: '#c9e2ff', feels: 'Sharp, Sterile', best: 'Laboratories' }
};

const proMetrics = {
  cri: ['80', '90', '95', '98'],
  beam: ['15°', '24°', '36°', '60°', '90°'],
  ugr: ['<16 (Premium)', '<19 (Standard)', '<22 (Basic)']
};

export default function EnvironmentalSimulator() {
  const [activeRoom, setActiveRoom] = useState<RoomKey>('living');
  const [activeMaterial, setActiveMaterial] = useState<MaterialKey>('limestone');
  const [activeKelvin, setActiveKelvin] = useState<KelvinKey>('2700K');
  
  // Professional Specs
  const [activeCRI, setActiveCRI] = useState('95');
  const [activeBeam, setActiveBeam] = useState('36°');

  // Interactive Light Layers
  const [layerAmbient, setLayerAmbient] = useState<boolean>(true);
  const [layerTask, setLayerTask] = useState<boolean>(true);
  const [layerAccent, setLayerAccent] = useState<boolean>(true);

  const mat = materials[activeMaterial];
  const kData = kelvinLibrary[activeKelvin];

  // Helper to convert HEX to RGB string for CSS custom properties
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
  };
  const activeColorRgb = hexToRgb(kData.hex);

  return (
    <div className="flex flex-col h-full w-full animate-fade-in bg-[#030303] text-gray-200 min-h-screen overflow-x-hidden font-sans selection:bg-emerald-500/30">
      
      {/* Header */}
      <header className="flex items-center justify-between py-4 px-8 border-b border-white/5 bg-[#080808] sticky top-0 z-50">
        <div className="flex items-center space-x-8 text-[10px] tracking-widest text-gray-500 uppercase font-bold">
          <span className="text-white flex items-center">
            <div className="w-3 h-3 bg-white rounded-sm mr-2 flex items-center justify-center"><div className="w-1 h-1 bg-black rounded-full"></div></div>
            Architectural OS
          </span>
          <span className="text-emerald-500 border-b border-emerald-500 pb-1">Environmental Physics Engine</span> 
        </div>
        <div className="flex items-center space-x-4">
            <button className="text-[10px] uppercase tracking-widest font-bold bg-white text-black px-5 py-2 rounded-sm shadow hover:bg-gray-200 transition-colors">Generate Spec Sheet</button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-[1920px] mx-auto w-full">
        
        {/* === LEFT COLUMN: Geometry & Material Physics === */}
        <section className="col-span-1 lg:col-span-3 flex flex-col space-y-4">
          
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
            <h1 className="text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-5">Space Physics</h1>
            
            {/* Room Geometry */}
            <div className="mb-6">
              <label className="text-[8px] uppercase tracking-widest text-gray-400 block mb-2">Room Geometry</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(rooms) as RoomKey[]).map(r => (
                  <button key={r} onClick={() => setActiveRoom(r)} className={`py-2 text-[9px] uppercase tracking-wider rounded-md border transition-all ${activeRoom === r ? 'border-white/20 bg-white/10 text-white' : 'border-white/5 text-gray-600 hover:bg-white/5'}`}>
                    {rooms[r].label.replace(' Space', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Reflectance Engine */}
            <div className="pt-4 border-t border-white/5">
              <label className="text-[8px] uppercase tracking-widest text-gray-400 block mb-2">Material Reflectance</label>
              <select value={activeMaterial} onChange={(e) => setActiveMaterial(e.target.value as MaterialKey)} className="w-full bg-black border border-white/10 text-white text-[10px] uppercase tracking-wider rounded-md px-3 py-2 outline-none cursor-pointer mb-3">
                  {Object.keys(materials).map(m => <option key={m} value={m}>{materials[m as MaterialKey].name}</option>)}
              </select>
              
              <div className="space-y-2">
                  <div className="flex justify-between items-center bg-black/50 p-2 rounded border border-white/5">
                      <span className="text-[8px] uppercase tracking-widest text-gray-500">Light Bounce</span>
                      <span className={`text-[9px] font-mono font-bold ${mat.type === 'absorb' ? 'text-amber-500' : 'text-emerald-500'}`}>{mat.type === 'absorb' ? 'Low (Absorptive)' : mat.type === 'specular' ? 'High (Specular)' : 'High (Diffuse)'}</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/50 p-2 rounded border border-white/5">
                      <span className="text-[8px] uppercase tracking-widest text-gray-500">Shadow Depth</span>
                      <div className="w-16 h-1 bg-neutral-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-white ${mat.shadow}`}></div>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Professional Output Specs */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
              <h1 className="text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-4">Professional Metrics</h1>
              
              <div className="space-y-4">
                  <div>
                      <label className="text-[8px] uppercase tracking-widest text-gray-400 block mb-2">CRI (Color Rendering Index)</label>
                      <div className="flex space-x-1">
                          {proMetrics.cri.map(c => (
                              <button key={c} onClick={() => setActiveCRI(c)} className={`flex-1 py-1 text-[9px] font-mono rounded border ${activeCRI === c ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-white/5 text-gray-600 hover:bg-white/5'}`}>{c}</button>
                          ))}
                      </div>
                  </div>
                  <div>
                      <label className="text-[8px] uppercase tracking-widest text-gray-400 block mb-2">Target Beam Angle</label>
                      <div className="flex space-x-1">
                          {proMetrics.beam.map(b => (
                              <button key={b} onClick={() => setActiveBeam(b)} className={`flex-1 py-1 text-[9px] font-mono rounded border ${activeBeam === b ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' : 'border-white/5 text-gray-600 hover:bg-white/5'}`}>{b}</button>
                          ))}
                      </div>
                  </div>
              </div>
          </div>

        </section>

        {/* === CENTER COLUMN: Leica Geometry & Light Physics === */}
        <section className="col-span-1 lg:col-span-6 flex flex-col space-y-4">
            
            {/* The Simulation Canvas */}
            <div className={`w-full aspect-[16/10] rounded-xl relative overflow-hidden border border-white/10 bg-[#040404] shadow-2xl`} style={{ '--light-rgb': activeColorRgb } as React.CSSProperties}>
                
                {/* 1. Base Shadow Environment & Material Absorption */}
                <div className="absolute inset-0 bg-[#060606] z-0"></div>
                <div className={`absolute inset-0 z-10 pointer-events-none transition-colors duration-1000 ${mat.absorb}`}></div> 

                {/* 2. Floor Plane */}
                <div className="absolute bottom-0 inset-x-0 h-[25%] transition-colors duration-1000 z-10 border-t border-white/5" style={{ backgroundColor: mat.base }}></div>

                {/* 3. Distinct Leica-Style Room Geometries (Minimalist Silhouettes) */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-40">
                    {activeRoom === 'bedroom' && (
                        <>
                            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-80 h-12 border-t border-x border-white/60 bg-[#0a0a0a]"></div> {/* Bed */}
                            <div className="absolute bottom-[calc(25%+3rem)] left-1/2 -translate-x-1/2 w-80 h-24 border-t border-x border-white/80 bg-[#050505]"></div> {/* Headboard */}
                            <div className="absolute bottom-[25%] left-[20%] w-14 h-16 border-t border-x border-white/60 bg-[#0a0a0a]"></div> {/* Nightstand L */}
                            <div className="absolute bottom-[25%] right-[20%] w-14 h-16 border-t border-x border-white/60 bg-[#0a0a0a]"></div> {/* Nightstand R */}
                            <div className="absolute top-0 right-8 w-24 h-[75%] border-x border-white/20"></div> {/* Curtains */}
                        </>
                    )}
                    {activeRoom === 'living' && (
                        <>
                            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-80 h-16 border-t border-x border-white/70 rounded-t-sm bg-[#0a0a0a]"></div> {/* Sofa */}
                            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-48 h-6 border-t border-x border-white/40 translate-y-3"></div> {/* Coffee Table */}
                            <div className="absolute bottom-[25%] right-0 w-20 h-40 border-t border-l border-white/50"></div> {/* TV Wall */}
                            <div className="absolute bottom-[25%] left-[12%] w-[1px] h-48 bg-white/60"></div> {/* Floor Lamp */}
                        </>
                    )}
                    {activeRoom === 'kitchen' && (
                        <>
                            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-80 h-24 border-t border-x border-white bg-[#0a0a0a]"></div> {/* Island */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-20 border border-white bg-[#050505]"></div> {/* Upper Cabinets */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-8 border-x border-b border-white bg-[#080808] translate-y-20"></div> {/* Range Hood */}
                        </>
                    )}
                    {activeRoom === 'office' && (
                        <>
                            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-72 h-[1px] bg-white"></div> {/* Desk */}
                            <div className="absolute bottom-[25%] left-[30%] w-[1px] h-20 bg-white"></div>
                            <div className="absolute bottom-[25%] right-[30%] w-[1px] h-20 bg-white"></div>
                            <div className="absolute bottom-[calc(25%+0.5rem)] left-1/2 -translate-x-1/2 w-40 h-24 border border-white/30 rounded-sm bg-[#050505]"></div> {/* Monitor */}
                            <div className="absolute bottom-[25%] right-8 w-20 h-64 border border-white/40"><div className="w-full h-[1px] bg-white/40 mt-12"></div><div className="w-full h-[1px] bg-white/40 mt-12"></div></div> {/* Bookshelf */}
                        </>
                    )}
                    {activeRoom === 'dining' && (
                        <>
                            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-72 h-2 border-t border-x border-white"></div> {/* Table */}
                            <div className="absolute bottom-[25%] left-[32%] w-10 h-16 border-t border-x border-white"></div>
                            <div className="absolute bottom-[25%] right-[32%] w-10 h-16 border-t border-x border-white"></div>
                            <div className="absolute bottom-[25%] right-8 w-24 h-20 border-t border-l border-white bg-[#0a0a0a]"></div> {/* Sideboard */}
                            <div className="absolute top-1/4 right-10 w-20 h-28 border border-white/50"></div> {/* Art */}
                        </>
                    )}
                </div>

                {/* 5. FIXTURE PHYSICS ENGINE (Layered Lighting) */}
                <div className="absolute inset-0 z-30 pointer-events-none mix-blend-screen transition-opacity duration-1000">
                    
                    {/* AMBIENT LAYER: Cove / Ceiling Bounce */}
                    {layerAmbient && (
                        <div className="absolute inset-0 transition-opacity duration-700">
                            {['living', 'bedroom', 'office'].includes(activeRoom) && (
                                <div className="absolute top-0 inset-x-0 h-[40%]" style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 0.35), transparent)' }}></div>
                            )}
                            {['kitchen', 'dining'].includes(activeRoom) && (
                                <div className="absolute top-0 inset-x-0 h-[60%]" style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 0.2), transparent)' }}></div>
                            )}
                            {/* Diffuse Floor Bounce */}
                            <div className={`absolute bottom-0 inset-x-0 h-[25%] bg-gradient-to-t ${mat.bounce} opacity-40`}></div>
                        </div>
                    )}

                    {/* TASK LAYER: Focused Beams */}
                    {layerTask && (
                        <div className="absolute inset-0 transition-opacity duration-700">
                            {activeRoom === 'bedroom' && (
                                <>
                                    {/* Reading Spots */}
                                    <div className="absolute bottom-[calc(25%+4rem)] left-[20%] w-[1px] h-12 bg-white/40 z-40 origin-bottom rotate-12"></div>
                                    <div className="absolute bottom-[calc(25%+4rem)] left-[20%] translate-x-2 w-32 h-48 opacity-80" style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 0.9), transparent)', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', transform: 'rotate(-15deg)' }}></div>
                                    
                                    <div className="absolute bottom-[calc(25%+4rem)] right-[20%] w-[1px] h-12 bg-white/40 z-40 origin-bottom -rotate-12"></div>
                                    <div className="absolute bottom-[calc(25%+4rem)] right-[20%] -translate-x-2 w-32 h-48 opacity-80" style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 0.9), transparent)', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)', transform: 'rotate(15deg)' }}></div>
                                </>
                            )}
                            {activeRoom === 'living' && (
                                <>
                                    {/* Floor Lamp Radial */}
                                    <div className="absolute bottom-[calc(25%+12rem)] left-[12%] -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-80" style={{ backgroundColor: 'rgba(var(--light-rgb), 0.8)' }}></div>
                                </>
                            )}
                            {activeRoom === 'dining' && (
                                <>
                                    {/* Focal Pendant Cone */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-white/30"></div>
                                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-12 h-2 bg-white/50 rounded-full"></div>
                                    <div className={`absolute top-25 left-1/2 -translate-x-1/2 w-[28rem] h-[24rem] opacity-85 transition-all duration-700`} style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 0.95), transparent)', clipPath: activeBeam === '15°' ? 'polygon(48% 0, 52% 0, 60% 100%, 40% 100%)' : activeBeam === '36°' ? 'polygon(45% 0, 55% 0, 80% 100%, 20% 100%)' : 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)' }}></div>
                                    <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-64 h-6 rounded-[100%] blur-xl opacity-90" style={{ backgroundColor: 'rgba(var(--light-rgb), 1)' }}></div>
                                </>
                            )}
                            {activeRoom === 'kitchen' && (
                                <>
                                    {/* Under-cabinet Linear Wash */}
                                    <div className="absolute top-[calc(2rem+5rem)] left-1/2 -translate-x-1/2 w-72 h-32 opacity-95" style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 1), transparent)' }}></div>
                                </>
                            )}
                            {activeRoom === 'office' && (
                                <>
                                    {/* Desk Articulation Radial */}
                                    <div className="absolute bottom-[25%] left-[35%] w-56 h-56 rounded-full blur-2xl opacity-90" style={{ backgroundColor: 'rgba(var(--light-rgb), 0.8)' }}></div>
                                </>
                            )}
                        </div>
                    )}

                    {/* --- ACCENT LAYER: Grazers & Spots --- */}
                    {layerAccent && (
                        <div className="absolute inset-0 transition-opacity duration-700">
                            {['dining', 'living'].includes(activeRoom) && (
                                /* Wall Wash / Art Spot */
                                <div className="absolute top-0 right-10 w-24 h-[60%] opacity-80" style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 0.9), transparent)' }}></div>
                            )}
                            {activeRoom === 'kitchen' && (
                                <>
                                    {/* Island Pendants */}
                                    <div className="absolute top-20 left-[35%] w-40 h-40 opacity-70" style={{ background: 'radial-gradient(circle, rgba(var(--light-rgb), 0.9) 0%, transparent 70%)' }}></div>
                                    <div className="absolute top-20 right-[35%] w-40 h-40 opacity-70" style={{ background: 'radial-gradient(circle, rgba(var(--light-rgb), 0.9) 0%, transparent 70%)' }}></div>
                                    <div className={`absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 h-16 rounded-[100%] bg-gradient-to-t ${mat.bounce} opacity-80`}></div>
                                </>
                            )}
                            {activeRoom === 'bedroom' && (
                                /* Bedside Low-level Glow */
                                <div className="absolute bottom-[25%] left-0 w-24 h-48 opacity-60" style={{ background: 'linear-gradient(to right, rgba(var(--light-rgb), 0.7), transparent)' }}></div>
                            )}
                            {activeRoom === 'office' && (
                                /* Shelf Graze */
                                <div className="absolute top-12 right-8 w-20 h-64 opacity-70" style={{ background: 'linear-gradient(to bottom, rgba(var(--light-rgb), 0.9), transparent)' }}></div>
                            )}
                        </div>
                    )}

                    {/* Material Specular Highlights (Marble/Concrete only) */}
                    {(layerTask || layerAmbient) && mat.type === 'specular' && (
                        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 h-2 bg-white/30 blur-sm rounded-[100%]"></div>
                    )}
                </div>
            </div>

            {/* Fixture Physics Toggles */}
            <div className="grid grid-cols-3 gap-3">
                <button onClick={() => setLayerAmbient(!layerAmbient)} className={`p-4 rounded-xl border flex flex-col items-start transition-all ${layerAmbient ? 'bg-[#0a0a0a] border-white/20 shadow-sm' : 'bg-black border-white/5'}`}>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Ambient Fill</span>
                    <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] ${layerAmbient ? 'text-white' : 'text-gray-600'}`}>{rooms[activeRoom].fixtures.ambient}</span>
                        <div className={`w-2 h-2 rounded-full ${layerAmbient ? 'bg-emerald-500' : 'bg-neutral-800'}`}></div>
                    </div>
                </button>
                <button onClick={() => setLayerTask(!layerTask)} className={`p-4 rounded-xl border flex flex-col items-start transition-all ${layerTask ? 'bg-[#0a0a0a] border-white/20 shadow-sm' : 'bg-black border-white/5'}`}>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Task Beam</span>
                    <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] ${layerTask ? 'text-white' : 'text-gray-600'}`}>{rooms[activeRoom].fixtures.task}</span>
                        <div className={`w-2 h-2 rounded-full ${layerTask ? 'bg-blue-500' : 'bg-neutral-800'}`}></div>
                    </div>
                </button>
                <button onClick={() => setLayerAccent(!layerAccent)} className={`p-4 rounded-xl border flex flex-col items-start transition-all ${layerAccent ? 'bg-[#0a0a0a] border-white/20 shadow-sm' : 'bg-black border-white/5'}`}>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Accent Graze</span>
                    <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] ${layerAccent ? 'text-white' : 'text-gray-600'}`}>{rooms[activeRoom].fixtures.accent}</span>
                        <div className={`w-2 h-2 rounded-full ${layerAccent ? 'bg-purple-500' : 'bg-neutral-800'}`}></div>
                    </div>
                </button>
            </div>

        </section>

        {/* === RIGHT COLUMN: Kelvin Ecosystem === */}
        <section className="col-span-1 lg:col-span-3 flex flex-col space-y-4">
          
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 flex-1 flex flex-col">
              <h3 className="text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-4">Expanded Kelvin Experience</h3>
              
              <div className="space-y-2 overflow-y-auto pr-1 scrollbar-hide max-h-[700px]">
                  {(Object.keys(kelvinLibrary) as KelvinKey[]).map(k => {
                      const lib = kelvinLibrary[k];
                      const isActive = activeKelvin === k;

                      return (
                          <button key={k} onClick={() => setActiveKelvin(k)} className={`w-full flex flex-col items-start p-3 rounded-lg border transition-all ${isActive ? 'bg-white/10 border-white/30 shadow-sm' : 'bg-black border-white/5 hover:bg-white/5'}`}>
                              <div className="flex items-center justify-between w-full mb-2">
                                  <div className="flex items-center space-x-3">
                                      <div className="w-1 h-5 rounded-sm shadow-[0_0_8px_currentColor]" style={{ backgroundColor: lib.hex, color: lib.hex }}></div>
                                      <span className={`text-[11px] font-bold font-mono tracking-wide ${isActive ? 'text-white' : 'text-gray-400'}`}>{k}</span>
                                  </div>
                                  {isActive && <span className="text-[8px] uppercase tracking-widest font-bold text-emerald-400">Active</span>}
                              </div>
                              
                              <div className="w-full text-left">
                                  <span className="text-[9px] text-gray-300 block mb-1 font-bold">{lib.name}</span>
                                  <span className="text-[8px] text-gray-500 uppercase tracking-widest block">{lib.feels}</span>
                              </div>
                              
                              {isActive && (
                                  <div className="mt-3 pt-3 border-t border-white/10 w-full text-left">
                                      <span className="text-[8px] text-gray-500 uppercase tracking-widest block mb-1">Architectural Target</span>
                                      <span className="text-[10px] text-emerald-400 block">{lib.best}</span>
                                  </div>
                              )}
                          </button>
                      )
                  })}
              </div>
          </div>

        </section>
      </main>
    </div>
  );
}