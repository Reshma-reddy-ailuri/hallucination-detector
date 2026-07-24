import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, X, Search, ExternalLink, Loader2 } from 'lucide-react';
import { Claim } from '../types';

interface HallucinationPopoverProps {
  claim: Claim;
  onClose: () => void;
}

export const HallucinationPopover: React.FC<HallucinationPopoverProps> = ({ claim, onClose }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ summary: string; sources: { title: string; uri: string }[] } | null>(null);

  const handleWebSearch = async () => {
    setIsSearching(true);
    try {
      const res = await fetch('/api/grounding-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimText: claim.text }),
      });
      const data = await res.json();
      setSearchResults(data);
    } catch (e) {
      console.error('Grounding search failed:', e);
    } finally {
      setIsSearching(false);
    }
  };

  const isUnsupported = claim.status === 'unsupported';

  return (
    <div className="bg-[#1c2b3c] border border-[#57f1db]/40 rounded-xl shadow-2xl z-50 p-5 space-y-4 max-w-lg w-full relative animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center border-b border-[#3c4a46]/40 pb-3">
        <div className="flex items-center gap-2">
          {isUnsupported ? (
            <>
              <AlertTriangle className="w-5 h-5 text-[#ffb4ab]" />
              <span className="font-code text-xs text-[#ffb4ab] font-bold uppercase tracking-wider">
                Hallucination Alert
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-[#44d69b]" />
              <span className="font-code text-xs text-[#44d69b] font-bold uppercase tracking-wider">
                Supported Claim
              </span>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-[#bacac5] hover:text-[#d4e4fa] p-1 rounded hover:bg-[#273647] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="font-code text-xs text-[#859490] uppercase mb-1">Claim Text</p>
          <p className="font-body text-sm font-medium text-[#d4e4fa] leading-relaxed bg-[#010f1f] p-3 rounded border border-[#3c4a46]/40">
            "{claim.text}"
          </p>
        </div>

        <div className="flex justify-between items-center bg-[#051424]/60 p-2.5 rounded border border-[#3c4a46]/30">
          <span className="font-code text-xs text-[#bacac5]">Confidence Score</span>
          <span
            className={`font-code text-xs font-bold ${
              isUnsupported ? 'text-[#ffb4ab]' : 'text-[#44d69b]'
            }`}
          >
            {claim.confidence}% {claim.confidence < 30 ? 'Low' : claim.confidence > 80 ? 'High' : 'Moderate'}
          </span>
        </div>

        {isUnsupported ? (
          <div className="bg-[#ffb4ab]/10 p-3 rounded-lg border-l-2 border-[#ffb4ab] space-y-1">
            <p className="font-code text-xs text-[#ffb4ab] font-bold uppercase tracking-wider">
              Evidence Gap
            </p>
            <p className="font-body text-xs text-[#bacac5] italic leading-relaxed">
              {claim.evidenceGap || 'No matching evidence found in source document.'}
            </p>
            {claim.correction && (
              <p className="font-body text-xs text-[#d4e4fa] pt-1">
                <strong className="font-code text-[11px] text-[#57f1db]">Ground Truth Correction:</strong>{' '}
                {claim.correction}
              </p>
            )}
          </div>
        ) : (
          <div className="bg-[#44d69b]/10 p-3 rounded-lg border-l-2 border-[#44d69b] space-y-1">
            <p className="font-code text-xs text-[#44d69b] font-bold uppercase tracking-wider">
              Source Citation
            </p>
            <p className="font-body text-xs text-[#bacac5] italic leading-relaxed">
              "{claim.citation || 'Verified by document semantic mapping.'}"
            </p>
          </div>
        )}
      </div>

      {/* Web Grounding Reference Modal / Action */}
      {!searchResults ? (
        <button
          onClick={handleWebSearch}
          disabled={isSearching}
          className="w-full py-2.5 bg-[#273647] hover:bg-[#2c3a4c] text-[#d4e4fa] font-code text-xs rounded border border-[#3c4a46]/50 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 text-[#57f1db] animate-spin" />
              <span>Cross-Referencing Web Grounding...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4 text-[#57f1db]" />
              <span>Search Web for Reference</span>
            </>
          )}
        </button>
      ) : (
        <div className="bg-[#010f1f] p-3.5 rounded border border-[#57f1db]/40 space-y-2 text-xs font-body">
          <div className="flex items-center gap-2 text-[#57f1db] font-code font-bold uppercase">
            <Search className="w-3.5 h-3.5" />
            <span>Web Grounding Audit</span>
          </div>
          <p className="text-[#bacac5] leading-relaxed">{searchResults.summary}</p>
          {searchResults.sources && searchResults.sources.length > 0 && (
            <div className="space-y-1 pt-1 border-t border-[#3c4a46]/30">
              <span className="font-code text-[10px] text-[#859490] uppercase">Citations:</span>
              {searchResults.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.uri}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[#57f1db] hover:underline font-code text-[11px] truncate"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span className="truncate">{src.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
