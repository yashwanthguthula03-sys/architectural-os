import './globals.css';
import Link from 'next/link';
import React from 'react';

// Required for Next.js App Router metadata
export const metadata = {
  title: 'Architectural OS',
  description: 'Decision Intelligence Ecosystem',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#0a0a0a]">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-64 h-full border-r border-gray-200 dark:border-neutral-800 flex flex-col py-8 px-6 flex-shrink-0 bg-[#faf9f8] dark:bg-neutral-950">
          
          {/* Header */}
          <div className="mb-14">
            <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-1">Architectural OS</h1>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Decision Intelligence</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <div className="mb-12">
              <h3 className="text-[10px] text-gray-400 uppercase tracking-widest mb-5 font-semibold pl-1">
                Ecosystem
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link 
                    href="/color-studio" 
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors block pl-1"
                  >
                    Color Studio
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/material-planner" 
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors block pl-1"
                  >
                    Material Planner
                  </Link>
                </li>
                <li>
                  {/* The Lighting System Link - This now properly points to your new page */}
                  <Link 
                    href="/lighting-system" 
                    className="text-gray-900 dark:text-gray-100 font-medium border-l-2 border-gray-900 dark:border-gray-100 pl-3 -ml-[2px] block"
                  >
                    Lighting System
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/active-projects" 
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors block pl-1"
                  >
                    Active Projects
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          {/* User / Profile Icon at bottom */}
          <div className="mt-auto pl-1">
            <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center text-white dark:text-black font-bold text-xs cursor-pointer shadow-sm">
              N
            </div>
          </div>
        </aside>

        {/* Main Content Area (Where your page.tsx files render) */}
        <main className="flex-1 h-full overflow-y-auto bg-white dark:bg-[#0a0a0a]">
          {children}
        </main>
        
      </body>
    </html>
  );
}