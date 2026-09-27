import React from 'react';
import { BlockerDetails } from '../../types/refill';
import { AlertCircle, HelpCircle, ArrowRight, UserCheck, Shield, CheckCircle2, FileSearch } from 'lucide-react';

interface BlockerReasoningPanelProps {
  blocker: BlockerDetails;
  ownerName?: string;
  nextActionLabel?: string;
}

export const BlockerReasoningPanel: React.FC<BlockerReasoningPanelProps> = ({ 
  blocker, 
  ownerName = "Dr. Patel's practice",
  nextActionLabel = "Request provider review" 
}) => {
  if (blocker.type === 'NONE') {
    return (
      <div className="bg-white rounded-2xl border border-emerald-300 p-6 shadow-xs bg-emerald-50/30">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>REFILL STATUS</span>
        </div>
        <h4 className="text-sm font-bold text-slate-900">
          No Active Blockers · Workflow Completed
        </h4>
        <p className="text-xs text-slate-600 mt-1">
          {blocker.reason}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
      {/* Panel Header */}
      <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">
              WHY THIS REFILL IS STUCK
            </h3>
          </div>
          <p className="text-base font-bold text-slate-950 mt-1">
            {blocker.title}
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-bold text-rose-900 bg-rose-50 border border-rose-200/90 rounded-xl shadow-2xs uppercase">
          {blocker.badgeLabel}
        </span>
      </div>

      {/* Structured Operational Summary: Blocker, Reason, Owner, Next action */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Blocker
          </span>
          <p className="font-bold text-slate-900 mt-1">
            {blocker.title}
          </p>
        </div>

        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Reason
          </span>
          <p className="font-bold text-slate-900 mt-1">
            {blocker.reason}
          </p>
        </div>

        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Owner
          </span>
          <p className="font-bold text-slate-900 mt-1">
            {ownerName}
          </p>
        </div>

        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Next action
          </span>
          <p className="font-bold text-slate-900 mt-1">
            {nextActionLabel}
          </p>
        </div>
      </div>

      {/* The Operational Quadrants with Direct Questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {/* Why is this blocked? */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-1.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Why is this blocked?
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {blocker.whatIsRequired || blocker.reason}
          </p>
        </div>

        {/* Who needs to act? */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-1.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Who needs to act?
          </span>
          <p className="text-xs text-slate-900 leading-relaxed font-bold flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{blocker.whoCanResolve}</span>
          </p>
        </div>

        {/* What happens next? */}
        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-1.5 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            What happens next?
          </span>
          <p className="text-xs text-slate-700 leading-relaxed flex items-start gap-1.5 font-medium">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span>{blocker.whatHappensAfter}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
