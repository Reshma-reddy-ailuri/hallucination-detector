import React from 'react';
import { Shield, Sparkles, HelpCircle } from 'lucide-react';

interface TopAppBarProps {
  currentTab: 'audit' | 'compare' | 'timeline' | 'settings';
  setCurrentTab: (tab: 'audit' | 'compare' | 'timeline' | 'settings') => void;
  onOpenHowItWorks: () => void;
  forensicLevel: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenHowItWorks,
  forensicLevel,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#051424]/90 backdrop-blur-md border-b border-[#3c4a46]/50 px-4 md:px-8 py-3 flex justify-between items-center w-full">
      <div className="flex items-center gap-6">
        <div 
          onClick={() => setCurrentTab('audit')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[#57f1db] text-2xl group-hover:scale-110 transition-transform">
            verified_user
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-headline text-xl font-bold text-[#57f1db] tracking-tight">
              Veritas
            </span>
            <span className="font-code text-[11px] text-[#859490] tracking-wider opacity-80">
              INTELLIGENCE SYSTEMS
            </span>
          </div>
        </div>

        {/* Top Header Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0d1c2d] border border-[#3c4a46]/40 p-1 rounded-lg">
          <button
            onClick={() => setCurrentTab('audit')}
            className={`px-3 py-1 rounded text-xs font-code tracking-wider uppercase transition-all ${
              currentTab === 'audit'
                ? 'bg-[#57f1db] text-[#003731] font-bold shadow-[0_0_12px_rgba(87,241,219,0.25)]'
                : 'text-[#bacac5] hover:text-[#57f1db] hover:bg-[#1c2b3c]'
            }`}
          >
            Audit & Verification
          </button>
          <button
            onClick={() => setCurrentTab('compare')}
            className={`px-3 py-1 rounded text-xs font-code tracking-wider uppercase transition-all ${
              currentTab === 'compare'
                ? 'bg-[#57f1db] text-[#003731] font-bold shadow-[0_0_12px_rgba(87,241,219,0.25)]'
                : 'text-[#bacac5] hover:text-[#57f1db] hover:bg-[#1c2b3c]'
            }`}
          >
            Compare Reports
          </button>
          <button
            onClick={() => setCurrentTab('timeline')}
            className={`px-3 py-1 rounded text-xs font-code tracking-wider uppercase transition-all ${
              currentTab === 'timeline'
                ? 'bg-[#57f1db] text-[#003731] font-bold shadow-[0_0_12px_rgba(87,241,219,0.25)]'
                : 'text-[#bacac5] hover:text-[#57f1db] hover:bg-[#1c2b3c]'
            }`}
          >
            Timeline Log
          </button>
          <button
            onClick={() => setCurrentTab('settings')}
            className={`px-3 py-1 rounded text-xs font-code tracking-wider uppercase transition-all ${
              currentTab === 'settings'
                ? 'bg-[#57f1db] text-[#003731] font-bold shadow-[0_0_12px_rgba(87,241,219,0.25)]'
                : 'text-[#bacac5] hover:text-[#57f1db] hover:bg-[#1c2b3c]'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Forensic Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 border border-[#3c4a46]/40 rounded bg-[#0d1c2d]">
          <Shield className="w-3.5 h-3.5 text-[#66f3b6]" />
          <span className="font-code text-xs text-[#d4e4fa] tracking-wider uppercase">
            FORENSIC_LEVEL_{forensicLevel}
          </span>
        </div>

        {/* How It Works Action */}
        <button
          onClick={onOpenHowItWorks}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#57f1db]/30 rounded text-xs font-code uppercase tracking-wider text-[#57f1db] hover:bg-[#57f1db]/10 transition-colors active:scale-95"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>How it works</span>
        </button>
      </div>
    </header>
  );
};
