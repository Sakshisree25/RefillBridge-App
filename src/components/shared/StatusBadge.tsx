import React from 'react';
import { RefillStatus, BlockerType, UrgencyLevel, NodeStatus } from '../../types/refill';
import { AlertCircle, Clock, CheckCircle2, ShieldAlert, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: RefillStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';
  const textClass = isSm ? 'text-[11px]' : 'text-xs';

  switch (status) {
    case 'BLOCKED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold text-rose-800 bg-rose-50 border border-rose-200/90 px-2 py-0.5 rounded ${textClass}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          BLOCKED
        </span>
      );
    case 'NEEDS_ACTION':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold text-amber-800 bg-amber-50 border border-amber-200/90 px-2 py-0.5 rounded ${textClass}`}>
          <AlertCircle className="w-3 h-3 text-amber-600" />
          NEEDS ATTENTION
        </span>
      );
    case 'WAITING':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold text-sky-800 bg-sky-50 border border-sky-200/90 px-2 py-0.5 rounded ${textClass}`}>
          <Clock className="w-3 h-3 text-sky-600" />
          WAITING
        </span>
      );
    case 'IN_PROGRESS':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold text-indigo-800 bg-indigo-50 border border-indigo-200/90 px-2 py-0.5 rounded ${textClass}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          IN REVIEW
        </span>
      );
    case 'RESOLVED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-2 py-0.5 rounded ${textClass}`}>
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          RESOLVED
        </span>
      );
    default:
      return null;
  }
};

export const BlockerChip: React.FC<{ type: BlockerType; label: string }> = ({ type, label }) => {
  if (type === 'NONE') return null;

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
      {label}
    </span>
  );
};

export const UrgencyBadge: React.FC<{ urgency: UrgencyLevel }> = ({ urgency }) => {
  switch (urgency) {
    case 'CRITICAL':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 uppercase">
          <ShieldAlert className="w-3 h-3 text-rose-600" />
          ESCALATED
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          High Priority
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="text-[11px] font-medium text-slate-600">
          Standard
        </span>
      );
    case 'ROUTINE':
      return (
        <span className="text-[11px] text-slate-400">
          Routine
        </span>
      );
  }
};

export const NodeStateIndicator: React.FC<{ status: NodeStatus }> = ({ status }) => {
  switch (status) {
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </span>
      );
    case 'BLOCKED':
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-100 text-rose-700 border border-rose-400 animate-subtle-pulse">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
        </span>
      );
    case 'ACTIVE':
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-100 text-sky-700 border border-sky-400">
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping" />
        </span>
      );
    case 'WAITING':
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 text-amber-700 border border-amber-300">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
        </span>
      );
    case 'PENDING':
    default:
      return (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </span>
      );
  }
};
