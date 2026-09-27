import React, { useState } from 'react';
import { RefillCase } from '../types/refill';
import { StatusBadge, BlockerChip, UrgencyBadge } from '../components/shared/StatusBadge';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Flame, 
  ArrowRight, 
  UserCheck, 
  Filter
} from 'lucide-react';

interface ActionCenterViewProps {
  refills: RefillCase[];
  onOpenCase: (caseId: string) => void;
}

export const ActionCenterView: React.FC<ActionCenterViewProps> = ({
  refills,
  onOpenCase
}) => {
  const [activeTab, setActiveTab] = useState<'YOUR_ACTIONS' | 'WAITING' | 'ESCALATED' | 'COMPLETED'>('YOUR_ACTIONS');

  const myActions = refills.filter(r => r.status === 'NEEDS_ACTION');
  const waitingOnOthers = refills.filter(r => r.status === 'WAITING' || (r.status === 'BLOCKED' && r.blocker.type === 'NO_REFILLS'));
  const escalations = refills.filter(r => r.urgency === 'CRITICAL');
  const completed = refills.filter(r => r.status === 'RESOLVED');

  const getActiveList = () => {
    switch (activeTab) {
      case 'YOUR_ACTIONS':
        return myActions;
      case 'WAITING':
        return waitingOnOthers;
      case 'ESCALATED':
        return escalations;
      case 'COMPLETED':
        return completed;
    }
  };

  const currentList = getActiveList();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
          ACTION CENTER
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Actions required to move active refills forward.
        </p>
      </div>

      {/* Grouping Tabs (Pale Tonal Palette) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveTab('YOUR_ACTIONS')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'YOUR_ACTIONS'
              ? 'bg-amber-50/80 border-amber-300 shadow-xs'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-950 uppercase tracking-wider">
            <span>YOUR ACTIONS</span>
            <span className="font-mono text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200 text-[10px]">
              {myActions.length}
            </span>
          </div>
          <p className="text-[11px] text-amber-900/80 mt-1 font-medium">Cases requiring staff action.</p>
        </button>

        <button
          onClick={() => setActiveTab('WAITING')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'WAITING'
              ? 'bg-sky-50/80 border-sky-300 shadow-xs'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-sky-950 uppercase tracking-wider">
            <span>WAITING ON OTHERS</span>
            <span className="font-mono text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded-full border border-sky-200 text-[10px]">
              {waitingOnOthers.length}
            </span>
          </div>
          <p className="text-[11px] text-sky-900/80 mt-1 font-medium">Provider or pharmacy review.</p>
        </button>

        <button
          onClick={() => setActiveTab('ESCALATED')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'ESCALATED'
              ? 'bg-rose-50/80 border-rose-300 shadow-xs'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-rose-950 uppercase tracking-wider">
            <span>ESCALATED</span>
            <span className="font-mono text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded-full border border-rose-200 text-[10px]">
              {escalations.length}
            </span>
          </div>
          <p className="text-[11px] text-rose-900/80 mt-1 font-medium">Blocked for 18+ hours.</p>
        </button>

        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'COMPLETED'
              ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950 uppercase tracking-wider">
            <span>COMPLETED</span>
            <span className="font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
              {completed.length}
            </span>
          </div>
          <p className="text-[11px] text-emerald-900/80 mt-1 font-medium">Resolved this shift.</p>
        </button>
      </div>

      {/* Active Tab List */}
      <div className="space-y-3">
        {currentList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
            NO REFILLS NEED ATTENTION
          </div>
        ) : (
          currentList.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.referenceNumber}
                  </span>
                  <StatusBadge status={item.status} size="sm" />
                  <BlockerChip type={item.blocker.type} label={item.blocker.badgeLabel} />
                  <UrgencyBadge urgency={item.urgency} />
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.medication.name} {item.medication.strength}
                  </h3>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {item.patient.name}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  <strong className="text-slate-800">Blocker:</strong> {item.blocker.reason}
                </p>

                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                  <span>Owner: <strong className="text-slate-700 font-semibold">{item.owner.name}</strong></span>
                  <span>·</span>
                  <span className="font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> Waiting: {item.ageFormatted}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-blue-600 uppercase tracking-wider block font-bold">
                    Next Action
                  </span>
                  <span className="text-xs font-semibold text-slate-900 block max-w-[220px] truncate">
                    {item.nextBestAction.label}
                  </span>
                </div>

                <button
                  onClick={() => onOpenCase(item.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.8 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors cursor-pointer active:scale-95"
                >
                  <span>Review Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
