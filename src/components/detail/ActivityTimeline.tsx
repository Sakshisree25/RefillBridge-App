import React from 'react';
import { TimelineEvent } from '../../types/refill';
import { 
  Clock, 
  MessageSquare, 
  FileCheck, 
  AlertCircle, 
  User, 
  Send,
  Building,
  CheckCircle2
} from 'lucide-react';

interface ActivityTimelineProps {
  timeline: TimelineEvent[];
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ timeline }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'intake':
        return <Building className="w-3.5 h-3.5 text-slate-500" />;
      case 'verification':
        return <FileCheck className="w-3.5 h-3.5 text-sky-600" />;
      case 'blocker_detected':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-600" />;
      case 'staff_action':
        return <User className="w-3.5 h-3.5 text-teal-600" />;
      case 'provider_action':
        return <FileCheck className="w-3.5 h-3.5 text-indigo-600" />;
      case 'patient_notice':
        return <Send className="w-3.5 h-3.5 text-amber-600" />;
      case 'resolution':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Audit Record
          </span>
          <h3 className="text-sm font-bold text-slate-900 mt-0.5">
            CASE HISTORY
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Complete record of refill activity.
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {timeline.length} events
        </span>
      </div>

      {/* Vertical Timeline Stream */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
        {timeline.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline Node Point */}
            <div className="absolute -left-6 top-1 flex items-center justify-center w-5 h-5 rounded-full bg-white border border-slate-300 shadow-2xs group-hover:border-slate-500 transition-colors">
              {getCategoryIcon(event.category)}
            </div>

            {/* Event Content */}
            <div className="bg-slate-50/60 p-3 rounded-lg border border-slate-200/60 group-hover:border-slate-300 transition-colors space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  {event.title}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {event.timestamp} ({event.timeAgo})
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {event.description}
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                <span>By: <strong className="text-slate-700 font-semibold">{event.actor}</strong> ({event.role})</span>
                <span>·</span>
                <span className="font-mono">{event.system}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
