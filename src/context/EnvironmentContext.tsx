"use client";
import React, { createContext, useContext, useState, useMemo } from 'react';

// --- 1. SYSTEM TYPES ---
type Exposure = 'North-Facing' | 'South-Facing' | 'Windowless';
type Flooring = 'Warm Oak' | 'Polished Concrete' | 'Dark Walnut';
type Lighting = '2700K (Warm)' | '3000K (Neutral)' | '4000K (Cool)';
type Paint = 'Nordic Fog (High LRV)' | 'Evergreen Shadow (Low LRV)' | 'Warm Terracotta (Mid LRV)';
type Finish = 'Ultra Matte' | 'Eggshell' | 'Limewash';

interface EnvironmentState {
  exposure: Exposure;
  flooring: Flooring;
  lighting: Lighting;
  paint: Paint;
  finish: Finish;
  setExposure: (val: Exposure) => void;
  setFlooring: (val: Flooring) => void;
  setLighting: (val: Lighting) => void;
  setPaint: (val: Paint) => void;
  setFinish: (val: Finish) => void;
  metrics: Record<string, number>;
  advisories: string[];
}

const EnvironmentContext = createContext<EnvironmentState | undefined>(undefined);

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  // Base State
  const [exposure, setExposure] = useState<Exposure>('North-Facing');
  const [flooring, setFlooring] = useState<Flooring>('Warm Oak');
  const [lighting, setLighting] = useState<Lighting>('3000K (Neutral)');
  const [paint, setPaint] = useState<Paint>('Nordic Fog (High LRV)');
  const [finish, setFinish] = useState<Finish>('Ultra Matte');

  // --- 2. THE ENVIRONMENTAL SCORING GRAPH ---
  // Calculates the invisible dimensions of the room (0-100 scale, starting at 50 baseline)
  const { metrics, advisories } = useMemo(() => {
    let warmth = 50;
    let diffusion = 50;
    let reflectivity = 50;
    let spatialExpansion = 50;
    let visualWeight = 50;

    // Apply Exposure Physics
    if (exposure === 'North-Facing') { warmth -= 15; diffusion += 10; reflectivity -= 5; }
    if (exposure === 'South-Facing') { warmth += 15; diffusion -= 5; reflectivity += 10; }
    if (exposure === 'Windowless') { diffusion -= 20; spatialExpansion -= 10; visualWeight += 10; }

    // Apply Flooring Physics
    if (flooring === 'Dark Walnut') { warmth += 18; reflectivity -= 15; visualWeight += 20; spatialExpansion -= 12; }
    if (flooring === 'Warm Oak') { warmth += 10; diffusion += 5; visualWeight -= 5; }
    if (flooring === 'Polished Concrete') { warmth -= 10; reflectivity += 15; visualWeight += 5; }

    // Apply Lighting Physics
    if (lighting === '2700K (Warm)') { warmth += 20; diffusion += 5; reflectivity -= 5; }
    if (lighting === '4000K (Cool)') { warmth -= 20; reflectivity += 10; visualWeight -= 10; }

    // Apply Paint Physics
    if (paint.includes('High LRV')) { spatialExpansion += 25; reflectivity += 20; visualWeight -= 15; }
    if (paint.includes('Low LRV')) { spatialExpansion -= 25; reflectivity -= 25; visualWeight += 30; }

    // Apply Finish Physics
    if (finish === 'Ultra Matte') { diffusion += 15; reflectivity -= 18; visualWeight += 5; }
    if (finish === 'Eggshell') { diffusion -= 5; reflectivity += 12; spatialExpansion += 5; }

    // Normalize bounds between 0 and 100
    const clamp = (val: number) => Math.max(0, Math.min(100, val));
    const finalMetrics = {
      warmth: clamp(warmth),
      diffusion: clamp(diffusion),
      reflectivity: clamp(reflectivity),
      spatialExpansion: clamp(spatialExpansion),
      visualWeight: clamp(visualWeight),
    };

    // --- 3. THRESHOLD LOGIC & EMOTIONAL TRANSLATION LAYER ---
    const generatedAdvisories: string[] = [];

    // The Compression Warning
    if (finalMetrics.spatialExpansion < 40 && finalMetrics.reflectivity < 40) {
      generatedAdvisories.push(
        "This combination may feel visually heavy and compress the spatial footprint during overcast daylight conditions."
      );
    }

    // The Clinical Warning
    if (finalMetrics.warmth < 35 && finalMetrics.reflectivity > 60) {
      generatedAdvisories.push(
        "High reflectance combined with low thermal warmth risks creating a clinical, sterile atmosphere. Consider introducing amber light or timber elements."
      );
    }

    // The Glare Warning
    if (finalMetrics.reflectivity > 80 && exposure === 'South-Facing') {
      generatedAdvisories.push(
        "Direct southern exposure paired with high-reflectance surfaces may induce visual fatigue and glare. A matte finish is recommended to scatter light."
      );
    }

    // The Cavern/Cozy Analysis
    if (finalMetrics.visualWeight > 75 && finalMetrics.warmth > 60) {
      generatedAdvisories.push(
        "Deep tones and warm materials establish a highly grounded, cocooning environment ideal for evening intimacy, though it relies heavily on artificial illumination."
      );
    }

    // The Expansive Harmony (Positive Reinforcement)
    if (finalMetrics.spatialExpansion > 70 && finalMetrics.warmth >= 40 && finalMetrics.warmth <= 60) {
      generatedAdvisories.push(
        "Excellent spatial harmony. High diffusion and balanced thermal perception optically expand the architecture without feeling detached."
      );
    }

    return { metrics: finalMetrics, advisories: generatedAdvisories };
  }, [exposure, flooring, lighting, paint, finish]);

  return (
    <EnvironmentContext.Provider value={{ 
      exposure, flooring, lighting, paint, finish, 
      setExposure, setFlooring, setLighting, setPaint, setFinish, 
      metrics, advisories 
    }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (!context) throw new Error('useEnvironment must be used within an EnvironmentProvider');
  return context;
}