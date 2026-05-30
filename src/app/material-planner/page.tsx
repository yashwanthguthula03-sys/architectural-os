"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- MOTION INTERPOLATOR FOR SCORES ---
const AnimatedScore = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    let end = value;
    if (start === end) return;
    
    let startTime = performance.now();
    const duration = 1200; 
    
    const animate = (time: number) => {
      let progress = (time - startTime) / duration;
      if (progress < 1) {
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplayValue(Math.round(start + (end - start) * easeProgress));
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    requestAnimationFrame(animate);
  }, [value, displayValue]);

  return <>{displayValue}</>;
};

// --- LAYERED DISCLOSURE COMPONENT ---
const AccordionSection = ({ title, defaultOpen = false, children, t }: { title: string, defaultOpen?: boolean, children: React.ReactNode, t: any }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`border-b ${t.border} py-7 transition-colors duration-[220ms] ease-out group hover:${t.borderHover}`}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className={`w-full flex justify-between items-center text-[15px] font-medium tracking-[0.01em] ${t.textTitle} transition-transform duration-[220ms] ease-out group-hover:translate-x-[2px]`}>
        <span>{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={`${t.textLabel} opacity-60`}>
          {isOpen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
          )}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="pt-7 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- METRIC ITEM COMPONENT ---
const MetricItem = ({ label, value, note, t }: { label: string, value: string | number, note?: string, t: any }) => (
  <div className="mb-8">
    <div className="flex justify-between items-baseline mb-2.5">
      <span className={`text-[12px] uppercase tracking-[0.14em] ${t.textLabel} font-medium transition-colors duration-700`}>{label}</span>
      <span className={`text-[14px] ${t.textTitle} font-medium tracking-tight text-right max-w-[65%] transition-colors duration-700`}>{value}</span>
    </div>
    {note && <p className={`text-[14px] leading-[1.75] ${t.textDesc} font-normal max-w-[48ch] transition-colors duration-700`}>{note}</p>}
  </div>
);

