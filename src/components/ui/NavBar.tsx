import { Gauge, Archive, GraduationCap, Swords } from 'lucide-react';
import type { TabKey } from '@/types/f1';

interface NavBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string; icon: typeof Gauge }[] = [
  { key: 'grid', label: 'The Grid', icon: Gauge },
  { key: 'archive', label: 'The Archive', icon: Archive },
  { key: 'academy', label: 'The Academy', icon: GraduationCap },
  { key: 'headtohead', label: 'Head-to-Head', icon: Swords },
];

export function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-800 p-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-[#E10600] text-white shadow-lg shadow-[#E10600]/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 px-2 py-2 flex items-center justify-around">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                isActive ? 'text-[#E10600]' : 'text-zinc-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
