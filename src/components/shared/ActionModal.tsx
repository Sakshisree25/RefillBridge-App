import React, { useState } from 'react';
import { RefillActionOption, RefillCase } from '../../types/refill';
import { AlertCircle, CheckCircle2, ShieldCheck, X, ArrowRight, UserCheck } from 'lucide-react';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (actionId: string, notes: string) => void;
  action: RefillActionOption | null;
  refillCase: RefillCase;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  refillCase
}) => {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !action) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm(action.id, notes);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-teal-50 text-teal-700 border border-teal-200/60">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Confirm Operational Action
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {refillCase.referenceNumber} · {refillCase.medication.name}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 tracking-wider">ACTION</span>
            <h4 className="text-base font-semibold text-slate-900 mt-0.5">
              {action.label}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {action.description}
            </p>
          </div>

          {/* Explicit Consequence Box */}
          <div className="p-3.5 rounded-lg bg-sky-50/70 border border-sky-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-900">
              <AlertCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Consequence & Downstream Effect</span>
            </div>
            <p className="text-xs text-sky-800 leading-relaxed">
              {action.consequence}
            </p>
          </div>

          {/* Context Hand-off details */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/60">
            <div>
              <span className="text-slate-400 block text-[11px]">Primary Recipient</span>
              <span className="font-medium text-slate-800">
                {refillCase.prescriber.name}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Dispensing Pharmacy</span>
              <span className="font-medium text-slate-800 truncate block">
                {refillCase.pharmacy.name}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Patient Notification</span>
              <span className="font-medium text-slate-800">
                Automated SMS ({refillCase.patient.phone})
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Audit Attribution</span>
              <span className="font-medium text-slate-800 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-emerald-600" />
                Maya Rao (Operations)
              </span>
            </div>
          </div>

          {/* Optional staff dispatch notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Add internal routing note (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Confirmed kidney lab from 4 months ago; patient adhering well."
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-teal-600 bg-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-slate-50/60">
          <span className="text-[11px] text-slate-500">
            Compliant with clinical delegation protocol
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <span>Execute Action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
