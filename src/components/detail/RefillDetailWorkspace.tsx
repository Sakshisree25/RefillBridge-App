import React, { useState } from 'react';
import { RefillCase, JourneyStep, RefillActionOption } from '../../types/refill';
import { StatusBadge, UrgencyBadge, BlockerChip } from '../shared/StatusBadge';
import { RefillJourney } from '../journey/RefillJourney';
import { JourneyNodeDrawer } from '../journey/JourneyNodeDrawer';
import { SituationOverview } from './SituationOverview';
import { BlockerReasoningPanel } from './BlockerReasoningPanel';
import { ActionPanel } from './ActionPanel';
import { ActivityTimeline } from './ActivityTimeline';
import { PatientCommunicationCard } from './PatientCommunicationCard';
import { AuditTrailCard } from '../shared/AuditTrailDrawer';
import { ActionModal } from '../shared/ActionModal';
import { BookAppointmentModal } from '../shared/BookAppointmentModal';
import { 
  ArrowLeft, 
  Building2, 
  User, 
  Stethoscope, 
  Clock, 
  Pill, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Radio,
  Calendar
} from 'lucide-react';

interface RefillDetailWorkspaceProps {
  refillCase: RefillCase;
  onBack: () => void;
  onExecuteAction: (actionId: string, notes: string) => void;
  onAskAssistantAboutCase: (caseItem: RefillCase) => void;
  onBookAppointment?: (caseId: string, data: any) => void;
}

