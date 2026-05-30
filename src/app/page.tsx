"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Interface mapping to our Supabase join
interface ProjectPalette {
  atmosphere_name: string;
  wall_tone: string;
  accent_diffusion: string;
  floor_grounding: string;
  lighting_temperature: number;
  warmth_score: string;
}

interface Project {
  id: string;
  name: string;
  location: string | null;
  created_at: string;
  project_palettes: ProjectPalette[]; // Array because a project might have multiple versions later
}

export default function ArchitecturalDashboard() {
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function initializeDashboard() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setUserId(session.user.id);

      // Fetch projects AND their attached palettes in one query
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          project_palettes (*)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("System Error: Could not fetch environmental data", error);
      } else if (data) {
        // Sort palettes within projects by newest first
        const formattedData = data.map(project => ({
          ...project,
          project_palettes: project.project_palettes.sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        }));
        setActiveProjects(formattedData);
      }
      setLoading(false);
    }

    initializeDashboard();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const cinematicEase = [0.22, 1, 0.36, 1];

  // The featured project is the most recently created/updated one
  const featuredProject = activeProjects.length > 0 ? activeProjects[0] : null;
  const featuredPalette = featuredProject?.project_palettes?.[0];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0908] text-[#e5e5e5] font-sans antialiased relative">
      
      {/* LEFT SIDEBAR - ECOSYSTEM NAVIGATION */}
      <aside className="w-64 border-r border-white/5 flex flex-col justify-between p-6 z-10 bg-[#0a0908] shrink-0">
        <div>
          <div className="mb-12">
            <h1 className="text-[11px] uppercase tracking-[0.35em] text-white/80 font-medium mb-1">
              Architectural OS
            </h1>
            <h2 className="text-[9px] uppercase tracking-widest text-white/30 font-light">
              Decision Intelligence
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/30 mb-2 ml-4">
              Ecosystem Tools
            </h3>
            
            <button 
              onClick={() => router.push('/color-studio')}
              className="text-left px-4 py-2 text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors"
            >
              <span className="opacity-30 mr-3">⚬</span> Color Studio
            </button>
            <button className="text-left px-4 py-2 text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors">
              <span className="opacity-30 mr-3">⚬</span> Material Planner
            </button>
            <button className="text-left px-4 py-2 text-[11px] tracking-widest text-white/40 hover:text-white/80 transition-colors">
              <span className="opacity-30 mr-3">⚬</span> Lighting System
            </button>
            
            <button className="text-left px-4 py-2 mt-4 text-[11px] tracking-widest text-white/90 bg-white/5 rounded-md border border-white/5 flex items-center">
              <div className="w-1 h-1 rounded-full bg-white mr-3 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div> Active Projects
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={handleLogout}>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px]">
            N
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest text-[#4ade80]">System: Stable</div>
            <div className="text-[9px] uppercase tracking-widest text-white/40">Disconnect</div>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col relative z-0 min-w-0">
        
        {/* TOP BAR */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-10 shrink-0">
          <div className="text-[9px] uppercase tracking-[0.2em] text-white/40">
            Workspace <span className="mx-2 text-white/20">/</span> <span className="text-white/80">Database</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/color-studio')}
              className="text-[9px] uppercase tracking-[0.2em] px-5 py-2 rounded transition-all duration-500 border bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:text-white flex items-center gap-2"
            >
              <span>+</span> Initialize Project
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 p-10 overflow-y-auto no-scrollbar">
          
          {loading ? (
            <div className="w-full h-full flex flex-col animate-pulse opacity-20">
              <div className="flex gap-10 mb-12">
                <div className="flex-1 h-[360px] rounded-2xl bg-white/10"></div>
                <div className="w-72 h-[360px] bg-white/5 rounded-2xl"></div>
              </div>
            </div>
          ) : activeProjects.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-6">
                Database Empty
              </div>
              <button 
                onClick={() => router.push('/color-studio')}
                className="text-[10px] uppercase tracking-widest text-white/80 bg-white/5 border border-white/10 px-8 py-3 rounded hover:bg-white/10 transition-colors"
              >
                Enter Color Studio
              </button>
            </div>
          ) : (
            <>
              {/* FEATURED PROJECT SECTION */}
              {featuredProject && (
                <div className="flex gap-12 mb-12">
                  <div className="flex-1 h-[360px] rounded-2xl border border-white/5 relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#050505]">
                    
                    {/* Render Environmental Memory if it exists */}
                    {featuredPalette ? (
                      <>
                        <motion.div 
                          className="absolute inset-0 opacity-40 mix-blend-normal"
                          initial={{ backgroundColor: "#111" }}
                          animate={{ backgroundColor: featuredPalette.wall_tone }}
                          transition={{ duration: 1.5, ease: cinematicEase }}
                        />
                        <motion.div 
                          className="absolute w-[150%] h-[150%] rounded-full blur-[120px] opacity-30 mix-blend-overlay"
                          initial={{ backgroundColor: "transparent" }}
                          animate={{ backgroundColor: featuredPalette.accent_diffusion }}
                          transition={{ duration: 1.5, ease: cinematicEase }}
                          style={{ top: '-40%', right: '-40%' }}
                        />
                        <motion.div 
                          className="absolute inset-x-0 bottom-0 h-[80%] mix-blend-multiply opacity-80"
                          initial={{ background: "transparent" }}
                          animate={{ background: `linear-gradient(to top, ${featuredPalette.floor_grounding} 0%, transparent 100%)` }}
                          transition={{ duration: 1.5, ease: cinematicEase }}
                        />
                      </>
                    ) : (
                       <div className="absolute inset-0 bg-white/[0.02]" />
                    )}

                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
                    
                    <div className="absolute bottom-8 left-8 z-20">
                       <h2 className="text-3xl font-light text-white/90 tracking-tight mb-2">
                        {featuredProject.name}
                      </h2>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                        {featuredProject.location || "Unspecified Location"}
                      </p>
                    </div>
                  </div>

                  {/* Featured Project Metrics */}
                  <div className="w-64 flex flex-col justify-center gap-8 pl-4">
                    <div>
                      <h4 className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-4 border-b border-white/5 pb-2">Active Environment</h4>
                      <p className="text-sm font-light text-white/80 tracking-wide">
                        {featuredPalette ? featuredPalette.atmosphere_name : "Unassigned"}
                      </p>
                    </div>
                    
                    {featuredPalette && (
                      <>
                        <div>
                          <h4 className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-4 border-b border-white/5 pb-2">Palette Signature</h4>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="w-4 h-4 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: featuredPalette.wall_tone }}></div>
                            <div className="w-4 h-4 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: featuredPalette.accent_diffusion }}></div>
                            <div className="w-4 h-4 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: featuredPalette.floor_grounding }}></div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[8px] uppercase tracking-[0.3em] text-white/30 mb-4 border-b border-white/5 pb-2">Lighting State</h4>
                          <p className="text-[11px] text-white/60 tracking-widest">{featuredPalette.lighting_temperature}K — {featuredPalette.warmth_score}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* DYNAMIC PROJECT GRID */}
              <div className="grid grid-cols-3 gap-5">
                {activeProjects.slice(1).map((project) => {
                  const palette = project.project_palettes?.[0];
                  return (
                    <div 
                      key={project.id} 
                      className="p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all cursor-pointer group flex flex-col justify-between h-[140px]"
                    >
                      <div>
                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/80 mb-1 truncate">
                          {project.name}
                        </h3>
                        <p className="text-[9px] uppercase tracking-widest text-white/30 truncate">
                          {palette ? palette.atmosphere_name : "No Environment Set"}
                        </p>
                      </div>

                      {palette && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: palette.wall_tone }}></div>
                            <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: palette.accent_diffusion }}></div>
                            <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: palette.floor_grounding }}></div>
                          </div>
                          <div className="text-[8px] text-white/20 tracking-widest">
                            {palette.lighting_temperature}K
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </main>
      <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  );
}