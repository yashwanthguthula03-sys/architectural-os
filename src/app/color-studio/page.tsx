"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";

// The Complete Architectural Intelligence Engine
const ARCHITECTURAL_INTELLIGENCE = {
  // 1. QUIET EXPANSIVE
  nordic_minimal: { 
    family: "Quiet Expansive", name: "Nordic Minimal", 
    wall: "#EAE7E0", accent: "#8A928D", floor: "#C8BDB2", temp: 4000, finish: "Matte",
    compatibility: { smallRooms: 94, lowLight: 88, warmClimate: 60, modernLuxury: 85 },
    feel: ["Airy", "Focused", "Visually Quiet", "Expansive"],
    logic: { flooring: "Demands light, continuous flooring (White Oak, Ash). Dark floors reduce perceived openness and compress room height.", light: "Maximizes minimal daylight through high-albedo bouncing. Stabilizes cold, northern light.", bestFor: "Low natural light apartments and compact spatial footprints.", avoidIf: "High-traffic environments or rooms with existing heavy, dark flooring." },
    materials: ["White Oak", "Brushed Nickel", "Linen"] 
  },
  soft_limestone: { 
    family: "Quiet Expansive", name: "Soft Limestone", 
    wall: "#E5E2D9", accent: "#A39E93", floor: "#C4C0B5", temp: 3500, finish: "Plaster",
    compatibility: { smallRooms: 90, lowLight: 80, warmClimate: 70, modernLuxury: 92 },
    feel: ["Breathable", "Calm", "Ethereal", "Soft"],
    logic: { flooring: "Pairs seamlessly with wide-plank light oak or poured seamless resin. Avoid high-contrast geometric tiles.", light: "Diffuses harsh light beautifully into a soft, glowing gradient.", bestFor: "Bedrooms and quiet, meditative living spaces.", avoidIf: "Spaces requiring high structural contrast." },
    materials: ["Limestone", "Bleached Walnut", "Bouclé"] 
  },
  pearl_residence: { 
    family: "Quiet Expansive", name: "Pearl Residence", 
    wall: "#F4F3F0", accent: "#B8B5B0", floor: "#DCD9D4", temp: 4000, finish: "Satin",
    compatibility: { smallRooms: 95, lowLight: 90, warmClimate: 65, modernLuxury: 88 },
    feel: ["Pristine", "Luminous", "Weightless", "Clean"],
    logic: { flooring: "Requires extremely neutral, light grounding (White Ash, Pale Terrazzo) to maintain the illusion of weightlessness.", light: "Highly reflective; requires careful diffusion to avoid clinical glare.", bestFor: "Ultra-compact spaces needing maximum visual expansion.", avoidIf: "Rooms with warm, direct, unrelenting afternoon sun." },
    materials: ["White Marble", "Polished Chrome", "Sheer Silk"] 
  },

  // 2. WARM GROUNDED
  desert_modern: { 
    family: "Warm Grounded", name: "Desert Modern", 
    wall: "#DBCBBF", accent: "#B27C66", floor: "#C2A895", temp: 2700, finish: "Plaster",
    compatibility: { smallRooms: 70, lowLight: 50, warmClimate: 98, modernLuxury: 90 },
    feel: ["Grounded", "Intimate", "Slow-paced", "Thermal"],
    logic: { flooring: "Requires warm, matte grounding (Walnut, Terracotta). Cool gray tile creates severe thermal tension.", light: "Absorbs harsh midday sun; radiates intimate warmth during dusk. Best with 2700K indirect fixtures.", bestFor: "South-facing rooms with harsh light and dry climate locations.", avoidIf: "Cold, cloudy climates or environments dominated by cool artificial light." },
    materials: ["Terracotta", "Walnut", "Travertine"] 
  },
  ember_clay: { 
    family: "Warm Grounded", name: "Ember Clay", 
    wall: "#C2A398", accent: "#8B5A4D", floor: "#A67B6E", temp: 2700, finish: "Matte",
    compatibility: { smallRooms: 85, lowLight: 60, warmClimate: 92, modernLuxury: 80 },
    feel: ["Enveloping", "Safe", "Earthy", "Rich"],
    logic: { flooring: "Demands deep, warm textures like Smoked Oak or natural cleft slate.", light: "Swallows light. Needs layered, low-level ambient lighting to prevent the room from feeling cavernous.", bestFor: "Intimate dining rooms, snugs, and evening-focused spaces.", avoidIf: "North-facing rooms with small windows." },
    materials: ["Smoked Oak", "Aged Brass", "Velvet"] 
  },
  walnut_retreat: { 
    family: "Warm Grounded", name: "Walnut Retreat", 
    wall: "#D1C7C0", accent: "#5C4336", floor: "#9E8E84", temp: 3000, finish: "Satin",
    compatibility: { smallRooms: 60, lowLight: 55, warmClimate: 85, modernLuxury: 95 },
    feel: ["Sophisticated", "Anchored", "Timeless", "Sheltering"],
    logic: { flooring: "Works best with medium-to-dark continuous wood flooring. High contrast against pale floors can feel disjointed.", light: "Balances beautifully between natural daylight and warm 3000K evening spots.", bestFor: "Primary bedrooms and formal sitting rooms.", avoidIf: "Spaces intended to feel highly active and energetic." },
    materials: ["Dark Walnut", "Bronze", "Heavy Linen"] 
  },

  // 3. ARCHITECTURAL LUXURY
  industrial_raw: { 
    family: "Architectural Luxury", name: "Industrial Raw", 
    wall: "#3A3A3C", accent: "#8C4A32", floor: "#2C2C2E", temp: 3200, finish: "Satin",
    compatibility: { smallRooms: 45, lowLight: 30, warmClimate: 75, modernLuxury: 92 },
    feel: ["Heavy", "Structured", "Masculine", "Permanent"],
    logic: { flooring: "Requires deep, light-absorbing surfaces (Polished Concrete, Dark Slate). Light woods create visual dissonance.", light: "Thrives in controlled, indirect lighting. Direct sunlight washes out the shadow depth.", bestFor: "High-ceiling loft spaces and large open-plan structural areas.", avoidIf: "Standard 8-foot ceiling rooms or north-facing low-light spaces." },
    materials: ["Raw Steel", "Exposed Brick", "Polished Concrete"] 
  },
  graphite_residence: { 
    family: "Architectural Luxury", name: "Graphite Residence", 
    wall: "#2C2D30", accent: "#54575E", floor: "#1F2022", temp: 4000, finish: "Matte",
    compatibility: { smallRooms: 40, lowLight: 20, warmClimate: 80, modernLuxury: 98 },
    feel: ["Cinematic", "Elite", "Focused", "Bold"],
    logic: { flooring: "Needs absolute grounding. Black stained oak or dark large-format porcelain.", light: "Relies entirely on architectural lighting (wall grazers, spots). Natural light should be highly controlled.", bestFor: "Media rooms, luxury bathrooms, and executive spaces.", avoidIf: "Family rooms or spaces needing casual, bright energy." },
    materials: ["Black Oak", "Gunmetal", "Matte Leather"] 
  },
  sculpted_concrete: { 
    family: "Architectural Luxury", name: "Sculpted Concrete", 
    wall: "#7A7C7A", accent: "#434444", floor: "#5C5E5C", temp: 3500, finish: "Plaster",
    compatibility: { smallRooms: 55, lowLight: 65, warmClimate: 60, modernLuxury: 90 },
    feel: ["Monolithic", "Brutalist", "Quiet", "Tactile"],
    logic: { flooring: "Should seamlessly match the wall tone to create an uninterrupted 'carved' spatial illusion.", light: "Loves raking light to expose plaster/concrete textures.", bestFor: "Gallery-style homes and brutalist modern architecture.", avoidIf: "Homes with traditional molding or complex architectural trims." },
    materials: ["Micro-cement", "Blackened Steel", "Cashmere"] 
  },

  // 4. ORGANIC NATURAL
  moss_atelier: { 
    family: "Organic Natural", name: "Moss Atelier", 
    wall: "#9A9E8D", accent: "#535C45", floor: "#757D68", temp: 3200, finish: "Matte",
    compatibility: { smallRooms: 75, lowLight: 70, warmClimate: 85, modernLuxury: 80 },
    feel: ["Biophilic", "Restorative", "Sheltered", "Organic"],
    logic: { flooring: "Pairs beautifully with mid-tone rustic woods and natural stone. Avoid highly polished, artificial surfaces.", light: "Evolves dramatically from day to night. Feels fresh in morning light, deep and moody at night.", bestFor: "Home offices, reading rooms, and garden-facing spaces.", avoidIf: "Spaces completely cut off from natural external views." },
    materials: ["Reclaimed Oak", "Unlacquered Brass", "Bouclé"] 
  },
  forest_linen: { 
    family: "Organic Natural", name: "Forest Linen", 
    wall: "#B5B6AC", accent: "#6B705C", floor: "#8C9081", temp: 3000, finish: "Satin",
    compatibility: { smallRooms: 80, lowLight: 75, warmClimate: 80, modernLuxury: 85 },
    feel: ["Relaxed", "Balanced", "Muted", "Harmonious"],
    logic: { flooring: "Highly versatile. Works well with both warm oak and cool gray stone.", light: "Gently absorbs light, reducing glare in overly bright, window-heavy rooms.", bestFor: "Living rooms and open-plan kitchen areas.", avoidIf: "Rooms wanting high-drama or stark contrast." },
    materials: ["Ash Wood", "Pewter", "Heavy Linen"] 
  },
  sandstone_calm: { 
    family: "Organic Natural", name: "Sandstone Calm", 
    wall: "#D5CABA", accent: "#9C8B76", floor: "#B8AA99", temp: 2700, finish: "Plaster",
    compatibility: { smallRooms: 85, lowLight: 70, warmClimate: 90, modernLuxury: 88 },
    feel: ["Textural", "Warm", "Inviting", "Earthy"],
    logic: { flooring: "Best with continuous limestone or light terracotta. Wood floors should be pale and desaturated.", light: "Beautifully amplifies late afternoon 'golden hour' sunlight.", bestFor: "Coastal homes, casual luxury retreats, and wellness spaces.", avoidIf: "Urban apartments seeking a sleek, industrial aesthetic." },
    materials: ["Sandstone", "Light Walnut", "Rattan"] 
  },

  // 5. CONTEMPORARY LIGHT
  tokyo_soft_gray: { 
    family: "Contemporary Light", name: "Tokyo Soft Gray", 
    wall: "#D0D2D3", accent: "#8A8D91", floor: "#AFB2B4", temp: 4000, finish: "Matte",
    compatibility: { smallRooms: 88, lowLight: 85, warmClimate: 50, modernLuxury: 92 },
    feel: ["Urban", "Muted", "Precise", "Still"],
    logic: { flooring: "Requires a very controlled, desaturated floor (Ash, Concrete). Yellow-toned woods will clash terribly.", light: "Thrives in indirect, soft northern light. Holds shadow edges sharply.", bestFor: "Urban apartments, minimalist offices, and contemporary galleries.", avoidIf: "Spaces with heavy red/orange brick or terracotta." },
    materials: ["Hinoki Wood", "Brushed Aluminum", "Felt"] 
  },
  silver_oak: { 
    family: "Contemporary Light", name: "Silver Oak", 
    wall: "#E1DFDB", accent: "#98968F", floor: "#C2C0B9", temp: 3500, finish: "Satin",
    compatibility: { smallRooms: 90, lowLight: 82, warmClimate: 65, modernLuxury: 85 },
    feel: ["Refined", "Cool", "Elegant", "Flowing"],
    logic: { flooring: "Needs medium contrast flooring to prevent the room from feeling floating or unanchored.", light: "Reflects light efficiently but softens the glare compared to pure white.", bestFor: "Transitional architecture, luxury apartments.", avoidIf: "Rooms demanding deep intimacy or warmth." },
    materials: ["Silvered Oak", "Polished Nickel", "Silk"] 
  },
  ash_diffusion: { 
    family: "Contemporary Light", name: "Ash Diffusion", 
    wall: "#C8C9C7", accent: "#7A7B7A", floor: "#9E9F9E", temp: 4000, finish: "Matte",
    compatibility: { smallRooms: 80, lowLight: 75, warmClimate: 40, modernLuxury: 88 },
    feel: ["Technical", "Clean", "Restrained", "Neutral"],
    logic: { flooring: "Best paired with micro-cement or very pale, cool-toned woods.", light: "Acts as a perfect neutral bounce card for natural light, not altering color temperature.", bestFor: "Creative studios, high-end kitchens, and display spaces.", avoidIf: "Cold, poorly lit basements or cozy living areas." },
    materials: ["Ash", "Stainless Steel", "Matte Glass"] 
  }
};

