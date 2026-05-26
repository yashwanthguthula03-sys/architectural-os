"use client";
import { useState, useMemo } from 'react';

// --- 1. ARCHITECTURAL DATA LAYER ---
const CATEGORIES = [
  { id: 'all', name: 'All Materials' },
  { id: 'timber', name: 'Architectural Timber' },
  { id: 'stone', name: 'Natural Stone' },
  { id: 'metal', name: 'Engineered Metal' },
  { id: 'acoustic', name: 'Acoustic Substrates' }
];

const APPLICATIONS = [
  { id: 'all', name: 'Any Surface' },
  { id: 'floor', name: 'Flooring & Substrate' },
  { id: 'wall', name: 'Wall Cladding' },
  { id: 'millwork', name: 'Custom Millwork' }
];

const MATERIAL_DATABASE = [
  {
    id: 'm-01', name: 'Smoked White Oak', category: 'timber', application: 'floor',
    hex: '#8A735E', finish: 'Wire-brushed Matte', thickness: '15mm / 20mm',
    desc: 'Deeply grounding timber with open-grain texture to absorb ambient light.'
  },
  {
    id: 'm-02', name: 'Silver Travertine', category: 'stone', application: 'wall',
    hex: '#C8C4B7', finish: 'Honed, Unfilled', thickness: '12mm Slab',
    desc: 'Linear veining creates horizontal expansion. High porosity requires sealing.'
  },
  {
    id: 'm-03', name: 'Aged Brass Matrix', category: 'metal', application: 'millwork',
    hex: '#8E7B54', finish: 'Living Patina', thickness: '3mm Sheet',
    desc: 'Evolves thermally and visually over time. Adds extreme warmth to cool spaces.'
  },
  {
    id: 'm-04', name: 'Charcoal Slatted Felt', category: 'acoustic', application: 'wall',
    hex: '#3A3B3C', finish: 'Felt / PET', thickness: '25mm Depth',
    desc: 'Maximum reverberation dampening. Visually compresses and grounds the room.'
  },
  {
    id: 'm-05', name: 'Bleached Ash Plank', category: 'timber', application: 'floor',
    hex: '#D1C7B8', finish: 'Smooth Matte', thickness: '15mm',
    desc: 'High light-bounce timber. Optically expands tight, low-daylight corridors.'
  },
  {
    id: 'm-06', name: 'Brushed Aluminum', category: 'metal', application: 'millwork',
    hex: '#B5B8B9', finish: 'Directional Brush', thickness: '2mm Sheet',
    desc: 'Clinical, sharp reflection. Perfect for neutralizing overly warm environments.'
  }
];

export default function MaterialPlanner() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [activeApp, setActiveApp] = useState(APPLICATIONS[0].id);

  // Filter Engine
  const filteredMaterials = useMemo(() => {
    return MATERIAL_DATABASE.filter(mat => {
      const matchCategory = activeCategory === 'all' || mat.category === activeCategory;
      const matchApp = activeApp === 'all' || mat.application === activeApp;
      return matchCategory && matchApp;
    });
  }, [activeCategory, activeApp]);

  return (
    <div className="bg-[#F7F7F6] text-[#1C1D1C] min-h-[100dvh] lg:min-h-[800px] p-4 sm:p-6 lg:p-10 lg:rounded-[2rem] border-x-0 border-y lg:border border-[#EBECEB] font-sans">
      
      {/* HEADER */}
      <header className="mb-6 lg:mb-10 px-1">
        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Specification Engine
        </div>
        <h1 className="text-2xl lg:text-4xl font-light tracking-tight text-gray-900">Material Planner</h1>
      </header>

      <div className="flex flex-col gap-8 lg:gap-12">
        
        {/* TOP: TACTILE FILTER DOCKS */}
        <div className="space-y-6">
          {/* Category Strip */}
          <div className="w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap lg:snap-none scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`flex-none snap-center whitespace-nowrap px-5 py-3 text-[10px] lg:text-xs font-bold uppercase tracking-widest rounded-xl border transition-all ${activeCategory === cat.id ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Application Strip */}
          <div className="w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap lg:snap-none scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {APPLICATIONS.map(app => (
                <button 
                  key={app.id} onClick={() => setActiveApp(app.id)}
                  className={`flex-none snap-center whitespace-nowrap px-4 py-2.5 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${activeApp === app.id ? 'bg-gray-200 text-gray-900' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}
                >
                  {app.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: THE MATERIAL GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredMaterials.map((mat) => (
            <div 
              key={mat.id} 
              className="group relative bg-white rounded-[1.5rem] p-5 lg:p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Material Swatch */}
              <div 
                className="w-full h-32 lg:h-40 rounded-xl mb-5 shadow-inner border border-black/5 relative overflow-hidden"
                style={{ backgroundColor: mat.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 mix-blend-overlay" />
              </div>

              {/* Data Hierarchy */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-light tracking-tight text-gray-900 leading-tight mb-1">{mat.name}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{mat.finish}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Thickness</span>
                    <span className="text-[10px] font-bold text-gray-900">{mat.thickness}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Application</span>
                    <span className="text-[10px] font-bold text-gray-900 capitalize">{mat.application}</span>
                  </div>
                </div>

                <div className="pt-3">
                  <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                    {mat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredMaterials.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-sm text-gray-500">No materials match this specific architectural intersection.</p>
              <button 
                onClick={() => { setActiveCategory('all'); setActiveApp('all'); }}
                className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-900 underline underline-offset-4"
              >
                Reset Specifications
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}