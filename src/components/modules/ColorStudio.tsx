"use client";

import { useState } from "react";

// Architectural Color Database (Notice the inclusion of LRV - Light Reflectance Value)
const ARCHITECTURAL_PALETTE = [
    { id: "alabaster", name: "Alabaster Plaster", hex: "#EAE6DF", lrv: 82, temp: "Warm" },
    { id: "limestone", name: "French Limestone", hex: "#D4CFC7", lrv: 65, temp: "Neutral" },
    { id: "stucco", name: "Aged Stucco", hex: "#B8B0A5", lrv: 48, temp: "Warm" },
    { id: "basalt", name: "Basalt Mineral", hex: "#4A4A48", lrv: 12, temp: "Cool" },
    { id: "oxide", name: "Iron Oxide", hex: "#8C4B3E", lrv: 18, temp: "Warm" }
];

export default function ColorStudio() {
    const [activeColor, setActiveColor] = useState(ARCHITECTURAL_PALETTE[0]);

    return (
        <div className="w-full h-full flex gap-12 animate-in fade-in duration-700">
            
            {/* Left Column: The Material Swatch */}
            <div className="flex-1 flex flex-col h-full rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 bg-white/[0.02]">
                {/* The actual color fill */}
                <div 
                    className="absolute inset-0 transition-colors duration-1000 ease-in-out"
                    style={{ backgroundColor: activeColor.hex }}
                ></div>
                
                {/* Textural Overlay (Makes it look like physical paint/plaster, not just a digital hex) */}
                <div 
                    className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                ></div>
                
                {/* Inner Shadow to simulate thickness */}
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] pointer-events-none"></div>
            </div>

            {/* Right Column: Telemetry & Selection */}
            <div className="w-80 flex flex-col justify-between py-4">
                
                {/* Active Color Telemetry */}
                <div>
                    <h3 className="text-3xl font-light tracking-wide text-white/90 mb-2">
                        {activeColor.name}
                    </h3>
                    
                    <div className="flex flex-col gap-4 mt-8 border-t border-white/10 pt-8">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Hex Value</span>
                            <span className="text-sm font-light text-white/70 tracking-widest">{activeColor.hex}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">LRV (Reflectance)</span>
                            <span className="text-sm font-light text-white/70">{activeColor.lrv}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Thermal Base</span>
                            <span className="text-sm font-light text-white/70">{activeColor.temp}</span>
                        </div>
                    </div>
                </div>

                {/* The Palette Selection */}
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 mb-4 border-b border-white/5 pb-2">
                        Studio Palette
                    </span>
                    <div className="flex gap-3 flex-wrap">
                        {ARCHITECTURAL_PALETTE.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setActiveColor(color)}
                                className={`w-12 h-12 rounded-full transition-transform duration-300 relative ${
                                    activeColor.id === color.id ? "scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "hover:scale-105"
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                                {/* Selection Ring */}
                                {activeColor.id === color.id && (
                                    <div className="absolute -inset-2 border border-white/20 rounded-full animate-in zoom-in-75 duration-300"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}