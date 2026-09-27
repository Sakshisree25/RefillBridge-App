import React, { useState } from 'react';
import { RefillCase } from '../../types/refill';
import { 
  Calendar, 
  Clock, 
  X, 
  User, 
  Stethoscope, 
  Pill, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Building2,
  AlertCircle
} from 'lucide-react';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  refillCase: RefillCase;
  onConfirm: (data: {
    appointmentDate: string;
    appointmentTime: string;
    appointmentType: string;
    issueBridge: boolean;
    notifyPatient: boolean;
    notes: string;
  }) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  refillCase,
  onConfirm
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [selectedTime, setSelectedTime] = useState('09:30 AM');
  const [appointmentType, setAppointmentType] = useState('Annual Chronic Care Exam (In-Person)');
  const [issueBridge, setIssueBridge] = useState(true);
  const [notifyPatient, setNotifyPatient] = useState(true);
  const [notes, setNotes] = useState('Annual chronic disease visit scheduled to unblock 12-month medication therapy.');

  if (!isOpen) return null;

  const quickSlots = [
    { date: '2026-10-14', time: '09:30 AM', label: 'Oct 14 · 09:30 AM (Recommended)' },
    { date: '2026-10-14', time: '02:15 PM', label: 'Oct 14 · 02:15 PM' },
    { date: '2026-10-16', time: '11:00 AM', label: 'Oct 16 · 11:00 AM' },
    { date: '2026-10-20', time: '10:30 AM', label: 'Oct 20 · 10:30 AM' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      appointmentType,
      issueBridge,
      notifyPatient,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-lg w-full overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-950 text-white flex items-center justify-between border-b border-teal-900/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-tight">
                Schedule Doctor Appointment
              </h3>
              <p className="text-[11px] text-teal-200/90">
                Resolve visit blocker & authorize 30-day bridge refill
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4.5">
          {/* Patient & Provider Clinical Context */}
          <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Patient</span>
              <p className="font-extrabold text-slate-900 mt-0.5">{refillCase.patient.name}</p>
              <p className="text-[11px] text-slate-500 font-mono">MRN: {refillCase.patient.mrn} · {refillCase.patient.age}y</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Provider</span>
              <p className="font-extrabold text-slate-900 mt-0.5">{refillCase.prescriber.name}</p>
              <p className="text-[11px] text-slate-500 truncate">{refillCase.prescriber.practiceName}</p>
            </div>
          </div>

          {/* Appointment Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 block">
              Appointment Encounter Type
            </label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium cursor-pointer"
            >
              <option value="Annual Chronic Care Exam (In-Person)">Annual Chronic Care Exam (In-Person, 30 min)</option>
              <option value="Comprehensive Medication Therapy Review (In-Person)">Comprehensive Medication Therapy Review (In-Person, 45 min)</option>
              <option value="Telehealth Clinical Video Encounter (Virtual)">Telehealth Clinical Video Encounter (Virtual, 20 min)</option>
              <option value="Hypertension / Lab Follow-up Visit">Hypertension / Lab Follow-up Visit (In-Person, 15 min)</option>
            </select>
          </div>

          {/* Quick Slot Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Select Available Clinic Slot</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200/60">
                EHR Schedule Synced
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickSlots.map((slot, idx) => {
                const isSelected = selectedDate === slot.date && selectedTime === slot.time;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedDate(slot.date);
                      setSelectedTime(slot.time);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-300' : 'text-slate-400'}`} />
                      <span className="font-bold">{slot.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 30-Day Bridge Prescription Checkbox (Core Innovation) */}
          <div className="p-4 bg-teal-50/70 border border-teal-200/90 rounded-xl space-y-2.5">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={issueBridge}
                onChange={(e) => setIssueBridge(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-teal-300 text-teal-700 focus:ring-teal-600 cursor-pointer"
              />
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-teal-950 block">
                  Authorize 30-Day Bridge Refill (#30 quantity)
                </span>
                <p className="text-[11px] text-teal-800 leading-relaxed font-medium">
                  Authorizes immediate 30-day supply to <strong>{refillCase.pharmacy.name}</strong> so the patient maintains therapy continuity until their appointment on {selectedDate}.
                </p>
              </div>
            </label>
            <div className="flex items-center gap-1.5 text-[10px] text-teal-800 font-mono pt-1 border-t border-teal-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>Covered by Delegated Clinical Protocol 4B (Overdue Encounter Bridge)</span>
            </div>
          </div>

          {/* Patient SMS Notification Option */}
          <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={notifyPatient}
                onChange={(e) => setNotifyPatient(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
              />
              <span className="font-semibold text-slate-800">
                Dispatch automated SMS with appointment details & bridge refill notification to {refillCase.patient.phone}
              </span>
            </label>
          </div>

          {/* Clinical Notes */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Internal Clinical Ledger Note
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4.5 py-2 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
              <span>Confirm Appointment & Issue Bridge</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
