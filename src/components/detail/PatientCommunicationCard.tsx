import React, { useState } from 'react';
import { PatientCommunication } from '../../types/refill';
import { MessageSquare, Send, Check, Phone, Eye, Edit3 } from 'lucide-react';

interface PatientCommunicationCardProps {
  comm: PatientCommunication;
  patientName: string;
  patientPhone: string;
  onSendCustomUpdate?: (message: string) => void;
}

export const PatientCommunicationCard: React.FC<PatientCommunicationCardProps> = ({
  comm,
  patientName,
  patientPhone,
  onSendCustomUpdate
}) => {
  const [showDraft, setShowDraft] = useState(false);
  const [customDraft, setCustomDraft] = useState(
    comm.previewMessage || "Your refill request is currently being reviewed by your healthcare provider. We’ll update you when the review is complete."
  );
  const [sentNotice, setSentNotice] = useState(false);

  const handleSend = () => {
    setSentNotice(true);
    if (onSendCustomUpdate) {
      onSendCustomUpdate(customDraft);
    }
    setTimeout(() => setSentNotice(false), 2500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Automated SMS
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-0.5">
            PATIENT UPDATE
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Channel: {comm.deliveryChannel}
        </span>
      </div>

      {/* Current Patient Facing Status */}
      <div className="p-3.5 bg-teal-50/50 border border-teal-200/70 rounded-lg space-y-1.5">
        <span className="text-[11px] font-bold text-teal-900 uppercase tracking-wider block">
          Current Message
        </span>
        <p className="text-xs text-teal-950 font-medium leading-relaxed">
          "{comm.currentStatusText || "Your refill request is currently being reviewed by your healthcare provider. We’ll update you when the review is complete."}"
        </p>
        <div className="flex items-center justify-between pt-1 text-[11px] text-teal-700">
          <span>Last sent: {comm.lastSentAt}</span>
          <span className="font-medium">To: {patientName} ({patientPhone})</span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex items-center justify-between gap-2 pt-1 text-xs">
        <span className="text-slate-500 font-medium">Patient communication preview</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDraft(!showDraft)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>{showDraft ? 'Hide Message' : 'Preview Message'}</span>
          </button>
          <button
            onClick={() => setShowDraft(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            <span>Edit Message</span>
          </button>
        </div>
      </div>

      {/* SMS Preview / Custom Update Drawer */}
      {showDraft && (
        <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              Patient SMS Preview
            </span>
            <span className="text-[11px]">HIPAA Compliant · No PHI</span>
          </div>

          <textarea
            value={customDraft}
            onChange={(e) => setCustomDraft(e.target.value)}
            rows={3}
            className="w-full text-xs bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500 font-sans leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              Informs patient without requiring action.
            </span>
            <button
              onClick={handleSend}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {sentNotice ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Update Sent</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Update</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