export const RefillDetailWorkspace: React.FC<RefillDetailWorkspaceProps> = ({
  refillCase,
  onBack,
  onExecuteAction,
  onAskAssistantAboutCase,
  onBookAppointment
}) => {
  const [selectedJourneyStep, setSelectedJourneyStep] = useState<JourneyStep | null>(null);
  const [activeModalAction, setActiveModalAction] = useState<RefillActionOption | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const handleOpenActionModal = (action: RefillActionOption) => {
    setActiveModalAction(action);
  };

  const handleConfirmAction = (actionId: string, notes: string) => {
    onExecuteAction(actionId, notes);
    setActiveModalAction(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Queue</span>
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-mono text-slate-900 font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60">
              {refillCase.referenceNumber}
            </span>
            <span>·</span>
            <span className="font-bold text-slate-900">{refillCase.patient.name}</span>
            <span>·</span>
            <span className="text-slate-600">{refillCase.medication.name} {refillCase.medication.strength}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAssistantAboutCase(refillCase)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 rounded-xl transition-all shadow-2xs active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Ask RefillBridge Assistant</span>
          </button>
        </div>
      </div>

      {/* Workflow Assistant Integration Bar */}
      <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-teal-950 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>Workflow Intelligence for {refillCase.medication.name}:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onAskAssistantAboutCase(refillCase)}
            className="text-[11px] font-semibold text-teal-900 bg-white hover:bg-teal-100/70 border border-teal-200 px-2.5 py-1 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            Why is this blocked?
          </button>
          <button
            onClick={() => onAskAssistantAboutCase(refillCase)}
            className="text-[11px] font-semibold text-teal-900 bg-white hover:bg-teal-100/70 border border-teal-200 px-2.5 py-1 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            Draft renewal note for {refillCase.prescriber.name.split(',')[0]}
          </button>
          <button
            onClick={() => onAskAssistantAboutCase(refillCase)}
            className="text-[11px] font-semibold text-teal-900 bg-white hover:bg-teal-100/70 border border-teal-200 px-2.5 py-1 rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            Check insurance status
          </button>
        </div>
      </div>

      {/* Flagship Case Header Dossier */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
          {/* Left: Medication & Patient Context */}
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusBadge status={refillCase.status} />
              <BlockerChip type={refillCase.blocker.type} label={refillCase.blocker.badgeLabel} />
              <UrgencyBadge urgency={refillCase.urgency} />
              <span className="text-xs text-slate-500 font-mono font-medium bg-slate-100 px-2 py-0.5 rounded">
                Stuck time: {refillCase.ageFormatted}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-teal-600 text-white shadow-xs">
                  <Pill className="w-5 h-5 text-teal-100" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-teal-950 tracking-tight uppercase">
                    {refillCase.medication.name} {refillCase.medication.strength}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Refill request · Case {refillCase.referenceNumber}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-50 border border-rose-200/90 text-xs font-bold text-rose-900 uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>
                  {refillCase.status === 'BLOCKED' ? 'BLOCKED — PROVIDER ACTION REQUIRED' :
                   refillCase.status === 'NEEDS_ACTION' ? 'NEEDS ATTENTION — CLINIC ACTION REQUIRED' :
                   refillCase.status === 'WAITING' ? 'WAITING — PHARMACY CONFIRMATION' :
                   refillCase.status === 'RESOLVED' ? 'RESOLVED — COMPLETED' : 'IN REVIEW'}
                </span>
              </div>
              <p className="text-xs text-teal-950 mt-2 font-mono font-medium bg-teal-50/40 p-2.5 rounded-lg border border-teal-100 block">
                Sig: {refillCase.medication.sig} · Qty: {refillCase.medication.quantity} ({refillCase.medication.daysSupply} days) · NDC: {refillCase.medication.ndc}
              </p>
            </div>

            {/* Entity Context Dossier Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {/* Patient */}
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" /> Patient Profile
                </span>
                <p className="font-extrabold text-slate-950 mt-1">{refillCase.patient.name}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  DOB: {refillCase.patient.dob} ({refillCase.patient.age}y) · {refillCase.patient.mrn}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Adherence: {refillCase.patient.adherenceRate}%
                </p>
              </div>

              {/* Prescriber */}
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-slate-500" /> Prescribing Provider
                </span>
                <p className="font-extrabold text-slate-950 mt-1">{refillCase.prescriber.name}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {refillCase.prescriber.practiceName}
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  NPI: {refillCase.prescriber.npi}
                </p>
              </div>

              {/* Pharmacy */}
              <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" /> Dispensing Pharmacy
                </span>
                <p className="font-extrabold text-slate-950 mt-1">{refillCase.pharmacy.name}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {refillCase.pharmacy.address}
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  NCPDP: {refillCase.pharmacy.ncpdp} · {refillCase.pharmacy.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Assigned Owner & Primary Action Box */}
          <div className="lg:w-80 shrink-0 p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 border border-slate-200/90 space-y-4 shadow-2xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Current Case Owner
              </span>
              <p className="text-sm font-extrabold text-slate-950 mt-1 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-teal-600" />
                {refillCase.owner.name}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                {refillCase.owner.role} · {refillCase.owner.organization}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Next Action
              </span>
              <button
                onClick={() => handleOpenActionModal(refillCase.nextBestAction)}
                className="w-full py-2.5 px-3.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer uppercase tracking-wider"
              >
                {refillCase.nextBestAction.label}
              </button>

              {/* Secondary Actions */}
              <div className="grid grid-cols-1 gap-1.5 pt-1">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="w-full py-2 px-3 text-[11px] font-bold text-teal-950 bg-teal-50 hover:bg-teal-100/80 border border-teal-300/80 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-700" />
                  <span>Schedule Doctor Appointment & Bridge</span>
                </button>
                <button
                  onClick={() => handleOpenActionModal({
                    id: 'contact_pharmacy',
                    label: 'Contact Pharmacy',
                    description: `Call ${refillCase.pharmacy.name} at ${refillCase.pharmacy.phone} regarding NCPDP #${refillCase.pharmacy.ncpdp}`,
                    consequence: 'Logs communication attempt to audit ledger.',
                    primary: false,
                    variant: 'secondary'
                  })}
                  className="w-full py-1.5 px-3 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Contact Pharmacy
                </button>
                <button
                  onClick={() => handleOpenActionModal({
                    id: 'request_clarification',
                    label: 'Request Clarification',
                    description: 'Ask dispensing pharmacy or prescriber for dosage/supply clarification.',
                    consequence: 'Sends secure query and flags case for pending response.',
                    primary: false,
                    variant: 'secondary'
                  })}
                  className="w-full py-1.5 px-3 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Request Clarification
                </button>
                <button
                  onClick={() => handleOpenActionModal({
                    id: 'escalate_case',
                    label: 'Escalate Case',
                    description: 'Flag case for urgent clinical lead review.',
                    consequence: 'Escalates urgency to CRITICAL and alerts charge nurse.',
                    primary: false,
                    variant: 'warning'
                  })}
                  className="w-full py-1.5 px-3 text-[11px] font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Escalate Case
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Confirmed & 30-Day Bridge Active Banner (if booked) */}
      {refillCase.appointment && (
        <div className="p-4 rounded-2xl bg-teal-50/90 border border-teal-200/90 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-teal-950 text-sm">
                  Doctor Appointment Confirmed: {refillCase.appointment.date} at {refillCase.appointment.time}
                </span>
                <span className="text-[10px] font-mono font-bold bg-teal-200/80 text-teal-950 px-2 py-0.5 rounded border border-teal-300">
                  CONFIRMED
                </span>
              </div>
              <p className="text-[11px] text-teal-800 mt-0.5">
                {refillCase.appointment.type} with {refillCase.appointment.provider} · 
                {refillCase.appointment.bridgeIssued ? ` 30-Day Safety Bridge Issued (#30 to ${refillCase.pharmacy.name})` : ' Scheduled'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-teal-950 bg-white hover:bg-teal-100 border border-teal-300 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <Calendar className="w-3 h-3 text-teal-700" />
            <span>Modify Appointment</span>
          </button>
        </div>
      )}

      {/* SECTION 1: What's happening? */}
      <SituationOverview 
        refillCase={refillCase}
        onExecuteAction={handleOpenActionModal}
      />

      {/* SECTION 2: Refill Journey Rail (CORE DIFFERENTIATOR) */}
      <RefillJourney
        steps={refillCase.journey}
        selectedStepId={selectedJourneyStep?.id || null}
        onSelectStep={(step) => setSelectedJourneyStep(step)}
      />

      {/* Two Column Layout for Blocker & Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Why is it stuck? + Patient Communication (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 3: Why is it stuck? */}
          <BlockerReasoningPanel 
            blocker={refillCase.blocker} 
            ownerName={refillCase.owner.name}
            nextActionLabel={refillCase.nextBestAction.label}
          />

          {/* SECTION 6: Patient Communication */}
          <PatientCommunicationCard
            comm={refillCase.patientCommunication}
            patientName={refillCase.patient.name}
            patientPhone={refillCase.patient.phone}
          />

          {/* SECTION 7: Audit Log */}
          <AuditTrailCard auditTrail={refillCase.auditTrail} />
        </div>

        {/* Right Column: Action Center + Activity Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* SECTION 4: Action Center */}
          <ActionPanel
            refillCase={refillCase}
            onSelectAction={handleOpenActionModal}
          />

          {/* SECTION 5: Activity Timeline */}
          <ActivityTimeline timeline={refillCase.timeline} />
        </div>
      </div>

      {/* Journey Node Inspector Drawer */}
      <JourneyNodeDrawer
        step={selectedJourneyStep}
        onClose={() => setSelectedJourneyStep(null)}
        onActionClick={(actionLabel) => {
          setSelectedJourneyStep(null);
          handleOpenActionModal(refillCase.nextBestAction);
        }}
      />

      {/* Confirmation Modal */}
      <ActionModal
        isOpen={Boolean(activeModalAction)}
        onClose={() => setActiveModalAction(null)}
        onConfirm={handleConfirmAction}
        action={activeModalAction}
        refillCase={refillCase}
      />

      {/* Doctor Appointment & 30-Day Bridge Booking Modal */}
      <BookAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        refillCase={refillCase}
        onConfirm={(data) => {
          if (onBookAppointment) {
            onBookAppointment(refillCase.id, data);
          }
          setIsAppointmentModalOpen(false);
        }}
      />
    </div>
  );
};
