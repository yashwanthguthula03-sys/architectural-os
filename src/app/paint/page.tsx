"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

// Color Palette Database
const COLOR_PROFILES = [
  { id: 'warm-minimalist', name: 'Warm Minimalist', desc: 'Soft bone ash.', hex: '#E5E3DB', grad1: 'from-[#E5E3DB] to-[#D5D3CB]', grad2: 'from-[#E5E3DB] to-[#CFCFC7]' },
  { id: 'soft-scandi', name: 'Soft Scandinavian', desc: 'Muted sage tint.', hex: '#D4D8D7', grad1: 'from-[#D4D8D7] to-[#BFC4C3]', grad2: 'from-[#D4D8D7] to-[#B5BCBA]' },
  { id: 'urban-neutral', name: 'Urban Neutral', desc: 'Clean architect grey.', hex: '#DCDCDC', grad1: 'from-[#DCDCDC] to-[#C8C8C8]', grad2: 'from-[#DCDCDC] to-[#BFBFBF]' },
  { id: 'coastal-slate', name: 'Coastal Slate', desc: 'Driftwood blue.', hex: '#C2C9CF', grad1: 'from-[#C2C9CF] to-[#A9B2BB]', grad2: 'from-[#C2C9CF] to-[#9CA7B1]' },
];

export default function PaintPage() {
  // 1. STATE MANAGEMENT
  const [length, setLength] = useState<number>(5.0);
  const [width, setWidth] = useState<number>(4.0);
  const [height, setHeight] = useState<number>(2.8);
  const [doors, setDoors] = useState<number>(1);
  const [windows, setWindows] = useState<number>(2);
  const [activeColor, setActiveColor] = useState(COLOR_PROFILES[0]);

  // 2. MATHEMATICAL ENGINE
  const safeL = length || 0;
  const safeW = width || 0;
  const safeH = height || 0;
  const safeDoors = doors || 0;
  const safeWindows = windows || 0;

  // Constants
  const DOOR_AREA = 1.89; // sqm
  const WINDOW_AREA = 1.44; // sqm
  const COVERAGE_PER_LITER = 12; // sqm per liter (standard premium paint)
  const COATS = 2;

  // Calculations
  const grossWallArea = (2 * (safeL * safeH)) + (2 * (safeW * safeH));
  const totalDeductions = (safeDoors * DOOR_AREA) + (safeWindows * WINDOW_AREA);
  const netWallArea = Math.max(0, grossWallArea - totalDeductions);
  
  const totalLitersRequired = netWallArea > 0 ? (netWallArea * COATS) / COVERAGE_PER_LITER : 0;
  const recommendedTins = Math.ceil(totalLitersRequired / 5); // Assuming 5L tins

  return (
    <div className="max-w-6xl mx-auto pt-12 pb-24 px-6 animate-in fade-in duration-700">
      
      <header className="mb-16 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          Atmospheric Logistics
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-4 text-gray-900">Architectural Paint Planner</h1>
        <p className="text-gray-500 leading-relaxed text-sm">
          Plan paint coverage with spatially-aware room visualization, bridging practical material estimation with environmental atmosphere.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Logistics Inputs */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="bg-white border-gray-200">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">1. Spatial Layout</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Input label="Length (m)" type="number" value={length || ''} onChange={(e: any) => setLength(parseFloat(e.target.value))} />
              <Input label="Width (m)" type="number" value={width || ''} onChange={(e: any) => setWidth(parseFloat(e.target.value))} />
              <Input label="Height (m)" type="number" value={height || ''} onChange={(e: any) => setHeight(parseFloat(e.target.value))} />
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
              <div>
                <Input label="Interior Doors" type="number" value={doors || ''} onChange={(e: any) => setDoors(parseFloat(e.target.value))} />
                <p className="text-[10px] text-gray-400 mt-2">Automatic {DOOR_AREA}m² deduction applied.</p>
              </div>
              <div>
                <Input label="Interior Windows" type="number" value={windows || ''} onChange={(e: any) => setWindows(parseFloat(e.target.value))} />
                <p className="text-[10px] text-gray-400 mt-2">Automatic {WINDOW_AREA}m² deduction applied.</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-gray-200">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">2. Color Selection</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {COLOR_PROFILES.map((color) => {
                const isActive = activeColor.id === color.id;
                return (
                  <button 
                    key={color.id}
                    onClick={() => setActiveColor(color)}
                    className={`flex flex-col items-start p-4 rounded-xl border transition-all text-left ${
                      isActive ? 'border-gray-900 bg-gray-50/50 shadow-sm' : 'border-transparent hover:border-gray-200 hover:bg-gray-50 group'
                    }`}
                  >
                    <span 
                      className={`w-6 h-6 rounded-full border border-gray-200 mb-3 block shadow-inner transition-transform ${!isActive && 'group-hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    <span className={`text-[11px] font-bold leading-tight ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{color.name}</span>
                    <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{color.desc}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Atmosphere & Results */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Atmospheric Dynamic Preview */}
          <Card className="flex flex-col h-[320px] bg-white border-gray-200 transition-colors duration-500">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-auto">Atmospheric Preview</h2>
            <div className="flex justify-center items-end gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className={`w-32 h-40 bg-gradient-to-br ${activeColor.grad1} rounded-t-lg shadow-inner relative overflow-hidden transition-all duration-700`}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-white/40 rounded-t-sm shadow-sm blur-[1px]"></div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-4">Primary Wall</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-24 h-32 bg-gradient-to-bl ${activeColor.grad2} rounded-t-lg shadow-inner relative overflow-hidden transition-all duration-700`}>
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-10 bg-white/30 rounded-sm shadow-sm blur-[1px]"></div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-4">Secondary Plane</span>
              </div>
            </div>
          </Card>

          {/* Result Panel */}
          <div className="bg-[#1C1D1C] rounded-[1.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${activeColor.hex}, #6B7280)` }}></div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Architectural Summary</h2>
            
            <div className="space-y-4 text-sm font-light">
              <div className="flex justify-between border-b border-gray-800/60 pb-3">
                <span className="text-gray-400">Total Wall Surface</span>
                <span className="font-mono">{grossWallArea.toFixed(2)} m²</span>
              </div>
              <div className="flex justify-between border-b border-gray-800/60 pb-3">
                <span className="text-gray-400">Deductions (Doors/Windows)</span>
                <span className="font-mono text-gray-500">- {totalDeductions.toFixed(2)} m²</span>
              </div>
              <div className="flex justify-between border-b border-gray-800/60 pb-3">
                <span className="text-gray-400">Paint Required (2 Coats)</span>
                <span className="font-mono">{totalLitersRequired.toFixed(1)} Liters</span>
              </div>
              
              <div className="pt-6 flex justify-between items-end">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Recommended Tins</span>
                <span className="text-4xl font-light tracking-tight">{recommendedTins} × 5L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}