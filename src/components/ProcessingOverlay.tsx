import React, { useEffect, useState } from 'react';
import { Check, RefreshCw } from 'lucide-react';

interface ProcessingOverlayProps {
  question: string;
  isAnalyzing: boolean;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ question, isAnalyzing }) => {
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);
  const [extractedCount, setExtractedCount] = useState<number>(1);

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStage(1);
      setExtractedCount(1);
      return;
    }

    const timer1 = setTimeout(() => setCurrentStage(2), 700);
    const timer2 = setInterval(() => {
      setExtractedCount((prev) => (prev < 4 ? prev + 1 : prev));
    }, 500);
    const timer3 = setTimeout(() => setCurrentStage(3), 2200);

    return () => {
      clearTimeout(timer1);
      clearInterval(timer2);
      clearTimeout(timer3);
    };
  }, [isAnalyzing]);

  if (!isAnalyzing) return null;

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-6 bg-[#0d1c2d] border border-[#57f1db]/40 rounded-xl relative overflow-hidden shadow-2xl space-y-5">
      <div className="scan-line"></div>

      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-[#3c4a46]/40 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#adc6ff]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#57f1db]"></div>
        </div>
        <span className="font-code text-xs text-[#bacac5] opacity-75 tracking-wider">
          STDOUT :: VERIFICATION_ENGINE_V4
        </span>
      </div>

      {/* Stage 1: Synthesis */}
      <div
        className={`p-4 rounded-lg border transition-all ${
          currentStage >= 1
            ? 'bg-[#122131] border-[#57f1db]/50 shadow-[0_0_15px_rgba(87,241,219,0.08)]'
            : 'bg-[#010f1f] border-[#3c4a46]/20 opacity-50'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {currentStage > 1 ? (
              <div className="w-6 h-6 rounded-full bg-[#2dd4bf]/20 border border-[#57f1db] flex items-center justify-center shadow-[0_0_10px_rgba(87,241,219,0.3)]">
                <Check className="w-3.5 h-3.5 text-[#57f1db]" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#57f1db]/20 border border-[#57f1db] flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-[#57f1db]"></div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-code text-xs text-[#57f1db] uppercase tracking-wider mb-1">
              Stage 01: Synthesis
            </h3>
            <p className="font-headline text-base text-[#d4e4fa] font-semibold mb-2">
              Generating answer based on source document
            </p>
            <div className="bg-[#1c2b3c]/60 p-2.5 rounded border border-[#3c4a46]/30">
              <p className="font-code text-xs text-[#bacac5] italic leading-relaxed">
                "{question}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stage 2: Extraction */}
      <div
        className={`p-4 rounded-lg border transition-all ${
          currentStage === 2
            ? 'bg-[#122131] border-[#57f1db]/70 shadow-[0_0_20px_rgba(87,241,219,0.12)]'
            : currentStage > 2
            ? 'bg-[#122131] border-[#57f1db]/40'
            : 'bg-[#010f1f] border-[#3c4a46]/20 opacity-50'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            {currentStage > 2 ? (
              <div className="w-6 h-6 rounded-full bg-[#2dd4bf]/20 border border-[#57f1db] flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-[#57f1db]" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#57f1db]/20 border border-[#57f1db] flex items-center justify-center animate-spin">
                <RefreshCw className="w-3.5 h-3.5 text-[#57f1db]" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-code text-xs text-[#3cddc7] uppercase tracking-wider">
                Stage 02: Extraction
              </h3>
              {currentStage === 2 && (
                <span className="font-code text-xs text-[#57f1db] animate-pulse">
                  EXTRACTING_CLAIMS...
                </span>
              )}
            </div>
            <p className="font-headline text-base text-[#d4e4fa] font-semibold mb-3">
              Identifying core propositions
            </p>

            <div className="space-y-1.5 font-code text-xs">
              <div className="flex items-center gap-2 bg-[#273647]/50 px-3 py-1.5 border-l-2 border-[#57f1db] rounded-r">
                <span className="text-[#57f1db]">01</span>
                <span className="text-[#d4e4fa] truncate">Proposition extraction active</span>
                <span className="ml-auto text-[#57f1db] animate-spin text-[10px]">SYNC</span>
              </div>
              {extractedCount >= 2 && (
                <div className="flex items-center gap-2 bg-[#273647]/30 px-3 py-1.5 border-l-2 border-[#66f3b6] rounded-r">
                  <span className="text-[#66f3b6]">02</span>
                  <span className="text-[#d4e4fa] truncate">Parsing NLI logical boundaries</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stage 3: Forensic Check */}
      <div
        className={`p-4 rounded-lg border transition-all ${
          currentStage === 3
            ? 'bg-[#122131] border-[#57f1db] shadow-[0_0_20px_rgba(87,241,219,0.15)]'
            : 'bg-[#010f1f] border-[#3c4a46]/20 opacity-40'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full border border-[#3c4a46] flex items-center justify-center font-code text-xs text-[#859490]">
            03
          </div>
          <div className="flex-1">
            <h3 className="font-code text-xs text-[#859490] uppercase tracking-wider mb-1">
              Stage 03: Forensic Check
            </h3>
            <p className="font-headline text-base text-[#d4e4fa] font-semibold">
              Verifying against sources
            </p>
            <p className="font-body text-xs text-[#bacac5] mt-1">
              {currentStage < 3 ? 'Pending extraction completion.' : 'Matching semantic nodes against documentation...'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Telemetry */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-[#1c2b3c]/50 p-3 border border-[#3c4a46]/50 rounded">
          <div className="font-code text-[10px] text-[#859490] uppercase mb-1">LATENCY</div>
          <div className="font-code text-sm text-[#57f1db] font-bold">
            142ms <span className="text-[#859490] text-[10px] font-normal">AVG</span>
          </div>
        </div>
        <div className="bg-[#1c2b3c]/50 p-3 border border-[#3c4a46]/50 rounded">
          <div className="font-code text-[10px] text-[#859490] uppercase mb-1">TOKENS/SEC</div>
          <div className="font-code text-sm text-[#57f1db] font-bold">
            1.2k <span className="text-[#859490] text-[10px] font-normal">PEAK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
