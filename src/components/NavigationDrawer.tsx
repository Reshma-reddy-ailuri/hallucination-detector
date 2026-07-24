import React from 'react';
import { History, GitCompare, FileSearch, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';

interface NavigationDrawerProps {
  currentTab: 'audit' | 'compare' | 'timeline' | 'settings';
  setCurrentTab: (tab: 'audit' | 'compare' | 'timeline' | 'settings') => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col h-[calc(100vh-57px)] sticky top-[57px] py-6 bg-[#122131] border-r border-[#3c4a46]/50 w-64 shrink-0">
        <div className="px-4 mb-6">
          <h2 className="font-headline text-sm font-bold text-[#57f1db] tracking-wider uppercase">
            ENGINEERING SUITE
          </h2>
          <p className="font-code text-[10px] text-[#859490] mt-0.5">
            NLI Forensic Pipeline v4.2
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          <button
            onClick={() => setCurrentTab('audit')}
            className={`w-full px-3 py-2.5 flex items-center gap-3 rounded transition-all text-left text-sm font-body ${
              currentTab === 'audit'
                ? 'text-[#57f1db] bg-[#2dd4bf]/10 border-r-2 border-[#57f1db] font-semibold'
                : 'text-[#bacac5] hover:bg-[#273647] hover:text-[#57f1db]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">fact_check</span>
            <span>Audit & Verification</span>
          </button>

          <button
            onClick={() => setCurrentTab('compare')}
            className={`w-full px-3 py-2.5 flex items-center gap-3 rounded transition-all text-left text-sm font-body ${
              currentTab === 'compare'
                ? 'text-[#57f1db] bg-[#2dd4bf]/10 border-r-2 border-[#57f1db] font-semibold'
                : 'text-[#bacac5] hover:bg-[#273647] hover:text-[#57f1db]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">compare_arrows</span>
            <span>Compare Reports</span>
          </button>

          <button
            onClick={() => setCurrentTab('timeline')}
            className={`w-full px-3 py-2.5 flex items-center gap-3 rounded transition-all text-left text-sm font-body ${
              currentTab === 'timeline'
                ? 'text-[#57f1db] bg-[#2dd4bf]/10 border-r-2 border-[#57f1db] font-semibold'
                : 'text-[#bacac5] hover:bg-[#273647] hover:text-[#57f1db]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">timeline</span>
            <span>Timeline Log</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-full px-3 py-2.5 flex items-center gap-3 rounded transition-all text-left text-sm font-body ${
              currentTab === 'settings'
                ? 'text-[#57f1db] bg-[#2dd4bf]/10 border-r-2 border-[#57f1db] font-semibold'
                : 'text-[#bacac5] hover:bg-[#273647] hover:text-[#57f1db]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Engine Settings</span>
          </button>
        </nav>

        <div className="mt-auto px-4 pt-4 border-t border-[#3c4a46]/30">
          <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#3c4a46]/30">
            <p className="font-code text-[10px] text-[#859490] uppercase tracking-widest mb-1">
              SYSTEM STATUS
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#57f1db] animate-pulse"></div>
              <span className="font-code text-xs text-[#d4e4fa]">System Online</span>
            </div>
            <p className="font-code text-[10px] text-[#859490] mt-1">
              Sub-ms Vector Engine
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Shell (Bottom Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#122131] border-t border-[#3c4a46]/50">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setCurrentTab('audit')}
            className={`flex flex-col items-center gap-1 text-xs font-code ${
              currentTab === 'audit' ? 'text-[#57f1db]' : 'text-[#bacac5]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">fact_check</span>
            <span className="text-[10px]">Audit</span>
          </button>

          <button
            onClick={() => setCurrentTab('compare')}
            className={`flex flex-col items-center gap-1 text-xs font-code ${
              currentTab === 'compare' ? 'text-[#57f1db]' : 'text-[#bacac5]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">compare_arrows</span>
            <span className="text-[10px]">Compare</span>
          </button>

          <button
            onClick={() => setCurrentTab('timeline')}
            className={`flex flex-col items-center gap-1 text-xs font-code ${
              currentTab === 'timeline' ? 'text-[#57f1db]' : 'text-[#bacac5]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">timeline</span>
            <span className="text-[10px]">Timeline</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`flex flex-col items-center gap-1 text-xs font-code ${
              currentTab === 'settings' ? 'text-[#57f1db]' : 'text-[#bacac5]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-[10px]">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};
