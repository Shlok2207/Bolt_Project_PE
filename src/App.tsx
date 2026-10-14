import { useState } from 'react';
import { Flag } from 'lucide-react';
import type { TabKey } from '@/types/f1';
import { NavBar } from '@/components/ui/NavBar';
import { TheGrid } from '@/components/sections/TheGrid';
import { TheArchive } from '@/components/sections/TheArchive';
import { TheAcademy } from '@/components/sections/TheAcademy';
import { HeadToHead } from '@/components/sections/HeadToHead';

const CURRENT_YEAR = new Date().getFullYear();

const TAB_TITLES: Record<TabKey, { title: string; subtitle: string }> = {
  grid: {
    title: 'The Grid',
    subtitle: `${CURRENT_YEAR} Championship Standings`,
  },
  archive: {
    title: 'The Archive',
    subtitle: 'Season History · 2016 to Present',
  },
  academy: {
    title: 'The Academy',
    subtitle: 'Learn the Fundamentals of F1',
  },
  headtohead: {
    title: 'Head-to-Head',
    subtitle: 'Driver Telemetry Comparison',
  },
};

function App() {
  const [tab, setTab] = useState<TabKey>('grid');
  const { title, subtitle } = TAB_TITLES[tab];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E10600] flex items-center justify-center shadow-lg shadow-[#E10600]/30">
                <Flag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-none tracking-tight">
                  F1 <span className="text-[#E10600]">Stats Hub</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                  {CURRENT_YEAR} Season
                </p>
              </div>
            </div>
            <NavBar activeTab={tab} onTabChange={setTab} />
          </div>
        </div>
      </header>

      {/* Mobile tab title */}
      <div className="md:hidden px-4 pt-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-zinc-500 text-sm font-mono">{subtitle}</p>
      </div>

      {/* Desktop section title */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 pt-8 pb-2">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="text-zinc-500 text-sm font-mono mt-1">{subtitle}</p>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
        {tab === 'grid' && <TheGrid />}
        {tab === 'archive' && <TheArchive />}
        {tab === 'academy' && <TheAcademy />}
        {tab === 'headtohead' && <HeadToHead />}
      </main>

      {/* Footer */}
      <footer className="hidden md:block border-t border-zinc-800/50 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-600">
          <p className="font-mono">
            Data via Jolpica F1 API · Offline fallback active when needed
          </p>
          <p className="font-mono">F1 Stats Hub · {CURRENT_YEAR}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
