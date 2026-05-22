// src/components/ui/ToolSwitch.tsx
import Link from 'next/link';

export const ToolSwitch = ({ active }: { active: 'planner' | 'studio' }) => (
  <nav className="flex gap-8 px-8 py-6 border-b border-gray-100 bg-white">
    <Link href="/" className={`text-sm font-medium transition ${active === 'planner' ? 'text-gray-900' : 'text-gray-400'}`}>
      Material Planner
    </Link>
    <Link href="/studio" className={`text-sm font-medium transition ${active === 'studio' ? 'text-gray-900' : 'text-gray-400'}`}>
      Color Studio
    </Link>
  </nav>
);