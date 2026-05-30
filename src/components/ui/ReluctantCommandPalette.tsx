"use client";

import { useEffect, useState } from "react";

const ECOSYSTEM_TOOLS = [
    { id: "color", category: "Studio", label: "Color Studio" },
    { id: "material", category: "Studio", label: "Material Planner" },
    { id: "lighting", category: "Intelligence", label: "Lighting Intelligence" },
    { id: "tile", category: "Intelligence", label: "Tile Intelligence" },
    { id: "projects", category: "Database", label: "Active Projects" }
];

export default function ReluctantCommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const filteredTools = ECOSYSTEM_TOOLS.filter(tool => 
        tool.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
            {/* The Atmospheric Translucency (Letting the room breathe through) */}
            <div 
                className="absolute inset-0 bg-[#0c0a09]/50 backdrop-blur-xl transition-opacity duration-700"
                onClick={() => setIsOpen(false)}
            />

            {/* The Instrument Form */}
            <div className="relative w-full max-w-xl border border-white/5 bg-white/[0.015] shadow-2xl flex flex-col rounded-sm overflow-hidden">
                
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="State intent..."
                    className="w-full bg-transparent px-8 py-8 text-white/80 placeholder:text-white/20 focus:outline-none font-light tracking-wide text-lg"
                    autoFocus
                />

                <div className="border-t border-white/5 flex flex-col py-2">
                    {filteredTools.length > 0 ? (
                        filteredTools.map((tool) => (
                            <button 
                                key={tool.id}
                                className="text-left px-8 py-4 group hover:bg-white/5 transition-all duration-300 flex items-center justify-between"
                                onClick={() => {
                                    console.log(`Navigating to: ${tool.label}`);
                                    setIsOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-8">
                                    <span className="text-[9px] uppercase tracking-widest text-white/20 w-24">
                                        {tool.category}
                                    </span>
                                    <span className="text-sm font-light tracking-wide text-white/60 group-hover:text-white/90 transition-colors">
                                        {tool.label}
                                    </span>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-8 py-8 text-white/20 font-light tracking-wider text-sm">
                            No trajectory found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}