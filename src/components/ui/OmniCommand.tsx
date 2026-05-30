"use client";

import { useEffect, useState } from "react";

// The Global Command Index
const COMMAND_INDEX = [
    { id: "color", title: "Open Color Studio", category: "Navigation", icon: "🎨" },
    { id: "material", title: "Open Material Planner", category: "Navigation", icon: "🧱" },
    { id: "lighting", title: "Open Lighting System", category: "Navigation", icon: "💡" },
    { id: "tile", title: "Open Tile Intelligence", category: "Navigation", icon: "📐" },
    { id: "projects", title: "View Active Projects", category: "Navigation", icon: "📁" },
    { id: "export", title: "Export Environmental Ledger (PDF)", category: "System Action", icon: "📄" },
    { id: "sync", title: "Synchronize Cloud Telemetry", category: "System Action", icon: "☁️" }
];

interface OmniCommandProps {
    setActiveTool: (tool: string) => void;
}

export default function OmniCommand({ setActiveTool }: OmniCommandProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    // Listen for the silent invocation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Filter logic
    const filteredCommands = COMMAND_INDEX.filter(cmd => 
        cmd.title.toLowerCase().includes(query.toLowerCase()) || 
        cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] animate-in fade-in duration-300">
            {/* The Atmospheric Obscuration */}
            <div 
                className="absolute inset-0 bg-[#050404]/60 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
            />

            {/* The Command Instrument */}
            <div className="relative w-full max-w-2xl bg-[#0f0e0d] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                
                {/* Input Matrix */}
                <div className="flex items-center px-6 py-5 border-b border-white/5">
                    <span className="text-white/40 mr-4 text-xl">⌘</span>
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What is your intent?"
                        className="flex-1 bg-transparent text-white/90 placeholder:text-white/20 text-lg font-light focus:outline-none tracking-wide"
                        autoFocus
                    />
                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-white/30 uppercase tracking-widest font-sans">
                        ESC to close
                    </kbd>
                </div>

                {/* Command Results */}
                <div className="max-h-[400px] overflow-y-auto p-2">
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map((cmd, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (cmd.category === "Navigation") {
                                        setActiveTool(cmd.id);
                                    } else {
                                        console.log(`Executing system action: ${cmd.title}`);
                                    }
                                    setIsOpen(false);
                                    setQuery("");
                                }}
                                className="w-full flex items-center justify-between px-4 py-4 rounded-xl hover:bg-white/5 transition-colors group text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="opacity-50 grayscale group-hover:grayscale-0 transition-all">{cmd.icon}</span>
                                    <span className="text-sm font-light text-white/70 group-hover:text-white transition-colors">
                                        {cmd.title}
                                    </span>
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-white/20 group-hover:text-white/40">
                                    {cmd.category}
                                </span>
                            </button>
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center text-white/30 font-light text-sm tracking-wide">
                            No architectural directives found for "{query}".
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}