import React from 'react';
import { RefillActionOption, RefillCase } from '../../types/refill';
import { Play, ArrowRight, PhoneCall, FileText, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface ActionPanelProps {
  refillCase: RefillCase;
  onSelectAction: (action: RefillActionOption) => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  refillCase,
  onSelectAction
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Resolution Action Center
          </span>
          <h3 className="text-sm font-bold text-slate-950 mt-0.5">
            Execute Next Operational Step
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Human-in-the-loop review enforced
        </span>
      </div>

      {/* Available Actions Grid */}
      <div className="grid grid-cols-1 gap-3">
        {refillCase.availableActions.map((action) => {
          const isPrimary = action.primary;
          return (
            <div
              key={action.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isPrimary
                  ? 'border-teal-400 bg-teal-50/40 shadow-xs ring-1 ring-teal-400/20'
                  : 'border-slate-200/90 hover:border-teal-300 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-slate-900">
                    {action.label}
                  </h4>
                  {isPrimary && (
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-100/80 border border-teal-200 px-2 py-0.5 rounded-md">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2 font-medium">
                  {action.description}
                </p>
                <p className="text-[11px] text-teal-900/80 font-mono leading-tight bg-teal-50/60 p-2 rounded-lg border border-teal-100">
                  <strong className="text-teal-950 font-bold">Consequence:</strong> {action.consequence}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => onSelectAction(action)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.8 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-98 ${
                    isPrimary
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-xs'
                      : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  <span>Select Action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
