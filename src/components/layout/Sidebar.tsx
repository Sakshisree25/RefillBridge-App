import React from 'react';
import { 
  Activity, 
  Inbox, 
  CheckSquare, 
  User, 
  BarChart3, 
  Sliders, 
  Sparkles, 
  Radio, 
  RefreshCw,
  Sun,
  Moon,
  Pill,
  HeartPulse,
  LogOut
} from 'lucide-react';
import { StaffUser } from '../../views/SignInView';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string, filter?: string) => void;
  activeFilter?: string;
  totalBlockedCount: number;
  totalNeedsActionCount: number;
  onOpenAssistant: () => void;
  onResetDemo: () => void;
  currentUser?: StaffUser | null;
  onSignOut?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  activeFilter,
  totalBlockedCount,
  totalNeedsActionCount,
  onOpenAssistant,
  onResetDemo,
  currentUser,
  onSignOut,
  theme = 'light',
  onToggleTheme
}) => {
  return (
    <aside className="w-68 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30 shadow-[1px_0_12px_rgba(0,0,0,0.02)]">
      {/* Brand & Hospital Identity */}
      <div>
        <div className="p-5 border-b border-teal-100/60 bg-gradient-to-b from-teal-50/40 to-white">
          <div className="flex items-center gap-3">
            {/* Hospital Medical Cross & Baton Logo */}
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <HeartPulse className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold text-teal-950 tracking-tight">
                  RefillBridge
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-teal-50 text-teal-700 rounded border border-teal-200">
                  CLINICAL
                </span>
              </div>
              <span className="text-[11px] text-teal-700/80 block font-medium leading-tight">
                Hospital & Rx Operations
              </span>
            </div>
          </div>
        </div>

        {/* Primary Navigation Items */}
        <nav className="p-3.5 space-y-1 text-xs">
          {/* Section Label */}
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold text-teal-800/70 uppercase tracking-wider">
            Clinical Workspace
          </div>

          {/* Overview */}
          <button
            onClick={() => onNavigate('OPERATIONS')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeView === 'OPERATIONS'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200 shadow-2xs'
                : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className={`w-4 h-4 ${activeView === 'OPERATIONS' ? 'text-teal-600' : 'text-slate-400'}`} />
              <span className="font-semibold">Operations Command</span>
            </div>
          </button>

          {/* Refills Group */}
          <div className="pt-1">
            <button
              onClick={() => onNavigate('QUEUE', 'ALL')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
                activeView === 'QUEUE' && (!activeFilter || activeFilter === 'ALL')
                  ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200 shadow-2xs'
                  : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className={`w-4 h-4 ${activeView === 'QUEUE' && (!activeFilter || activeFilter === 'ALL') ? 'text-teal-600' : 'text-slate-400'}`} />
                <span className="font-semibold">Refill Queue</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-teal-800 bg-teal-100/80 border border-teal-200/60">
                12
              </span>
            </button>

            {/* Refill Sub-Filters with medical color badges */}
            <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-teal-100 ml-4 my-1">
              <button
                onClick={() => onNavigate('QUEUE', 'NEEDS_ACTION')}
                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  activeView === 'QUEUE' && activeFilter === 'NEEDS_ACTION'
                    ? 'text-amber-900 font-bold bg-amber-50 border border-amber-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Needs Attention</span>
                </div>
                <span className="font-mono text-amber-800 font-bold text-[10px]">{totalNeedsActionCount}</span>
              </button>

              <button
                onClick={() => onNavigate('QUEUE', 'BLOCKED')}
                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  activeView === 'QUEUE' && activeFilter === 'BLOCKED'
                    ? 'text-rose-900 font-bold bg-rose-50 border border-rose-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-rose-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>Blocked</span>
                </div>
                <span className="font-mono text-rose-800 font-bold text-[10px]">{totalBlockedCount}</span>
              </button>

              <button
                onClick={() => onNavigate('QUEUE', 'WAITING')}
                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  activeView === 'QUEUE' && activeFilter === 'WAITING'
                    ? 'text-sky-900 font-bold bg-sky-50 border border-sky-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Waiting</span>
                </div>
              </button>

              <button
                onClick={() => onNavigate('QUEUE', 'RESOLVED')}
                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  activeView === 'QUEUE' && activeFilter === 'RESOLVED'
                    ? 'text-emerald-900 font-bold bg-emerald-50 border border-emerald-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Resolved</span>
                </div>
              </button>
            </div>
          </div>

          {/* Action Center */}
          <button
            onClick={() => onNavigate('ACTIONS')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeView === 'ACTIONS'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200 shadow-2xs'
                : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/50'
            }`}
          >
            <CheckSquare className={`w-4 h-4 ${activeView === 'ACTIONS' ? 'text-teal-600' : 'text-slate-400'}`} />
            <span>Action Center</span>
          </button>

          {/* Patient Context */}
          <button
            onClick={() => onNavigate('PATIENTS')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeView === 'PATIENTS'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200 shadow-2xs'
                : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/50'
            }`}
          >
            <User className={`w-4 h-4 ${activeView === 'PATIENTS' ? 'text-teal-600' : 'text-slate-400'}`} />
            <span>Patient Context</span>
          </button>

          {/* Section Label: Strategy & Systems */}
          <div className="px-3 pt-3 pb-1 text-[10px] font-bold text-teal-800/70 uppercase tracking-wider">
            Hospital Networks
          </div>

          {/* Refill Performance */}
          <button
            onClick={() => onNavigate('ANALYTICS')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeView === 'ANALYTICS'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200 shadow-2xs'
                : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/50'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${activeView === 'ANALYTICS' ? 'text-teal-600' : 'text-slate-400'}`} />
            <span>Refill Performance</span>
          </button>

          {/* Connected Systems */}
          <button
            onClick={() => onNavigate('INTEGRATIONS')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeView === 'INTEGRATIONS'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200 shadow-2xs'
                : 'text-slate-600 hover:text-teal-900 hover:bg-teal-50/50'
            }`}
          >
            <Sliders className={`w-4 h-4 ${activeView === 'INTEGRATIONS' ? 'text-teal-600' : 'text-slate-400'}`} />
            <span>Connected Systems</span>
          </button>
        </nav>
      </div>

      {/* Footer Profile & Triage Trigger (Hospital Clean Look) */}
      <div className="p-3.5 border-t border-slate-100 space-y-2.5 bg-teal-50/30">
        {/* Assistant launcher button (Clean Medical Teal) */}
        <button
          onClick={onOpenAssistant}
          className="w-full py-2.5 px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-between transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-200" />
            <span>Clinical Assistant</span>
          </div>
          <span className="text-[10px] bg-teal-500 text-white px-1.5 py-0.5 rounded font-mono font-bold">
            Rx
          </span>
        </button>

        {/* User Card (Clean Hospital Staff Badge) */}
        <div className="p-3 rounded-xl bg-white border border-teal-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 border border-teal-200 flex items-center justify-center text-xs font-bold font-mono shrink-0">
              {currentUser?.initials || 'MR'}
            </div>
            <div className="space-y-0.2 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.name || 'Maya Rao'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              </div>
              <p className="text-[10px] text-teal-700/80 font-medium truncate">
                {currentUser?.role || 'Clinical Triage Lead'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {onSignOut && (
              <button
                onClick={onSignOut}
                title="Sign Out of Clinical Portal"
                className="p-1.5 text-slate-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onResetDemo}
              title="Reset Demo Data"
              className="p-1.5 text-slate-400 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="text-[10px] text-teal-800/70 font-mono text-center flex items-center justify-center gap-1.5">
          <Radio className="w-2.5 h-2.5 text-emerald-500 animate-pulse" />
          <span>Northwest Endocrinology EHR</span>
        </div>
      </div>
    </aside>
  );
};
