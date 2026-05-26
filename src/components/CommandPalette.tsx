"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Hook into the Global Brain
  const { setLighting, setRoom, setPaint, setFlooring } = useEnvironment();

  // Listen for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  // THE INTELLIGENCE ROUTER (Maps search queries to OS actions)
  const executeCommand = (action: Function, path?: string) => {
    action();
    if (path) router.push(path);
    setIsOpen(false);
  };

  // Define the searchable commands
  const COMMANDS = [
    // Navigation
    { id: 'nav-1', label: 'Go to Material Planner', group: 'Navigation', action: () => executeCommand(() => {}, '/tools/material-planner') },
    { id: 'nav-2', label: 'Go to Tile Intelligence', group: 'Navigation', action: () => executeCommand(() => {}, '/tools/tile-intelligence') },
    { id: 'nav-3', label: 'Go to Paint Planner', group: 'Navigation', action: () => executeCommand(() => {}, '/tools/paint-planner') },
    { id: 'nav-4', label: 'Go to Lighting Intelligence', group: 'Navigation', action: () => executeCommand(() => {}, '/tools/lighting-intelligence') },
    { id: 'nav-5', label: 'View Ecosystem Dashboard', group: 'Navigation', action: () => executeCommand(() => {}, '/ecosystem') },
    { id: 'nav-6', label: 'Generate Client Specification', group: 'Export', action: () => executeCommand(() => {}, '/specification') },
    
    // Environmental Overrides (The Pro Features)
    { id: 'env-1', label: 'Set Illumination to 2700K (Warm)', group: 'Environment Setting', action: () => executeCommand(() => setLighting('2700K (Warm)')) },
    { id: 'env-2', label: 'Set Illumination to 4000K (Cool)', group: 'Environment Setting', action: () => executeCommand(() => setLighting('4000K (Cool)')) },
    { id: 'env-3', label: 'Set Exposure to North-Facing', group: 'Environment Setting', action: () => executeCommand(() => setRoom('North-Facing')) },
    { id: 'env-4', label: 'Set Paint to Evergreen Fog (Cool)', group: 'Environment Setting', action: () => executeCommand(() => setPaint('Evergreen Fog (Cool)')) },
    { id: 'env-5', label: 'Set Base Substrate to Honed Slate', group: 'Environment Setting', action: () => executeCommand(() => setFlooring('Honed Slate')) },
  ];

  // Filter commands based on user typing
  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.group.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      {/* Background Blur */}
      <div 
        className="fixed inset-0 bg-[#FDFDFD]/60 backdrop-blur-md transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* The Palette */}
      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 rounded-[1.5rem] overflow-hidden animate-in fade-in zoom-in-95 duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
        
        {/* Search Input */}
        <div className="flex items-center px-6 py-5 border-b border-black/5">
          <svg className="w-5 h-5 text-gray-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-xl font-light tracking-tight text-gray-900 placeholder-gray-400 focus:outline-none"
            placeholder="Type a command or search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-gray-200 rounded-md px-2 py-1 ml-4 bg-gray-50">ESC</span>
        </div>

        {/* Command List */}
        <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-none">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">No architectural commands found.</div>
          ) : (
            Object.entries(
              filteredCommands.reduce((acc, cmd) => {
                (acc[cmd.group] = acc[cmd.group] || []).push(cmd);
                return acc;
              }, {} as Record<string, typeof COMMANDS>)
            ).map(([group, commands]) => (
              <div key={group} className="mb-4 last:mb-0">
                <div className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {group}
                </div>
                {commands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className="w-full flex items-center justify-between px-4 py-3 text-left rounded-xl hover:bg-black/5 transition-colors focus:bg-black/5 focus:outline-none group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{cmd.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] uppercase tracking-widest text-gray-400 transition-opacity">Execute &rarr;</span>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}