const getLuminance = (hex: string) => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b; 
};

const groupedPalettes = Object.entries(ARCHITECTURAL_INTELLIGENCE).reduce((acc, [key, data]) => {
  if (!acc[data.family]) acc[data.family] = [];
  acc[data.family].push({ key, ...data });
  return acc;
}, {} as Record<string, any[]>);

export default function ColorStudio() {
  const router = useRouter();
  
  const [activePaletteKey, setActivePaletteKey] = useState<keyof typeof ARCHITECTURAL_INTELLIGENCE>("desert_modern");
  const [lightingTemp, setLightingTemp] = useState(ARCHITECTURAL_INTELLIGENCE.desert_modern.temp);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Database States
  const [userId, setUserId] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLocation, setNewProjectLocation] = useState("");

  // Spatial Conditions States
  const [roomType, setRoomType] = useState("Living Space");
  const [lightExposure, setLightExposure] = useState("North Facing (Indirect)");
  const [existingFloor, setExistingFloor] = useState("Cool Gray Tile");

  const activeData = ARCHITECTURAL_INTELLIGENCE[activePaletteKey];
  const activeProjectData = projects.find(p => p.id === selectedProjectId);

  // THE DIAGNOSTIC ENGINE: Calculates scores, reasons, and recovery actions
  const diagnosticData = useMemo(() => {
    let scores = { ...activeData.compatibility };
    let reasons: Record<string, string[]> = { smallRooms: [], lowLight: [], warmClimate: [], modernLuxury: [] };
    let alerts: Array<{level: string, title: string, message: string, recovery: string[]}> = [];

    // Light Exposure Rules
    if (lightExposure === "North Facing (Indirect)") {
      scores.lowLight += 15;
      scores.warmClimate -= 20;
      reasons.warmClimate.push("North exposure eliminates direct thermal gain.");
      
      if (activeData.family === "Architectural Luxury") {
         alerts.push({ 
           level: "caution", title: "SHADOW DEPTH WARNING", 
           message: "North-facing indirect light flattens the structural shadow depth required for this atmosphere.", 
           recovery: ["Supplement with 3000K directional wall-grazing fixtures", "Increase contrast ratio with darker accents"] 
         });
      }
    } else if (lightExposure === "South Facing (Direct)") {
      scores.lowLight -= 25;
      scores.warmClimate += 10;
      reasons.lowLight.push("Direct south exposure creates harsh, blown-out highlights.");

      if (activeData.family === "Quiet Expansive") {
         alerts.push({ 
           level: "caution", title: "GLARE RISK DETECTED", 
           message: "South-facing direct light will over-expose high-albedo pale walls.", 
           recovery: ["Utilize sheer linen diffusion on windows", "Drop artificial lighting to 2700K", "Introduce matte, light-absorbing furniture"] 
         });
      }
    }

    // Room Type Rules
    if (roomType === "Compact Apartment" || roomType === "Studio Space") {
      scores.smallRooms += 15;
      if (activeData.family === "Architectural Luxury" || activeData.family === "Warm Grounded") {
        scores.smallRooms -= 30;
        reasons.smallRooms.push("Darker tones compress visual volume in compact footprints.");
        alerts.push({ 
          level: "caution", title: "SPATIAL COMPRESSION", 
          message: "Heavily grounded tones visually shrink compact and studio floorplans.", 
          recovery: ["Limit palette to a 10% accent application", "Shift to a 'Quiet Expansive' environment", "Utilize low-profile, light-reflective furniture"] 
        });
      }
    }
    if (roomType === "Luxury Villa") {
      scores.modernLuxury += 15;
      scores.smallRooms -= 30;
      reasons.smallRooms.push("Expansive architecture minimizes small room intimacy.");
    }

    // Flooring Conflicts (The critical logic)
    if (existingFloor === "Cool Gray Tile" || existingFloor === "Polished Concrete") {
      if (activeData.family === "Warm Grounded") {
        scores.modernLuxury -= 40;
        scores.warmClimate -= 20;
        reasons.modernLuxury.push("Cold flooring strips grounding warmth required for this palette.");
        alerts.push({ 
          level: "severe", title: "ENVIRONMENTAL TENSION DETECTED", 
          message: `${existingFloor} reduces the grounding warmth required for ${activeData.name}.`, 
          recovery: ["Increase ambient lighting to 3000K", "Introduce smoked oak or walnut wood elements", "Add heavy textured fabric surfaces", "Reduce reflective material ratio"] 
        });
      }
    } else if (existingFloor === "Dark Walnut / Slate" && activeData.family === "Quiet Expansive") {
      scores.smallRooms -= 35;
      reasons.smallRooms.push("Heavy dark flooring disrupts weightless continuity.");
      alerts.push({ 
        level: "severe", title: "SPATIAL DISCONNECT", 
        message: "Heavy dark flooring disrupts the weightless continuity required for Quiet Expansive palettes.", 
        recovery: ["Specify light, continuous area rugs", "Ensure ultra-matte wall finishes", "Switch to an 'Architectural Luxury' palette"] 
      });
    } else if (existingFloor === "Warm Terracotta" && activeData.family === "Contemporary Light") {
      scores.modernLuxury -= 20;
      reasons.modernLuxury.push("Red/Orange undertones clash with muted neutrality.");
      alerts.push({ 
        level: "caution", title: "CHROMATIC CLASH", 
        message: "Warm Terracotta clashes heavily with the precise neutrality of this contemporary palette.", 
        recovery: ["Neutralize with large, cool-toned area rugs", "Shift to the 'Organic Natural' family"] 
      });
    }

    // Clamp scores between 0 and 100
    for (let key in scores) {
      scores[key as keyof typeof scores] = Math.max(0, Math.min(100, scores[key as keyof typeof scores]));
    }

    return { scores, alerts, reasons };
  }, [activeData, roomType, lightExposure, existingFloor]);


  useEffect(() => {
    async function initialize() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
        const { data } = await supabase.from("projects").select("id, name, location").order("created_at", { ascending: false });
        if (data && data.length > 0) {
          setProjects(data);
          setSelectedProjectId(data[0].id);
        }
      } else {
        router.push("/login");
      }
    }
    initialize();
  }, [router]);

  useEffect(() => {
    async function loadProjectMemory() {
      if (!selectedProjectId) return;
      const { data } = await supabase.from("project_palettes").select("*").eq("project_id", selectedProjectId).order("created_at", { ascending: false }).limit(1);
      if (data && data.length > 0) {
        const savedState = data[0];
        const keyMap = Object.entries(ARCHITECTURAL_INTELLIGENCE).reduce((acc, [k, v]) => {
          acc[v.name] = k as keyof typeof ARCHITECTURAL_INTELLIGENCE;
          return acc;
        }, {} as Record<string, keyof typeof ARCHITECTURAL_INTELLIGENCE>);
        
        const mappedKey = keyMap[savedState.atmosphere_name];
        if (mappedKey) {
          setActivePaletteKey(mappedKey);
          setLightingTemp(savedState.lighting_temperature);
        }
      }
    }
    loadProjectMemory();
  }, [selectedProjectId]);

  const handleSaveToProject = async () => {
    if (!selectedProjectId) return;
    setSaveStatus("saving");
    const payload = {
      project_id: selectedProjectId,
      atmosphere_name: activeData.name,
      wall_tone: activeData.wall,
      accent_diffusion: activeData.accent,
      floor_grounding: activeData.floor,
      lighting_temperature: lightingTemp,
      warmth_score: lightingTemp <= 3000 ? "High" : lightingTemp >= 5000 ? "Low" : "Neutral",
      recommended_finish: activeData.finish
    };
    const { error } = await supabase.from("project_palettes").insert([payload]);
    if (!error) {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } else {
      setSaveStatus("idle");
    }
  };

  const handleCreateAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !userId) return;
    setSaveStatus("saving");
    const { data: projectData } = await supabase.from("projects").insert([{ name: newProjectName, location: newProjectLocation, user_id: userId }]).select();
    if (projectData) {
      const newProject = projectData[0];
      const payload = {
        project_id: newProject.id,
        atmosphere_name: activeData.name,
        wall_tone: activeData.wall,
        accent_diffusion: activeData.accent,
        floor_grounding: activeData.floor,
        lighting_temperature: lightingTemp,
        warmth_score: lightingTemp <= 3000 ? "High" : lightingTemp >= 5000 ? "Low" : "Neutral",
        recommended_finish: activeData.finish
      };
      await supabase.from("project_palettes").insert([payload]);
      setProjects([newProject, ...projects]);
      setSelectedProjectId(newProject.id);
      setIsCreatingProject(false);
      setNewProjectName("");
      setNewProjectLocation("");
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const cinematicEase = [0.22, 1, 0.36, 1];
  const transitionDuration = 0.85;

  const tempProgress = (lightingTemp - 2700) / (6500 - 2700);
  const dynamicBlur = 180 - (tempProgress * 90); 
  const dynamicScale = 1.2 - (tempProgress * 0.4);
  const dynamicOpacity = 0.85 - (tempProgress * 0.4);
  const dynamicFloorShadow = 0.8 + (tempProgress * 0.15);

  const getLightingFilter = (temp: number) => {
    if (temp <= 3000) return "rgba(255, 140, 40, 0.12)"; 
    if (temp >= 5000) return "rgba(160, 210, 255, 0.12)"; 
    return "rgba(255, 255, 255, 0.03)";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const isBrightBackground = getLuminance(activeData.wall) > 160;
  const adaptiveTextColor = isBrightBackground ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)";
  const adaptiveSubTextColor = isBrightBackground ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)";

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-[#0a0908] text-[#e5e5e5] font-sans antialiased relative">
      
      {/* --- STANDARD UI LAYER --- */}
      <div className="flex flex-col lg:flex-row h-full w-full print:hidden">
        
        {/* INLINE ENVIRONMENT ATTACHMENT OVERLAY */}
        <AnimatePresence>
          {isCreatingProject && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.4, ease: cinematicEase }} className="w-full max-w-[400px] p-8 lg:p-10 rounded-2xl bg-[#0a0908] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-8 border-b border-white/5 pb-3">Attach Environment</h3>
                <form onSubmit={handleCreateAndSave} className="flex flex-col gap-6">
                  <input type="text" placeholder="PROJECT NAME (e.g., Private Residence)" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors text-white/90" required />
                  <input type="text" placeholder="LOCATION (Optional)" value={newProjectLocation} onChange={(e) => setNewProjectLocation(e.target.value)} className="w-full bg-transparent border-b border-white/10 px-0 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors text-white/90" />
                  <div className="flex justify-end gap-6 mt-8">
                    <button type="button" onClick={() => setIsCreatingProject(false)} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center min-w-[120px]">{saveStatus === "saving" ? "Syncing..." : "Save Environment"}</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEFT SIDEBAR - HIDDEN ON MOBILE (Navigation) */}
        <aside className="hidden lg:flex w-72 border-r border-white/5 flex-col justify-between z-10 bg-[#0a0908] shrink-0 shadow-[10px_0_30px_rgba(0,0,0,0.5)] relative overflow-y-auto no-scrollbar">
          <div className="p-6">
            <div className="mb-10">
              <h1 className="text-[11px] uppercase tracking-[0.35em] text-white/80 font-medium mb-1">Architectural OS</h1>
              <h2 className="text-[9px] uppercase tracking-widest text-white/30 font-light">Decision Intelligence</h2>
            </div>
            
            <div className="mb-8 border-b border-white/5 pb-4">
              <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-3 ml-4">Ecosystem</h3>
              
              <button className="w-full text-left px-4 py-2 text-[11px] tracking-widest text-white/90 bg-white/5 rounded-md border border-white/5 flex items-center">
                <div className="w-1 h-1 rounded-full bg-white mr-3 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div> Color Studio
              </button>
              
              <button onClick={() => router.push('/material-planner')} className="w-full text-left px-4 py-2 mt-2 text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors border border-transparent hover:border-white/5 rounded-md">
                <span className="opacity-30 mr-3">⚬</span> Material Planner
              </button>
              
              <button className="w-full text-left px-4 py-2 mt-2 text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors border border-transparent hover:border-white/5 rounded-md opacity-50 cursor-not-allowed">
                <span className="opacity-30 mr-3">⚬</span> Lighting System
              </button>

              <button onClick={() => router.push('/')} className="w-full text-left px-4 py-2 mt-6 text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors border border-transparent hover:border-white/5 rounded-md">
                <span className="opacity-30 mr-3">⚬</span> Active Projects
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {Object.entries(groupedPalettes).map(([family, palettes]) => (
                <div key={family}>
                  <h4 className="text-[8px] uppercase tracking-[0.3em] text-white/20 mb-3 ml-4">{family}</h4>
                  <div className="flex flex-col gap-1">
                    {palettes.map((p) => (
                      <button 
                        key={p.key} 
                        onClick={() => { setActivePaletteKey(p.key as keyof typeof ARCHITECTURAL_INTELLIGENCE); setLightingTemp(p.temp); }} 
                        className={`text-left py-2 text-[10px] uppercase tracking-widest transition-all duration-300 ${activePaletteKey === p.key ? "pl-4 border-l-[3px] border-l-white/70 text-white/90 bg-white/[0.03] rounded-r" : "pl-4 border-l-[3px] border-l-transparent text-white/40 hover:bg-white/[0.01] hover:text-white/60"}`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN WORKSPACE (Scrollable on Mobile) */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto lg:overflow-hidden relative z-0">
          
          {/* TOP BAR */}
          <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-50 bg-[#0a0908]/90 backdrop-blur-md">
            <div className="hidden lg:block text-[9px] uppercase tracking-[0.2em] text-white/40">Workspace <span className="mx-2 text-white/20">/</span> Ecosystem <span className="mx-2 text-white/20">/</span> <span className="text-white/80">Color Studio</span></div>
            <div className="lg:hidden text-[10px] uppercase tracking-widest text-white/80 font-medium">Color Studio</div>

            <div className="flex items-center gap-3 lg:gap-5">
              
              <button onClick={handleExportPDF} className="hidden md:flex text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded transition-colors text-white/50 hover:text-white border border-transparent hover:border-white/10 items-center gap-2">
                Export Spec
              </button>

              <div className="hidden md:block w-[1px] h-4 bg-white/10" />

              {projects.length === 0 ? (
                <span className="hidden md:inline text-[9px] uppercase tracking-[0.2em] text-white/40">Unsaved Environment</span>
              ) : (
                <div className="relative">
                  <div className="flex flex-col items-end cursor-pointer group" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <span className="hidden lg:block text-[7px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white/50 transition-colors mb-1">Attached To</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors truncate max-w-[100px] lg:max-w-none">{activeProjectData?.name || "Select Project"}</span>
                      <span className="text-[7px] text-white/30 group-hover:text-white/70 transition-colors mt-[1px]">▼</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                        <motion.div initial={{ opacity: 0, y: -4, filter: "blur(2px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -4, filter: "blur(2px)" }} transition={{ duration: 0.2, ease: cinematicEase }} className="absolute top-full right-0 mt-4 w-48 lg:w-56 bg-[#121110]/95 backdrop-blur-xl border border-white/5 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50 py-2">
                          <div className="px-4 py-2 mb-1 border-b border-white/5"><span className="text-[7px] uppercase tracking-[0.3em] text-white/30">Select Project Context</span></div>
                          {projects.map(p => (
                            <button key={p.id} onClick={() => { setSelectedProjectId(p.id); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-white/50 hover:text-white hover:bg-white/[0.03] transition-colors flex items-center justify-between group">
                              <span className={`truncate pr-2 ${selectedProjectId === p.id ? "text-white/90" : ""}`}>{p.name}</span>
                              {selectedProjectId === p.id && <span className="text-white/40 text-[8px] shrink-0">✓</span>}
                            </button>
                          ))}
                          <button onClick={() => { setIsDropdownOpen(false); setIsCreatingProject(true); }} className="w-full text-left px-4 py-3 mt-1 text-[9px] uppercase tracking-[0.2em] text-white/30 hover:text-white/70 hover:bg-white/[0.03] transition-colors border-t border-white/5">+ Initialize New</button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
              <div className="hidden lg:block w-[1px] h-6 bg-white/5 mx-1" />
              <button onClick={() => projects.length === 0 ? setIsCreatingProject(true) : handleSaveToProject()} disabled={saveStatus !== "idle"} className={`text-[8px] lg:text-[9px] uppercase tracking-[0.2em] px-4 lg:px-5 py-2 rounded transition-all duration-500 border flex items-center gap-2 min-w-[100px] lg:min-w-[150px] justify-center ${saveStatus === "saved" ? "bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-transparent hover:bg-white/5 text-white/80 border-white/10 hover:text-white"}`}>
                {saveStatus === "idle" && <span className="hidden lg:inline">Save Environment</span>}
                {saveStatus === "idle" && <span className="lg:hidden">Save</span>}
                {saveStatus === "saving" && <span className="opacity-50">Syncing...</span>}
                {saveStatus === "saved" && <span className="text-white">Linked</span>}
              </button>
            </div>
          </header>

          {/* 3-COLUMN STUDIO LAYOUT (Stacks on Mobile) */}
          <div className="flex-1 flex flex-col lg:flex-row p-4 lg:p-8 gap-6 lg:gap-10 overflow-y-visible lg:overflow-hidden relative z-0">
            
            {/* MOBILE ONLY: PALETTE SELECTOR */}
            <div className="lg:hidden w-full flex-none overflow-x-auto no-scrollbar pb-2">
              <div className="flex gap-2">
                 {Object.values(ARCHITECTURAL_INTELLIGENCE).map((p) => (
                    <button 
                      key={p.name} 
                      onClick={() => { setActivePaletteKey(Object.keys(ARCHITECTURAL_INTELLIGENCE).find(k => ARCHITECTURAL_INTELLIGENCE[k as keyof typeof ARCHITECTURAL_INTELLIGENCE].name === p.name) as keyof typeof ARCHITECTURAL_INTELLIGENCE); setLightingTemp(p.temp); }} 
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-[9px] uppercase tracking-widest transition-colors ${activePaletteKey === Object.keys(ARCHITECTURAL_INTELLIGENCE).find(k => ARCHITECTURAL_INTELLIGENCE[k as keyof typeof ARCHITECTURAL_INTELLIGENCE].name === p.name) ? "bg-white/10 text-white border border-white/20" : "bg-transparent text-white/40 border border-white/5"}`}
                    >
                      {p.name}
                    </button>
                 ))}
              </div>
            </div>

            {/* LEFT: SPATIAL CONDITIONS */}
            <div className="w-full lg:w-60 flex-none flex flex-col gap-10 lg:pr-2 lg:pt-4 overflow-y-visible lg:overflow-y-auto no-scrollbar lg:pb-10 order-2 lg:order-1">
              
              {/* SPATIAL CONDITIONS (THE NEW ENGINE INPUT) */}
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/5 pb-3">Spatial Conditions</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[8px] uppercase tracking-widest text-white/40">Room Typology</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="bg-transparent border-b border-white/10 text-[10px] text-white/90 py-2 focus:outline-none focus:border-white/40 cursor-pointer appearance-none">
                      <option className="bg-[#121110] text-white">Primary Bedroom</option>
                      <option className="bg-[#121110] text-white">Living Space</option>
                      <option className="bg-[#121110] text-white">Studio Space</option>
                      <option className="bg-[#121110] text-white">Compact Apartment</option>
                      <option className="bg-[#121110] text-white">Luxury Villa</option>
                      <option className="bg-[#121110] text-white">Luxury Office</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[8px] uppercase tracking-widest text-white/40">Light Exposure</label>
                    <select value={lightExposure} onChange={(e) => setLightExposure(e.target.value)} className="bg-transparent border-b border-white/10 text-[10px] text-white/90 py-2 focus:outline-none focus:border-white/40 cursor-pointer appearance-none">
                      <option className="bg-[#121110] text-white">North Facing (Indirect)</option>
                      <option className="bg-[#121110] text-white">South Facing (Direct)</option>
                      <option className="bg-[#121110] text-white">East Facing (Morning)</option>
                      <option className="bg-[#121110] text-white">West Facing (Evening)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[8px] uppercase tracking-widest text-[#4ade80]/70">Existing Flooring</label>
                    <select value={existingFloor} onChange={(e) => setExistingFloor(e.target.value)} className="bg-transparent border-b border-[#4ade80]/30 text-[10px] text-white/90 py-2 focus:outline-none focus:border-[#4ade80]/70 cursor-pointer appearance-none">
                      <option className="bg-[#121110] text-white">Light Oak / Ash</option>
                      <option className="bg-[#121110] text-white">Dark Walnut / Slate</option>
                      <option className="bg-[#121110] text-white">Polished Concrete</option>
                      <option className="bg-[#121110] text-white">Cool Gray Tile</option>
                      <option className="bg-[#121110] text-white">Warm Terracotta</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/5 pb-3">Lighting Physics</h3>
                <div className="relative h-6 flex items-center group cursor-pointer px-1">
                  <input type="range" min="2700" max="6500" step="100" value={lightingTemp} onChange={(e) => setLightingTemp(Number(e.target.value))} className="absolute w-full opacity-0 cursor-pointer z-20 h-full" />
                  <div className="absolute inset-x-0 h-4 rounded-full blur-[8px] transition-colors duration-500 z-0" style={{ backgroundColor: getLightingFilter(lightingTemp), opacity: 0.6 }} />
                  <div className="w-full h-[3px] bg-[#1a1a1a] rounded overflow-hidden z-0 border border-white/[0.05]">
                    <div className="h-full bg-white/60 transition-all duration-75" style={{ width: `${((lightingTemp - 2700) / (6500 - 2700)) * 100}%` }} />
                  </div>
                  <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 transition-transform duration-300 group-hover:scale-[1.35] flex items-center justify-center" style={{ left: `calc(${((lightingTemp - 2700) / (6500 - 2700)) * 100}% - 8px)`, pointerEvents: 'none' }}>
                    <div className="w-1 h-1 rounded-full bg-black/20" />
                  </div>
                </div>
                <div className="flex justify-between text-[8px] text-white/20 tracking-widest mt-4 px-1">
                  <span>2700K</span>
                  <span className="text-white/60 font-medium">{lightingTemp}K</span>
                  <span>6500K</span>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/5 pb-3">Material Tones</h3>
                <div className="flex flex-col gap-5">
                   <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{backgroundColor: activeData.wall}} />
                      <span className="text-[8px] uppercase tracking-widest text-white/40">{activeData.wall} <span className="opacity-40 ml-2">(Wall)</span></span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{backgroundColor: activeData.accent}} />
                      <span className="text-[8px] uppercase tracking-widest text-white/40">{activeData.accent} <span className="opacity-40 ml-2">(Accent)</span></span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{backgroundColor: activeData.floor}} />
                      <span className="text-[8px] uppercase tracking-widest text-white/40">{activeData.floor} <span className="opacity-40 ml-2">(Floor)</span></span>
                   </div>
                </div>
              </div>
            </div>

            {/* CENTER: IMMERSIVE CANVAS */}
            <div className="w-full h-[50vh] lg:h-full lg:flex-1 relative flex-none lg:flex-auto group order-1 lg:order-2" ref={canvasRef} onMouseMove={handleMouseMove}>
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_100px_rgba(0,0,0,0.8)] border border-white/10 bg-[#050505]">
                <motion.div className="absolute inset-0 mix-blend-normal" animate={{ backgroundColor: activeData.wall }} transition={{ duration: transitionDuration, ease: cinematicEase }} />
                <motion.div className="absolute w-[120%] h-[120%] rounded-full mix-blend-overlay" style={{ top: '-30%', right: '-30%' }} animate={{ scale: dynamicScale, opacity: dynamicOpacity, filter: `blur(${dynamicBlur}px)`, backgroundColor: activeData.accent, x: mousePosition.x * 50 + "%", y: mousePosition.y * 50 + "%" }} transition={{ scale: { duration: transitionDuration, ease: cinematicEase }, opacity: { duration: transitionDuration, ease: cinematicEase }, filter: { duration: transitionDuration, ease: cinematicEase }, backgroundColor: { duration: transitionDuration, ease: cinematicEase }, x: { type: "spring", stiffness: 30, damping: 40 }, y: { type: "spring", stiffness: 30, damping: 40 } }}>
                  <motion.div className="w-full h-full rounded-full bg-[inherit]" animate={{ scale: [1, 1.015, 1], opacity: [1, 0.95, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
                </motion.div>
                <motion.div className="absolute inset-x-0 bottom-0 h-[70%] mix-blend-multiply" animate={{ background: `linear-gradient(to top, ${activeData.floor} 0%, transparent 100%)`, opacity: dynamicFloorShadow }} transition={{ background: { duration: transitionDuration, ease: cinematicEase }, opacity: { duration: transitionDuration, ease: cinematicEase } }} />
                <motion.div className="absolute inset-0 mix-blend-color" animate={{ backgroundColor: getLightingFilter(lightingTemp) }} transition={{ duration: transitionDuration, ease: cinematicEase }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_120%)] pointer-events-none mix-blend-multiply" />
                <div className="absolute inset-[0%] w-[200%] h-[200%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.35] mix-blend-overlay pointer-events-none animate-[drift_60s_linear_infinite]"></div>
              </div>
              
              <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-10 pointer-events-none z-20">
                <AnimatePresence mode="wait">
                  <motion.div key={activeData.name} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: transitionDuration, ease: cinematicEase }}>
                    <motion.h2 className="text-3xl lg:text-4xl font-light tracking-tight" animate={{ color: adaptiveTextColor }} transition={{ duration: transitionDuration, ease: cinematicEase }}>{activeData.name}</motion.h2>
                    <motion.p className="text-[8px] lg:text-[9px] uppercase tracking-[0.3em] mt-2 lg:mt-3" animate={{ color: adaptiveSubTextColor }} transition={{ duration: transitionDuration, ease: cinematicEase }}>Atmospheric Simulation Active</motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: INTELLIGENCE ENGINE (DIAGNOSTIC & PRESCRIPTIVE ALERTS) */}
            <div className="w-full lg:w-80 flex-none flex flex-col gap-10 lg:pl-8 lg:pt-4 overflow-y-visible lg:overflow-y-auto no-scrollbar pb-20 lg:pb-10 order-3">
              
              {/* Dynamic Prescriptive Warnings Layer */}
              <AnimatePresence>
                {diagnosticData.alerts.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {diagnosticData.alerts.map((alert, i) => (
                      <div key={i} className={`p-5 border rounded-lg shadow-lg ${alert.level === "severe" ? "bg-[#ef4444]/5 border-[#ef4444]/20" : "bg-[#f59e0b]/5 border-[#f59e0b]/20"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] uppercase tracking-widest font-bold ${alert.level === "severe" ? "text-[#ef4444]" : "text-[#f59e0b]"}`}>
                            {alert.title}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-white/80 mb-4">{alert.message}</p>
                        <div className={`pt-3 border-t ${alert.level === "severe" ? "border-[#ef4444]/10" : "border-[#f59e0b]/10"}`}>
                          <span className={`text-[9px] uppercase tracking-widest font-bold block mb-2 ${alert.level === "severe" ? "text-[#ef4444]/60" : "text-[#f59e0b]/60"}`}>
                            Recovery Suggestions:
                          </span>
                          <ul className={`list-disc list-outside pl-3 space-y-1.5 text-[10px] tracking-wide ${alert.level === "severe" ? "text-[#ef4444]/80" : "text-[#f59e0b]/80"}`}>
                            {alert.recovery.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Compatibility Scores with Explanations */}
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/5 pb-3">Suitability Index</h3>
                <div className="space-y-6">
                  {[
                    { key: 'smallRooms', label: "Small Rooms", score: diagnosticData.scores.smallRooms, reasons: diagnosticData.reasons.smallRooms },
                    { key: 'lowLight', label: "Low Light", score: diagnosticData.scores.lowLight, reasons: diagnosticData.reasons.lowLight },
                    { key: 'warmClimate', label: "Warm Climate", score: diagnosticData.scores.warmClimate, reasons: diagnosticData.reasons.warmClimate },
                    { key: 'modernLuxury', label: "Modern Luxury", score: diagnosticData.scores.modernLuxury, reasons: diagnosticData.reasons.modernLuxury },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/40 mb-2">
                        <span>{item.label}</span>
                        <motion.span className={item.score >= 80 ? "text-[#4ade80]" : item.score >= 50 ? "text-white/60" : "text-[#ef4444]"}>
                          {Math.round(item.score)} / 100
                        </motion.span>
                      </div>
                      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mb-2">
                        <motion.div className={`h-full ${item.score >= 80 ? "bg-[#4ade80]" : item.score >= 50 ? "bg-white/40" : "bg-[#ef4444]"}`} initial={{ width: 0 }} animate={{ width: `${item.score}%` }} transition={{ duration: 1, ease: cinematicEase }} />
                      </div>
                      {/* Diagnostic Explanations */}
                      <AnimatePresence>
                        {item.reasons.length > 0 && item.score < 80 && (
                          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="list-none space-y-1 mt-1">
                            {item.reasons.map((reason, idx) => (
                              <li key={idx} className="text-[9px] text-white/40 flex items-start">
                                <span className="mr-1.5 text-white/20">•</span> {reason}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Feel */}
              <div>
                <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-6 border-b border-white/5 pb-3">Expected Feel</h3>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeData.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: transitionDuration }} className="flex flex-wrap gap-2">
                      {activeData.feel.map((f, i) => (
                        <span key={i} className="px-3 py-1.5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/60 bg-white/[0.02]">
                          {f}
                        </span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* --- HIDDEN EXECUTION LAYER (ONLY VISIBLE ON PDF PRINT) --- */}
      <div className="hidden print:block print:absolute print:inset-0 print:bg-white print:text-black print:font-sans print:p-12 print:z-[100]">
        
        {/* Document Header */}
        <div className="border-b-2 border-black pb-6 mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest mb-1">Architectural OS</h1>
            <h2 className="text-xs uppercase tracking-widest text-gray-500">Environmental Specification Sheet</h2>
          </div>
          <div className="text-right text-xs text-gray-500 uppercase tracking-widest">
            Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-2 gap-10 mb-12">
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Project Assignment</h3>
            <p className="text-xl font-medium tracking-tight">{activeProjectData?.name || "Unassigned Spec"}</p>
            {activeProjectData?.location && <p className="text-sm text-gray-600 mt-1">{activeProjectData.location}</p>}
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Atmosphere Family</h3>
            <p className="text-xl font-medium tracking-tight">{activeData.family}</p>
            <p className="text-sm text-gray-600 mt-1">{activeData.name}</p>
          </div>
        </div>

        {/* Spatial Target (From the Engine) */}
        <div className="grid grid-cols-3 gap-6 mb-12 p-6 bg-gray-50 rounded">
          <div>
             <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Target Topology</p>
             <p className="text-sm font-medium">{roomType}</p>
          </div>
          <div>
             <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Exposure Target</p>
             <p className="text-sm font-medium">{lightExposure}</p>
          </div>
          <div>
             <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-1">Flooring Base</p>
             <p className="text-sm font-medium">{existingFloor}</p>
          </div>
        </div>

        {/* Core Palette Grid */}
        <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2">Core Palette Metrics</h3>
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gray-300" style={{backgroundColor: activeData.wall, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Wall Tone</p>
              <p className="text-lg font-mono">{activeData.wall}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gray-300" style={{backgroundColor: activeData.accent, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Accent Diffusion</p>
              <p className="text-lg font-mono">{activeData.accent}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gray-300" style={{backgroundColor: activeData.floor, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Floor Grounding</p>
              <p className="text-lg font-mono">{activeData.floor}</p>
            </div>
          </div>
        </div>

        {/* Hardware & Lighting */}
        <div className="grid grid-cols-2 gap-10 mb-12">
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2">Technical Constraints</h3>
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Target Lighting Temp</span>
              <span className="text-lg font-medium">{lightingTemp}K</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Recommended Finish</span>
              <span className="text-lg font-medium">{activeData.finish}</span>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2">Material Pairings</h3>
            <ul className="list-disc list-inside text-sm font-medium space-y-2">
              {activeData.materials.map((mat, i) => <li key={i}>{mat}</li>)}
            </ul>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12 border-t border-gray-200 pt-4 flex justify-between text-[8px] uppercase tracking-widest text-gray-400">
          <span>Generated by Architectural OS</span>
          <span>Not for final construction without local architect verification</span>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drift { 0% { transform: translate(0, 0); } 100% { transform: translate(-5%, -5%); } } 
        .no-scrollbar::-webkit-scrollbar { display: none; } 
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media print {
          body { background: white !important; }
        }
      `}} />
    </div>
  );
}