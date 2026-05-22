"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const PlatformNav = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[#EBECEB] bg-[#FDFDFD]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8 py-5">
        
        {/* Brand Identity */}
        <Link href="/" className="text-xl font-light tracking-tight text-gray-900 transition-all hover:opacity-80">
          Architectural <span className="text-gray-400 font-medium">OS</span>
        </Link>

        {/* Global Routing */}
        <nav className="flex items-center gap-10">
          <Link 
            href="/planner" 
            className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-1 ${
              pathname?.includes('/planner') 
                ? 'text-gray-900 border-b border-gray-900' 
                : 'text-gray-400 hover:text-gray-800 hover:drop-shadow-sm'
            }`}
          >
            Material Planner
          </Link>
          
          <Link 
            href="/intelligence" 
            className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-1 ${
              pathname?.includes('/intelligence') 
                ? 'text-gray-900 border-b border-gray-900' 
                : 'text-gray-400 hover:text-gray-800 hover:drop-shadow-sm'
            }`}
          >
            Tile Intelligence
          </Link>

          <Link 
            href="/paint" 
            className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-1 ${
              pathname?.includes('/paint') 
                ? 'text-gray-900 border-b border-gray-900' 
                : 'text-gray-400 hover:text-gray-800 hover:drop-shadow-sm'
            }`}
          >
            Paint Planner
          </Link>
          
          <Link 
            href="/studio" 
            className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 pb-1 ${
              pathname?.includes('/studio') 
                ? 'text-gray-900 border-b border-gray-900' 
                : 'text-gray-400 hover:text-gray-800 hover:drop-shadow-sm'
            }`}
          >
            Color Studio
          </Link>
        </nav>

      </div>
    </header>
  );
};