import React, { useState } from 'react';
import { 
  HeartPulse, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  Sparkles, 
  Building2, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Stethoscope,
  Pill,
  Hospital
} from 'lucide-react';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  badgeNumber: string;
  department: string;
  initials: string;
}

export const DEMO_STAFF_USERS: StaffUser[] = [
  {
    id: 'user-maya',
    name: 'Maya Rao',
    email: 'maya.rao@northwest-health.org',
    role: 'Clinical Triage Lead',
    badgeNumber: 'EMP-4821',
    department: 'Practice Operations & Triage',
    initials: 'MR'
  },
  {
    id: 'user-patel',
    name: 'Dr. Aris Patel, MD',
    email: 'aris.patel@northwest-health.org',
    role: 'Attending Endocrinologist',
    badgeNumber: 'PHY-1049',
    department: 'Endocrinology & Internal Medicine',
    initials: 'AP'
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova, PharmD',
    email: 'elena.rostova@partner-rx.org',
    role: 'Partner Pharmacy Liaison',
    badgeNumber: 'PHARM-902',
    department: 'Clinical Pharmacy Network',
    initials: 'ER'
  }
];

interface SignInViewProps {
  onSignIn: (user: StaffUser) => void;
}

export const SignInView: React.FC<SignInViewProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your hospital email or clinical staff ID.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Simulate authentic clinical authentication
    setTimeout(() => {
      // Find matching preset or construct staff profile
      const matched = DEMO_STAFF_USERS.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (matched) {
        onSignIn(matched);
      } else {
        const namePart = email.split('@')[0].replace('.', ' ');
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const user: StaffUser = {
          id: `user-${Date.now()}`,
          name: formattedName || 'Hospital Staff',
          email: email.trim(),
          role: 'Clinical Operations Specialist',
          badgeNumber: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          department: 'Ambulatory Care Network',
          initials: formattedName ? formattedName.slice(0, 2).toUpperCase() : 'HS'
        };
        onSignIn(user);
      }
      setIsLoading(false);
    }, 450);
  };

  const handleQuickSelect = (user: StaffUser) => {
    setIsLoading(true);
    setTimeout(() => {
      onSignIn(user);
      setIsLoading(false);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-slate-50 to-cyan-50/40 flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none">
      {/* Top Hospital Security Notice */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-900">
          <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <HeartPulse className="w-4 h-4 text-teal-100" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-teal-950 tracking-tight block">
              RefillBridge Clinical
            </span>
            <span className="text-[10px] text-teal-700/80 font-normal">
              Hospital Operations & Refill Gateway
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold text-teal-800 bg-white/90 border border-teal-200/80 px-3 py-1.5 rounded-full shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>HIPAA Compliant Workstation</span>
        </div>
      </header>

      {/* Main Sign In Card Container */}
      <main className="max-w-md w-full mx-auto my-auto space-y-6">
        <div className="bg-white rounded-3xl border border-teal-100 p-8 shadow-xs relative overflow-hidden">
          {/* Subtle top hospital teal pinstripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600" />

          {/* Heading */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center mx-auto shadow-2xs">
              <Hospital className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-teal-950">
              Clinical Portal Sign In
            </h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Authorized clinical staff access to triage refill queues, coordinate prescriber renewals, and unblock pharmacy dispenses.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Hospital Email or Staff ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maya.rao@northwest-health.org"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-teal-700 font-medium hover:underline cursor-pointer">
                  Forgot PIN?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 transition-all font-mono text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberTerminal}
                  onChange={(e) => setRememberTerminal(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-400 accent-teal-600 w-3.5 h-3.5"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-teal-800/80 font-mono text-[11px]">256-bit TLS</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.8 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98 disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Clinical Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Clinical Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Staff Selection for Fast Testing */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
            <span className="text-[11px] font-bold text-teal-900/80 uppercase tracking-wider block text-center">
              1-Click Demo Staff Sign In
            </span>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_STAFF_USERS.map((staff) => (
                <button
                  key={staff.id}
                  type="button"
                  onClick={() => handleQuickSelect(staff)}
                  className="w-full p-2.5 rounded-xl border border-teal-100 hover:border-teal-300 bg-teal-50/40 hover:bg-teal-50 flex items-center justify-between text-left transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center text-[11px] font-bold font-mono">
                      {staff.initials}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-950 block group-hover:text-teal-700 transition-colors">
                        {staff.name}
                      </span>
                      <span className="text-[10px] text-teal-800/80 block">
                        {staff.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-200/80">
                    Sign In →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Surescripts Network Validated
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Epic FHIR R4 Connected
          </span>
        </div>
      </main>

      {/* Hospital Footer */}
      <footer className="max-w-5xl mx-auto w-full pt-4 text-center text-xs text-slate-500 border-t border-teal-100/60 mt-4">
        <p>Northwest Endocrinology Health System · Clinical Refill Triage Center</p>
        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
          For technical assistance, contact Hospital Clinical IT Help Desk (ext. 4357)
        </p>
      </footer>
    </div>
  );
};
