import React from 'react';
import { History, ShieldCheck, AlertTriangle, ArrowRight, Trash2 } from 'lucide-react';
import { AuditHistoryItem } from '../types';

interface TimelineViewProps {
  history: AuditHistoryItem[];
  onSelectAudit: (item: AuditHistoryItem) => void;
  onClearHistory: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  history,
  onSelectAudit,
  onClearHistory,
}) => {
  return (
    <div className="space-y-6 pb-16">
      <div className="flex justify-between items-end border-b border-[#3c4a46]/40 pb-4">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl font-semibold text-[#d4e4fa] tracking-tight">
            Audit Timeline Log
          </h1>
          <p className="font-body text-sm text-[#bacac5] mt-1">
            Chronological forensic record of processed claims, model responses, and hallucination alerts.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-code text-[#ffb4ab] border border-[#ffb4ab]/30 hover:bg-[#ffb4ab]/10 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-[#0d1c2d] border border-dashed border-[#3c4a46]/50 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <History className="w-12 h-12 text-[#859490]/40" />
          <h3 className="font-headline text-lg font-semibold text-[#859490]">No Forensic Audits Recorded</h3>
          <p className="font-body text-xs text-[#859490] max-w-sm">
            Run a claim verification on the Audit tab to persist forensic execution records here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => {
            const hasHallucination = item.stats.unsupportedCount > 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectAudit(item)}
                className="bg-[#0d1c2d] hover:bg-[#122131] border border-[#3c4a46]/40 hover:border-[#57f1db]/50 p-4 rounded-xl transition-all cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-code text-[11px] text-[#57f1db] uppercase">
                      {item.sourceTitle}
                    </span>
                    <span className="text-[#3c4a46]">•</span>
                    <span className="font-code text-[11px] text-[#859490]">{item.timestamp}</span>
                  </div>
                  <h4 className="font-body text-sm font-semibold text-[#d4e4fa] group-hover:text-[#57f1db] transition-colors">
                    "{item.question}"
                  </h4>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-3 font-code text-xs">
                    <span className="text-[#bacac5]">
                      Claims: <strong className="text-[#d4e4fa]">{item.stats.totalClaims}</strong>
                    </span>
                    <span className="text-[#44d69b] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {item.stats.supportedCount}
                    </span>
                    {hasHallucination && (
                      <span className="text-[#ffb4ab] flex items-center gap-1 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {item.stats.unsupportedCount} Alerts
                      </span>
                    )}
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#859490] group-hover:text-[#57f1db] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
