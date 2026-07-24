import React, { useState } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AuditView } from './components/AuditView';
import { CompareView } from './components/CompareView';
import { TimelineView } from './components/TimelineView';
import { SettingsView } from './components/SettingsView';
import { AnalysisResponse, AuditHistoryItem } from './types';
import { ChevronDown, Info } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'audit' | 'compare' | 'timeline' | 'settings'>('audit');
  const [forensicLevel, setForensicLevel] = useState<number>(5);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [auditHistory, setAuditHistory] = useState<AuditHistoryItem[]>([
    {
      id: 'audit-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceTitle: 'Veritas Tech Conglomerate History',
      question: 'When was the company founded, and what were its primary expansion and investment activities?',
      stats: { totalClaims: 4, supportedCount: 2, unsupportedCount: 2, hallucinationRate: 50 },
      response: {
        synthesis: 'Veritas was incorporated in 2004 following early incubation research at Stanford University.',
        claims: [
          {
            id: 'c1',
            text: 'The organization expanded its presence into the European market during the early 2000s.',
            status: 'supported',
            confidence: 96,
            citation: 'Section 2.1: European Expansion Records',
          },
          {
            id: 'c2',
            text: 'The company was founded in 1998 in a small garage in Palo Alto.',
            status: 'unsupported',
            confidence: 12,
            evidenceGap: 'Official records suggest a founding date of 2004.',
          },
        ],
        stats: { totalClaims: 2, supportedCount: 1, unsupportedCount: 1, hallucinationRate: 50 },
        telemetry: { latencyMs: 142, tokensPerSec: 1200, forensicLevel: 5 },
      },
    },
  ]);

  const handleAnalysisComplete = (
    result: AnalysisResponse,
    documentTitle: string,
    question: string
  ) => {
    const newItem: AuditHistoryItem = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceTitle: documentTitle,
      question,
      stats: result.stats,
      response: result,
    };
    setAuditHistory((prev) => [newItem, ...prev]);
  };

  const handleSelectAuditFromTimeline = (item: AuditHistoryItem) => {
    setCurrentTab('audit');
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] font-body flex flex-col selection:bg-[#57f1db]/30">
      {/* Top App Header */}
      <TopAppBar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        forensicLevel={forensicLevel}
      />

      {/* Main Shell Container */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        {/* Navigation Sidebar */}
        <NavigationDrawer currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto min-w-0">
          {currentTab === 'audit' && (
            <AuditView
              forensicLevel={forensicLevel}
              onAnalysisComplete={handleAnalysisComplete}
            />
          )}

          {currentTab === 'compare' && <CompareView />}

          {currentTab === 'timeline' && (
            <TimelineView
              history={auditHistory}
              onSelectAudit={handleSelectAuditFromTimeline}
              onClearHistory={() => setAuditHistory([])}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              forensicLevel={forensicLevel}
              setForensicLevel={setForensicLevel}
            />
          )}

          {/* Footer Section */}
          <footer className="mt-12 pt-6 border-t border-[#3c4a46]/40 space-y-4">
            {/* Collapsible Architecture Info */}
            <details className="group border border-[#3c4a46]/30 rounded-lg p-4 bg-[#0d1c2d]/40">
              <summary className="list-none flex justify-between items-center cursor-pointer font-code text-xs text-[#adc6ff] hover:text-[#57f1db] transition-colors">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#57f1db]" />
                  <span className="font-bold">How Veritas Engine works</span>
                </div>
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform text-[#859490]" />
              </summary>
              <div className="mt-3 pt-3 border-t border-[#3c4a46]/20 font-body text-xs text-[#bacac5] leading-relaxed space-y-3">
                <p>
                  Veritas utilizes a multi-stage reasoning engine to decompose claims. We map semantic nodes from your query against provided documentation, identifying direct evidence, contradictions, and hallucinations with timestamped citations.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-code text-[10px]">
                  <span className="px-2 py-0.5 border border-[#44d69b]/30 bg-[#44d69b]/10 text-[#44d69b] uppercase">
                    NLI Engine 4.2
                  </span>
                  <span className="px-2 py-0.5 border border-[#57f1db]/30 bg-[#57f1db]/10 text-[#57f1db] uppercase">
                    Semantic Mapping
                  </span>
                  <span className="px-2 py-0.5 border border-[#adc6ff]/30 bg-[#adc6ff]/10 text-[#adc6ff] uppercase">
                    Factuality Scoring
                  </span>
                </div>
              </div>
            </details>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 font-code text-xs text-[#859490]">
              <div className="flex gap-4">
                <button
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="hover:text-[#57f1db] transition-colors"
                >
                  Documentation
                </button>
                <button
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="hover:text-[#57f1db] transition-colors"
                >
                  API
                </button>
                <button
                  onClick={() => setIsHowItWorksOpen(true)}
                  className="hover:text-[#57f1db] transition-colors"
                >
                  Terms
                </button>
              </div>
              <p className="opacity-60 text-center sm:text-right">
                © 2024 Veritas Intelligence Systems. Verify what your LLM actually said.
              </p>
            </div>
          </footer>
        </main>
      </div>

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
}
