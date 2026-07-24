import React, { useState } from 'react';
import { FileText, HelpCircle, Bolt, Upload, Search, BarChart2, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { SAMPLE_PRESETS, SamplePreset } from '../data/sampleDocuments';
import { AnalysisResponse, Claim } from '../types';
import { ProcessingOverlay } from './ProcessingOverlay';
import { HallucinationPopover } from './HallucinationPopover';

interface AuditViewProps {
  forensicLevel: number;
  onAnalysisComplete: (result: AnalysisResponse, documentTitle: string, question: string) => void;
}

export const AuditView: React.FC<AuditViewProps> = ({ forensicLevel, onAnalysisComplete }) => {
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset | null>(SAMPLE_PRESETS[0]);
  const [sourceDocument, setSourceDocument] = useState<string>(SAMPLE_PRESETS[0].sourceDocument);
  const [question, setQuestion] = useState<string>(SAMPLE_PRESETS[0].defaultQuestion);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [activeClaim, setActiveClaim] = useState<Claim | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handlePresetSelect = (preset: SamplePreset) => {
    setSelectedPreset(preset);
    setSourceDocument(preset.sourceDocument);
    setQuestion(preset.defaultQuestion);
  };

  const handleAnalyze = async () => {
    if (!sourceDocument.trim() || !question.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setActiveClaim(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceDocument,
          question,
          forensicLevel,
        }),
      });

      const data: AnalysisResponse = await response.json();
      
      // Delay slightly for dramatic terminal processing effect
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult(data);
        onAnalysisComplete(
          data,
          selectedPreset ? selectedPreset.title : 'Custom Document Audit',
          question
        );
      }, 2400);
    } catch (error) {
      console.error('Audit failed:', error);
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        setSourceDocument(text);
        setSelectedPreset(null);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        setSourceDocument(text);
        setSelectedPreset(null);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Header */}
      <section className="mt-2">
        <h1 className="font-headline text-2xl md:text-3xl font-semibold text-[#d4e4fa] tracking-tight">
          Audit LLM Responses
        </h1>
        <p className="font-body text-sm text-[#bacac5] max-w-xl mt-1 leading-relaxed">
          Cross-reference model outputs against technical documentation with clinical precision and sub-millisecond NLI claim deconstruction.
        </p>
      </section>

      {/* Preset Pickers */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-code text-xs text-[#859490] uppercase tracking-wider mr-2">
          Load Reference Preset:
        </span>
        {SAMPLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetSelect(preset)}
            className={`px-3 py-1.5 rounded text-xs font-code tracking-wider border transition-all ${
              selectedPreset?.id === preset.id
                ? 'bg-[#57f1db]/15 border-[#57f1db] text-[#57f1db] font-bold'
                : 'bg-[#0d1c2d] border-[#3c4a46]/50 text-[#bacac5] hover:text-[#57f1db] hover:border-[#57f1db]/50'
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Input Section */}
      <section className="grid grid-cols-1 gap-5">
        {/* Source Document Bento */}
        <div className="bg-[#0d1c2d]/80 backdrop-blur border border-[#3c4a46]/50 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-[#bacac5]">
              <FileText className="w-4 h-4 text-[#859490]" />
              <span className="font-code text-xs font-bold uppercase tracking-wider">
                SOURCE DOCUMENT
              </span>
            </div>
            <label className="px-3 py-1 border border-[#57f1db]/30 rounded text-xs font-code text-[#57f1db] hover:bg-[#57f1db]/10 transition-colors uppercase cursor-pointer">
              Browse...
              <input type="file" accept=".txt,.md,.json,.csv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative rounded-lg p-3 min-h-[160px] border-2 border-dashed transition-all flex flex-col ${
              dragOver
                ? 'border-[#57f1db] bg-[#57f1db]/5'
                : 'border-[#3c4a46]/40 bg-[#010f1f]'
            }`}
          >
            <textarea
              value={sourceDocument}
              onChange={(e) => {
                setSourceDocument(e.target.value);
                setSelectedPreset(null);
              }}
              placeholder="Paste reference text or drag technical documentation here for verification..."
              className="w-full h-36 bg-transparent border-none text-xs font-body text-[#d4e4fa] focus:outline-none focus:ring-0 resize-none leading-relaxed placeholder:text-[#859490]/50"
            />
          </div>
        </div>

        {/* Question Input Bento */}
        <div className="bg-[#0d1c2d]/80 backdrop-blur border border-[#3c4a46]/50 p-4 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-[#bacac5]">
            <HelpCircle className="w-4 h-4 text-[#859490]" />
            <span className="font-code text-xs font-bold uppercase tracking-wider">
              YOUR QUESTION / CLAIM TO VERIFY
            </span>
          </div>
          <div className="bg-[#010f1f] rounded border border-[#3c4a46]/50 overflow-hidden focus-within:border-[#57f1db] transition-colors">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What specific claim needs verification?"
              className="bg-transparent border-none w-full px-4 py-3 font-body text-sm text-[#d4e4fa] placeholder:text-[#859490]/50 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* Action Trigger Button */}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !sourceDocument.trim() || !question.trim()}
          className={`w-full py-3.5 rounded font-code text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all font-bold ${
            sourceDocument.trim() && question.trim() && !isAnalyzing
              ? 'bg-[#57f1db] text-[#003731] shadow-[0_0_20px_rgba(87,241,219,0.3)] hover:brightness-110 active:scale-98 cursor-pointer'
              : 'bg-[#3c4a46]/40 text-[#bacac5] opacity-50 cursor-not-allowed'
          }`}
        >
          <Bolt className="w-4 h-4" />
          <span>Analyze Claims</span>
        </button>
      </section>

      {/* Terminal Live STDOUT Processing Overlay */}
      {isAnalyzing && <ProcessingOverlay question={question} isAnalyzing={isAnalyzing} />}

      {/* Audit Analysis Results Section */}
      {analysisResult && !isAnalyzing && (
        <section className="space-y-6 animate-in fade-in duration-300">
          {/* Legend Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#3c4a46]/40 pb-3 gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#57f1db]">analytics</span>
              <span className="font-code text-xs text-[#bacac5] font-bold uppercase tracking-wider">
                ANALYSIS OUTPUT
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#44d69b]/10 px-3 py-1 rounded-full border border-[#44d69b]/30">
                <span className="w-2 h-2 rounded-full bg-[#44d69b] shadow-[0_0_8px_#44d69b]"></span>
                <span className="font-code text-xs text-[#44d69b] font-bold uppercase tracking-wider">
                  Supported
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#ffb4ab]/10 px-3 py-1 rounded-full border border-[#ffb4ab]/30">
                <span className="w-2 h-2 rounded-full bg-[#ffb4ab] shadow-[0_0_8px_#ffb4ab]"></span>
                <span className="font-code text-xs text-[#ffb4ab] font-bold uppercase tracking-wider">
                  Unsupported (Hallucination)
                </span>
              </div>
            </div>
          </div>

          {/* Main Interactive Claims Text Box */}
          <div className="relative bg-[#0d1c2d] p-6 rounded-xl border border-[#3c4a46]/60 space-y-4 shadow-xl">
            <h2 className="font-code text-xs text-[#859490] uppercase tracking-wider">
              NLI Synthesized Response & Deconstructed Propositions
            </h2>

            <div className="font-body text-base leading-relaxed text-[#d4e4fa] space-y-3">
              <p className="italic text-[#bacac5] border-l-2 border-[#57f1db] pl-3 py-1 text-sm bg-[#010f1f]/50">
                "{analysisResult.synthesis}"
              </p>

              <div className="space-y-2 pt-2">
                <p className="font-code text-xs text-[#57f1db] uppercase tracking-wider">
                  Click any claim highlight to inspect Evidence Gap and Citations:
                </p>
                <div className="flex flex-wrap gap-2 leading-relaxed">
                  {analysisResult.claims.map((claim) => (
                    <span
                      key={claim.id}
                      onClick={() => setActiveClaim(claim)}
                      className={`inline-block px-2.5 py-1 rounded text-sm font-medium ${
                        claim.status === 'supported' ? 'hal-highlight-teal' : 'hal-highlight-red ring-1 ring-[#ffb4ab]/30'
                      }`}
                      title={
                        claim.status === 'supported'
                          ? 'Click to view source citation'
                          : 'Click to inspect hallucination evidence gap'
                      }
                    >
                      {claim.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Popover Inspector */}
            {activeClaim && (
              <div className="mt-4">
                <HallucinationPopover
                  claim={activeClaim}
                  onClose={() => setActiveClaim(null)}
                />
              </div>
            )}
          </div>

          {/* Verification Summary Cards (Bento Grid) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Verification Stats */}
            <div className="bg-[#010f1f] border border-[#3c4a46]/50 p-5 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-code text-xs text-[#859490] uppercase tracking-wider">
                  VERIFICATION STATS
                </h3>
                <div className="flex gap-6 mt-3">
                  <div>
                    <span className="block font-headline text-2xl font-bold text-[#d4e4fa]">
                      {analysisResult.stats.totalClaims}
                    </span>
                    <span className="font-code text-xs text-[#859490]">Total Claims</span>
                  </div>
                  <div className="border-l border-[#3c4a46]/40 pl-6">
                    <span className="block font-headline text-2xl font-bold text-[#44d69b]">
                      {analysisResult.stats.supportedCount}
                    </span>
                    <span className="font-code text-xs text-[#859490]">Supported</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(#ffb4ab 0% ${analysisResult.stats.hallucinationRate}%, #44d69b ${analysisResult.stats.hallucinationRate}% 100%)`,
                  }}
                >
                  <div className="w-11 h-11 bg-[#010f1f] rounded-full flex items-center justify-center relative z-10">
                    <span className="font-code text-xs text-[#d4e4fa] font-bold">
                      {analysisResult.stats.hallucinationRate}%
                    </span>
                  </div>
                </div>
                <span className="font-code text-[11px] text-[#ffb4ab] font-bold text-center leading-tight">
                  Hallucination<br />Rate
                </span>
              </div>
            </div>

            {/* System Precision Card */}
            <div className="bg-[#122131] border border-[#3c4a46]/50 p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center z-10">
                <h3 className="font-code text-xs text-[#859490] uppercase tracking-wider">
                  SYSTEM PRECISION
                </h3>
                <span className="font-code text-xs text-[#57f1db] font-bold">v4.2.0-core</span>
              </div>

              <div className="mt-4 space-y-2 z-10">
                <div className="w-full bg-[#051424] h-1.5 rounded-full overflow-hidden ring-1 ring-[#3c4a46]/30">
                  <div
                    className="bg-[#57f1db] h-full transition-all duration-1000"
                    style={{ width: '82%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-[#bacac5] text-xs font-code">
                  <span className="italic">Latent Reliability Check</span>
                  <span className="text-[#57f1db] font-bold">82%</span>
                </div>
              </div>

              <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none">
                <Shield className="w-24 h-24 text-[#57f1db]" />
              </div>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};
