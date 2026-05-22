'use client';

import { useState, useEffect } from 'react';
import { calculatePaintEstimate } from '@/lib/engines/paint-engine';
import WallVisualizer from '@/components/WallVisualizer';

function useCountUp(endValue: number, duration: number = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); 
      setValue(endValue * ease);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setValue(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return value;
}

const MOOD_PRESETS = [
  { id: 'minimal', name: 'Warm Minimalist', hex: '#EAE6DF', desc: 'Soft bone and warm limestone.' },
  { id: 'scandi', name: 'Soft Scandinavian', hex: '#E1E5E4', desc: 'Muted sage and northern light.' },
  { id: 'urban', name: 'Urban Neutral', hex: '#D8D8D6', desc: 'Clean architectural warm gray.' },
  { id: 'coastal', name: 'Coastal Slate', hex: '#D0D6DC', desc: 'Driftwood mist and ocean slate.' }
];

type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

const regionConfig: Record<CurrencyCode, { symbol: string; locale: string; defaultCost: string }> = {
  USD: { symbol: '$', locale: 'en-US', defaultCost: '18' },
  INR: { symbol: '₹', locale: 'en-IN', defaultCost: '350' },
  EUR: { symbol: '€', locale: 'de-DE', defaultCost: '16' },
  GBP: { symbol: '£', locale: 'en-GB', defaultCost: '14' },
};

