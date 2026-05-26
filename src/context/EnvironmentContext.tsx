"use client";
import React, { createContext, useContext, useState, useMemo } from 'react';

// --- TYPES & DATA ---
type RoomContext = 'North-Facing' | 'South-Facing' | 'Windowless';
type Flooring = 'Warm Oak' | 'Polished Concrete' | 'Honed Slate';
type Lighting = '2700K (Warm)' | '3000K (Neutral)' | '4000K (Cool)';
type Paint = 'Pure White (Neutral)' | 'Evergreen Fog (Cool)' | 'Creamy White (Warm)';

interface EnvironmentState {
  room: RoomContext;
  flooring: Flooring;
  lighting: Lighting;
  paint: Paint;
  setRoom: (val: RoomContext) => void;
  setFlooring: (val: Flooring) => void;
  setLighting: (val: Lighting) => void;
  setPaint: (val: Paint) => void;
  diagnostics: {
    acoustic: string;
    thermal: string;
    floorBounce: string;
    spatial: string;
  };
}

const EnvironmentContext = createContext<EnvironmentState | undefined>(undefined);

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<RoomContext>('North-Facing');
  const [flooring, setFlooring] = useState<Flooring>('Warm Oak');
  const [lighting, setLighting] = useState<Lighting>('3000K (Neutral)');
  const [paint, setPaint] = useState<Paint>('Pure White (Neutral)');

  // --- ORCHESTRATION ENGINE ---
  const diagnostics = useMemo(() => {
    let acoustic = "Standard reverberation profile.";
    let thermal = "Balanced thermal perception.";
    let floorBounce = "Neutral light diffusion.";
    let spatial = "Standard spatial volume.";

    // 1. Acoustic Profile
    if (flooring === 'Polished Concrete' || flooring === 'Honed Slate') {
      acoustic = "High reflectance hard-surface composition increases reverberation. Acoustic dampening elements are highly recommended.";
    } else if (flooring === 'Warm Oak') {
      acoustic = "Timber substrate softens structural reverberation, providing baseline acoustic calmness.";
    }

    // 2. Thermal / Perceptual Shift
    if (room === 'North-Facing' && lighting === '4000K (Cool)' && paint.includes('Cool')) {
      thermal = "Warning: Cool daylight combined with 4000K illumination amplifies cold undertones. Suggest shifting to 2700K or a warmer paint to prevent visual sterility.";
    } else if (room === 'South-Facing' && lighting === '2700K (Warm)' && paint.includes('Warm')) {
      thermal = "Heavy southern exposure combined with warm paint and 2700K lighting may cause visual fatigue and yellowing. Consider 3000K to neutralize.";
    }

    // 3. Floor Bounce Interaction
    if (flooring === 'Warm Oak' && paint === 'Pure White (Neutral)') {
      floorBounce = "Warm timber flooring will cast an amber bounce onto neutral walls, slightly warming the perceived undertone of the white paint.";
    } else if (flooring === 'Polished Concrete') {
      floorBounce = "Concrete introduces a gray/green bounce, which may flatten or muddy warm paint undertones.";
    } else if (flooring === 'Honed Slate') {
      floorBounce = "Dark slate absorbs ambient light, minimizing upward floor bounce and preserving true paint color.";
    }

    // 4. Spatial Expansion
    if (paint.includes('Cool') && flooring === 'Honed Slate') {
      spatial = "Low LRV dark flooring combined with cool walls physically compresses the space. Ensure heavy lumen output to counteract shadowing.";
    } else if (paint === 'Pure White (Neutral)' && flooring !== 'Honed Slate') {
      spatial = "High LRV walls maximize ambient light bounce, creating optimal visual openness and structural expansion.";
    }

    return { acoustic, thermal, floorBounce, spatial };
  }, [room, flooring, lighting, paint]);

  return (
    <EnvironmentContext.Provider value={{ room, flooring, lighting, paint, setRoom, setFlooring, setLighting, setPaint, diagnostics }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (!context) throw new Error('useEnvironment must be used within an EnvironmentProvider');
  return context;
}