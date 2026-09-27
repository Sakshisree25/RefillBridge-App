import React, { useState, useMemo } from 'react';
import { RefillCase, RefillStatus } from '../types/refill';
import { StatusBadge, BlockerChip, UrgencyBadge } from '../components/shared/StatusBadge';
import { 
  Search, 
  Filter, 
  Clock, 
  ArrowRight, 
  Building2, 
  User, 
  Pill, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface RefillQueueViewProps {
  refills: RefillCase[];
  onOpenCase: (caseId: string) => void;
  initialFilter?: string;
}

export const RefillQueueView: React.FC<RefillQueueViewProps> = ({
  refills,
  onOpenCase,
  initialFilter = 'ALL'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialFilter);
  const [blockerFilter, setBlockerFilter] = useState<string>('ALL');
  const [pharmacyFilter, setPharmacyFilter] = useState<string>('ALL');

  // Filter options
  const filterTabs = [
    { id: 'ALL', label: 'All', count: refills.length },
    { id: 'NEEDS_ACTION', label: 'Needs Attention', count: refills.filter(r => r.status === 'NEEDS_ACTION').length },
    { id: 'BLOCKED', label: 'Blocked', count: refills.filter(r => r.status === 'BLOCKED').length },
    { id: 'WAITING', label: 'Waiting', count: refills.filter(r => r.status === 'WAITING').length },
    { id: 'RESOLVED', label: 'Resolved', count: refills.filter(r => r.status === 'RESOLVED').length },
  ];

  // Distinct pharmacies for dropdown
  const uniquePharmacies = useMemo(() => {
    const names = new Set(refills.map(r => r.pharmacy.name));
    return Array.from(names);
  }, [refills]);

  // Distinct blocker types
  const uniqueBlockers = [
    { id: 'ALL', label: 'All Blocker Types' },
    { id: 'NO_REFILLS', label: 'No Refills Remaining' },
    { id: 'PROVIDER_APPROVAL', label: 'Provider Approval Pending' },
    { id: 'VISIT_REQUIRED', label: 'Clinical Visit Required' },
    { id: 'INSURANCE_PA', label: 'Prior Authorization Expired' },
    { id: 'UNCLEAR_PRESCRIPTION', label: 'Unclear Sig / Dosing' },
    { id: 'DUPLICATE_REQUEST', label: 'Duplicate Request Hold' },
    { id: 'LAB_REQUIRED', label: 'Safety Lab Review' },
  ];

  const filteredRefills = useMemo(() => {
    return refills.filter((item) => {
      // Search
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        item.medication.name.toLowerCase().includes(query) ||
        item.patient.name.toLowerCase().includes(query) ||
        item.pharmacy.name.toLowerCase().includes(query) ||
        item.referenceNumber.toLowerCase().includes(query) ||
        item.blocker.badgeLabel.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Status Filter
      if (statusFilter === 'CRITICAL') {
        if (item.urgency !== 'CRITICAL' && item.urgency !== 'HIGH') return false;
      } else if (statusFilter !== 'ALL') {
        if (item.status !== statusFilter) return false;
      }

      // Blocker Filter
      if (blockerFilter !== 'ALL' && item.blocker.type !== blockerFilter) {
        return false;
      }

      // Pharmacy Filter
      if (pharmacyFilter !== 'ALL' && item.pharmacy.name !== pharmacyFilter) {
        return false;
      }

      return true;
    });
  }, [refills, searchQuery, statusFilter, blockerFilter, pharmacyFilter]);

  return (
    <div className="space-y-5 pb-12">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-950 tracking-tight">
            REFILL QUEUE
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Every active refill request, organized by current state and next action.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-84">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, medication, pharmacy, RX#..."
            className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-white rounded-xl border border-slate-200/90 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs font-medium"
          />
        </div>
      </div>

      {/* Segmented Filter Bar (Clinical Category Tabs) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-teal-50/50 rounded-2xl border border-teal-100">
        {filterTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-teal-900/80 hover:text-teal-950 hover:bg-white/80'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-800'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdown Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Blocker Type Dropdown */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200/80 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={blockerFilter}
              onChange={(e) => setBlockerFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              {uniqueBlockers.map(b => (
                <option key={b.id} value={b.id}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Pharmacy Dropdown */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200/80 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={pharmacyFilter}
              onChange={(e) => setPharmacyFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              <option value="ALL">All Pharmacies</option>
              {uniquePharmacies.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {(blockerFilter !== 'ALL' || pharmacyFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setBlockerFilter('ALL');
                setPharmacyFilter('ALL');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 underline ml-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredRefills.length} of {refills.length} cases
        </div>
      </div>

      {/* Distinctive Case Row Inbox */}
      {filteredRefills.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-2 shadow-2xs">
          <p className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            {statusFilter === 'NEEDS_ACTION' ? 'NO REFILLS NEED ATTENTION' : statusFilter === 'BLOCKED' ? 'NO BLOCKED REFILLS' : 'NO REFILLS FOUND'}
          </p>
          <p className="text-xs text-slate-500">
            {statusFilter === 'BLOCKED' ? 'Nothing currently requires escalation.' : 'All active refill cases are currently moving forward.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRefills.map((refill) => {
            const getBorderAccent = () => {
              switch (refill.status) {
                case 'BLOCKED': return 'border-l-4 border-l-rose-500';
                case 'NEEDS_ACTION': return 'border-l-4 border-l-amber-500';
                case 'WAITING': return 'border-l-4 border-l-sky-500';
                case 'IN_PROGRESS': return 'border-l-4 border-l-indigo-500';
                case 'RESOLVED': return 'border-l-4 border-l-emerald-500';
                default: return 'border-l-4 border-l-slate-300';
              }
            };

            return (
              <div
                key={refill.id}
                onClick={() => onOpenCase(refill.id)}
                className={`group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 p-5 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden ${getBorderAccent()}`}
              >
              {/* Left Column: Medication, Patient, Pharmacy */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/80">
                    {refill.referenceNumber}
                  </span>
                  <StatusBadge status={refill.status} size="sm" />
                  <BlockerChip type={refill.blocker.type} label={refill.blocker.badgeLabel} />
                  <UrgencyBadge urgency={refill.urgency} />
                </div>

                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-extrabold text-slate-950 truncate group-hover:text-blue-600 transition-colors tracking-tight">
                    {refill.medication.name} {refill.medication.strength}
                  </h3>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {refill.patient.name}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{refill.pharmacy.name}</span>
                  </span>
                  <span>·</span>
                  <span>Prescriber: <strong className="font-semibold text-slate-800">{refill.prescriber.name}</strong></span>
                </div>
              </div>

              {/* Middle Column: Current Blocker & Owner */}
              <div className="md:w-68 space-y-1 text-xs border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider">Why Stuck:</span>
                  <span className="font-mono text-slate-700 font-bold flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {refill.ageFormatted}
                  </span>
                </div>
                <p className="text-xs text-slate-900 line-clamp-1 font-bold">
                  {refill.blocker.title}
                </p>
                <p className="text-[11px] text-slate-500 truncate font-medium">
                  Owner: {refill.owner.name}
                </p>
              </div>

              {/* Right Column: Next Action & Open Button */}
              <div className="md:w-56 shrink-0 flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center gap-2.5 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-teal-700 font-extrabold uppercase tracking-wider block">
                    Next Action
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate block max-w-[200px]">
                    {refill.nextBestAction.label}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCase(refill.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all shrink-0 active:scale-95 cursor-pointer"
                >
                  <span>View Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
