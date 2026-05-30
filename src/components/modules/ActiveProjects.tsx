"use client";

import { useState } from "react";

// Architectural Project Ledger
const PROJECT_DATABASE = [
    { 
        id: "PRJ-01", 
        name: "Kyoto Alpine Retreat", 
        location: "Kyoto Prefecture, Japan",
        stage: "Schematic Design",
        climate: "Temperate / Humid",
        completion: 15,
        materials: ["Nordic White Oak", "Basalt Mineral"],
        // The Atmospheric Signature of the project
        bg: "linear-gradient(145deg, #1A1C1A 0%, #0F1210 100%)",
        accent: "#2A332C"
    },
    { 
        id: "PRJ-02", 
        name: "Desert Pavilion", 
        location: "Joshua Tree, California",
        stage: "Construction",
        climate: "Arid / High UV",
        completion: 68,
        materials: ["Rammed Earth", "Aged Brass"],
        bg: "linear-gradient(145deg, #2D241C 0%, #17110C 100%)",
        accent: "#4A3522"
    },
    { 
        id: "PRJ-03", 
        name: "Nordic Museum Gallery", 
        location: "Oslo, Norway",
        stage: "Design Development",
        climate: "Subarctic",
        completion: 42,
        materials: ["French Limestone", "Alabaster Plaster"],
        bg: "linear-gradient(145deg, #1C1D21 0%, #0D0E12 100%)",
        accent: "#323642"
    }
];

export default function ActiveProjects() {
    const [activeProject, setActiveProject] = useState(PROJECT_DATABASE[0]);

    return (
        <div className="w-full h-full flex flex-col gap-8 animate-in fade-in duration-700">
            
            {/* Top Section: The Atmospheric Signature & Telemetry */}
            <div className="flex-1 flex gap-12">
                
                {/* The Project Atmosphere Stage */}
                <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 bg-[#0a0a0a]">
                    
                    {/* The Environmental Gradient */}
                    <div 
                        className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-80"
                        style={{ background: activeProject.bg }}
                    ></div>
                    
                    {/* Topographical / Architectural Noise */}
                    <div 
                        className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                    ></div>

                    {/* Project ID Watermark */}
                    <div className="absolute bottom-8 left-8">
                        <span className="text-[120px] font-light tracking-tighter text-white/[0.03] leading-none pointer-events-none select-none">
                            {activeProject.id.split('-')[1]}
                        </span>
                    </div>
                </div>

                {/* Ledger Telemetry */}
                <div className="w-80 flex flex-col pt-4 justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[8px] font-sans text-white/50 tracking-widest">
                                {activeProject.id}
                            </span>
                        </div>
                        <h3 className="text-3xl font-light tracking-wide text-white/90 mb-1 leading-tight">
                            {activeProject.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">
                            {activeProject.location}
                        </p>
                        
                        <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Current Phase</span>
                                <span className="text-sm font-light text-white/80 tracking-wide">{activeProject.stage}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Site Climate</span>
                                <span className="text-sm font-light text-white/80 tracking-wide">{activeProject.climate}</span>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2">Primary Palette</span>
                                <div className="flex flex-col gap-2">
                                    {activeProject.materials.map((mat, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                            <span className="text-xs font-light text-white/60">{mat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Completion Scale */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Project Completion</span>
                            <span className="text-xs font-light text-white/60">{activeProject.completion}%</span>
                        </div>
                        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full transition-all duration-1000 ease-out"
                                style={{ width: `${activeProject.completion}%`, backgroundColor: activeProject.accent }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: The Project Archive */}
            <div className="h-32 border border-white/5 bg-white/[0.01] rounded-xl p-4 flex gap-4 overflow-x-auto">
                {PROJECT_DATABASE.map((project) => (
                    <button
                        key={project.id}
                        onClick={() => setActiveProject(project)}
                        className={`min-w-[220px] h-full rounded-lg relative overflow-hidden transition-all duration-500 text-left p-5 flex flex-col justify-end group ${
                            activeProject.id === project.id ? "ring-1 ring-white/30 bg-white/5" : "hover:bg-white/5"
                        }`}
                    >
                        {/* Background Atmospheric Hint */}
                        <div 
                            className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-30" 
                            style={{ background: project.bg }}
                        ></div>
                        
                        <div className="relative z-10 flex flex-col gap-1">
                            <span className="text-[8px] font-sans text-white/30 tracking-widest">{project.id}</span>
                            <span className="text-[11px] uppercase tracking-widest text-white/70 truncate">{project.name}</span>
                            <span className="text-[9px] tracking-wider text-white/30 truncate">{project.location}</span>
                        </div>
                    </button>
                ))}
            </div>

        </div>
    );
}