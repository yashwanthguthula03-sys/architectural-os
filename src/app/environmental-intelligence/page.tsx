'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- THE ENVIRONMENTAL CALCULATION ENGINE ---

// Real architectural values
const materials = {
  'White European Oak': { lrv: 45, thermalMass: 'Low', acoustics: 'Moderate Absorption' },
  'Polished Concrete': { lrv: 30, thermalMass: 'High', acoustics: 'High Reverberation' },
  'Soft Limestone': { lrv: 55, thermalMass: 'Medium', acoustics: 'Low Absorption' }
};

const exposures = {
  'North': { luxBase: 200, colorTemp: 'Cool', solarGain: 'Low' },
  'South': { luxBase: 800, colorTemp: 'Warm', solarGain: 'High' },
  'East': { luxBase: 500, colorTemp: 'Neutral (Morning Peak)', solarGain: 'Medium' },
  'West': { luxBase: 600, colorTemp: 'Warm (Evening Peak)', solarGain: 'High' }
};

const lighting = {
  '2200K': { circadian: 'Restorative', luxTarget: 150 },
  '2700K': { circadian: 'Relaxing', luxTarget: 300 },
  '3500K': { circadian: 'Neutral', luxTarget: 500 },
  '4000K': { circadian: 'Alert', luxTarget: 800 }
};

type MaterialKey = keyof typeof materials;
type ExposureKey = keyof typeof exposures;
type LightingKey = keyof typeof lighting;

interface EngineState {
  exposure: ExposureKey;
  material: MaterialKey;
  lighting: LightingKey;
}

interface LogEvent {
  id: string;
  timestamp: string;
  message: string;
  type: 'climate' | 'material' | 'light' | 'system';
}

