'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';

interface WallVisualizerProps {
  lengthMeters: number;
  widthMeters: number;
  heightMeters: number;
  hasDoor: boolean;
  hasWindow: boolean;
  moodColor: string;
}

export default function WallVisualizer({
  lengthMeters,
  widthMeters,
  heightMeters,
  hasDoor,
  hasWindow,
  moodColor,
}: WallVisualizerProps) {
  const [hoveredWall, setHoveredWall] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 1400);
    return () => clearTimeout(timer);
  }, [moodColor]);

  if (!lengthMeters || !widthMeters || !heightMeters) return null;

  const walls = [
    { label: 'Primary Wall', width: lengthMeters, hasDeduction: hasDoor, deductionType: 'door' },
    { label: 'Secondary Plane', width: widthMeters, hasDeduction: hasWindow, deductionType: 'window' },
    { label: 'Opposing Wall', width: lengthMeters, hasDeduction: false, deductionType: 'none' },
    { label: 'Closing Plane', width: widthMeters, hasDeduction: false, deductionType: 'none' },
  ];

  // Ultra-fine plaster grain
  const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`;

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#8B9BA8] ml-2 opacity-80">
        Atmospheric Preview
      </h3>
      
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHoveringContainer(true)}
        onMouseLeave={() => setIsHoveringContainer(false)}
        className="bg-white rounded-[2.5rem] border border-[#F0EFEA]/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 md:p-12 transition-all duration-[1200ms] hover:shadow-[0_24px_60px_rgba(74,93,106,0.06)] group/container relative overflow-hidden"
      >
        {/* Ambient Color Bleed (The Container reflects the wall mood) */}
        <div 
          className="absolute inset-0 transition-colors duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-[0.03]"
          style={{ backgroundColor: moodColor }}
        />

        {/* Dynamic Volumetric Halo */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-out z-20 mix-blend-overlay hidden md:block"
          style={{
            background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.7), transparent 70%)`,
            opacity: isHoveringContainer ? 1 : 0
          }}
        />

        {/* Ambient Light Sweep */}
        <div 
          className={`absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isTransitioning ? 'translate-x-[200%] opacity-100' : '-translate-x-[200%] opacity-0'
          }`}
          style={{ width: '200%' }}
        />

        <div className="overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex items-end gap-5 md:gap-7 min-w-max h-56 md:h-64 pb-4 border-b border-[#F0EFEA]/80 relative z-10 px-2 md:px-4 after:content-[''] after:w-4 md:after:w-0">
            
            {/* Deep Grounding Environmental Shadow */}
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-[#4A5D6A]/[0.04] to-transparent pointer-events-none blur-[2px]" />

            {walls.map((wall, idx) => {
              const isHovered = hoveredWall === idx;
              const wallWidthPx = Math.max(wall.width * 24, 70);
              const wallHeightPx = heightMeters * 35;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-center h-full justify-end group cursor-pointer snap-center active:scale-[0.98] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  onMouseEnter={() => setHoveredWall(idx)}
                  onMouseLeave={() => setHoveredWall(null)}
                >
                  <div
                    className={`relative rounded-t-[5px] border border-white/90 overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-bottom ${
                      isHovered 
                        ? 'md:scale-[1.03] shadow-[0_24px_50px_rgba(74,93,106,0.12),inset_0_2px_8px_rgba(255,255,255,0.9)] z-10 md:-translate-y-1' 
                        : 'scale-100 shadow-[0_8px_20px_rgba(0,0,0,0.03),inset_0_2px_6px_rgba(255,255,255,0.6)] z-0'
                    }`}
                    style={{ width: `${wallWidthPx}px`, height: `${wallHeightPx}px`, backgroundColor: '#FAFAF8' }}
                  >
                    <div className="absolute inset-0 transition-colors duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundColor: moodColor }} />
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-[0.8]"
                      style={{
                        background: `radial-gradient(circle at 50% -10%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 80%), linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(120,120,120,0.12) 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 mix-blend-overlay pointer-events-none transition-opacity duration-1000" style={{ backgroundImage: noiseTexture }} />
                    
                    {/* Corner Ambient Occlusion (Physical Realism) */}
                    <div className="absolute inset-y-0 left-0 w-6 md:w-8 bg-gradient-to-r from-black/[0.03] to-transparent mix-blend-multiply" />
                    <div className="absolute inset-y-0 right-0 w-6 md:w-8 bg-gradient-to-l from-black/[0.03] to-transparent mix-blend-multiply" />
                    <div className="absolute top-0 inset-x-0 h-10 md:h-14 bg-gradient-to-b from-black/[0.04] to-transparent mix-blend-multiply" />

                    {wall.hasDeduction && wall.deductionType === 'door' && (
                      <div className="w-10 md:w-12 h-20 md:h-24 bg-[#FCFCFB] border-t border-x border-[#E8E6E1]/50 rounded-t-md absolute bottom-0 left-1/2 -translate-x-1/2 shadow-[inset_0_8px_16px_rgba(0,0,0,0.04)] flex justify-end p-2 transition-all duration-700 md:group-hover:bg-white md:group-hover:shadow-[inset_0_12px_20px_rgba(0,0,0,0.02)]">
                         <div className="w-1 md:w-[5px] h-4 md:h-6 rounded-full bg-[#4A5D6A]/15 mt-8 md:mt-10 mr-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] transition-all duration-700 md:group-hover:bg-[#4A5D6A]/25" /> 
                      </div>
                    )}
                    {wall.hasDeduction && wall.deductionType === 'window' && (
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FCFCFB] border border-[#E8E6E1]/50 rounded-[4px] absolute bottom-12 md:bottom-14 left-1/2 -translate-x-1/2 shadow-[inset_0_8px_16px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-700 md:group-hover:bg-white">
                         <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-transparent" />
                      </div>
                    )}
                  </div>

                  <div className={`text-center mt-5 md:mt-7 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:opacity-40 md:translate-y-1.5 md:group-hover/container:opacity-70 ${isHovered ? 'md:opacity-100 md:translate-y-0' : ''}`}>
                    <p className="text-[9px] font-bold tracking-widest text-[#4A5D6A] uppercase">{wall.label}</p>
                    <p className="text-[11px] font-medium text-[#8B9BA8] mt-1.5">{wall.width}m</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}