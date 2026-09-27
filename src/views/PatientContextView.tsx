import React, { useState } from 'react';
import { RefillCase } from '../types/refill';
import { 
  User, 
  Pill, 
  Calendar, 
  Building2, 
  Stethoscope, 
  Clock, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { StatusBadge } from '../components/shared/StatusBadge';

interface PatientContextViewProps {
  refills: RefillCase[];
  onOpenCase: (caseId: string) => void;
}

export const PatientContextView: React.FC<PatientContextViewProps> = ({
  refills,
  onOpenCase
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pt-101');

  const selectedCase = refills.find(r => r.patient.id === selectedPatientId) || refills[0];
  const patient = selectedCase.patient;

  // Group all refills for this patient
  const patientRefills = refills.filter(r => r.patient.id === patient.id);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Clean Page Header & Patient Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Patient Context
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Prescription history, clinic encounters, and refill statuses.
          </p>
        </div>

        {/* Patient Switcher Dropdown */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
          <User className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="text-xs bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
          >
            {refills.map(r => (
              <option key={r.patient.id} value={r.patient.id}>
                {r.patient.name} ({r.patient.primaryCondition})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Patient Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 font-bold text-lg flex items-center justify-center border border-teal-200 shadow-2xs">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-lg font-bold text-teal-950">
              {patient.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-mono mt-0.5">
              <span>DOB: {patient.dob} ({patient.age} yrs)</span>
              <span>·</span>
              <span>MRN: {patient.mrn}</span>
              <span>·</span>
              <span>{patient.phone}</span>
            </div>
          </div>
        </div>

        {/* 4 Clean Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
            <span className="text-[11px] font-medium text-slate-400 block">Primary Diagnosis</span>
            <span className="font-bold text-slate-900 mt-1 block truncate">{patient.primaryCondition}</span>
          </div>
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-xs">
            <span className="text-[11px] font-medium text-teal-700 block">Refill Adherence</span>
            <span className="font-bold text-teal-900 mt-1 block">{patient.adherenceRate}% Optimal</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
            <span className="text-[11px] font-medium text-slate-400 block">Last Clinic Visit</span>
            <span className="font-bold text-slate-900 mt-1 block">{patient.lastSeenDate}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
            <span className="text-[11px] font-medium text-slate-400 block">Prescribing Provider</span>
            <span className="font-bold text-slate-900 mt-1 block truncate">{selectedCase.prescriber.name}</span>
          </div>
        </div>
      </div>

      {/* Active Prescriptions & Refill Statuses */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Prescriptions ({patientRefills.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current therapies and operational refill queue state.
            </p>
          </div>
          <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            EHR Linked
          </span>
        </div>

        <div className="space-y-3">
          {patientRefills.map(refill => (
            <div
              key={refill.id}
              className="p-4.5 rounded-xl border border-slate-200/80 hover:border-teal-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Pill className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-extrabold text-slate-900 truncate">
                    {refill.medication.name} {refill.medication.strength}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    #{refill.referenceNumber}
                  </span>
                </div>
                
                <p className="text-xs text-slate-600 font-mono pl-9">
                  Sig: {refill.medication.sig} ({refill.medication.daysSupply} days)
                </p>

                <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-500 pl-9 pt-0.5">
                  <span>Pharmacy: <strong className="font-semibold text-slate-700">{refill.pharmacy.name}</strong></span>
                  <span>·</span>
                  <span>Blocker: <strong className="font-semibold text-slate-700">{refill.blocker.badgeLabel}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 sm:self-center">
                <StatusBadge status={refill.status} size="sm" />
                <button
                  onClick={() => onOpenCase(refill.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.8 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  <span>Open Refill Case</span>
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
