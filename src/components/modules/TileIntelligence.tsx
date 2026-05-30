"use client";

import { useState } from "react";

// Architectural Tile Database
const TILE_SYSTEMS = [
    { 
        id: "subway", 
        name: "Classic Subway", 
        format: "75 x 150 mm", 
        pattern: "Running Bond (50% Offset)",
        material: "Glazed Ceramic",
        // CSS Grid/Pattern Data
        width: 150,
        height: 75,
        offset: true,
        baseColor: "#EAE6DF",
        groutDefault: 2
    },
    { 
        id: "mosaic", 
        name: "Penny Round Mosaic", 
        format: "25 x 25 mm Sheet", 
        pattern: "Stacked Orthogonal",
        material: "Matte Porcelain",
        width: 40,
        height: 40,
        offset: false,
        baseColor: "#D4CFC7",
        groutDefault: 3,
        borderRadius: "50%"
    },
    { 
        id: "terrazzo", 
        name: "Large Format Terrazzo", 
        format: "600 x 600 mm", 
        pattern: "Stacked Grid",
        material: "Portland Cement & Marble",
        width: 250,
        height: 250,
        offset: false,
        baseColor: "#B8B0A5",
        groutDefault: 1
    },
    { 
        id: "kitkat", 
        name: "Japanese Kit-Kat", 
        format: "20 x 145 mm", 
        pattern: "Vertical Stack",
        material: "Architectural Ceramic",
        width: 30,
        height: 200,
        offset: false,
        baseColor: "#4A4A48",
        groutDefault: 4
    }
];

export default function TileIntelligence() {
    const [activeTile, setActiveTile] = useState(TILE_SYSTEMS[0]);
    const [groutThickness, setGroutThickness] = useState(activeTile.groutDefault);

    // Update grout when tile changes
    const handleTileChange = (tile: any) => {
        setActiveTile(tile);
        setGroutThickness(tile.groutDefault);
    };

    return (
        <div className="w-full h-full flex flex-col gap-8 animate-in fade-in duration-700">
            
            {/* Top Section: The Grid Simulator & Telemetry */}
            <div className="flex-1 flex gap-12">
                
                {/* The Physical Grid Stage */}
                <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 bg-[#1a1816] flex items-center justify-center p-8">
                    
                    {/* The Grid Canvas */}
                    <div 
                        className="w-full h-full relative overflow-hidden transition-all duration-700 ease-in-out"
                        style={{
                            // We use a CSS repeating linear gradient to simulate the grout lines and tiles
                            // This creates a mathematically perfect, infinitely scalable grid without heavy DOM elements
                            backgroundImage: activeTile.offset 
                                // Running Bond (Brick) Pattern Simulation
                                ? `linear-gradient(to right, #1a1816 ${groutThickness}px, transparent ${groutThickness}px),
                                   linear-gradient(to bottom, #1a1816 ${groutThickness}px, transparent ${groutThickness}px),
                                   linear-gradient(to right, #1a1816 ${groutThickness}px, transparent ${groutThickness}px)`
                                // Stacked Pattern Simulation
                                : `linear-gradient(to right, #1a1816 ${groutThickness}px, transparent ${groutThickness}px),
                                   linear-gradient(to bottom, #1a1816 ${groutThickness}px, transparent ${groutThickness}px)`,
                            
                            backgroundSize: activeTile.offset
                                ? `${activeTile.width}px ${activeTile.height * 2}px, ${activeTile.width}px ${activeTile.height}px, ${activeTile.width}px ${activeTile.height * 2}px`
                                : `${activeTile.width}px ${activeTile.height}px, ${activeTile.width}px ${activeTile.height}px`,
                                
                            backgroundPosition: activeTile.offset
                                ? `0 0, 0 0, ${activeTile.width / 2}px ${activeTile.height}px`
                                : `0 0, 0 0`,
                                
                            backgroundColor: activeTile.baseColor,
                            borderRadius: activeTile.borderRadius || "0px"
                        }}
                    >
                         {/* Textural Overlay to simulate material surface */}
                         <div 
                            className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                        ></div>
                    </div>
                </div>

                {/* Telemetry Data */}
                <div className="w-80 flex flex-col pt-4 justify-between">
                    <div>
                        <h3 className="text-3xl font-light tracking-wide text-white/90 mb-1">
                            {activeTile.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">
                            {activeTile.material}
                        </p>
                        
                        <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Physical Format</span>
                                <span className="text-sm font-light text-white/80 tracking-wide">{activeTile.format}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Installation Pattern</span>
                                <span className="text-sm font-light text-white/80 tracking-wide">{activeTile.pattern}</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Grout Control */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Grout Joint Thickness</span>
                            <span className="text-sm font-light text-white/80">{groutThickness} mm</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="12" 
                            step="0.5"
                            value={groutThickness}
                            onChange={(e) => setGroutThickness(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section: The Tile Library */}
            <div className="h-32 border border-white/5 bg-white/[0.01] rounded-xl p-4 flex gap-4 overflow-x-auto">
                {TILE_SYSTEMS.map((tile) => (
                    <button
                        key={tile.id}
                        onClick={() => handleTileChange(tile)}
                        className={`min-w-[180px] h-full rounded-lg relative overflow-hidden transition-all duration-500 text-left p-4 flex flex-col justify-end group ${
                            activeTile.id === tile.id ? "ring-1 ring-white/30 bg-white/5" : "hover:bg-white/5"
                        }`}
                    >
                        <span className="relative z-10 text-[11px] uppercase tracking-widest text-white/70">{tile.name}</span>
                        <span className="relative z-10 text-[9px] tracking-wider text-white/30">{tile.format}</span>
                    </button>
                ))}
            </div>

        </div>
    );
}