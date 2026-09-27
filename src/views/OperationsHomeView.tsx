import React from 'react';
import { RefillCase } from '../types/refill';
import { 
  AlertCircle, 
  Clock, 
  Building2, 
  ShieldAlert, 
  ArrowUpRight, 
  Sparkles, 
  ArrowRight,
  Flame,
  TrendingUp,
  Pill,
  Zap,
  HeartPulse
} from 'lucide-react';
import { StatusBadge } from '../components/shared/StatusBadge';

interface OperationsHomeViewProps {
  refills: RefillCase[];
  onOpenCase: (caseId: string) => void;
  onNavigateToQueue: (filter: string) => void;
  onOpenAssistant: () => void;
}

export const OperationsHomeView: React.FC<OperationsHomeViewProps> = ({
  refills,
  onOpenCase,
  onNavigateToQueue,
  onOpenAssistant
}) => {
  // Counts based on live cases
  const needsAttentionCount = refills.filter(r => r.status === 'NEEDS_ACTION').length;
  const waitingProviderCount = refills.filter(r => r.status === 'WAITING' || (r.status === 'BLOCKED' && r.blocker.type === 'NO_REFILLS')).length;
  const waitingPharmacyCount = refills.filter(r => r.blocker.type === 'UNCLEAR_PRESCRIPTION' || r.blocker.type === 'DUPLICATE_REQUEST').length;
  const adminInsuranceCount = refills.filter(r => r.blocker.type === 'INSURANCE_PA' || r.blocker.type === 'VISIT_REQUIRED').length;

  const urgentCases = refills.filter(r => r.urgency === 'CRITICAL' || r.urgency === 'HIGH');
  const recentlyResolved = refills.filter(r => r.status === 'RESOLVED');

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Hospital Clinical Operations Header */}
      <div className="bg-gradient-to-r from-teal-50/90 via-cyan-50/40 to-white rounded-3xl border border-teal-100 p-7 shadow-xs relative overflow-hidden">
        {/* Soft clinical ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-full border border-teal-200 text-[11px]">
                <HeartPulse className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                Hospital Refill Triage
              </span>
              <span className="text-teal-200">·</span>
              <span className="font-medium text-teal-800 bg-white/90 px-2.5 py-0.8 rounded-full border border-teal-100">
                Northwest Endocrinology & Partner Health System
              </span>
              <span className="text-teal-700/70 font-mono text-[11px]">
                Shift: 07:00 AM – 03:30 PM
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-teal-950">
                Hello, Maya
              </h1>
              <p className="text-sm font-medium text-teal-900/80 mt-1 max-w-2xl leading-relaxed">
                <span className="text-amber-800 font-bold">12 refill cases need attention today.</span> Review blockers, coordinate provider approvals, and unblock pharmacy dispenses.
              </p>
            </div>

            {/* Medical Stat Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 bg-rose-50 text-rose-800 px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>{urgentCases.length} Urgent Review</span>
              </div>
              <div className="flex items-center gap-1.5 bg-teal-50 text-teal-900 px-3 py-1.5 rounded-xl border border-teal-200 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                <span>92% Same-Shift Clearance</span>
              </div>
              <div className="flex items-center gap-1.5 bg-cyan-50 text-cyan-900 px-3 py-1.5 rounded-xl border border-cyan-200 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
                <span>4.2h Median Turnaround</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateToQueue('NEEDS_ACTION')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-teal-200 fill-teal-200" />
              <span>Triage Queue ({needsAttentionCount})</span>
            </button>
            <button
              onClick={onOpenAssistant}
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 text-xs font-bold text-teal-900 bg-white hover:bg-teal-50 rounded-xl transition-all border border-teal-200 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Clinical Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Clinical State Cards (Authentic Medicine & Hospital Colors) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* State 1: NEEDS ATTENTION (Pharmacy Pill Amber) */}
        <button
          onClick={() => onNavigateToQueue('NEEDS_ACTION')}
          className="text-left bg-white rounded-2xl border border-amber-200/80 hover:border-amber-400 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              NEEDS ATTENTION
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 group-hover:scale-105 transition-transform">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          
          <div className="mt-5">
            <span className="text-3xl font-black text-amber-950 font-mono tracking-tight group-hover:text-amber-700 transition-colors">
              {needsAttentionCount}
            </span>
            <p className="text-xs text-amber-900 mt-1 font-semibold flex items-center justify-between">
              <span>Requires clinical staff action.</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
            </p>
          </div>
        </button>

        {/* State 2: WAITING ON PROVIDER (Hospital Cross Rose) */}
        <button
          onClick={() => onNavigateToQueue('BLOCKED')}
          className="text-left bg-white rounded-2xl border border-rose-200/80 hover:border-rose-400 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              WAITING ON PROVIDER
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-5">
            <span className="text-3xl font-black text-rose-950 font-mono tracking-tight group-hover:text-rose-700 transition-colors">
              {waitingProviderCount}
            </span>
            <p className="text-xs text-rose-900 mt-1 font-semibold flex items-center justify-between">
              <span>Pending provider renewal authorization.</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-700 group-hover:translate-x-0.5 transition-transform" />
            </p>
          </div>
        </button>

        {/* State 3: WAITING ON PHARMACY (Clinical Scrub Teal/Cyan) */}
        <button
          onClick={() => onNavigateToQueue('ALL')}
          className="text-left bg-white rounded-2xl border border-teal-200/80 hover:border-teal-400 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              WAITING ON PHARMACY
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-5">
            <span className="text-3xl font-black text-teal-950 font-mono tracking-tight group-hover:text-teal-700 transition-colors">
              {waitingPharmacyCount}
            </span>
            <p className="text-xs text-teal-900 mt-1 font-semibold flex items-center justify-between">
              <span>Pending pharmacy dispensing clearance.</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-teal-700 group-hover:translate-x-0.5 transition-transform" />
            </p>
          </div>
        </button>

        {/* State 4: INSURANCE / ADMIN (Medical Cyan/Indigo) */}
        <button
          onClick={() => onNavigateToQueue('ALL')}
          className="text-left bg-white rounded-2xl border border-cyan-200/80 hover:border-cyan-400 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-600" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-600" />
              INSURANCE / ADMIN
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-200 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-5">
            <span className="text-3xl font-black text-cyan-950 font-mono tracking-tight group-hover:text-cyan-700 transition-colors">
              {adminInsuranceCount}
            </span>
            <p className="text-xs text-cyan-900 mt-1 font-semibold flex items-center justify-between">
              <span>Prior authorization or visit hold.</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-700 group-hover:translate-x-0.5 transition-transform" />
            </p>
          </div>
        </button>
      </div>

      {/* Hospital Refill Velocity Rail */}
      <div className="bg-white rounded-3xl border border-teal-100 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-teal-50">
          <div>
            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
              Hospital Operations
            </span>
            <h2 className="text-base font-extrabold text-teal-950 mt-0.5">
              Today's Clinical Refill Velocity
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-rose-700 font-bold flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> {urgentCases.length} Critical
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-teal-900 font-medium">
              Median Resolution: <strong className="text-teal-950 font-bold font-mono">4.2h</strong>
            </span>
          </div>
        </div>

        {/* Visual Progress Rail with Medical Tones */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: '40%' }} className="bg-rose-500 h-full" title="Blocked (40%)" />
            <div style={{ width: '25%' }} className="bg-amber-400 h-full" title="Provider review (25%)" />
            <div style={{ width: '15%' }} className="bg-teal-500 h-full" title="Pharmacy (15%)" />
            <div style={{ width: '10%' }} className="bg-cyan-500 h-full" title="Insurance (10%)" />
            <div style={{ width: '10%' }} className="bg-emerald-500 h-full" title="Resolved (10%)" />
          </div>
          <div className="flex flex-wrap items-center justify-between text-xs text-teal-900 font-semibold px-1 gap-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Blocked</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Provider review</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Pharmacy</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Insurance</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Resolved</span>
          </div>
        </div>

        {/* 4 Hospital Summary Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80">
            <span className="text-[11px] text-rose-900 block font-bold uppercase tracking-wider">BLOCKED &gt;18 HOURS</span>
            <span className="text-xl font-black font-mono text-rose-950 mt-1 block">
              {refills.filter(r => r.status === 'BLOCKED').length} cases
            </span>
            <p className="text-xs text-rose-800 mt-0.5 font-medium">Requires immediate staff review.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <span className="text-[11px] text-amber-900 block font-bold uppercase tracking-wider">VISIT REQUIRED</span>
            <span className="text-xl font-black font-mono text-amber-950 mt-1 block">
              {refills.filter(r => r.blocker.type === 'VISIT_REQUIRED').length} cases
            </span>
            <p className="text-xs text-amber-800 mt-0.5 font-medium">Patient visit needed for renewal.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80">
            <span className="text-[11px] text-teal-900 block font-bold uppercase tracking-wider">PRIOR AUTH PENDING</span>
            <span className="text-xl font-black font-mono text-teal-950 mt-1 block">
              {refills.filter(r => r.blocker.type === 'INSURANCE_PA').length} case
            </span>
            <p className="text-xs text-teal-800 mt-0.5 font-medium">PBM electronic prior authorization.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[11px] text-emerald-900 block font-bold uppercase tracking-wider">RESOLVED TODAY</span>
            <span className="text-xl font-black font-mono text-emerald-950 mt-1 block">
              {recentlyResolved.length} completed
            </span>
            <p className="text-xs text-emerald-800 mt-0.5 font-medium">Prescription sent to pharmacy.</p>
          </div>
        </div>
      </div>

      {/* Actionable Cases List (Clean Hospital Presentation) */}
      <div className="bg-white rounded-3xl border border-teal-100 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
              Prescription Queue
            </span>
            <h2 className="text-base font-extrabold text-teal-950 mt-0.5">
              Priority Actions Required
            </h2>
          </div>
          <button
            onClick={() => onNavigateToQueue('NEEDS_ACTION')}
            className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1.5 group cursor-pointer bg-teal-50 px-3.5 py-1.5 rounded-xl border border-teal-200 transition-colors"
          >
            <span>View Full Queue</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Clean Hospital Refill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {refills.slice(0, 4).map((refill) => (
            <div
              key={refill.id}
              className="p-5 rounded-2xl border border-teal-100 hover:border-teal-400 bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-3 shadow-2xs group relative overflow-hidden"
            >
              {/* Left colored urgency accent line */}
              <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                refill.status === 'BLOCKED' ? 'bg-rose-500' :
                refill.status === 'NEEDS_ACTION' ? 'bg-amber-500' :
                refill.status === 'RESOLVED' ? 'bg-emerald-500' : 'bg-teal-500'
              }`} />

              <div className="pl-2 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      {refill.referenceNumber}
                    </span>
                    <StatusBadge status={refill.status} size="sm" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    {refill.ageFormatted}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm font-extrabold text-teal-950 group-hover:text-teal-700 transition-colors truncate">
                      {refill.medication.name} {refill.medication.strength}
                    </p>
                    <p className="text-xs text-slate-600 font-medium truncate">
                      {refill.patient.name} <span className="text-slate-400 font-mono">({refill.patient.mrn})</span> · Dr. {refill.prescriber.name}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/40 border border-teal-100 text-xs text-teal-950">
                  <span className="font-bold text-teal-900 block text-[11px]">
                    Blocker: {refill.blocker.badgeLabel}
                  </span>
                  <p className="text-[11px] text-teal-800 line-clamp-1 mt-0.5 font-medium">
                    {refill.blocker.reason}
                  </p>
                </div>
              </div>

              <div className="pl-2 pt-1 flex items-center justify-between gap-2 border-t border-teal-50">
                <div className="text-[11px] text-teal-700 font-mono">
                  Pharmacy: <span className="font-semibold text-teal-900">{refill.pharmacy.name}</span>
                </div>
                <button
                  onClick={() => onOpenCase(refill.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.8 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  <span>View Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
