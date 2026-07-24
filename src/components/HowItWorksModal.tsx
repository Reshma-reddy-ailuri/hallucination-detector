import React from 'react';
import { X, Info, Cpu, Network, ShieldCheck } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0d1c2d] border border-[#57f1db]/40 rounded-xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
        <div className="flex justify-between items-center border-b border-[#3c4a46]/50 pb-4">
          <div className="flex items-center gap-2 text-[#57f1db]">
            <Info className="w-5 h-5" />
            <h2 className="font-headline text-lg font-bold">Veritas Verification Architecture</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#bacac5] hover:text-[#d4e4fa] transition-colors p-1 rounded hover:bg-[#1c2b3c]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="font-body text-sm text-[#bacac5] leading-relaxed">
          Veritas utilizes a clinical multi-stage Natural Language Inference (NLI) reasoning engine to audit Large Language Model outputs against provided technical documentation or live web ground truth.
        </p>

        <div className="space-y-4">
          <div className="p-3.5 rounded bg-[#010f1f] border border-[#3c4a46]/40 flex gap-3">
            <Cpu className="w-5 h-5 text-[#57f1db] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-code text-xs text-[#57f1db] font-bold uppercase">
                Stage 01: Synthesis & Context Ingestion
              </h4>
              <p className="font-body text-xs text-[#bacac5] mt-1">
                The document text is parsed into semantic vector embeddings. The target LLM model synthesizes a candidate answer based on the inquiry.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded bg-[#010f1f] border border-[#3c4a46]/40 flex gap-3">
            <Network className="w-5 h-5 text-[#66f3b6] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-code text-xs text-[#66f3b6] font-bold uppercase">
                Stage 02: Deconstruction & Claim Extraction
              </h4>
              <p className="font-body text-xs text-[#bacac5] mt-1">
                The generated response is atomized into discrete factual propositions (claims) isolating subject-predicate assertions for individual verification.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded bg-[#010f1f] border border-[#3c4a46]/40 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-[#adc6ff] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-code text-xs text-[#adc6ff] font-bold uppercase">
                Stage 03: Forensic NLI Cross-Examination
              </h4>
              <p className="font-body text-xs text-[#bacac5] mt-1">
                Every claim is evaluated against source citations. Supported claims receive timestamped citations; unsupported assertions trigger a Hallucination Alert with evidence gap analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-2 border-t border-[#3c4a46]/30">
          <span className="px-2 py-1 border border-[#44d69b]/30 bg-[#44d69b]/10 text-[#44d69b] text-[10px] font-code uppercase tracking-wider rounded">
            NLI Engine 4.2
          </span>
          <span className="px-2 py-1 border border-[#57f1db]/30 bg-[#57f1db]/10 text-[#57f1db] text-[10px] font-code uppercase tracking-wider rounded">
            Semantic Mapping
          </span>
          <span className="px-2 py-1 border border-[#adc6ff]/30 bg-[#adc6ff]/10 text-[#adc6ff] text-[10px] font-code uppercase tracking-wider rounded">
            Factuality Scoring
          </span>
          <span className="px-2 py-1 border border-[#ffb4ab]/30 bg-[#ffb4ab]/10 text-[#ffb4ab] text-[10px] font-code uppercase tracking-wider rounded">
            Hallucination Alerting
          </span>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#57f1db] text-[#003731] font-code text-xs font-bold rounded uppercase tracking-wider hover:brightness-110 transition-all"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
