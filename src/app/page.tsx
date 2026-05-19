'use client';

import { useState } from 'react';
import { calculateTileEstimate } from '@/lib/engines/tile-engine';
import RoomVisualizer from '@/components/RoomVisualizer';

export default function TilePlanner() {
  // 1. STATE MANAGEMENT
  const [length, setLength] = useState<string>('4');
  const [width, setWidth] = useState<string>('5');
  const [tileSize, setTileSize] = useState<number>(600);
  const [costPerBox, setCostPerBox] = useState<string>('850');
  const [tilesPerBox, setTilesPerBox] = useState<number>(4);

  // 2. PARSE INPUTS & RUN MATH ENGINE
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const cost = parseFloat(costPerBox) || 0;
  
  const estimate = calculateTileEstimate(
    { lengthMeters: l, widthMeters: w },
    { sizeMM: tileSize, costPerBox: cost, tilesPerBox: tilesPerBox }
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-sans selection:bg-[#2C3E50] selection:text-white">
      
      {/* HEADER: Breathing Room & Trust Signals */}
      <header className="max-w-5xl mx-auto pt-24 pb-16 px-6 border-b border-[#E8E6E1] mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#2C3E50] text-white text-xs font-bold uppercase tracking-wider rounded-full">
            Free Tool
          </span>
          <span className="text-sm text-[#8B9BA8] font-medium">No signup required. 100% Private.</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#1A1A1A]">
          Space & Material Planner
        </h1>
        <p className="text-lg text-[#5B7A8C] max-w-2xl leading-relaxed">
          Enter your room dimensions to instantly visualize tile requirements, minimize wastage, and estimate material costs with zero guesswork.
        </p>
      </header>

      {/* MAIN WORKSPACE */}
      <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32">
        
        {/* LEFT COLUMN: Human-Guided Inputs (7 columns wide) */}
        <section className="lg:col-span-7 space-y-12">
          
          {/* STEP 1 */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8B9BA8] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#E8E6E1] text-[#1A1A1A] flex items-center justify-center">1</span>
              Room Dimensions
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1A1A1A]">Length (Meters)</label>
                <input 
                  type="number" 
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="px-4 py-3.5 bg-white border border-[#E8E6E1] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2C3E50]/10 focus:border-[#2C3E50] transition-all text-lg font-medium shadow-sm"
                  placeholder="e.g., 4"
                />
                <span className="text-xs text-[#5B7A8C] font-medium">Measure the longest wall.</span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1A1A1A]">Width (Meters)</label>
                <input 
                  type="number" 
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="px-4 py-3.5 bg-white border border-[#E8E6E1] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2C3E50]/10 focus:border-[#2C3E50] transition-all text-lg font-medium shadow-sm"
                  placeholder="e.g., 5"
                />
                <span className="text-xs text-[#5B7A8C] font-medium">Measure the shortest wall.</span>
              </div>
            </div>
          </div>

          <hr className="border-[#E8E6E1]" />

          {/* STEP 2 */}
          <div className="space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#8B9BA8] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#E8E6E1] text-[#1A1A1A] flex items-center justify-center">2</span>
              Material Selection
            </h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#1A1A1A]">Standard Tile Size</label>
              <div className="relative">
                <select 
                  value={tileSize}
                  onChange={(e) => setTileSize(Number(e.target.value))}
                  className="w-full px-4 py-3.5 bg-white border border-[#E8E6E1] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2C3E50]/10 focus:border-[#2C3E50] transition-all appearance-none text-base font-medium shadow-sm cursor-pointer"
                >
                  <option value={300}>300mm × 300mm (Bathroom / Balcony)</option>
                  <option value={600}>600mm × 600mm (Standard Vitrified Floor)</option>
                  <option value={800}>800mm × 800mm (Premium Living Space)</option>
                  <option value={1200}>1200mm × 600mm (Large Modern Slab)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#5B7A8C]">
                  ▼
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1A1A1A]">Cost per Box (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9BA8] font-medium">₹</span>
                  <input 
                    type="number" 
                    value={costPerBox}
                    onChange={(e) => setCostPerBox(e.target.value)}
                    className="w-full pl-8 pr-4 py-3.5 bg-white border border-[#E8E6E1] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2C3E50]/10 focus:border-[#2C3E50] transition-all text-base font-medium shadow-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#1A1A1A]">Tiles per Box</label>
                <input 
                  type="number" 
                  value={tilesPerBox}
                  onChange={(e) => setTilesPerBox(Number(e.target.value))}
                  className="px-4 py-3.5 bg-white border border-[#E8E6E1] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2C3E50]/10 focus:border-[#2C3E50] transition-all text-base font-medium shadow-sm"
                />
              </div>
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: Dashboard & Visualizer (5 columns wide) */}
        <section className="lg:col-span-5">
          <div className="sticky top-8">
            
            {/* SPATIAL VISUALIZER COMPONENT */}
            <RoomVisualizer lengthMeters={l} widthMeters={w} tileSizeMM={tileSize} />

            {/* RESULTS DASHBOARD */}
            <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
              
              <h3 className="text-lg font-bold mb-6 text-[#1A1A1A]">Material Estimate</h3>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-[#F5F3F0] pb-4">
                  <div>
                    <p className="text-sm text-[#5B7A8C] font-medium">Total Coverage</p>
                  </div>
                  <p className="font-semibold text-lg">{estimate.netFloorAreaSqm.toFixed(2)} sq.m</p>
                </div>

                <div className="flex justify-between items-center border-b border-[#F5F3F0] pb-4">
                  <div>
                    <p className="text-sm text-[#5B7A8C] font-medium">Required Tiles</p>
                    <p className="text-[11px] text-[#8B9BA8] mt-0.5">Includes 10% wastage buffer.</p>
                  </div>
                  <p className="font-semibold text-lg">{estimate.recommendedTileCount} pcs</p>
                </div>

                <div className="flex justify-between items-center border-b border-[#F5F3F0] pb-4">
                  <div>
                    <p className="text-sm text-[#5B7A8C] font-medium">Boxes to Order</p>
                  </div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">{estimate.boxesRequired}</p>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-[#5B7A8C] font-medium mb-1">Estimated Material Cost</p>
                  <p className="text-5xl font-bold tracking-tight text-[#2C3E50]">
                    ₹{estimate.estimatedMaterialCost.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* EDUCATIONAL PRO TIP */}
              <div className="mt-8 p-4 bg-[#F5F3F0] rounded-xl border border-[#E8E6E1]/50">
                <p className="text-xs text-[#5B7A8C] leading-relaxed">
                  <span className="font-bold text-[#2C3E50]">Professional Tip:</span> Always keep 1-2 spare boxes from the same manufacturing batch. If a tile breaks years later, buying an exact color match is nearly impossible.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}