export default function PaintPlanner() {
  const [length, setLength] = useState<string>('5');
  const [width, setWidth] = useState<string>('4');
  const [height, setHeight] = useState<string>('2.8');
  const [doors, setDoors] = useState<string>('1');
  const [windows, setWindows] = useState<string>('2');

  const [coverage, setCoverage] = useState<string>('12');
  const [coats, setCoats] = useState<string>('2');
  
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [costPerLiter, setCostPerLiter] = useState<string>(regionConfig.USD.defaultCost);
  const [selectedMood, setSelectedMood] = useState(MOOD_PRESETS[0]);

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    if (Object.values(regionConfig).some(c => c.defaultCost === costPerLiter)) {
       setCostPerLiter(regionConfig[newCurrency].defaultCost);
    }
  };

  const parsedLength = parseFloat(length) || 0;
  const parsedWidth = parseFloat(width) || 0;
  const parsedHeight = parseFloat(height) || 0;
  const doorsCount = parseInt(doors) || 0;
  const windowsCount = parseInt(windows) || 0;
  const coatsCount = parseInt(coats) || 1;

  const estimate = calculatePaintEstimate(
    [
      { lengthMeters: parsedLength, heightMeters: parsedHeight },
      { lengthMeters: parsedLength, heightMeters: parsedHeight },
      { lengthMeters: parsedWidth, heightMeters: parsedHeight },
      { lengthMeters: parsedWidth, heightMeters: parsedHeight }
    ],
    [
      ...Array(Math.max(0, doorsCount)).fill({ widthMeters: 0.9, heightMeters: 2.1, type: 'door' }),
      ...Array(Math.max(0, windowsCount)).fill({ widthMeters: 1.2, heightMeters: 1.2, type: 'window' })
    ],
    { coveragePerLiter: parseFloat(coverage) || 12, costPerLiter: parseFloat(costPerLiter) || 0, coatsRequired: coatsCount }
  );

  const animatedCost = useCountUp(estimate.estimatedMaterialCost);

  const formatCurrency = (value: number, curr: CurrencyCode) => {
    return new Intl.NumberFormat(regionConfig[curr].locale, {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-[#2C3E50] antialiased selection:bg-[#4A5D6A] selection:text-white pb-32 lg:pb-36 font-sans relative overflow-x-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A5D6A]/[0.03] via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      <header className="max-w-5xl mx-auto pt-16 md:pt-24 pb-10 md:pb-14 px-6 border-b border-[#F0EFEA] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both">
            <h1 className="text-[2.2rem] md:text-4xl lg:text-[3rem] font-light tracking-tight text-[#1A1A1A] leading-[1.1] flex flex-wrap gap-x-2">
              Architectural <span className="font-medium text-[#4A5D6A]">Paint Planner</span>
            </h1>
            <p className="text-[15px] md:text-[16px] text-[#7A8A96] leading-relaxed font-normal">
              Plan paint coverage with spatially-aware room visualization and realistic material budgeting.
            </p>
          </div>
          
          <div className="flex bg-[#F8F8F7] ring-1 ring-inset ring-[#E8E6E1]/60 p-[5px] rounded-[14px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] self-start md:self-end animate-in fade-in duration-1000 delay-300 fill-mode-both overflow-x-auto w-full md:w-auto">
            {(['USD', 'INR', 'EUR', 'GBP'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => handleCurrencyChange(curr)}
                className={`flex-1 md:flex-none px-4 md:px-5 py-[10px] text-[11px] font-bold rounded-[10px] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] tracking-wider active:scale-[0.96] ${
                  currency === curr
                    ? 'bg-[#4A5D6A] text-white shadow-[0_4px_16px_rgba(74,93,106,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]'
                    : 'text-[#8B9BA8] hover:text-[#2C3E50] hover:bg-white/60 hover:shadow-sm'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 md:gap-y-16 pt-10 md:pt-16 relative z-10">
        
        <section className="lg:col-span-7 space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both">
          
          <div className="space-y-5 md:space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#8B9BA8] ml-2 opacity-80">1. Room Layout</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
              {[
                { label: 'Length (m)', val: length, set: setLength },
                { label: 'Width (m)', val: width, set: setWidth },
                { label: 'Height (m)', val: height, set: setHeight }
              ].map((field, idx) => (
                <div key={idx} className="flex flex-col gap-2 md:gap-3">
                  <label className="text-[13px] font-medium text-[#4A5D6A] ml-2">{field.label}</label>
                  <input
                    type="number" value={field.val} onChange={(e) => field.set(e.target.value)}
                    className="w-full px-6 py-4 bg-[#F8F8F6] rounded-[1.25rem] border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,1)] focus:bg-white focus:ring-[3px] focus:ring-inset focus:ring-[#4A5D6A]/20 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.01),0_0_0_1px_#4A5D6A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-medium text-[16px] md:text-[15px] text-[#1A1A1A] hover:bg-[#F2F2F0]"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 pt-2 md:pt-4">
              <div className="flex flex-col gap-2 md:gap-3">
                <label className="text-[13px] font-medium text-[#4A5D6A] ml-2">Interior Doors</label>
                <input
                  type="number" value={doors} onChange={(e) => setDoors(e.target.value)} min="0"
                  className="w-full px-6 py-4 bg-[#F8F8F6] rounded-[1.25rem] border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,1)] focus:bg-white focus:ring-[3px] focus:ring-inset focus:ring-[#4A5D6A]/20 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.01),0_0_0_1px_#4A5D6A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-medium text-[16px] md:text-[15px] text-[#1A1A1A] hover:bg-[#F2F2F0]"
                />
                <span className="text-[11px] text-[#A0AEB8] font-normal pl-3">Automatic 1.89m² footprint deduction applied</span>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <label className="text-[13px] font-medium text-[#4A5D6A] ml-2">Interior Windows</label>
                <input
                  type="number" value={windows} onChange={(e) => setWindows(e.target.value)} min="0"
                  className="w-full px-6 py-4 bg-[#F8F8F6] rounded-[1.25rem] border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,1)] focus:bg-white focus:ring-[3px] focus:ring-inset focus:ring-[#4A5D6A]/20 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.01),0_0_0_1px_#4A5D6A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-medium text-[16px] md:text-[15px] text-[#1A1A1A] hover:bg-[#F2F2F0]"
                />
                <span className="text-[11px] text-[#A0AEB8] font-normal pl-3">Automatic 1.44m² footprint deduction applied</span>
              </div>
            </div>
          </div>

          <hr className="border-[#F0EFEA]" />

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#8B9BA8] ml-2 opacity-80">2. Color Atmosphere</h2>
            
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0 after:content-[''] after:w-4 md:after:w-0">
              {MOOD_PRESETS.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood)}
                  className={`min-w-[200px] md:min-w-0 snap-center p-6 text-left rounded-[1.75rem] bg-white border transition-all duration-[800ms] flex flex-col justify-between h-[135px] md:h-[145px] group ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] ${
                    selectedMood.id === mood.id 
                      ? 'border-[#4A5D6A] ring-1 ring-[#4A5D6A] shadow-[0_16px_40px_rgba(74,93,106,0.12),inset_0_2px_4px_rgba(255,255,255,1)] md:-translate-y-2' 
                      : 'border-[#E8E6E1] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:border-[#D0CECA] md:hover:-translate-y-1'
                  }`}
                >
                  <div className="w-[26px] h-[26px] rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.03)] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" style={{ backgroundColor: mood.hex }} />
                  <div>
                    <p className="text-[12px] font-semibold text-[#1A1A1A] leading-tight">{mood.name}</p>
                    <p className="text-[11px] text-[#8B9BA8] mt-2 font-normal leading-snug truncate max-w-full">{mood.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[#F0EFEA] hidden md:block" />

          <div className="space-y-5 md:space-y-6 pb-8">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#8B9BA8] ml-2 opacity-80">3. Material Planning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              <div className="flex flex-col gap-2 md:gap-3">
                <label className="text-[13px] font-medium text-[#4A5D6A] ml-2">Cost per Liter</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#8B9BA8]">{regionConfig[currency].symbol}</span>
                  <input
                    type="number" value={costPerLiter} onChange={(e) => setCostPerLiter(e.target.value)}
                    className="w-full pl-11 pr-5 py-4 bg-[#F8F8F6] rounded-[1.25rem] border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,1)] focus:bg-white focus:ring-[3px] focus:ring-inset focus:ring-[#4A5D6A]/20 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.01),0_0_0_1px_#4A5D6A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-medium text-[16px] md:text-[15px] text-[#1A1A1A] hover:bg-[#F2F2F0]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <label className="text-[13px] font-medium text-[#4A5D6A] ml-2">Target Finish Quality</label>
                <div className="relative">
                  <select
                    value={coats} onChange={(e) => setCoats(e.target.value)}
                    className="w-full px-6 py-4 bg-[#F8F8F6] rounded-[1.25rem] border-transparent shadow-[inset_0_2px_8px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,1)] focus:bg-white focus:ring-[3px] focus:ring-inset focus:ring-[#4A5D6A]/20 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.01),0_0_0_1px_#4A5D6A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-medium text-[16px] md:text-[14px] text-[#1A1A1A] appearance-none cursor-pointer hover:bg-[#F2F2F0]"
                  >
                    <option value="1">1 Coat (Surface Refresh)</option>
                    <option value="2">2 Coats (Professional Standard)</option>
                    <option value="3">3 Coats (Drastic Restoration)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-[10px] text-[#8B9BA8]">▼</div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Right Sticky Area */}
        <section className="lg:col-span-5 relative self-start md:sticky md:top-10">
          <div className="space-y-8 md:space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both">
            
            <WallVisualizer
              lengthMeters={parsedLength}
              widthMeters={parsedWidth}
              heightMeters={parsedHeight}
              hasDoor={doorsCount > 0}
              hasWindow={windowsCount > 0}
              moodColor={selectedMood.hex}
            />

            <div className="hidden md:flex bg-white rounded-[2.5rem] border border-[#F0EFEA] shadow-[0_24px_80px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-1000 hover:shadow-[0_40px_120px_rgba(74,93,106,0.08)] relative flex-col h-full group/card">
              
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#4A5D6A] to-[#4A5D6A]/20" />

              <div className="p-10 lg:p-12 flex-grow space-y-14">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-wide opacity-90">Architectural Summary</h3>
                
                <div className="space-y-8">
                  <div className="flex justify-between items-baseline border-b border-[#F8F7F5] pb-5">
                    <span className="text-[14px] font-medium text-[#7A8A96]">Optimized Paint Coverage</span>
                    <span className="font-semibold text-[17px] text-[#2C3E50]">{estimate.netPaintableArea.toFixed(1)} sq.m</span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-[#F8F7F5] pb-5">
                    <span className="text-[14px] font-medium text-[#7A8A96]">Calculated Volume</span>
                    <span className="font-semibold text-[17px] text-[#2C3E50]">{estimate.litersRequired.toFixed(1)} Liters</span>
                  </div>

                  <div className="pt-12 pb-4 space-y-6">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#8B9BA8] opacity-80 group-hover/card:text-[#4A5D6A] transition-colors duration-700">Estimated Material Budget</span>
                    
                    <div className="text-[5rem] lg:text-[5.5rem] font-light tracking-tighter text-[#1A1A1A] leading-none transition-all duration-[1500ms] origin-left drop-shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                      {formatCurrency(animatedCost, currency)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF9F6] px-10 lg:px-12 py-8 border-t border-[#F0EFEA] mt-auto">
                <p className="text-[13px] font-medium text-[#7A8A96] leading-relaxed">
                  {coatsCount > 2 
                    ? "Advanced volume assigned for drastic color changes to ensure uniform architectural coverage." 
                    : "Intelligent standard application wastage applied for professional structural results."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Perfection Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-[#F0EFEA] px-6 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,0.04)] z-50 flex justify-between items-center transition-transform">
        <div className="flex flex-col gap-1.5">
           <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B9BA8]">Material Budget</span>
           <span className="text-[2rem] font-light tracking-tight text-[#1A1A1A] leading-none">
             {formatCurrency(animatedCost, currency)}
           </span>
        </div>
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
          className="bg-[#4A5D6A] text-white px-7 py-4 rounded-[1.25rem] text-[13px] font-bold tracking-wide active:scale-95 transition-all shadow-[0_4px_16px_rgba(74,93,106,0.3)] hover:bg-[#3C4C58]"
        >
          Review Plan
        </button>
      </div>

    </div>
  );
}