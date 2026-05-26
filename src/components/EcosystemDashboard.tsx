"use client";
import { useEnvironment } from '@/context/EnvironmentContext';

const ROOMS = ['North-Facing', 'South-Facing', 'Windowless'] as const;
const FLOORS = ['Warm Oak', 'Polished Concrete', 'Honed Slate'] as const;
const LIGHTS = ['2700K (Warm)', '3000K (Neutral)', '4000K (Cool)'] as const;
const PAINTS = ['Pure White (Neutral)', 'Evergreen Fog (Cool)', 'Creamy White (Warm)'] as const;

export default function EcosystemDashboard() {
  const { room, flooring, lighting, paint, setRoom, setFlooring, setLighting, setPaint, diagnostics } = useEnvironment();

  return (
    <div className="bg-[#F7F7F6] text-[#1C1D1C] min-h-[100dvh] lg:min-h-[800px] p-4 sm:p-6 lg:p-10 lg:rounded-[2rem] border-x-0 border-y lg:border border-[#EBECEB] font-sans shadow-inner">
      
      <header className="mb-8 lg:mb-10 px-1">
        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Global State Engine
        </div>
        <h1 className="text-2xl lg:text-4xl font-light tracking-tight text-gray-900">Ecosystem Orchestration</h1>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT: TACTILE INPUT PANELS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Room Context */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-1">1. Daylight Architecture</label>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {ROOMS.map(r => (
                <button key={r} onClick={() => setRoom(r)} className={`flex-none snap-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all ${room === r ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>{r}</button>
              ))}
            </div>
          </div>

          {/* Flooring */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-1">2. Base Substrate</label>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {FLOORS.map(f => (
                <button key={f} onClick={() => setFlooring(f)} className={`flex-none snap-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all ${flooring === f ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>{f}</button>
              ))}
            </div>
          </div>

          {/* Lighting */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-1">3. Thermal Illumination</label>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {LIGHTS.map(l => (
                <button key={l} onClick={() => setLighting(l)} className={`flex-none snap-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all ${lighting === l ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>{l}</button>
              ))}
            </div>
          </div>

          {/* Paint */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-1">4. Wall Atmosphere</label>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {PAINTS.map(p => (
                <button key={p} onClick={() => setPaint(p)} className={`flex-none snap-center px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all ${paint === p ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>{p}</button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT: DYNAMIC ECOSYSTEM DIAGNOSTICS */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="bg-white rounded-[1.5rem] p-6 lg:p-8 border border-gray-200 shadow-sm space-y-6">
            
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 border-b border-gray-100 pb-4 mb-2">Ecosystem Diagnostics</h3>
            
            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Acoustic & Structural</span>
              <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{diagnostics.acoustic}</p>
            </div>

            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Thermal & Perceptual</span>
              <p className={`text-xs leading-relaxed p-4 rounded-xl ${diagnostics.thermal.includes('Warning') ? 'bg-orange-50/50 text-orange-900 border border-orange-100' : 'bg-gray-50 text-gray-700'}`}>{diagnostics.thermal}</p>
            </div>

            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Floor Bounce Interaction</span>
              <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{diagnostics.floorBounce}</p>
            </div>

            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Spatial Expansion</span>
              <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{diagnostics.spatial}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}