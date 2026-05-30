"use client";

import { useState } from "react";

// Architectural Lighting Database (Kelvin, Beam Spread, and RGB values for CSS simulation)
const LIGHTING_FIXTURES = [
    { 
        id: "tungsten", 
        name: "Tungsten Halogen Spot", 
        kelvin: "2700K", 
        type: "Focused Accent",
        spread: "15° Narrow", 
        rgb: "255, 197, 143", // Warm Amber
        beamStyle: "radial-gradient(circle at 50% -20%, rgba(var(--light-color), var(--intensity)) 0%, transparent 40%)"
    },
    { 
        id: "gallery", 
        name: "Museum Wall Wash", 
        kelvin: "3500K", 
        type: "Asymmetric Wash",
        spread: "120° Wide", 
        rgb: "255, 235, 214", // Neutral Warm
        beamStyle: "linear-gradient(180deg, rgba(var(--light-color), var(--intensity)) 0%, transparent 70%)"
    },
    { 
        id: "skylight", 
        name: "Diffuse Skylight", 
        kelvin: "5500K", 
        type: "Ambient Diffuse",
        spread: "180° Hemispheric", 
        rgb: "228, 240, 255", // Cool Daylight
        beamStyle: "radial-gradient(ellipse at 50% 0%, rgba(var(--light-color), var(--intensity)) 0%, transparent 100%)"
    }
];

export default function LightingSystem() {
    const [activeFixture, setActiveFixture] = useState(LIGHTING_FIXTURES[0]);
    const [intensity, setIntensity] = useState(80); // 0 to 100

    return (
        <div className="w-full h-full flex flex-col gap-8 animate-in fade-in duration-700">
            
            {/* Top Section: The Light Simulator & Telemetry */}
            <div className="flex-1 flex gap-12">
                
                {/* The Physical Light Stage */}
                <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 bg-[#050505]">
                    {/* The Dynamic Light Beam */}
                    <div 
                        className="absolute inset-0 transition-all duration-700 ease-out"
                        style={{ 
                            '--light-color': activeFixture.rgb,
                            '--intensity': intensity / 100,
                            background: activeFixture.beamStyle
                        } as React.CSSProperties}
                    ></div>
                    
                    {/* Floor Reflection (Simulates light hitting the ground) */}
                    <div 
                        className="absolute bottom-0 left-0 right-0 h-1/3 transition-all duration-700 ease-out"
                        style={{
                            background: `radial-gradient(ellipse at 50% 100%, rgba(${activeFixture.rgb}, ${intensity / 300}) 0%, transparent 60%)`
                        }}
                    ></div>

                    {/* Stage Noise (To prevent banding in the light gradients) */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
                    ></div>
                </div>

                {/* Telemetry & Controls */}
                <div className="w-80 flex flex-col pt-4 justify-between">
                    <div>
                        <h3 className="text-3xl font-light tracking-wide text-white/90 mb-1">
                            {activeFixture.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">
                            {activeFixture.type}
                        </p>
                        
                        <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Color Temp (Kelvin)</span>
                                <span className="text-sm font-light text-white/80 tracking-wide">{activeFixture.kelvin}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Beam Spread</span>
                                <span className="text-sm font-light text-white/80 tracking-wide">{activeFixture.spread}</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Dimmer Control */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Output Intensity</span>
                            <span className="text-sm font-light text-white/80">{intensity}%</span>
                        </div>
                        {/* Custom styled range slider */}
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-full appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section: The Fixture Library */}
            <div className="h-32 border border-white/5 bg-white/[0.01] rounded-xl p-4 flex gap-4 overflow-x-auto">
                {LIGHTING_FIXTURES.map((fixture) => (
                    <button
                        key={fixture.id}
                        onClick={() => setActiveFixture(fixture)}
                        className={`min-w-[180px] h-full rounded-lg relative overflow-hidden transition-all duration-500 text-left p-4 flex flex-col justify-end group ${
                            activeFixture.id === fixture.id ? "ring-1 ring-white/30 bg-white/5" : "hover:bg-white/5"
                        }`}
                    >
                        {/* Tiny light preview in the button */}
                        <div 
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 opacity-30 blur-xl transition-all duration-500 group-hover:opacity-60"
                            style={{ background: `radial-gradient(circle, rgb(${fixture.rgb}) 0%, transparent 70%)` }}
                        ></div>
                        
                        <span className="relative z-10 text-[11px] uppercase tracking-widest text-white/70">{fixture.name}</span>
                        <span className="relative z-10 text-[9px] tracking-wider text-white/30">{fixture.kelvin}</span>
                    </button>
                ))}
            </div>

        </div>
    );
}