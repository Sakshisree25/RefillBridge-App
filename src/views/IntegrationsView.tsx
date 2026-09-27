import React from 'react';
import { 
  Building2, 
  Server, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Activity,
  Sliders,
  Users,
  Shield,
  FileText
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const integrations = [
    {
      id: 'epic',
      name: 'Epic Systems EHR (FHIR R4 / InBasket)',
      category: 'EHR',
      status: 'CONNECTED',
      latency: '24ms',
      lastSync: '1 min ago',
      details: 'Bidirectional sync of medication orders, encounter notes, and InBasket renewal tasks.'
    },
    {
      id: 'surescripts',
      name: 'Surescripts Network (NCPDP SCRIPT 2017071)',
      category: 'Pharmacy Network',
      status: 'CONNECTED',
      latency: '45ms',
      lastSync: 'Just now',
      details: 'Automated prescription refill routing across 65,000+ US retail and mail-order pharmacies.'
    },
    {
      id: 'covermymeds',
      name: 'CoverMyMeds Electronic Prior Auth (ePA)',
      category: 'Insurance / PBM',
      status: 'CONNECTED',
      latency: '110ms',
      lastSync: '4 mins ago',
      details: 'Automated ePA clinical questionnaire extraction and direct transmission to commercial PBMs.'
    },
    {
      id: 'twilio',
      name: 'Twilio HIPAA Compliant SMS Gateway',
      category: 'Messaging',
      status: 'CONNECTED',
      latency: '18ms',
      lastSync: 'Live WebSocket',
      details: 'De-identified patient progress notifications and appointment self-scheduling SMS dispatch.'
    }
  ];

  const roles = [
    {
      role: 'Clinical Operations / Triage Coordinator',
      user: 'Maya Rao (Current User)',
      scope: 'Triage stuck refills, prepare 1-click renewal packets, dispatch patient updates, execute protocol bridges.'
    },
    {
      role: 'Attending Prescriber (MD / DO / NP)',
      user: 'Dr. Anika Patel, Dr. Marcus Thorne',
      scope: 'Legal prescription renewal signature, controlled substance authorization, clinical dosage modifications.'
    },
    {
      role: 'Dispensing Pharmacist (PharmD)',
      user: 'Marcus Vance (CVS #4821), Elena Rostova (Walgreens)',
      scope: 'Submit refill requests, flag sig clarifications, verify stock availability, confirm dispense completion.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            CONNECTED SYSTEMS
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Status of healthcare data switches, EHR integrations, and security controls.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>All Systems Operational</span>
        </span>
      </div>

      {/* Integration Services Grid */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active Network Connectors
            </span>
            <h3 className="text-sm font-semibold text-slate-900">
              CONNECTED SYSTEMS
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            4 / 4 Systems Connected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item, idx) => {
            const paleBgs = [
              'bg-gradient-to-br from-sky-50/70 to-white border-sky-200/70',
              'bg-gradient-to-br from-emerald-50/70 to-white border-emerald-200/70',
              'bg-gradient-to-br from-indigo-50/70 to-white border-indigo-200/70',
              'bg-gradient-to-br from-rose-50/70 to-white border-rose-200/70'
            ];
            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border ${paleBgs[idx % paleBgs.length]} space-y-2.5 shadow-2xs`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.details}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-500">
                  <span>Latency: <strong className="text-slate-700">{item.latency}</strong></span>
                  <span>Last Sync: <strong className="text-slate-700">{item.lastSync}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security & Access Controls */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-slate-100 text-slate-700">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Healthcare Security & Governance
              </span>
              <h3 className="text-sm font-semibold text-slate-900">
                SECURE HEALTHCARE SESSION
              </h3>
            </div>
          </div>
        </div>

        {/* Security Principles Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Access controlled by role
            </span>
            <p className="text-[11px] text-slate-500">Only authorized clinicians can sign prescriptions.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Activity is logged
            </span>
            <p className="text-[11px] text-slate-500">Immutable ledger records every view and transition.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Sensitive patient information protected
            </span>
            <p className="text-[11px] text-slate-500">End-to-end encryption in transit and at rest.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 space-y-1">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              All actions attributed to a user
            </span>
            <p className="text-[11px] text-slate-500">Every intervention maps to a clinical staff ID.</p>
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-3 pt-2">
          {roles.map((r, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200/70 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900">{r.role}</span>
                <p className="text-slate-500 font-mono text-[11px]">Assigned: {r.user}</p>
              </div>
              <p className="sm:max-w-md text-slate-600 text-[11px] leading-relaxed">
                {r.scope}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
