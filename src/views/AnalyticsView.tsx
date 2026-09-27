import React, { useState } from 'react';
import { 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  PhoneOff, 
  Layers, 
  Building2, 
  Stethoscope, 
  ShieldAlert, 
  BarChart3, 
  Target,
  ArrowRight,
  Zap,
  AlertCircle
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OPERATIONAL' | 'GTM_FUNNEL'>('OPERATIONAL');

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            REFILL PERFORMANCE
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational metrics tracking resolution velocity, blocker frequency, and provider response times.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('OPERATIONAL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'OPERATIONAL'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Refill Performance
          </button>
          <button
            onClick={() => setActiveTab('GTM_FUNNEL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'GTM_FUNNEL'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Commercial Growth Engine
          </button>
        </div>
      </div>

      {activeTab === 'OPERATIONAL' ? (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          {/* Key Metrics Grid (Pale Tonal Aesthetic) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* AVERAGE RESOLUTION TIME */}
            <div className="bg-gradient-to-br from-emerald-50/60 to-white p-5 rounded-2xl border border-emerald-200/70 shadow-2xs space-y-2">
              <span className="text-emerald-800/80 text-xs font-bold uppercase tracking-wider block">
                AVERAGE RESOLUTION TIME
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">4.2h</span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center">
                  <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -82% vs baseline (28h)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">From request receipt to pharmacy dispensing clearance</p>
            </div>

            {/* CASES BLOCKED >24 HOURS */}
            <div className="bg-gradient-to-br from-rose-50/60 to-white p-5 rounded-2xl border border-rose-200/70 shadow-2xs space-y-2">
              <span className="text-rose-800/80 text-xs font-bold uppercase tracking-wider block">
                CASES BLOCKED &gt;24 HOURS
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-950 font-mono">2</span>
                <span className="text-xs font-semibold text-rose-700 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" /> Active escalation
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Cases requiring executive clinical triage intervention</p>
            </div>

            {/* RESOLUTION RATE */}
            <div className="bg-gradient-to-br from-blue-50/60 to-white p-5 rounded-2xl border border-blue-200/70 shadow-2xs space-y-2">
              <span className="text-blue-800/80 text-xs font-bold uppercase tracking-wider block">
                RESOLUTION RATE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">96.8%</span>
                <span className="text-xs font-semibold text-blue-700">Within shift</span>
              </div>
              <p className="text-[11px] text-slate-500">Percentage of submitted refills successfully resolved</p>
            </div>

            {/* PROVIDER RESPONSE TIME */}
            <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-200/70 shadow-2xs space-y-2">
              <span className="text-indigo-800/80 text-xs font-bold uppercase tracking-wider block">
                PROVIDER RESPONSE TIME
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">1.8h</span>
                <span className="text-xs font-semibold text-indigo-700">Down from 19h</span>
              </div>
              <p className="text-[11px] text-slate-500">Time from provider in-basket delivery to signature</p>
            </div>

            {/* PHARMACY RESPONSE TIME */}
            <div className="bg-gradient-to-br from-sky-50/60 to-white p-5 rounded-2xl border border-sky-200/70 shadow-2xs space-y-2">
              <span className="text-sky-800/80 text-xs font-bold uppercase tracking-wider block">
                PHARMACY RESPONSE TIME
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">32m</span>
                <span className="text-xs font-semibold text-sky-700">Electronic EDI</span>
              </div>
              <p className="text-[11px] text-slate-500">Time for pharmacy confirmation after renewal is sent</p>
            </div>

            {/* TOP REFILL BLOCKERS */}
            <div className="bg-gradient-to-br from-amber-50/60 to-white p-5 rounded-2xl border border-amber-200/70 shadow-2xs space-y-2">
              <span className="text-amber-800/80 text-xs font-bold uppercase tracking-wider block">
                TOP REFILL BLOCKERS
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900">No Refills (54%)</span>
              </div>
              <p className="text-[11px] text-slate-500">Followed by Prior Auth (22%) and Visit Required (14%)</p>
            </div>
          </div>

          {/* WHERE REFILLS GET STUCK */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Workflow Bottlenecks
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  WHERE REFILLS GET STUCK
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                1,420 refill events recorded
              </span>
            </div>

            {/* Visual Funnel Distribution */}
            <div className="space-y-4 pt-2">
              {/* Provider Delay */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                    Provider review (No refills remaining / Visit required)
                  </span>
                  <span className="font-mono text-slate-600">54% of stalls (Avg: 8.4h)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '54%' }} />
                </div>
              </div>

              {/* Insurance / PBM */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    Insurance / Prior authorization
                  </span>
                  <span className="font-mono text-slate-600">22% of stalls (Avg: 14.1h)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '22%' }} />
                </div>
              </div>

              {/* Pharmacy Intake / Transmission */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-600" />
                    Pharmacy fulfillment (Signature clarification / Out of stock)
                  </span>
                  <span className="font-mono text-slate-600">14% of stalls (Avg: 3.2h)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '14%' }} />
                </div>
              </div>

              {/* Practice Staff Triage */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-teal-600" />
                    Practice staff triage
                  </span>
                  <span className="font-mono text-slate-600">10% of stalls (Avg: 1.1h)</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* The Commercial Growth Engine Rail */
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Commercial Architecture
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Customer Journey & Implementation Lifecycle
                </h3>
              </div>
              <span className="text-xs font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Target Market: Physician Groups & Retail Pharmacies
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Moving practices from manual fax workflows to fully integrated automated refill operations.
            </p>

            {/* 8-Stage GTM Rail */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="md:w-48">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Stage 01</span>
                  <span className="font-bold text-slate-900">NOTHING</span>
                  <p className="text-[11px] text-slate-500">Untapped Market</p>
                </div>
                <div className="flex-1 text-slate-700">
                  <strong className="text-slate-900 font-medium">What we do:</strong> Identify practices where refill coordinators spend 3+ hrs/day in EHR fax queues.
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="md:w-48">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Stage 02</span>
                  <span className="font-bold text-slate-900">AWARENESS</span>
                  <p className="text-[11px] text-slate-500">First Contact</p>
                </div>
                <div className="flex-1 text-slate-700">
                  <strong className="text-slate-900 font-medium">What we do:</strong> Share operational benchmarks on pharmacy phone tag and patient drop-off.
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="md:w-48">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Stage 03</span>
                  <span className="font-bold text-slate-900">CONSIDERATION</span>
                  <p className="text-[11px] text-slate-500">Active Evaluation</p>
                </div>
                <div className="flex-1 text-slate-700">
                  <strong className="text-slate-900 font-medium">What we do:</strong> Run workflow audit against clinic's top 100 delayed refills.
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="md:w-48">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Stage 04</span>
                  <span className="font-bold text-slate-900">DECISION</span>
                  <p className="text-[11px] text-slate-500">Clinical Leadership Sign-off</p>
                </div>
                <div className="flex-1 text-slate-700">
                  <strong className="text-slate-900 font-medium">What we do:</strong> Security, BAA, and delegated refill protocol agreement with Chief Medical Officer.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
