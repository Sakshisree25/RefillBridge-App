import React from 'react';
import { RefillCase, RefillActionOption } from '../../types/refill';
import { Check, AlertCircle, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface SituationOverviewProps {
  refillCase: RefillCase;
  onExecuteAction: (action: RefillActionOption) => void;
}

export const SituationOverview: React.FC<SituationOverviewProps> = ({
  refillCase,
  onExecuteAction
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
      {/* Top Banner: The Clear Situation Statement */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Situation Assessment
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              Automated Triage Correlated
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-900 leading-relaxed max-w-3xl">
            {refillCase.situationSummary}
          </p>
        </div>

        {/* Primary CTA */}
        {refillCase.status !== 'RESOLVED' && (
          <div className="shrink-0">
            <button
              onClick={() => onExecuteAction(refillCase.nextBestAction)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <span>{refillCase.nextBestAction.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-slate-400 text-right mt-1 font-medium">
              Next recommended operational step
            </p>
          </div>
        )}
      </div>

      {/* Two-Column Facts & Gaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What We Know */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              What We Know (Verified Facts)
            </span>
            <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              {refillCase.whatWeKnow.length} Verified
            </span>
          </div>
          <ul className="space-y-2">
            {refillCase.whatWeKnow.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug font-medium">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What's Missing */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              What's Missing (Unresolved Requirements)
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
              {refillCase.whatIsMissing.length} Blocker{refillCase.whatIsMissing.length === 1 ? '' : 's'}
            </span>
          </div>
          {refillCase.whatIsMissing.length > 0 ? (
            <ul className="space-y-2">
              {refillCase.whatIsMissing.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-amber-950 leading-snug font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-emerald-800 font-medium italic flex items-center gap-1.5 pt-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              All clinical and operational prerequisites have been satisfied.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
