import type { Metadata } from 'next';
import GlobalNav from '@/components/GlobalNav';
import CommandPalette from '@/components/CommandPalette';
import { EnvironmentProvider } from '@/context/EnvironmentContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Architectural OS',
  description: 'Premium Environmental Atmosphere Operating System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FDFDFD]">
        {/* The Global Brain Wraps the Entire Ecosystem */}
        <EnvironmentProvider>
          
          {/* The Apple-Grade Mega Menu (Always on top) */}
          <GlobalNav />
          
          {/* The Omni-Command Palette (Listens for Cmd+K globally) */}
          <CommandPalette />
          
          {/* Main Content Wrapper */}
          {/* pt-14 lg:pt-16 ensures the fixed navigation bar doesn't overlap the top of your pages */}
          <div className="pt-14 lg:pt-16">
            {children}
          </div>
          
        </EnvironmentProvider>
      </body>
    </html>
  );
}