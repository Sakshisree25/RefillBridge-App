import React from 'react';
import { AuditEntry } from '../../types/refill';
import { ShieldCheck, Lock, User, FileText } from 'lucide-react';

interface AuditTrailCardProps {
  auditTrail: AuditEntry[];
}

export const AuditTrailCard: React.FC<AuditTrailCardProps> = ({ auditTrail }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-slate-100 text-slate-700">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Security & Compliance
            </span>
            <h3 className="text-sm font-semibold text-slate-900 mt-0.5">
              Immutable Action Audit Trail
            </h3>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          HIPAA Audit Logged
        </span>
      </div>

      {/* Audit Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200/70 text-[11px] font-semibold text-slate-500 uppercase">
              <th className="pb-2 font-medium">Actor</th>
              <th className="pb-2 font-medium">Action Performed</th>
              <th className="pb-2 font-medium">Timestamp</th>
              <th className="pb-2 font-medium">Source</th>
              <th className="pb-2 font-medium text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {auditTrail.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50/60">
                <td className="py-2.5 font-medium text-slate-900 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{entry.actor}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({entry.role})</span>
                  </div>
                </td>
                <td className="py-2.5 text-slate-800 whitespace-nowrap font-medium">
                  {entry.action}
                </td>
                <td className="py-2.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                  {entry.timestamp}
                </td>
                <td className="py-2.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                  {entry.source}
                </td>
                <td className="py-2.5 text-right whitespace-nowrap">
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                    {entry.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
