"use client";

import { useState } from "react";

// Architectural Material Database
const MATERIAL_DATABASE = [
    { 
        id: "travertine", 
        name: "Silver Travertine", 
        type: "Natural Stone",
        finish: "Honed", 
        density: "2400 kg/m³",
        nrc: "0.05 (Reflective)",
        // CSS simulation of the material
        bg: "linear-gradient(135deg, #A8A39D 0%, #8A8681 50%, #9C9791 100%)",
        noiseOpacity: 0.15,
        blend: "multiply"
    },
    { 
        id: "oak", 
        name: "Nordic White Oak", 
        type: "Timber",
        finish: "Matte / Wirebrushed", 
        density: "750 kg/m³",
        nrc: "0.15 (Slight Absorption)",
        bg: "linear-gradient(90deg, #CBBBA4 0%, #D4C6B3 20%, #C4B39A 80%, #D4C6B3 100%)",
        noiseOpacity: 0.08,
        blend: "overlay"
    },
    { 
        id: "plaster", 
        name: "Venetian Marmorino", 
        type: "Plaster",
        finish: "Polished", 
        density: "1800 kg/m³",
        nrc: "0.03 (Highly Reflective)",
        bg: "radial-gradient(circle at 40% 40%, #E6E2DA 0%, #D5D0C5 100%)",
        noiseOpacity: 0.25,
        blend: "color-burn"
    },
    { 
        id: "brass", 
        name: "Aged Brass", 
        type: "Alloy",
        finish: "Brushed Patina", 
        density: "8500 kg/m³",
        nrc: "0.01 (Acoustic Mirror)",
        bg: "linear-gradient(105deg, #4A3C2A 0%, #8A734D 30%, #5E4E35 70%, #9C835A 100%)",
        noiseOpacity: 0.3,
        blend: "soft-light"
    }
];

export default function MaterialPlanner() {
    const [activeMat, setActiveMat] = useState(MATERIAL_DATABASE[0]);

    return (
        <div className="w-full h-full flex flex-col gap-8 animate-in fade-in duration-700">
            
            {/* Top Section: The Material Slab & Telemetry */}
            <div className="flex-1 flex gap-12">
                
                {/* The Physical Slab */}
                <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 bg-white/[0.02]">
                    <div 
                        className="absolute inset-0 transition-all duration-1000 ease-in-out"
                        style={{ background: activeMat.bg }}
                    ></div>
                    
                    {/* Material Texture Simulation */}
                    <div 
                        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                        style={{ 
                            opacity: activeMat.noiseOpacity,
                            mixBlendMode: activeMat.blend as any,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
                        }}
                    ></div>
                    
                    {/* Polished Specular Highlight (Simulating lighting on the slab) */}
                    {activeMat.finish === "Polished" && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
                    )}
                </div>

                {/* Telemetry Data */}
                <div className="w-80 flex flex-col pt-4">
                    <h3 className="text-3xl font-light tracking-wide text-white/90 mb-1">
                        {activeMat.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">
                        {activeMat.type}
                    </p>
                    
                    <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Surface Finish</span>
                            <span className="text-sm font-light text-white/80 tracking-wide">{activeMat.finish}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Mass / Density</span>
                            <span className="text-sm font-light text-white/80 tracking-wide">{activeMat.density}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Acoustic Profile (NRC)</span>
                            <span className="text-sm font-light text-white/80 tracking-wide">{activeMat.nrc}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: The Material Library */}
            <div className="h-32 border border-white/5 bg-white/[0.01] rounded-xl p-4 flex gap-4 overflow-x-auto">
                {MATERIAL_DATABASE.map((mat) => (
                    <button
                        key={mat.id}
                        onClick={() => setActiveMat(mat)}
                        className={`min-w-[160px] h-full rounded-lg relative overflow-hidden transition-all duration-500 text-left p-4 flex flex-col justify-end group ${
                            activeMat.id === mat.id ? "ring-1 ring-white/30" : "hover:bg-white/5"
                        }`}
                    >
                        {/* Tiny preview of the material in the button background */}
                        <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40" style={{ background: mat.bg }}></div>
                        
                        <span className="relative z-10 text-[11px] uppercase tracking-widest text-white/70">{mat.name}</span>
                        <span className="relative z-10 text-[9px] tracking-wider text-white/30">{mat.type}</span>
                    </button>
                ))}
            </div>

        </div>
    );
}