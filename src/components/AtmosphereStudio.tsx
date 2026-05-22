'use client';

import { useState, useRef, MouseEvent, useEffect } from 'react';
import { PaintColor, LightTemperature, getLightingOverlay } from '@/lib/data/paint-brands';

interface AtmosphereStudioProps {
  wallColor: PaintColor;
  lighting: LightTemperature;
  flooring: 'oak' | 'walnut' | 'concrete';
}

export default function AtmosphereStudio({ wallColor, lighting, flooring }: AtmosphereStudioProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 1200);
    return () => clearTimeout(timer);
  }, [wallColor, lighting, flooring]);

  const floorColors = {
    oak: '#D1BFAe',
    walnut: '#8B6A56',
    concrete: '#A9A9A9'
  };

  const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.045'/%3E%3C/svg%3E")`;

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringContainer(true)}
      onMouseLeave={() => setIsHoveringContainer(false)}
      className="w-full aspect-[4/3] sm:aspect-video rounded-[2.5rem] overflow-hidden relative shadow-[0_32px_80px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.8)] group transition-all duration-[1200ms]"
    >
      {/* Volumetric Lighting Layer */}
      <div 
        className="absolute inset-0 z-40 mix-blend-color-burn pointer-events-none transition-colors duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ backgroundColor: getLightingOverlay(lighting) }}
      />
      
      {/* Dynamic Cursor Light Sweep Tracking */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-out z-20 mix-blend-overlay hidden md:block"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.7), transparent 70%)`,
          opacity: isHoveringContainer ? 1 : 0
        }}
      />

      {/* Ambient Structural Sweep Easing */}
      <div 
        className={`absolute inset-0 z-50 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-overlay ${
          isTransitioning ? 'translate-x-[200%] opacity-100' : '-translate-x-[200%] opacity-0'
        }`}
        style={{ width: '200%' }}
      />
      
      <div className="absolute inset-0 z-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/30 mix-blend-multiply pointer-events-none" />

      {/* Left Boundary Plane */}
      <div 
        className="absolute top-0 left-0 w-1/3 h-[75%] transition-colors duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-black/5"
        style={{ backgroundColor: wallColor.hex }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/5 mix-blend-multiply" />
        <div className="absolute inset-0" style={{ backgroundImage: noiseTexture }} />
      </div>

      {/* Main Structural Back Wall */}
      <div 
        className="absolute top-0 left-1/3 right-0 h-[75%] transition-colors duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ backgroundColor: wallColor.hex }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 mix-blend-overlay" />
        <div className="absolute inset-0" style={{ backgroundImage: noiseTexture }} />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/[0.08] to-transparent mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 right-0 h-[18px] bg-[#F8F8F6] border-t border-black/[0.03] shadow-[0_-4px_16px_rgba(0,0,0,0.03)] z-10" />
      </div>

      {/* Floor Material Perspective */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[25%] transition-colors duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ backgroundColor: floorColors[flooring] }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/5" />
        <div 
          className="absolute top-0 left-1/3 right-0 h-full bg-gradient-to-b from-white/10 to-transparent opacity-60 mix-blend-overlay transition-colors duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
          style={{ backgroundColor: wallColor.hex }} 
        />
        <div className="absolute inset-x-0 top-0 h-2 bg-black/10 mix-blend-multiply blur-[2px]" />
      </div>

      {/* Interior Identity Badging */}
      <div className="absolute bottom-8 left-8 z-50 flex items-center gap-4 transition-transform duration-500 hover:scale-[1.02]">
         <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center p-1.5">
            <div className="w-full h-full rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] transition-colors duration-[1500ms]" style={{ backgroundColor: wallColor.hex }} />
         </div>
         <div>
           <p className="text-[9px] font-bold tracking-widest text-white/90 drop-shadow-md uppercase mb-0.5">{wallColor.brand}</p>
           <p className="text-[16px] font-semibold text-white drop-shadow-lg leading-tight">{wallColor.name} <span className="opacity-80 text-[11px] ml-1.5 font-medium">{wallColor.code}</span></p>
         </div>
      </div>

    </div>
  );
}