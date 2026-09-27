import React from 'react';
import { Sparkles, RotateCcw, HeartPulse, LogOut } from 'lucide-react';
import { StaffUser } from '../../views/SignInView';

interface TopHeaderProps {
  breadcrumbs: string;
  onOpenAssistant: () => void;
  onResetDemo: () => void;
  currentUser?: StaffUser | null;
  onSignOut?: () => void;
  onOpenQuickDemoCase?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  breadcrumbs,
  onOpenAssistant,
  onResetDemo,
  currentUser,
  onSignOut
}) => {
  return (
    <header className="h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Zone 1: Hospital Clinical Section Header */}
      <div className="flex items-center gap-2.5 text-xs min-w-0">
        <div className="flex items-center gap-1.5 font-extrabold text-teal-950 tracking-tight text-sm shrink-0">
          <HeartPulse className="w-4 h-4 text-teal-600" />
          <span>RefillBridge</span>
        </div>
        <span className="text-slate-300 shrink-0">/</span>
        <span className="font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/80 truncate">
          {breadcrumbs}
        </span>
      </div>

      {/* Zone 2: Compact, Hospital Clinical Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Hospital Switch Live Dot */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-teal-800 bg-teal-50 border border-teal-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Clinical Network Live</span>
        </div>

        {/* Reset Demo State Button */}
        <button
          onClick={onResetDemo}
          title="Reset demo data to initial state"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-teal-900 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer border border-slate-200/70"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden md:inline">Reset</span>
        </button>

        {/* Clinical Assistant Button (Hospital Medical Teal) */}
        <button
          onClick={onOpenAssistant}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.8 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-200" />
          <span>Assistant</span>
        </button>

        {/* Sign Out Button */}
        {onSignOut && (
          <button
            onClick={onSignOut}
            title="Sign out of hospital session"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.8 text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-slate-200/80 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        )}
      </div>
    </header>
  );
};