export default function EnvironmentalIntelligence() {
  const [state, setState] = useState<EngineState>({
    exposure: 'North',
    material: 'White European Oak',
    lighting: '2700K'
  });

  const [eventLog, setEventLog] = useState<LogEvent[]>([
    { id: 'init', timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), message: 'Environmental OS initialized. Baseline established.', type: 'system' }
  ]);

  const previousState = useRef<EngineState>(state);

  // --- GENUINE CALCULATION MODELS ---
  
  // 1. Calculate Artificial Lighting Demand based on Natural Lux vs Target Lux
  const getLightingDemand = () => {
    const naturalLux = exposures[state.exposure].luxBase;
    const targetLux = lighting[state.lighting].luxTarget;
    const materialBounce = materials[state.material].lrv;
    
    // If natural lux is high and material bounces well, artificial demand drops
    const baseDemand = targetLux - (naturalLux * (materialBounce / 100));
    return Math.max(0, Math.round(baseDemand)); 
  };

  // 2. Derive Thermal State
  const getThermalState = () => {
      const mass = materials[state.material].thermalMass;
      const gain = exposures[state.exposure].solarGain;
      
      if (gain === 'High' && mass === 'High') return 'High Heat Retention';
      if (gain === 'Low' && mass === 'High') return 'Cool Stabilized';
      if (gain === 'High' && mass === 'Low') return 'Rapid Heating / Cooling';
      return 'Thermally Balanced';
  };

  // 3. Explainable Architectural Rationale
  const generateRationale = () => {
      const demand = getLightingDemand();
      let outcome = '';

      if (state.exposure === 'North' && state.lighting === '2700K') {
          outcome = `North-facing daylight provides a cool baseline. Selecting ${state.lighting} restores warmth without excessive glare, supported by the ${materials[state.material].lrv}% Light Reflectance Value of the ${state.material}.`;
      } else if (state.exposure === 'South' && state.material === 'Polished Concrete') {
          outcome = `High solar gain from the South exposure is stabilized by the high thermal mass of Polished Concrete. Artificial lighting demand is minimized during daylight hours.`;
      } else {
          outcome = `The ${state.exposure} exposure drives a base illuminance requirement. Combining ${state.material} (LRV: ${materials[state.material].lrv}) with a ${state.lighting} target results in an artificial lux deficit of ${demand} lx, prioritizing ${lighting[state.lighting].circadian.toLowerCase()} rhythms.`;
      }

      return {
          title: demand < 100 ? 'Exceptional Natural Balance' : demand < 300 ? 'Balanced Layered Environment' : 'High Task Focus Environment',
          description: outcome,
          contributors: [
              `${state.exposure} Exposure (${exposures[state.exposure].colorTemp})`,
              `${state.material} Reflection (LRV: ${materials[state.material].lrv})`,
              `${state.lighting} Source (${lighting[state.lighting].circadian})`
          ]
      };
  };

  // --- EVENT STREAM OBSERVER ---

  useEffect(() => {
    const prev = previousState.current;
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const newLogs: LogEvent[] = [];

    if (prev.exposure !== state.exposure) {
      if (state.exposure === 'South') newLogs.push({ id: Date.now()+'1', timestamp: time, message: 'South-facing daylight detected. Artificial ambient requirement reduced.', type: 'climate' });
      if (state.exposure === 'North') newLogs.push({ id: Date.now()+'2', timestamp: time, message: 'Cool ambient daylight detected. Thermal compensation recommended.', type: 'climate' });
    }

    if (prev.material !== state.material) {
        newLogs.push({ id: Date.now()+'3', timestamp: time, message: `Material LRV shifted to ${materials[state.material].lrv}%. Acoustic profile updated to ${materials[state.material].acoustics}.`, type: 'material' });
    }

    if (prev.lighting !== state.lighting) {
        newLogs.push({ id: Date.now()+'5', timestamp: time, message: `Circadian profile shifted to ${lighting[state.lighting].circadian}. Target lux adjusted.`, type: 'light' });
    }

    if (newLogs.length > 0) {
      setEventLog(prevLogs => [...newLogs, ...prevLogs].slice(0, 6)); 
    }

    previousState.current = state;
  }, [state]);

  const rationale = generateRationale();
  const luxDemand = getLightingDemand();
  const thermal = getThermalState();

  return (
    <div className="flex flex-col h-full w-full animate-fade-in bg-[#f4f3ef] dark:bg-[#0a0a0a] overflow-x-hidden text-gray-900 dark:text-gray-100 min-h-screen">
      
      {/* OS Header */}
      <header className="flex items-center justify-between py-5 px-10 border-b border-gray-200 dark:border-neutral-900 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center space-x-8 text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
          <span className="text-gray-900 dark:text-gray-100 font-bold flex items-center">
            <div className="w-3 h-3 bg-gray-900 dark:bg-gray-100 rounded-sm mr-2 flex items-center justify-center"><div className="w-1 h-1 bg-white dark:bg-black rounded-full"></div></div>
            Architectural OS
          </span>
          <span className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">Material Planner</span> 
          <span className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer transition-colors">Lighting</span> 
          <span className="text-gray-900 dark:text-gray-100 border-b border-gray-900 dark:border-gray-100 pb-1">Environmental Intelligence</span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-10 max-w-[1800px] mx-auto w-full">
        
        {/* --- LEFT: PHYSICS INPUTS --- */}
        <section className="col-span-1 lg:col-span-3 flex flex-col space-y-10">
          <div>
            <h1 className="text-xl font-semibold mb-1 tracking-tight">Environmental Variables</h1>
            <p className="text-xs text-gray-500 mb-6">Modify parameters to calculate environmental intersections.</p>
            
            <div className="space-y-8">
              <div>
                <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-3">Solar Exposure</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(exposures) as ExposureKey[]).map(exp => (
                    <button key={exp} onClick={() => setState({...state, exposure: exp})} className={`py-3 text-xs font-medium rounded-md border transition-colors ${state.exposure === exp ? 'border-gray-900 dark:border-gray-100 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm' : 'border-gray-200 dark:border-neutral-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900'}`}>
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-3">Primary Mass</label>
                <div className="space-y-2">
                  {(Object.keys(materials) as MaterialKey[]).map(mat => (
                    <button key={mat} onClick={() => setState({...state, material: mat})} className={`w-full text-left px-4 py-4 text-xs font-medium rounded-md border transition-colors ${state.material === mat ? 'border-gray-900 dark:border-gray-100 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm' : 'border-gray-200 dark:border-neutral-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-neutral-900'}`}>
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-3">Target Illuminance</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(lighting) as LightingKey[]).map(lux => (
                    <button key={lux} onClick={() => setState({...state, lighting: lux})} className={`py-3 text-xs font-medium rounded-md border transition-colors ${state.lighting === lux ? 'border-gray-900 dark:border-gray-100 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm' : 'border-gray-200 dark:border-neutral-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-900'}`}>
                      {lux}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CENTER: CAUSE & EFFECT ENGINE --- */}
        <section className="col-span-1 lg:col-span-5 flex flex-col space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-semibold tracking-tight">System Intelligence Logic</h2>
            <span className="text-[9px] uppercase tracking-widest font-semibold text-emerald-600 dark:text-emerald-500 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Live Stream
            </span>
          </div>

          <div className="flex-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm overflow-hidden relative min-h-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 dark:from-neutral-900 via-transparent to-transparent opacity-50 pointer-events-none"></div>

            <div className="space-y-4 relative z-10 h-full flex flex-col pt-4">
              {eventLog.map((log, index) => (
                <div key={log.id} className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-500 ${index === 0 ? 'bg-gray-50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-800 scale-100 shadow-sm' : 'opacity-50 scale-[0.98]'}`}>
                  <span className="text-[10px] font-mono text-gray-400 mt-0.5 whitespace-nowrap">{log.timestamp}</span>
                  <div>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 mb-0.5 ${log.type === 'climate' ? 'bg-amber-500' : log.type === 'material' ? 'bg-stone-500' : log.type === 'light' ? 'bg-blue-400' : 'bg-gray-300'}`}></span>
                    <span className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium">{log.message}</span>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-[#121212] to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* --- RIGHT: ARCHITECTURAL REASONING --- */}
        <section className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
          
          {/* Replace Master Score with Architectural Reasoning */}
          <div className="p-8 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 dark:bg-black/5 rounded-full blur-3xl"></div>
             
             <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-3">Architectural Assessment</p>
             <h2 className="text-2xl font-light tracking-tight mb-5 leading-tight">{rationale.title}</h2>
             
             <div className="space-y-2 mb-6">
                 {rationale.contributors.map((c, i) => (
                     <div key={i} className="flex items-center text-xs text-gray-300 dark:text-gray-600 font-medium">
                         <span className="mr-2 opacity-50">+</span> {c}
                     </div>
                 ))}
             </div>

             <div className="pt-5 border-t border-gray-800 dark:border-gray-200">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 mb-2">Engine Rationale</p>
                <p className="text-xs text-gray-300 dark:text-gray-600 leading-relaxed">
                    {rationale.description}
                </p>
             </div>
          </div>

          {/* Derived Physics Outputs */}
          <div className="flex-1 space-y-3">
            
            <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#121212] shadow-sm">
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Thermal Perception</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{thermal}</span>
            </div>
            
            <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#121212] shadow-sm">
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Acoustic Comfort</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{materials[state.material].acoustics}</span>
            </div>
            
            <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#121212] shadow-sm">
                <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Artificial Lux Deficit</span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-500">{luxDemand} lx</span>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}