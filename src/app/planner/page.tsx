"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function PlannerPage() {
  // 1. STATE MANAGEMENT (The Brain)
  const [roomLength, setRoomLength] = useState<number>(6.0);
  const [roomWidth, setRoomWidth] = useState<number>(5.0);
  
  const [tileLength, setTileLength] = useState<number>(600);
  const [tileWidth, setTileWidth] = useState<number>(600);
  
  const [costPerBox, setCostPerBox] = useState<number>(850);
  const [tilesPerBox, setTilesPerBox] = useState<number>(4);

  // 2. MATHEMATICAL ENGINE
  const safeRoomL = roomLength || 0.1;
  const safeRoomW = roomWidth || 0.1;
  const safeTileL = tileLength || 1;
  const safeTileW = tileWidth || 1;
  const safeTilesPerBox = tilesPerBox || 1;
  const safeCost = costPerBox || 0;

  // Logistics Math
  const totalAreaSqm = safeRoomL * safeRoomW;
  const tileAreaSqm = (safeTileL / 1000) * (safeTileW / 1000);
  const exactTilesNeeded = totalAreaSqm > 0 ? totalAreaSqm / tileAreaSqm : 0;
  
  const wastageFactor = 0.08; 
  const totalTilesWithWastage = Math.ceil(exactTilesNeeded * (1 + wastageFactor));
  const recommendedBoxes = Math.ceil(totalTilesWithWastage / safeTilesPerBox);
  const totalCost = recommendedBoxes * safeCost;

  // 3. GRID RENDERING MATH
  const tilesX = Math.ceil(safeRoomL / (safeTileL / 1000));
  const tilesY = Math.ceil(safeRoomW / (safeTileW / 1000));
  
  // Cap the visual rendering to prevent browser crashes if the user types 1mm tile size.
  // The mathematical logistics (above) remain accurate, but the drawing is capped.
  const visualTilesX = Math.min(tilesX, 40); 
  const visualTilesY = Math.min(tilesY, 40);
  const totalVisualTiles = visualTilesX * visualTilesY;

  const isEdgeCut = (x: number, y: number) => {
    // Only highlight edges if the room doesn't perfectly fit the tiles
    const xRemainder = safeRoomL % (safeTileL / 1000);
    const yRemainder = safeRoomW % (safeTileW / 1000);
    
    const isRightEdge = x === visualTilesX - 1 && xRemainder > 0.01;
    const isBottomEdge = y === visualTilesY - 1 && yRemainder > 0.01;
    
    return isRightEdge || isBottomEdge;
  };

  return (
    <div className="max-w-6xl mx-auto pt-12 pb-24 px-6 animate-in fade-in duration-700">
      
      <header className="mb-16 max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          Spatial Logistics
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-4 text-gray-900">Space & Material Planner</h1>
        <p className="text-gray-500 leading-relaxed text-sm">
          Plan spatial layouts with real-time architectural grid simulation. Instantly visualize edge-cuts, 
          calculate exact material requirements, and determine structural costs.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-white border-gray-200">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">1. Spatial Layout</h2>
            <div className="grid grid-cols-2 gap-6">
              <Input 
                label="Length (Meters)" 
                type="number" 
                value={roomLength || ''} 
                onChange={(e: any) => setRoomLength(parseFloat(e.target.value))}
              />
              <Input 
                label="Width (Meters)" 
                type="number" 
                value={roomWidth || ''} 
                onChange={(e: any) => setRoomWidth(parseFloat(e.target.value))}
              />
            </div>
          </Card>

          <Card className="bg-white border-gray-200">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-6">2. Material Selection</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  label="Tile Length (mm)" 
                  type="number" 
                  value={tileLength || ''} 
                  onChange={(e: any) => setTileLength(parseFloat(e.target.value))}
                />
                <Input 
                  label="Tile Width (mm)" 
                  type="number" 
                  value={tileWidth || ''} 
                  onChange={(e: any) => setTileWidth(parseFloat(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <Input 
                  label="Cost per Box (₹)" 
                  type="number" 
                  value={costPerBox || ''} 
                  onChange={(e: any) => setCostPerBox(parseFloat(e.target.value))}
                />
                <Input 
                  label="Tiles per Box" 
                  type="number" 
                  value={tilesPerBox || ''} 
                  onChange={(e: any) => setTilesPerBox(parseFloat(e.target.value))}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: The Engine */}
        <div className="lg:col-span-7 space-y-8 flex flex-col">
          
          {/* Spatial Grid Simulation */}
          <div className="flex-grow flex flex-col items-center justify-center min-h-[400px] bg-[#FDFDFD] border border-gray-200 rounded-[1.5rem] p-8 relative overflow-hidden transition-all duration-500">
             
             {/* The Mathematical Grid Canvas */}
             <div 
               className="border-t border-l border-gray-300 bg-white grid shadow-inner transition-all duration-[800ms] ease-in-out"
               style={{
                 aspectRatio: safeRoomW > 0 ? `${safeRoomL} / ${safeRoomW}` : '1/1',
                 height: '70%',
                 gridTemplateColumns: `repeat(${visualTilesX}, 1fr)`,
                 gridTemplateRows: `repeat(${visualTilesY}, 1fr)`,
               }}
             >
                {Array.from({ length: totalVisualTiles }).map((_, i) => {
                  const x = i % visualTilesX;
                  const y = Math.floor(i / visualTilesX);
                  const isCut = isEdgeCut(x, y);
                  
                  return (
                    <div 
                      key={i} 
                      className={`border-r border-b transition-colors duration-500 ${
                        isCut ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'
                      }`}
                    >
                      {/* Wastage Zone Hatch Pattern */}
                      {isCut && (
                        <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,#9CA3AF,#9CA3AF_1px,transparent_1px,transparent_4px)]" />
                      )}
                    </div>
                  );
                })}
             </div>
             
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-8">
              Architectural Grid Subdivision: {tilesX} × {tilesY} Modules
            </p>
          </div>

          {/* Logistics Result Panel */}
          <div className="bg-[#1C1D1C] rounded-[1.5rem] p-8 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-gray-400 to-gray-600"></div>
            
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Logistics Summary</h2>
              {/* Intelligence Note generated from the grid logic */}
              <p className="text-[10px] text-gray-500 text-right max-w-[200px] leading-relaxed">
                {safeRoomL % (safeTileL/1000) !== 0 || safeRoomW % (safeTileW/1000) !== 0 
                  ? "Edge cuts detected. +8% wastage margin is structurally recommended."
                  : "Perfect module alignment. Minimal fragmentation expected."}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-light border-b border-gray-800/60 pb-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Total Area</p>
                <p className="font-mono text-base">{totalAreaSqm.toFixed(2)} m²</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Req. Tiles (+8%)</p>
                <p className="font-mono text-base text-gray-300">{totalTilesWithWastage}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Boxes</p>
                <p className="font-mono text-base text-white">{recommendedBoxes}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Per Box</p>
                <p className="font-mono text-base text-gray-400">{safeCost} INR</p>
              </div>
            </div>
            
            <div className="pt-6 flex justify-between items-end">
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Total Structural Cost</span>
              <span className="text-4xl font-light tracking-tight">
                ₹ {totalCost.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}