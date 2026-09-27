import React from 'react';
import { JourneyStep } from '../../types/refill';
import { X, CheckCircle2, AlertCircle, Clock, Server, User, ArrowRight } from 'lucide-react';

interface JourneyNodeDrawerProps {
  step: JourneyStep | null;
  onClose: () => void;
  onActionClick?: (actionLabel: string) => void;
}

export const JourneyNodeDrawer: React.FC<JourneyNodeDrawerProps> = ({
  step,
  onClose,
  onActionClick
}) => {
  if (!step) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Stage Inspection
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs font-semibold text-slate-800">
            {step.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Status Kicker */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {step.label}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {step.actor} ({step.role})
            </p>
          </div>
          <div>
            {step.status === 'COMPLETED' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
            {step.status === 'BLOCKED' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                <AlertCircle className="w-3.5 h-3.5" />
                Blocked
              </span>
            )}
            {step.status === 'ACTIVE' && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
                Active Now
              </span>
            )}
            {step.status === 'WAITING' && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Clock className="w-3.5 h-3.5" />
                Waiting
              </span>
            )}
            {step.status === 'PENDING' && (
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                Pending Downstream
              </span>
            )}
          </div>
        </div>

        {/* What Happened */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            What Happened Here
          </span>
          <p className="text-xs text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
            {step.whatHappened}
          </p>
        </div>

        {/* What Is Missing (If Blocked or Waiting) */}
        {step.whatIsMissing && (
          <div>
            <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block mb-1">
              What Is Missing / Blocking Progress
            </span>
            <div className="p-3 bg-rose-50/70 border border-rose-200/70 rounded-lg text-xs text-rose-900 leading-relaxed">
              {step.whatIsMissing}
            </div>
          </div>
        )}

        {/* Next Action */}
        {step.nextAction && (
          <div>
            <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider block mb-1">
              Required Next Action
            </span>
            <div className="p-3 bg-sky-50/70 border border-sky-200/70 rounded-lg text-xs text-sky-900 flex items-center justify-between">
              <span>{step.nextAction}</span>
              {onActionClick && (
                <button
                  onClick={() => onActionClick(step.nextAction!)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-900 ml-2"
                >
                  <span>Resolve</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Source System & Audit Telemetry */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            System & Event Metadata
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200/40">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Server className="w-3 h-3 text-slate-400" />
                Source System
              </span>
              <span className="font-mono text-slate-700">{step.sourceSystem}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200/40">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-slate-400" />
                Timestamp
              </span>
              <span className="font-mono text-slate-700">{step.timestamp}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200/40">
              <span className="text-slate-500 flex items-center gap-1.5">
                <User className="w-3 h-3 text-slate-400" />
                Responsible Entity
              </span>
              <span className="font-medium text-slate-700">{step.actor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-2xs transition-colors"
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
};
