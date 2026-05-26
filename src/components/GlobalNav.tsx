"use client";
import { useState } from 'react';
import Link from 'next/link';

// --- DATA LAYER ---
const NAV_MENUS = [
  {
    id: 'instruments',
    label: 'Instruments',
    columns: [
      {
        header: 'Explore Engines',
        links: [
          { name: 'Material Planner', href: '/tools/material-planner' },
          { name: 'Tile Intelligence', href: '/tools/tile-intelligence' },
          { name: 'Paint Planner', href: '/tools/paint-planner' },
          { name: 'Color Studio', href: '/tools/color-studio' },
          { name: 'Lighting Intelligence', href: '/tools/lighting-intelligence' }
        ]
      },
      {
        header: 'Workflow',
        links: [
          { name: 'Ecosystem Dashboard', href: '/ecosystem' }
        ]
      }
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    columns: [
      {
        header: 'Active',
        links: [
          { name: 'Current Environment', href: '/' },
          { name: 'Saved Specifications', href: '#' }
        ]
      }
    ]
  }
];

export default function GlobalNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <>
      {/* 1. THE NAVIGATION & MEGA MENU CONTAINER */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 bg-[#FDFDFD]/90 backdrop-blur-md border-b border-black/5"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* The Nav Bar */}
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 lg:h-16 relative z-20">
          
          <Link href="/" className="text-sm font-semibold tracking-tight text-gray-900">
            Architectural OS
          </Link>

          {/* Desktop Links (Full height hit-targets prevent hover flickering) */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {NAV_MENUS.map((menu) => (
              <button
                key={menu.id}
                onMouseEnter={() => setActiveMenu(menu.id)}
                className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors h-full flex items-center"
              >
                {menu.label}
              </button>
            ))}
            <Link 
              href="/specification" 
              className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors h-full flex items-center"
            >
              Export
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden text-gray-900">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </div>
        </nav>

        {/* The Mega Menu Dropdown Panel */}
        <div 
          className={`absolute top-full left-0 right-0 bg-[#FDFDFD]/95 backdrop-blur-xl shadow-lg border-b border-black/5 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
            activeMenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-12 relative min-h-[250px]">
            {NAV_MENUS.map((menu) => (
              <div 
                key={menu.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 transition-opacity duration-300 absolute left-4 sm:left-6 lg:left-12 top-10 lg:top-12 ${
                  activeMenu === menu.id ? 'opacity-100 z-10 delay-100' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {menu.columns.map((col, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h3 className="text-[10px] font-semibold text-gray-400 mb-4 tracking-tight uppercase">
                      {col.header}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {col.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link 
                            href={link.href}
                            onClick={() => setActiveMenu(null)}
                            className="text-xl lg:text-2xl font-semibold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE BACKGROUND BLUR OVERLAY (THE BUG FIX) */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          activeMenu ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '64px' }} 
        onMouseEnter={() => setActiveMenu(null)} // Snaps shut when mouse touches blur
        onClick={() => setActiveMenu(null)}      // Snaps shut when user clicks blur
      />
    </>
  );
}