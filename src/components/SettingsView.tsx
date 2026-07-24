import React from 'react';
import { Sliders, Shield, Cpu, Lock, Check } from 'lucide-react';

interface SettingsViewProps {
  forensicLevel: number;
  setForensicLevel: (level: number) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  forensicLevel,
  setForensicLevel,
}) => {
  return (
    <div className="space-y-8 pb-16 max-w-3xl">
      <div className="border-b border-[#3c4a46]/40 pb-4">
        <h1 className="font-headline text-2xl md:text-3xl font-semibold text-[#d4e4fa] tracking-tight">
          Engine Settings & Forensic Parameters
        </h1>
        <p className="font-body text-sm text-[#bacac5] mt-1">
          Configure NLI deconstruction sensitivity, model selection, and hallucination detection thresholds.
        </p>
      </div>

      {/* Forensic Level Selection */}
      <div className="bg-[#0d1c2d] border border-[#3c4a46]/50 p-6 rounded-xl space-y-4">
        <div className="flex items-center gap-2 text-[#57f1db]">
          <Shield className="w-5 h-5" />
          <h3 className="font-code text-sm font-bold uppercase tracking-wider">
            Forensic Inspection Sensitivity Level
          </h3>
        </div>

        <p className="font-body text-xs text-[#bacac5] leading-relaxed">
          Higher levels enforce stricter sub-proposition semantic validation, detecting subtle extrapolation or missing source evidence.
        </p>

        <div className="grid grid-cols-5 gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setForensicLevel(level)}
              className={`py-3 rounded-lg border font-code text-xs uppercase flex flex-col items-center gap-1 transition-all ${
                forensicLevel === level
                  ? 'bg-[#57f1db] text-[#003731] font-bold border-[#57f1db] shadow-[0_0_15px_rgba(87,241,219,0.3)]'
                  : 'bg-[#010f1f] border-[#3c4a46]/40 text-[#bacac5] hover:border-[#57f1db]/50'
              }`}
            >
              <span>Level {level}</span>
              <span className="text-[10px] font-normal opacity-80">
                {level === 1 ? 'Basic' : level === 3 ? 'Balanced' : level === 5 ? 'Strict (Default)' : 'High'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary NLI Engine Model Config */}
      <div className="bg-[#0d1c2d] border border-[#3c4a46]/50 p-6 rounded-xl space-y-4">
        <div className="flex items-center gap-2 text-[#57f1db]">
          <Cpu className="w-5 h-5" />
          <h3 className="font-code text-sm font-bold uppercase tracking-wider">
            Primary Grounding & Verification Model
          </h3>
        </div>

        <div className="space-y-3 font-body text-xs">
          <div className="p-4 rounded-lg bg-[#010f1f] border border-[#57f1db]/40 flex justify-between items-center">
            <div className="space-y-1">
              <span className="font-code text-xs font-bold text-[#57f1db]">
                Gemini 3.6 Flash (Server-Side NLI)
              </span>
              <p className="text-[#bacac5]">
                Sub-second response synthesis with structured JSON claim decomposition and Google Search grounding.
              </p>
            </div>
            <div className="px-2.5 py-1 bg-[#44d69b]/15 text-[#44d69b] border border-[#44d69b]/40 rounded font-code text-[11px] font-bold shrink-0">
              ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Security & API Status */}
      <div className="bg-[#122131] border border-[#3c4a46]/40 p-6 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-[#adc6ff]">
          <Lock className="w-5 h-5" />
          <h3 className="font-code text-sm font-bold uppercase tracking-wider">
            API Credentials & Security
          </h3>
        </div>
        <p className="font-body text-xs text-[#bacac5] leading-relaxed">
          Veritas uses server-side proxy routes for all Gemini API requests to ensure API key security. Access and secrets are securely configured via the Settings panel in Google AI Studio.
        </p>
      </div>
    </div>
  );
};