// --- COMPRESSED ARCHITECTURAL INTELLIGENCE ENGINE ---
const MATERIAL_FAMILIES = {
  quiet_expansive: {
    name: "Quiet Expansive",
    description: "Light-diffusing mineral surfaces prioritizing visual expansion.",
    explanation: "Expands perceived volume via high-albedo bouncing.",
    materials: {
      primary: { name: "White European Oak", type: "Wood", visual: "rgb(225, 215, 205)", texture: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" },
      secondary: { name: "Soft Limestone", type: "Stone", visual: "rgb(235, 230, 225)", texture: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')" },
      accent: { name: "Raw Linen", type: "Fabric", visual: "rgb(240, 235, 230)", texture: "url('https://www.transparenttextures.com/patterns/woven-light.png')" }
    },
    comfort: { barefoot: "High", winterHarshness: "Low", thermalSoftness: "Moderate" },
    aging: { primary: "Develops warmer honey undertones over time.", secondary: "Subtle mineral patina formation in humid climates.", accent: "Soft tactile compression after extended use." },
    maintenance: { primary: "Matte oil restoration every 24–36 months.", secondary: "Patch blending recommended over full resealing.", accent: "Low dust retention; dry vacuum only." },
    regionalLogic: { excellent: ["Mediterranean", "Coastal California", "Temperate Urban"], avoid: ["High-humidity tropical environments"] },
    acoustic: { echoReduction: "High", speechSoftening: "Excellent", reverbControl: "Moderate" },
    physics: { durability: { val: 70, note: "Resistant to daily wear; requires periodic sealing." }, reflectivity: { val: "Low", note: "Diffuses light evenly without creating harsh glare." } },
    standards: { porosity: "High", slipResistance: "R10", durabilityClass: "AC3 / Class 23" },
    execution: { complexity: "Moderate", leadTime: "4-6 Weeks", investmentClass: "Premium Residential" },
    relationships: { compatible: ["Chalk Stone", "Pale Ash"], avoid: ["High-gloss Black", "Chrome"] },
    spatial: "Visual Density: Low. Expands perceived volume in compact footprints.",
    useCases: ["Compact Apartments", "Primary Bedrooms", "Coastal Retreats"],
    emotion: ["Light", "Breathable", "Calm"],
    logic: { bestFor: "Low natural light apartments requiring ambient maximization.", avoidIf: "High-traffic commercial entryways." }
  },
  warm_grounded: {
    name: "Warm Grounded",
    description: "Thermally retentive materials with high tactile intimacy.",
    explanation: "Psychological shelter through dense warmth.",
    materials: {
      primary: { name: "Smoked Walnut", type: "Wood", visual: "rgb(70, 55, 45)", texture: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" },
      secondary: { name: "Honed Travertine", type: "Stone", visual: "rgb(215, 205, 195)", texture: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')" },
      accent: { name: "Terracotta Plaster", type: "Mineral", visual: "rgb(180, 120, 100)", texture: "url('https://www.transparenttextures.com/patterns/stardust.png')" }
    },
    comfort: { barefoot: "Moderate", winterHarshness: "Low", thermalSoftness: "High" },
    aging: { primary: "Grains deepen and silver slightly with sustained UV exposure.", secondary: "Pores softly round out, increasing tactile smoothness.", accent: "Cures to a chalky, desaturated matte finish." },
    maintenance: { primary: "Requires oil restoration every 18–24 months.", secondary: "Deep pore extraction required bi-annually.", accent: "Requires breathable, non-acrylic sealants." },
    regionalLogic: { excellent: ["Mediterranean", "South India (Dry Interiors)", "Arid Climates"], avoid: ["Cold, low-light northern climates"] },
    acoustic: { echoReduction: "Moderate", speechSoftening: "Low", reverbControl: "Moderate" },
    physics: { durability: { val: 80, note: "Strong core stability; surface may micro-scratch." }, reflectivity: { val: "Ultra-Low", note: "Absorbs direct light to significantly reduce glare fatigue." } },
    standards: { porosity: "Medium", slipResistance: "R10", durabilityClass: "AC4 / Class 32" },
    execution: { complexity: "High Precision", leadTime: "8-10 Weeks", investmentClass: "Architectural Legacy" },
    relationships: { compatible: ["Heavy Linen", "Aged Bronze"], avoid: ["Chrome Finishes", "Cool LEDs"] },
    spatial: "Visual Density: High. Grounds space but may compress small rooms.",
    useCases: ["Luxury Residence", "Intimate Dining", "Wellness Spaces"],
    emotion: ["Safe", "Intimate", "Slow-paced"],
    logic: { bestFor: "South-facing rooms with harsh direct sunlight.", avoidIf: "Tropical coastal regions requiring thermal dissipation." }
  },
  organic_natural: {
    name: "Organic Natural",
    description: "Biophilic textures prioritizing restorative environmental connections.",
    explanation: "Lowers heart rate through non-synthetic tactility.",
    materials: {
      primary: { name: "Natural Ash Wood", type: "Wood", visual: "rgb(205, 200, 185)", texture: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" },
      secondary: { name: "Limewash Plaster", type: "Mineral", visual: "rgb(215, 218, 205)", texture: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')" },
      accent: { name: "Moss Bouclé", type: "Fabric", visual: "rgb(115, 125, 105)", texture: "url('https://www.transparenttextures.com/patterns/woven-light.png')" }
    },
    comfort: { barefoot: "Excellent", winterHarshness: "None", thermalSoftness: "High" },
    aging: { primary: "Silvers gracefully under prolonged natural light.", secondary: "Develops cloud-like tonal variations tracking humidity.", accent: "Nubs compress slightly, yielding a softer hand-feel." },
    maintenance: { primary: "Dry dusting and occasional hard-wax oiling.", secondary: "Spot-refreshing required for direct water contact.", accent: "High dust retention; regular vacuuming essential." },
    regionalLogic: { excellent: ["Pacific Northwest", "Temperate Forests", "Coastal Humidity"], avoid: ["Harsh, ultra-dry desert environments"] },
    acoustic: { echoReduction: "Excellent", speechSoftening: "High", reverbControl: "High" },
    physics: { durability: { val: 65, note: "Susceptible to heavy impact and moisture pooling." }, reflectivity: { val: "Ultra-Low", note: "Prevents harsh highlights and visual strain." } },
    standards: { porosity: "High", slipResistance: "R10", durabilityClass: "AC2 / Class 22" },
    execution: { complexity: "Moderate", leadTime: "3-5 Weeks", investmentClass: "Accessible Premium" },
    relationships: { compatible: ["Unlacquered Brass", "Jute"], avoid: ["Synthetic Polishes", "Stark White LEDs"] },
    spatial: "Visual Density: Low. Blurs hard architectural boundaries.",
    useCases: ["Wellness Rooms", "Home Offices", "Bedrooms"],
    emotion: ["Restorative", "Biophilic", "Soft"],
    logic: { bestFor: "Dry environments and restorative residential spaces.", avoidIf: "Commercial kitchens or high-spill zones." }
  },
  monolithic_luxury: {
    name: "Monolithic Luxury",
    description: "Continuous mineral surfaces with strong spatial grounding.",
    explanation: "Establishes permanence through uninterrupted planes.",
    materials: {
      primary: { name: "Poured Micro-cement", type: "Composite", visual: "rgb(110, 112, 115)", texture: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')" },
      secondary: { name: "Blackened Steel", type: "Metal", visual: "rgb(30, 32, 35)", texture: "url('https://www.transparenttextures.com/patterns/stardust.png')" },
      accent: { name: "Matte Leather", type: "Fabric", visual: "rgb(50, 40, 35)", texture: "url('https://www.transparenttextures.com/patterns/leather.png')" }
    },
    comfort: { barefoot: "Poor (Requires heat)", winterHarshness: "High", thermalSoftness: "Low" },
    aging: { primary: "Micro-fissures may appear, adding to brutalist authenticity.", secondary: "Oxidizes locally based on touch and ambient moisture.", accent: "Oils from use create a deep, burnished patina." },
    maintenance: { primary: "Requires polyurethane top-coat resealing every 5 years.", secondary: "Must be treated with museum wax to prevent rust.", accent: "Requires annual conditioning to prevent cracking." },
    regionalLogic: { excellent: ["Humid Subtropical", "Urban Industrial", "Tropical"], avoid: ["Unheated Northern Climates"] },
    acoustic: { echoReduction: "Low", speechSoftening: "Poor", reverbControl: "Low" },
    physics: { durability: { val: 95, note: "Exceptional structural hardness and impact resistance." }, reflectivity: { val: "Low", note: "Matte finish disperses light evenly." } },
    standards: { porosity: "Sealed/Low", slipResistance: "R9", durabilityClass: "AC5 / Class 33" },
    execution: { complexity: "Specialist Required", leadTime: "4-6 Weeks", investmentClass: "Architectural Grade" },
    relationships: { compatible: ["Smoked Glass", "Cashmere"], avoid: ["Warm Traditional Woods", "High-gloss Acrylics"] },
    spatial: "Visual Density: High. Defines boundaries firmly.",
    useCases: ["Gallery Spaces", "Executive Office", "Open-Plan Lofts"],
    emotion: ["Permanent", "Restrained", "Architectural"],
    logic: { bestFor: "High-traffic structural areas and humid climates.", avoidIf: "Spaces requiring ambient acoustic dampening." }
  },
  contemporary_light: {
    name: "Contemporary Light",
    description: "High-albedo mineral and technical finishes for precise environments.",
    explanation: "Clinical clarity and gallery-like expansion through highly reflective surfaces.",
    materials: {
      primary: { name: "Pale Concrete", type: "Composite", visual: "rgb(220, 222, 225)", texture: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')" },
      secondary: { name: "Silvered Oak", type: "Wood", visual: "rgb(200, 202, 205)", texture: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" },
      accent: { name: "Brushed Nickel", type: "Metal", visual: "rgb(190, 195, 200)", texture: "url('https://www.transparenttextures.com/patterns/brushed-alum.png')" }
    },
    comfort: { barefoot: "Moderate", winterHarshness: "High", thermalSoftness: "Low" },
    aging: { primary: "Concrete requires periodic structural sealing.", secondary: "Retains color stability without silvering.", accent: "Metals retain high polish if maintained." },
    maintenance: { primary: "Sealed surfaces are easy to sanitize.", secondary: "Light dusting and damp mopping.", accent: "Requires glass/metal cleaners to avoid streaking." },
    regionalLogic: { excellent: ["Urban Metropolis", "High-rise Residential", "Overcast Climates"], avoid: ["Equatorial Sun exposure"] },
    acoustic: { echoReduction: "Low", speechSoftening: "Low", reverbControl: "Poor" },
    physics: { durability: { val: 85, note: "Highly resistant to impact and scratching." }, reflectivity: { val: "High", note: "Bounces natural light deep into the space." } },
    standards: { porosity: "Sealed", slipResistance: "R9", durabilityClass: "AC4 / Class 32" },
    execution: { complexity: "High Precision", leadTime: "6-8 Weeks", investmentClass: "Architectural Premium" },
    relationships: { compatible: ["Frosted Glass", "White Ash", "Matte Acrylic"], avoid: ["Heavy Rustic Brick", "Terracotta", "Warm Leathers"] },
    spatial: "Visual Density: Ultra-Low. Maximizes light distribution.",
    useCases: ["Urban Lofts", "Minimalist Retail", "Creative Studios"],
    emotion: ["Minimal", "Urban", "Precise"],
    logic: { bestFor: "Northern exposure and artificially lit modern spaces.", avoidIf: "Acoustically sensitive spaces like bedrooms or recording rooms." }
  }
};

export default function MaterialPlanner() {
  const router = useRouter();
  
  // --- Tonal Layering Theme Engine ---
  const [isLight, setIsLight] = useState(true);

  const t = useMemo(() => ({
    bg: isLight ? "bg-[#F6F3EE]" : "bg-[#0a0908]",
    sidebar: isLight ? "bg-[#EFECE6]" : "bg-[#0a0908]",
    border: isLight ? "border-black/[0.05]" : "border-white/[0.05]",
    borderHover: isLight ? "border-black/[0.12]" : "border-white/[0.12]",
    textPrimary: isLight ? "text-[#1D1D1F]" : "text-white/[0.92]",
    textTitle: isLight ? "text-[#1D1D1F]/90" : "text-white/[0.88]",
    textDesc: isLight ? "text-[#1D1D1F]/60" : "text-white/[0.58]",
    textLabel: isLight ? "text-[#1D1D1F]/40" : "text-white/[0.42]",
    surface: isLight ? "bg-[#FBF9F5]" : "bg-white/[0.02]",
    surfaceHover: isLight ? "hover:bg-[#F2EDE4]" : "hover:bg-white/[0.04]",
    cardShadow: isLight ? "shadow-[0_40px_100px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,0,0,0.02),inset_0_0_0_0.5px_rgba(255,255,255,0.6)]" : "shadow-[0_40px_100px_rgba(0,0,0,0.8),0_4px_24px_rgba(0,0,0,0.4),inset_0_0_0_0.5px_rgba(255,255,255,0.1)]",
    goodText: isLight ? "text-[#6F8A72]" : "text-[#8BA68E]",
    goodBg: isLight ? "bg-[#6F8A72]" : "bg-[#8BA68E]",
    severeText: isLight ? "text-[#C26D6D]" : "text-[#d67d7d]",
    severeBox: isLight ? "bg-[#FCF9F9] border-[#E8D5D5]" : "bg-[#241111]/40 border-[#3d1a1a]/50",
    warnText: isLight ? "text-[#B88A44]" : "text-[#d6b07d]",
    warnBox: isLight ? "bg-[#FCFAF5] border-[#E8DFD5]" : "bg-[#2b1d0c]/40 border-[#4a3311]/50",
    activeGlow: isLight ? "bg-[#1D1D1F]" : "bg-white/[0.92]",
    inputBg: isLight ? "bg-transparent text-[#1D1D1F]" : "bg-transparent text-white/[0.92]"
  }), [isLight]);

  const [activeFamilyKey, setActiveFamilyKey] = useState<keyof typeof MATERIAL_FAMILIES>("quiet_expansive");
  const [roomType, setRoomType] = useState("Primary Bedroom");
  const [climate, setClimate] = useState("Humid / Tropical");
  const [lightExposure, setLightExposure] = useState("North Facing (Indirect)");

  const activeData = MATERIAL_FAMILIES[activeFamilyKey];

  const diagnosticData = useMemo(() => {
    let score = 95; 
    let alerts: Array<{level: string, title: string, message: string}> = [];

    if (climate === "Humid / Tropical" && activeData.regionalLogic.avoid.includes("High-humidity tropical environments")) {
      score -= 25;
      alerts.push({ level: "severe", title: "Humidity Degradation Risk", message: "High-porosity woods and untreated metals will degrade rapidly in tropical coastal humidity." });
    } else if (climate === "Cold / Northern" && activeData.comfort.barefoot.includes("Poor")) {
      score -= 20;
      alerts.push({ level: "severe", title: "Thermal Dissonance", message: "Monolithic cold surfaces require integrated radiant floor heating to prevent physical discomfort in northern climates." });
    }

    if (roomType === "Compact Apartment" && activeData.spatial.includes("High")) {
      score -= 15;
      alerts.push({ level: "caution", title: "Spatial Compression", message: "High visual density materials visually compress compact footprints below 400 sq ft." });
    }
    if (roomType === "Compact Apartment" && activeData.acoustic.echoReduction === "Low") {
      alerts.push({ level: "caution", title: "Acoustic Warning", message: "High-density reflective surfaces increase echo fatigue in compact or studio apartments." });
    }

    if (lightExposure === "South Facing (Direct)") {
      if (activeData.physics.reflectivity.val === "High") {
        score -= 30;
        alerts.push({ level: "severe", title: "Glare Fatigue Potential", message: "High-albedo surfaces combined with direct southern light will significantly increase visual glare fatigue." });
      }
    }

    score = Math.max(0, Math.min(100, score));
    return { score, alerts };
  }, [activeData, roomType, climate, lightExposure]);

  const cinematicEase = [0.22, 1, 0.36, 1];
  const transitionDuration = 1.2;

  return (
    <div className={`flex flex-col lg:flex-row h-screen w-screen overflow-hidden ${t.bg} font-sans transition-colors duration-[1.2s] ease-out selection:bg-black/10 dark:selection:bg-white/20`} style={{ WebkitFontSmoothing: 'antialiased', textRendering: 'optimizeLegibility' }}>
      
      {/* --- STANDARD UI LAYER --- */}
      <div className="flex flex-col lg:flex-row h-full w-full print:hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className={`hidden lg:flex w-60 border-r ${t.border} flex-col justify-between z-10 ${t.sidebar} shrink-0 relative overflow-y-auto no-scrollbar transition-colors duration-[1.2s] ease-out`}>
          <div className="p-8">
            <div className="mb-16">
              <h1 className={`text-[13px] font-medium tracking-tight ${t.textTitle} mb-2 transition-colors duration-700`}>Architectural OS</h1>
              <h2 className={`text-[10px] uppercase tracking-[0.14em] ${t.textLabel} font-medium transition-colors duration-700`}>Decision Intelligence</h2>
            </div>
            
            <div className={`mb-12 border-b ${t.border} pb-10 transition-colors duration-700`}>
              <h3 className={`text-[10px] uppercase tracking-[0.14em] ${t.textLabel} mb-6 font-medium px-2 transition-colors duration-700`}>Ecosystem</h3>
              <div className="flex flex-col gap-1">
                <button onClick={() => router.push('/color-studio')} className={`w-full text-left px-2 py-2.5 text-[14px] font-normal tracking-tight ${t.textDesc} hover:${t.textTitle} transition-colors duration-500`}><span className="opacity-30 mr-4">⚬</span> Color Studio</button>
                <button className={`w-full text-left px-2 py-2.5 text-[14px] font-medium tracking-tight ${t.textTitle} transition-colors duration-500 flex items-center relative`}>
                  <div className={`absolute left-[-4px] w-[2px] h-3 ${t.activeGlow} rounded-full transition-colors duration-500`}></div> 
                  Material Planner
                </button>
                <button className={`w-full text-left px-2 py-2.5 text-[14px] font-normal tracking-tight ${t.textDesc} opacity-40 cursor-not-allowed transition-colors duration-500`}><span className="opacity-30 mr-4">⚬</span> Lighting System</button>
                <button onClick={() => router.push('/')} className={`w-full text-left px-2 py-2.5 mt-5 text-[14px] font-normal tracking-tight ${t.textDesc} hover:${t.textTitle} transition-colors duration-500`}><span className="opacity-30 mr-4">⚬</span> Active Projects</button>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h4 className={`text-[10px] uppercase tracking-[0.14em] ${t.textLabel} mb-6 font-medium px-2 transition-colors duration-700`}>Material Systems</h4>
                <div className="flex flex-col gap-2 relative">
                  {(Object.keys(MATERIAL_FAMILIES) as Array<keyof typeof MATERIAL_FAMILIES>).map((key) => (
                    <button 
                      key={key} 
                      onClick={() => setActiveFamilyKey(key)} 
                      className={`text-left px-2 py-2 text-[14px] transition-all duration-500 rounded-lg relative ${activeFamilyKey === key ? `font-medium ${t.textTitle} tracking-[-0.01em]` : `font-normal ${t.textDesc} hover:${t.textTitle} tracking-tight`}`}
                    >
                      {activeFamilyKey === key && (
                        <motion.div layoutId="sidebarGlow" className={`absolute left-[-16px] top-1/2 -translate-y-1/2 w-[3px] h-1.5 ${t.activeGlow} rounded-full blur-[1px]`} transition={{ type: "spring", stiffness: 300, damping: 35 }} />
                      )}
                      {MATERIAL_FAMILIES[key].name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto lg:overflow-hidden relative z-0">
          
          <header className={`h-20 border-b ${t.border} flex items-center justify-between px-10 shrink-0 ${isLight ? 'bg-[#F6F3EE]/80' : 'bg-[#0a0908]/80'} backdrop-blur-xl sticky top-0 z-50 transition-colors duration-[1.2s] ease-out`}>
            <div className={`hidden lg:block text-[10px] uppercase tracking-[0.14em] ${t.textLabel} font-medium transition-colors duration-700`}>Workspace <span className="mx-3 opacity-40">/</span> Ecosystem <span className="mx-3 opacity-40">/</span> <span className={`${t.textTitle}`}>Material Planner</span></div>
            <div className={`lg:hidden text-[13px] font-medium tracking-tight ${t.textTitle}`}>Material Planner</div>
            
            <div className="flex items-center gap-5">
              <button onClick={() => setIsLight(!isLight)} className={`text-[10px] uppercase tracking-[0.14em] font-medium px-5 py-2.5 rounded-lg transition-colors border ${t.border} ${t.textDesc} ${t.surfaceHover}`}>
                {isLight ? "Night Mode" : "Day Mode"}
              </button>
              <div className={`w-[1px] h-5 ${t.border} hidden md:block mx-3 transition-colors duration-700`} />
              <button onClick={() => window.print()} className={`hidden md:flex text-[10px] uppercase tracking-[0.14em] font-medium px-5 py-2.5 rounded-lg transition-opacity duration-[120ms] ease-out opacity-100 hover:opacity-60 ${t.textDesc}`}>
                Export Spec
              </button>
            </div>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row p-6 lg:p-10 gap-8 lg:gap-14 overflow-y-visible lg:overflow-hidden relative z-0">
            
            {/* MOBILE ONLY: SYSTEM SELECTOR */}
            <div className="lg:hidden w-full flex-none overflow-x-auto no-scrollbar pb-2 order-1">
              <div className="flex gap-4">
                 {(Object.keys(MATERIAL_FAMILIES) as Array<keyof typeof MATERIAL_FAMILIES>).map((key) => (
                    <button key={key} onClick={() => setActiveFamilyKey(key)} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] font-medium tracking-tight transition-colors ${activeFamilyKey === key ? `${t.surface} ${t.textTitle}` : `bg-transparent ${t.textDesc} border ${t.border}`}`}>
                      {MATERIAL_FAMILIES[key].name}
                    </button>
                 ))}
              </div>
            </div>

            {/* LEFT: SPATIAL CONDITIONS (CONCEPTUAL ANCHOR) */}
            <div className="w-full lg:w-60 flex-none flex flex-col gap-14 lg:pt-2 overflow-y-visible lg:overflow-y-auto no-scrollbar lg:pb-12 order-2">
              
              <div className="mb-2">
                 <h2 className={`text-[15px] font-medium tracking-tight ${t.textTitle} mb-3 transition-colors duration-700`}>Material Intelligence</h2>
                 <p className={`text-[13px] leading-[1.6] ${t.textDesc} max-w-[26ch] transition-colors duration-700`}>Architectural material ecosystems for climate, comfort, and atmosphere.</p>
              </div>

              <div>
                <h3 className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} opacity-60 mb-8 border-b ${t.border} pb-4 font-medium transition-colors duration-700`}>Environmental Context</h3>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <label className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} font-medium transition-colors duration-700`}>Room Typology</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className={`border-b ${t.border} text-[16px] pb-3 focus:outline-none cursor-pointer appearance-none font-medium tracking-tight transition-colors duration-700 ${t.inputBg}`}>
                      <option className="bg-[#121110] text-[#d2d2d7]">Living Space</option>
                      <option className="bg-[#121110] text-[#d2d2d7]">Primary Bedroom</option>
                      <option className="bg-[#121110] text-[#d2d2d7]">Compact Apartment</option>
                      <option className="bg-[#121110] text-[#d2d2d7]">Primary Bathroom</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} font-medium transition-colors duration-700`}>Climate Zone</label>
                    <select value={climate} onChange={(e) => setClimate(e.target.value)} className={`border-b ${t.border} text-[16px] pb-3 focus:outline-none cursor-pointer appearance-none font-medium tracking-tight transition-colors duration-700 ${t.inputBg}`}>
                      <option className="bg-[#121110] text-[#d2d2d7]">Moderate / Temperate</option>
                      <option className="bg-[#121110] text-[#d2d2d7]">Humid / Tropical</option>
                      <option className="bg-[#121110] text-[#d2d2d7]">Cold / Northern</option>
                      <option className="bg-[#121110] text-[#d2d2d7]">South India (Dry Interiors)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} font-medium transition-colors duration-700`}>Light Exposure</label>
                    <select value={lightExposure} onChange={(e) => setLightExposure(e.target.value)} className={`border-b ${t.border} text-[16px] pb-3 focus:outline-none cursor-pointer appearance-none font-medium tracking-tight transition-colors duration-700 ${t.inputBg}`}>
                      <option className="bg-[#121110] text-[#d2d2d7]">North Facing (Indirect)</option>
                      <option className="bg-[#121110] text-[#d2d2d7]">South Facing (Direct)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} opacity-60 mb-8 border-b ${t.border} pb-4 font-medium transition-colors duration-700`}>Material Typology</h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeData.name}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.8, ease: cinematicEase }}
                  >
                    <p className={`text-[15px] leading-[1.8] ${t.textTitle} opacity-90 font-normal mb-6 max-w-[26ch] transition-colors duration-700`}>
                      "{activeData.description}"
                    </p>
                    <p className={`text-[14px] leading-[1.75] ${t.textDesc} font-normal max-w-[26ch] transition-colors duration-700`}>
                      {activeData.explanation}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* CENTER: TEXTURAL SIMULATION CARD */}
            <div className="w-full h-[55vh] lg:h-full lg:flex-1 relative flex-none lg:flex-auto group order-3 z-10 lg:-translate-x-[18px]">
              
              <div className={`absolute -inset-16 blur-[100px] rounded-full opacity-50 z-0 pointer-events-none transition-colors duration-[1.5s] ease-out ${isLight ? 'bg-[#F2EFE8]' : 'bg-transparent'}`}></div>

              <div className={`absolute inset-0 rounded-[28px] overflow-hidden border ${t.border} ${t.surface} flex flex-col ${t.cardShadow} transition-all duration-[1.5s] ease-out group-hover:scale-[1.01] group-hover:shadow-[0_60px_140px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.04)] z-10`}>
                
                <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${isLight ? 'from-white/40' : 'from-white/5'} to-transparent pointer-events-none z-20 transition-colors duration-1000`}></div>

                {/* Primary Material */}
                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeData.materials.primary.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: transitionDuration, ease: cinematicEase }} className="absolute inset-0" style={{ backgroundColor: activeData.materials.primary.visual }}>
                      <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.35] mix-blend-multiply dark:mix-blend-overlay pointer-events-none" style={{ backgroundImage: activeData.materials.primary.texture, backgroundSize: 'cover' }}></div>
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10 transition-colors duration-1000 backdrop-blur-[2px]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 100%)" }}></div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div key={activeData.materials.primary.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.8, ease: cinematicEase }} className="absolute bottom-[108px] left-10 right-6 z-20 w-auto text-left">
                       <p className={`text-[10px] uppercase tracking-[0.18em] text-white/[0.72] mb-3 font-medium transition-colors duration-1000`} style={{ textShadow: "0 1px 12px rgba(0,0,0,0.2)" }}>Primary Mass · {activeData.materials.primary.type}</p>
                       <p className="text-[24px] font-medium tracking-tight text-white leading-[1.2] transition-colors duration-1000" style={{ textShadow: "0 1px 16px rgba(0,0,0,0.2)" }}>{activeData.materials.primary.name}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="h-[45%] flex relative z-0">
                  {/* Secondary Material (Asymmetrical Split: 1.08) */}
                  <div className="relative overflow-hidden" style={{ flex: 1.08 }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={activeData.materials.secondary.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: transitionDuration, ease: cinematicEase }} className="absolute inset-0" style={{ backgroundColor: activeData.materials.secondary.visual }}>
                        <div className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45] mix-blend-multiply dark:mix-blend-overlay pointer-events-none" style={{ backgroundImage: activeData.materials.secondary.texture, backgroundSize: 'cover' }}></div>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className={`absolute right-0 top-0 bottom-0 w-[1px] ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.04]'} z-20`}></div>

                    <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10 transition-colors duration-1000 backdrop-blur-[2px]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 100%)" }}></div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div key={activeData.materials.secondary.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.8, ease: cinematicEase }} className="absolute bottom-[26px] left-10 right-6 z-20 w-full max-w-[80%] text-left">
                         <p className={`text-[10px] uppercase tracking-[0.1em] text-white/[0.72] mb-2 font-medium leading-[1.5] transition-colors duration-1000`} style={{ textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}>Secondary · {activeData.materials.secondary.type}</p>
                         <p className="text-[16px] font-medium tracking-tight text-white leading-[1.35] transition-colors duration-1000" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.2)" }}>{activeData.materials.secondary.name}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Accent Material (Asymmetrical Split: 0.92) */}
                  <div className="relative overflow-hidden" style={{ flex: 0.92 }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={activeData.materials.accent.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: transitionDuration, ease: cinematicEase }} className="absolute inset-0" style={{ backgroundColor: activeData.materials.accent.visual }}>
                        <div className="absolute inset-0 opacity-[0.45] dark:opacity-[0.55] mix-blend-multiply dark:mix-blend-overlay pointer-events-none" style={{ backgroundImage: activeData.materials.accent.texture, backgroundSize: 'cover' }}></div>
                        <div className="absolute inset-0 shadow-[inset_0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_10px_40px_rgba(0,0,0,0.3)] pointer-events-none z-10"></div>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10 transition-colors duration-1000 backdrop-blur-[2px]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 100%)" }}></div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div key={activeData.materials.accent.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.8, ease: cinematicEase }} className="absolute bottom-[26px] left-8 right-6 z-20 w-full max-w-[80%] text-left">
                         <p className={`text-[10px] uppercase tracking-[0.1em] text-white/[0.72] mb-2 font-medium leading-[1.5] transition-colors duration-1000`} style={{ textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}>Accent · {activeData.materials.accent.type}</p>
                         <p className="text-[16px] font-medium tracking-tight text-white leading-[1.35] transition-colors duration-1000" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.2)" }}>{activeData.materials.accent.name}</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT: LAYERED INTELLIGENCE */}
            <div className="w-full lg:w-[350px] flex-none flex flex-col gap-10 lg:pl-10 lg:pt-4 overflow-y-visible lg:overflow-y-auto no-scrollbar pb-24 lg:pb-12 order-4">
              
              {/* Overall Compatibility Score */}
              <div className="mb-6">
                <h3 className={`text-[12px] uppercase tracking-[0.12em] ${t.textLabel} mb-10 font-medium transition-colors duration-700`}>System Compatibility</h3>
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className={`text-[12px] uppercase tracking-[0.14em] ${t.textLabel} font-medium transition-colors duration-700`}>Spatial Alignment</span>
                    <span className={`text-[16px] font-medium tracking-tight ${diagnosticData.score >= 80 ? t.goodText : diagnosticData.score >= 50 ? t.textTitle : t.severeText} transition-colors duration-700`}>
                      <AnimatedScore value={diagnosticData.score} /> / 100
                    </span>
                  </div>
                  <div className={`w-full h-[3px] ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.04]'} rounded-full overflow-hidden mb-2 transition-colors duration-700`}>
                    <motion.div className={`h-full ${diagnosticData.score >= 80 ? t.goodBg : diagnosticData.score >= 50 ? (isLight ? 'bg-[#a1a1a6]' : 'bg-white/[0.38]') : t.severeText}`} initial={{ width: 0 }} animate={{ width: `${diagnosticData.score}%` }} transition={{ duration: 1.2, ease: cinematicEase }} />
                  </div>
                </div>
              </div>

              {/* Dynamic Warnings */}
              <AnimatePresence>
                {diagnosticData.alerts.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-5 mb-8">
                    {diagnosticData.alerts.map((alert, i) => (
                      <div key={i} className={`p-8 border rounded-[16px] ${alert.level === "severe" ? t.severeBox : t.warnBox} transition-colors duration-700`}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-[10px] uppercase tracking-[0.18em] font-medium ${alert.level === "severe" ? t.severeText : t.warnText}`}>{alert.title}</span>
                        </div>
                        <p className={`text-[14px] leading-[1.8] ${t.textTitle} font-normal max-w-[42ch]`}>{alert.message}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LAYER 1: Spatial & Emotional Identity */}
              <AccordionSection title="Spatial & Emotional Identity" defaultOpen={true} t={t}>
                <div className="space-y-12">
                  <div>
                    <span className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} block mb-6 font-medium transition-colors duration-700`}>Emotional Response</span>
                    <div className="flex flex-wrap gap-4">
                      <AnimatePresence mode="wait">
                        <motion.div key={activeData.name} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.8, ease: cinematicEase }} className="flex flex-wrap gap-3">
                          {activeData.emotion.map((f, i) => (
                            <span key={i} className={`px-5 py-2.5 border ${isLight ? 'border-black/[0.04]' : 'border-white/[0.06]'} rounded-[18px] text-[12px] capitalize tracking-[0.02em] ${t.textTitle} bg-white/[0.01] font-medium transition-colors duration-700`}>{f}</span>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeData.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: cinematicEase }} className="space-y-12">
                      <MetricItem label="Spatial Volume Logic" value={activeData.spatial.split('.')[0]} note={activeData.spatial.split('. ')[1]} t={t} />
                      <MetricItem label="Common Applications" value={activeData.useCases.join(", ")} t={t} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </AccordionSection>

              {/* LAYER 2: Tactile & Acoustic Comfort */}
              <AccordionSection title="Human Comfort & Acoustics" t={t}>
                <div className="space-y-6">
                  <MetricItem label="Barefoot Comfort" value={activeData.comfort.barefoot} t={t} />
                  <MetricItem label="Winter Harshness" value={activeData.comfort.winterHarshness} t={t} />
                  <MetricItem label="Thermal Softness" value={activeData.comfort.thermalSoftness} t={t} />
                  <div className={`h-px ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.04]'} my-10 transition-colors duration-700`} />
                  <MetricItem label="Echo Reduction" value={activeData.acoustic.echoReduction} t={t} />
                  <MetricItem label="Speech Softening" value={activeData.acoustic.speechSoftening} t={t} />
                  <MetricItem label="Reverb Control" value={activeData.acoustic.reverbControl} t={t} />
                </div>
              </AccordionSection>

              {/* LAYER 3: Aging & Maintenance Profile */}
              <AccordionSection title="Aging & Maintenance Profile" t={t}>
                <div className="space-y-12">
                  <div>
                    <span className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} block mb-8 font-medium transition-colors duration-700`}>Aging Profile</span>
                    <MetricItem label={activeData.materials.primary.name} value="" note={activeData.aging.primary} t={t} />
                    <MetricItem label={activeData.materials.secondary.name} value="" note={activeData.aging.secondary} t={t} />
                    <MetricItem label={activeData.materials.accent.name} value="" note={activeData.aging.accent} t={t} />
                  </div>
                  <div className={`pt-6 border-t ${t.border} transition-colors duration-700`}>
                    <span className={`text-[11px] uppercase tracking-[0.18em] ${t.textLabel} block mb-8 mt-5 font-medium transition-colors duration-700`}>Long-Term Maintenance</span>
                    <MetricItem label="Wood / Mass" value="" note={activeData.maintenance.primary} t={t} />
                    <MetricItem label="Stone / Mineral" value="" note={activeData.maintenance.secondary} t={t} />
                    <MetricItem label="Fabric / Accent" value="" note={activeData.maintenance.accent} t={t} />
                  </div>
                </div>
              </AccordionSection>

              {/* LAYER 4: Regional & Environmental Logic */}
              <AccordionSection title="Regional Climate Logic" t={t}>
                <div className="space-y-12">
                  <div>
                    <span className={`text-[11px] uppercase tracking-[0.18em] ${t.goodText} block mb-5 font-medium transition-colors duration-700`}>✓ Excellent Compatibility</span>
                    <ul className={`text-[14px] ${t.textTitle} space-y-3 font-normal leading-[1.8] transition-colors duration-700`}>
                      {activeData.regionalLogic.excellent.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className={`text-[11px] uppercase tracking-[0.18em] ${t.severeText} block mb-5 font-medium transition-colors duration-700`}>⚠ Avoid Application In</span>
                    <ul className={`text-[14px] ${t.textTitle} space-y-3 font-normal leading-[1.8] transition-colors duration-700`}>
                      {activeData.regionalLogic.avoid.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                </div>
              </AccordionSection>

              {/* LAYER 5: Standards & Execution */}
              <AccordionSection title="Execution & Standards" t={t}>
                <div className="space-y-6">
                  <MetricItem label="Installation" value={activeData.execution.complexity} t={t} />
                  <MetricItem label="Standard Lead Time" value={activeData.execution.leadTime} t={t} />
                  <MetricItem label="Investment Class" value={activeData.execution.investmentClass} t={t} />
                  <div className={`h-px ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.04]'} my-10 transition-colors duration-700`} />
                  <MetricItem label="Slip Resistance" value={activeData.standards.slipResistance} t={t} />
                  <MetricItem label="Durability Rating" value={activeData.standards.durabilityClass} t={t} />
                  <div className={`pt-10 mt-6 border-t ${t.border} transition-colors duration-700`}>
                    <span className={`text-[11px] uppercase tracking-[0.18em] ${t.goodText} block mb-5 font-medium transition-colors duration-700`}>✓ Compatible Pairings</span>
                    <span className={`text-[14px] ${t.textTitle} font-normal leading-[1.8] transition-colors duration-700`}>{activeData.relationships.compatible.join(", ")}</span>
                  </div>
                </div>
              </AccordionSection>

            </div>
          </div>
        </main>
      </div>

      {/* --- HIDDEN EXECUTION LAYER (ONLY VISIBLE ON PDF PRINT) --- */}
      <div className="hidden print:block print:absolute print:inset-0 print:bg-white print:text-black print:font-sans print:p-12 print:z-[100]">
        
        {/* Document Header */}
        <div className="border-b-2 border-black pb-6 mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-[0.1em] mb-1">Architectural OS</h1>
            <h2 className="text-xs uppercase tracking-[0.08em] text-gray-500">Material Specification & Spatial Intelligence Sheet</h2>
          </div>
          <div className="text-right text-xs text-gray-500 uppercase tracking-[0.08em]">
            Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Spatial Target (From the Engine) */}
        <div className="grid grid-cols-3 gap-6 mb-12 p-6 bg-gray-50 rounded border border-gray-200">
          <div>
             <p className="text-[9px] uppercase tracking-[0.08em] text-gray-400 mb-1 font-medium">Target Topology</p>
             <p className="text-sm font-medium">{roomType}</p>
          </div>
          <div>
             <p className="text-[9px] uppercase tracking-[0.08em] text-gray-400 mb-1 font-medium">Exposure Target</p>
             <p className="text-sm font-medium">{lightExposure}</p>
          </div>
          <div>
             <p className="text-[9px] uppercase tracking-[0.08em] text-gray-400 mb-1 font-medium">Climate Condition</p>
             <p className="text-sm font-medium">{climate}</p>
          </div>
        </div>

        {/* Core Material System */}
        <h3 className="text-[10px] uppercase tracking-[0.08em] text-gray-500 mb-4 border-b border-gray-200 pb-2 font-medium">Material Selections: {activeData.name}</h3>
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gray-300 relative" style={{backgroundColor: activeData.materials.primary.visual, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
               <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{ backgroundImage: activeData.materials.primary.texture, backgroundSize: 'cover' }}></div>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.08em] text-gray-500 font-medium">Primary Mass ({activeData.materials.primary.type})</p>
              <p className="text-sm font-medium">{activeData.materials.primary.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gray-300 relative" style={{backgroundColor: activeData.materials.secondary.visual, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
                <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{ backgroundImage: activeData.materials.secondary.texture, backgroundSize: 'cover' }}></div>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.08em] text-gray-500 font-medium">Secondary ({activeData.materials.secondary.type})</p>
              <p className="text-sm font-medium">{activeData.materials.secondary.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gray-300 relative" style={{backgroundColor: activeData.materials.accent.visual, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}>
                <div className="absolute inset-0 opacity-50 mix-blend-overlay" style={{ backgroundImage: activeData.materials.accent.texture, backgroundSize: 'cover' }}></div>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.08em] text-gray-500 font-medium">Accent ({activeData.materials.accent.type})</p>
              <p className="text-sm font-medium">{activeData.materials.accent.name}</p>
            </div>
          </div>
        </div>

        {/* Intelligence Data */}
        <div className="grid grid-cols-2 gap-10 mb-12">
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.08em] text-gray-500 mb-4 border-b border-gray-200 pb-2 font-medium">Human Comfort & Acoustics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong className="block text-[9px] uppercase tracking-[0.08em] text-gray-400">Barefoot Comfort</strong> {activeData.comfort.barefoot}</div>
                <div><strong className="block text-[9px] uppercase tracking-[0.08em] text-gray-400">Thermal Softness</strong> {activeData.comfort.thermalSoftness}</div>
                <div><strong className="block text-[9px] uppercase tracking-[0.08em] text-gray-400">Echo Reduction</strong> {activeData.acoustic.echoReduction}</div>
                <div><strong className="block text-[9px] uppercase tracking-[0.08em] text-gray-400">Reverb Control</strong> {activeData.acoustic.reverbControl}</div>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.08em] text-gray-500 mb-4 border-b border-gray-200 pb-2 font-medium">Execution & Maintenance</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong className="block text-[9px] uppercase tracking-[0.08em] text-gray-400">Installation</strong> {activeData.execution.complexity}</div>
                <div><strong className="block text-[9px] uppercase tracking-[0.08em] text-gray-400">Investment Class</strong> {activeData.execution.investmentClass}</div>
                <div className="col-span-2"><strong className="block text-[9px] uppercase tracking-[0.08em] text-gray-400">Primary Maintenance</strong> {activeData.maintenance.primary}</div>
            </div>
          </div>
        </div>

        {/* Regional & Aging Notes */}
        <h3 className="text-[10px] uppercase tracking-[0.08em] text-gray-500 mb-4 border-b border-gray-200 pb-2 font-medium">Regional Logic & Aging Profile</h3>
        <div className="space-y-6 text-sm">
          <div className="grid grid-cols-[150px_1fr] gap-4">
            <strong className="text-gray-900 uppercase text-[9px] tracking-[0.08em] mt-1 text-green-700">Excellent Climate Fit</strong>
            <p className="text-gray-700 leading-relaxed font-medium">{activeData.regionalLogic.excellent.join(", ")}</p>
          </div>
          <div className="grid grid-cols-[150px_1fr] gap-4">
            <strong className="text-gray-900 uppercase text-[9px] tracking-[0.08em] mt-1 text-red-700">Avoid Climate</strong>
            <p className="text-gray-700 leading-relaxed font-medium">{activeData.regionalLogic.avoid.join(", ")}</p>
          </div>
          <div className="grid grid-cols-[150px_1fr] gap-4 pt-4 border-t border-gray-100">
            <strong className="text-gray-900 uppercase text-[9px] tracking-[0.08em] mt-1">Material Aging</strong>
            <ul className="text-gray-700 leading-relaxed space-y-2">
              <li><strong>{activeData.materials.primary.name}:</strong> {activeData.aging.primary}</li>
              <li><strong>{activeData.materials.secondary.name}:</strong> {activeData.aging.secondary}</li>
            </ul>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12 border-t border-gray-200 pt-4 flex justify-between text-[8px] uppercase tracking-[0.08em] text-gray-400 font-medium">
          <span>Generated by Architectural OS Material Planner</span>
          <span>Not for final construction without local architect verification</span>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media print {
          body { background: white !important; }
        }
      `}} />
    </div>
  );
}