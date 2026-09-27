import React from 'react';
import { JourneyStep, NodeStatus } from '../../types/refill';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  Building2, 
  Stethoscope, 
  ShieldAlert, 
  Layers, 
  PackageCheck,
  ChevronRight,
  Info,
  Radio,
  Share2
} from 'lucide-react';

interface RefillJourneyProps {
  steps: JourneyStep[];
  selectedStepId: string | null;
  onSelectStep: (step: JourneyStep) => void;
}

export const RefillJourney: React.FC<RefillJourneyProps> = ({
  steps,
  selectedStepId,
  onSelectStep
}) => {
  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'PATIENT_REQUEST':
        return <User className="w-3.5 h-3.5" />;
      case 'PHARMACY_INTAKE':
      case 'PHARMACY_DISPENSE':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'PROVIDER_REVIEW':
        return <Stethoscope className="w-3.5 h-3.5" />;
      case 'PRACTICE_STAFF':
        return <Layers className="w-3.5 h-3.5" />;
      case 'INSURANCE_PBM':
        return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'RESOLVED':
        return <PackageCheck className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  const getStageLabel = (stage: string, fallback: string) => {
    switch (stage) {
      case 'PATIENT_REQUEST':
        return 'REQUEST RECEIVED';
      case 'PHARMACY_INTAKE':
        return 'PHARMACY REVIEW';
      case 'PROVIDER_REVIEW':
        return 'PROVIDER REVIEW';
      case 'PRACTICE_STAFF':
        return 'PRACTICE ACTION';
      case 'INSURANCE_PBM':
        return 'INSURANCE / PBM';
      case 'PHARMACY_DISPENSE':
        return 'PHARMACY FULFILLMENT';
      case 'RESOLVED':
        return 'RESOLVED';
      default:
        return fallback.toUpperCase();
    }
  };

  const getNodeStyles = (status: NodeStatus, isSelected: boolean) => {
    let base = "relative flex flex-col items-start text-left p-3.5 rounded-xl border transition-all cursor-pointer group w-full ";
    
    if (isSelected) {
      base += "ring-2 ring-slate-900 shadow-md translate-y-[-2px] ";
    } else {
      base += "hover:border-slate-400 hover:shadow-xs hover:translate-y-[-1px] ";
    }

    switch (status) {
      case 'COMPLETED':
        return base + "bg-emerald-50/40 border-emerald-300/80 text-slate-800";
      case 'BLOCKED':
        return base + "bg-rose-50/80 border-rose-300 text-rose-950 beacon-blocked";
      case 'ACTIVE':
        return base + "bg-sky-50/80 border-sky-300 text-sky-950 beacon-active";
      case 'WAITING':
        return base + "bg-amber-50/60 border-amber-300 text-amber-950";
      case 'PENDING':
      default:
        return base + "bg-white/95 border-slate-200/90 text-slate-400";
    }
  };

  const getStatusBadge = (status: NodeStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />
            COMPLETED
          </span>
        );
      case 'BLOCKED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-100/90 px-2 py-0.5 rounded-md border border-rose-200 animate-pulse">
            <AlertCircle className="w-2.5 h-2.5 text-rose-600" />
            CURRENT STEP
          </span>
        );
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-800 bg-sky-100/90 px-2 py-0.5 rounded-md border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-ping" />
            CURRENT STEP
          </span>
        );
      case 'WAITING':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
            <Clock className="w-2.5 h-2.5 text-amber-600" />
            WAITING
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            UP NEXT
          </span>
        );
    }
  };

  // Find currently active or blocked stage to highlight custody
  const activeOrBlockedStep = steps.find(s => s.status === 'BLOCKED' || s.status === 'ACTIVE') || steps.find(s => s.status === 'WAITING') || steps[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
      {/* Decorative background grid subtle */}
      <div className="absolute inset-0 bg-grid-subtle opacity-35 pointer-events-none" />

      {/* Header with Bridge & Relay Metaphor */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h2 className="text-xs font-black text-slate-950 uppercase tracking-wider">
              REFILL JOURNEY
            </h2>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500 font-medium">Chain of Custody</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Track every handoff from request to resolution.
          </p>
        </div>

        {/* Current Custody / Baton Status Chip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <Share2 className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-slate-400 font-medium">Current Custody:</span>
            <span className="font-bold text-slate-900">{activeOrBlockedStep.actor}</span>
            <span className="text-slate-300">·</span>
            <span className={`text-[11px] font-semibold ${
              activeOrBlockedStep.status === 'BLOCKED' ? 'text-rose-700' :
              activeOrBlockedStep.status === 'ACTIVE' ? 'text-sky-700' : 'text-slate-600'
            }`}>
              {getStageLabel(activeOrBlockedStep.stage, activeOrBlockedStep.label)}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-3 text-[11px] text-slate-500 font-medium border-l border-slate-200/60 pl-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> COMPLETED
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> CURRENT STEP
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> UP NEXT
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Rail Sequence */}
      <div className="relative z-10">
        {/* Visual Track Line behind nodes */}
        <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-1 bg-slate-200/80 rounded-full z-0 pointer-events-none" />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
          {steps.map((step, index) => {
            const isSelected = selectedStepId === step.id;
            return (
              <div key={step.id} className="relative flex flex-col">
                <button
                  type="button"
                  onClick={() => onSelectStep(step)}
                  className={getNodeStyles(step.status, isSelected)}
                  aria-pressed={isSelected}
                >
                  {/* Step Header: Index & Icon */}
                  <div className="flex items-center justify-between w-full mb-2.5">
                    <span className="w-5 h-5 rounded-md bg-slate-900/5 flex items-center justify-center text-[10px] font-mono font-bold text-slate-600">
                      0{index + 1}
                    </span>
                    <span className="p-1 rounded-md bg-white shadow-2xs text-slate-700 border border-slate-200/60">
                      {getStageIcon(step.stage)}
                    </span>
                  </div>

                  {/* Stage Label */}
                  <div className="w-full">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {getStageLabel(step.stage, step.label)}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                      {step.sublabel}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-3.5 w-full flex items-center justify-between pt-2 border-t border-slate-200/60">
                    {getStatusBadge(step.status)}
                    <span className="text-[10px] font-mono text-slate-400">
                      {step.timestamp.includes(',') ? step.timestamp.split(',')[1].trim() : step.timestamp}
                    </span>
                  </div>
                </button>

                {/* Connecting arrow for desktop view */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-400">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rail Subtitle / Interactive Hint */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 relative z-10">
        <p className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>Click any stage along the rail to inspect real-time logs, source system, and missing requirements.</span>
        </p>
        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
          <Radio className="w-2.5 h-2.5 text-emerald-500" />
          Surescripts 2017071 Live Tracked
        </span>
      </div>
    </div>
  );
};
