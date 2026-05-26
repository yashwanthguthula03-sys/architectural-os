"use client";
import Link from 'next/link';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function CommandCenter() {
  const { room, flooring, lighting, paint } = useEnvironment();

  // The 5 Core Engines
  const MODULES = [
    { name: 'Color Studio', path: '/tools/color-studio', desc: 'Perceptual physics and undertone mapping.', color: 'bg-stone-100' },
    { name: 'Tile Intelligence', path: '/tools/tile-intelligence', desc: 'Moisture, PEI, and slip resistance orchestration.', color: 'bg-zinc-100' },
    { name: 'Lighting Intelligence', path: '/tools/lighting-intelligence', desc: 'Kelvin simulation and lumen output layering.', color: 'bg-orange-50' },
    { name: 'Paint Planner', path: '/tools/paint-planner', desc: 'Wall atmosphere and finish simulation.', color: 'bg-blue-50' },
    { name: 'Material Planner', path: '/tools/material-planner', desc: 'Substrate specification and acoustic filtering.', color: 'bg-neutral-100' }
  ];

  return (
    <div className="bg-[#FDFDFD] min-h-screen text-[#1C1D1C] font-sans pb-24">
      
      {/* OS HEADER */}
      <header className="pt-12 lg:pt-20 pb-8 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
          System Core
        </div>
        <h1 className="text-3xl lg:text-5xl font-light tracking-tight text-gray-900">Architectural OS</h1>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-8 lg:gap-12">
        
        {/* ACTIVE STATE WIDGET (Reads from Global Brain) */}
        <div className="bg-[#F7F7F6] p-6 lg:p-10 rounded-[1.5rem] lg:rounded-[2rem] border border-[#EBECEB] shadow-inner">
          <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900">Active Environment State</h2>
            <Link href="/ecosystem" className="text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
              Open Global Engine &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Exposure</span>
              <span className="text-xs lg:text-sm font-medium text-gray-900">{room}</span>
            </div>
            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Base Substrate</span>
              <span className="text-xs lg:text-sm font-medium text-gray-900">{flooring}</span>
            </div>
            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Illumination</span>
              <span className="text-xs lg:text-sm font-medium text-gray-900">{lighting}</span>
            </div>
            <div>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Wall Atmosphere</span>
              <span className="text-xs lg:text-sm font-medium text-gray-900">{paint}</span>
            </div>
          </div>
        </div>

        {/* INSTRUMENT GRID (The App Launcher) */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 px-2">Instrument Modules</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {MODULES.map((mod) => (
              <Link 
                key={mod.name} 
                href={mod.path}
                className="group flex flex-col justify-between bg-white p-6 lg:p-8 rounded-[1.5rem] border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all active:scale-[0.98] min-h-[160px]"
              >
                <div className={`w-10 h-10 rounded-full mb-6 border border-black/5 ${mod.color}`} />
                <div>
                  <h3 className="text-lg font-light tracking-tight text-gray-900 mb-2 group-hover:translate-x-1 transition-transform">{mod.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 leading-relaxed line-clamp-2">{mod.desc}</p>
                </div>
              </Link>
            ))}

            {/* EXPORT / HANDOFF TILE */}
            <Link 
              href="/specification"
              className="group flex flex-col justify-between bg-gray-900 p-6 lg:p-8 rounded-[1.5rem] shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] min-h-[160px]"
            >
              <div className="w-10 h-10 rounded-full mb-6 border border-white/10 bg-white/5 flex items-center justify-center">
                <span className="text-white text-lg">&darr;</span>
              </div>
              <div>
                <h3 className="text-lg font-light tracking-tight text-white mb-2 group-hover:translate-x-1 transition-transform">Client Handoff</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/50 leading-relaxed line-clamp-2">Generate PDF specification.</p>
              </div>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}