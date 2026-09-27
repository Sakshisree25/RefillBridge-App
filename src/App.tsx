import React, { useState, useEffect } from 'react';
import { RefillCase } from './types/refill';
import { INITIAL_REFILLS } from './data/mockRefills';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { OperationsHomeView } from './views/OperationsHomeView';
import { RefillQueueView } from './views/RefillQueueView';
import { RefillDetailWorkspace } from './components/detail/RefillDetailWorkspace';
import { ActionCenterView } from './views/ActionCenterView';
import { PatientContextView } from './views/PatientContextView';
import { AnalyticsView } from './views/AnalyticsView';
import { IntegrationsView } from './views/IntegrationsView';
import { RxRelayAssistant } from './components/assistant/RxRelayAssistant';
import { ToastNotification, ToastMessage } from './components/shared/ToastNotification';
import { SignInView, StaffUser } from './views/SignInView';

export default function App() {
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('refillbridge_user');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return null; // Show Sign In page first as requested
  });
  const [refills, setRefills] = useState<RefillCase[]>(INITIAL_REFILLS);
  const [activeView, setActiveView] = useState<string>('OPERATIONS');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>('case-01');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('refillbridge_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('refillbridge_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Add toast helper
  const addToast = (type: 'success' | 'info' | 'warning', title: string, description: string) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Reset to initial demo state
  const handleResetDemo = () => {
    setRefills(INITIAL_REFILLS);
    setSelectedCaseId('case-01');
    addToast('info', 'Demo State Reset', 'Refill cases, timelines, and audit logs restored to pristine demo defaults.');
  };

  // Open a specific case in the Refill Detail Workspace
  const handleOpenCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setActiveView('DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation router
  const handleNavigate = (view: string, filter?: string) => {
    setActiveView(view);
    if (filter) {
      setActiveFilter(filter);
    }
  };

  // Execute operational action on a refill case
  const handleExecuteAction = (actionId: string, notes: string) => {
    if (!selectedCaseId) return;

    setRefills(prev => prev.map(c => {
      if (c.id !== selectedCaseId) return c;

      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const nowDate = 'Today';

      // Deep clone case
      const updated: RefillCase = JSON.parse(JSON.stringify(c));

      if (actionId === 'request_provider_review') {
        updated.status = 'WAITING';
        updated.blocker.badgeLabel = 'Waiting on Dr. Patel';
        updated.blocker.reason = 'Renewal order packet with HbA1c lab history dispatched to Dr. Patel’s priority EHR InBasket.';
        updated.ageFormatted = 'Dispatched just now';
        
        // Update journey nodes
        const providerNode = updated.journey.find(j => j.stage === 'PROVIDER_REVIEW');
        if (providerNode) {
          providerNode.status = 'ACTIVE';
          providerNode.summary = 'Dr. Patel InBasket: 1-click renewal pending.';
          providerNode.timestamp = `${nowDate}, ${nowTime}`;
        }
        const staffNode = updated.journey.find(j => j.stage === 'PRACTICE_STAFF');
        if (staffNode) {
          staffNode.status = 'COMPLETED';
        }

        // Add timeline event
        updated.timeline.unshift({
          id: `tl-new-${Date.now()}`,
          timestamp: `${nowDate} at ${nowTime}`,
          timeAgo: 'Just now',
          actor: 'Maya Rao',
          role: 'Practice Staff',
          system: 'RxRelay InBasket Connector',
          title: 'Provider Renewal Review Request Dispatched',
          description: `Dispatched 1-click renewal order packet for ${c.medication.name} to Dr. Anika Patel. ${notes ? `Note: "${notes}"` : ''}`,
          category: 'staff_action'
        });

        // Update patient communication
        updated.patientCommunication.currentStatusText = 'Dr. Patel’s care team has prioritized your Metformin refill for provider signature today.';
        updated.patientCommunication.lastSentAt = `Today at ${nowTime} via SMS`;

        // Add audit trail
        updated.auditTrail.unshift({
          id: `aud-new-${Date.now()}`,
          timestamp: `${nowDate} at ${nowTime}`,
          actor: 'Maya Rao',
          role: 'Operations Coordinator',
          action: 'Executed Action: Request Provider Review',
          source: 'RxRelay Action Engine',
          result: 'InBasket Order Queued'
        });

        addToast('success', 'Provider Review Packet Dispatched', 'Dr. Patel notified via EHR InBasket. Sarah Johnson informed via SMS.');
      } else if (actionId === 'issue_bridge_refill' || actionId === 'issue_bridge_and_schedule') {
        updated.status = 'IN_PROGRESS';
        updated.blocker.badgeLabel = '30-Day Bridge Active';
        updated.blocker.reason = '30-day bridge medication supply authorized under protocol. Appointment scheduling link sent to patient.';

        const dispenseNode = updated.journey.find(j => j.stage === 'PHARMACY_DISPENSE');
        if (dispenseNode) dispenseNode.status = 'ACTIVE';

        updated.timeline.unshift({
          id: `tl-new-${Date.now()}`,
          timestamp: `${nowDate} at ${nowTime}`,
          timeAgo: 'Just now',
          actor: 'Maya Rao',
          role: 'Practice Staff',
          system: 'Surescripts Bridge Gateway',
          title: '30-Day Emergency Bridge Refill Authorized',
          description: `Dispatched 30-day supply to pharmacy under standing chronic care protocol. Self-scheduling link sent to patient.`,
          category: 'staff_action'
        });

        addToast('success', '30-Day Bridge Dispatched', 'Emergency bridge sent to pharmacy; appointment scheduling link texted to patient.');
      } else if (actionId === 'resend_verified_sig') {
        updated.status = 'IN_PROGRESS';
        updated.blocker.type = 'NONE';
        updated.blocker.badgeLabel = 'Sig Clarified';
        updated.blocker.reason = 'Full electronic Sig ("Take 1 tablet daily at bedtime") verified and sent to pharmacy portal.';

        const rxNode = updated.journey.find(j => j.stage === 'PHARMACY_INTAKE');
        if (rxNode) rxNode.status = 'COMPLETED';

        const fillNode = updated.journey.find(j => j.stage === 'PHARMACY_DISPENSE');
        if (fillNode) fillNode.status = 'ACTIVE';

        addToast('success', 'Sig Clarification Transmitted', 'Costco Pharmacy hold cleared. Medication entered dispense queue.');
      } else if (actionId === 'confirm_walgreens_and_cancel_duplicate') {
        updated.status = 'IN_PROGRESS';
        updated.blocker.badgeLabel = 'Pharmacy Confirmed';
        updated.blocker.reason = 'Walgreens designated as primary dispensing location. Duplicate hold at Rite Aid voided.';
        
        addToast('success', 'Pharmacy Designated & Duplicate Canceled', 'Walgreens Bellevue cleared to fill; Rite Aid duplicate claim voided.');
      } else if (actionId === 'mark_resolved') {
        updated.status = 'RESOLVED';
        updated.blocker.type = 'NONE';
        updated.blocker.badgeLabel = 'Resolved';
        updated.blocker.reason = 'Manual phone or external eRx authorization verified.';
        
        const resNode = updated.journey.find(j => j.stage === 'RESOLVED');
        if (resNode) resNode.status = 'COMPLETED';

        addToast('success', 'Case Marked Resolved', 'Prescription archived into completed ledger.');
      } else {
        updated.status = 'WAITING';
        updated.blocker.badgeLabel = 'Action In Progress';
        addToast('info', 'Action Recorded', 'Action logged to audit ledger.');
      }

      return updated;
    }));
  };

  // Book doctor appointment and authorize 30-day bridge prescription
  const handleBookAppointment = (
    caseId: string,
    data: {
      appointmentDate: string;
      appointmentTime: string;
      appointmentType: string;
      issueBridge: boolean;
      notifyPatient: boolean;
      notes: string;
    }
  ) => {
    setRefills(prev => prev.map(c => {
      if (c.id !== caseId) return c;

      const updated = { ...c };
      updated.appointment = {
        date: data.appointmentDate,
        time: data.appointmentTime,
        type: data.appointmentType,
        provider: c.prescriber.name,
        bridgeIssued: data.issueBridge,
        bridgeQuantity: data.issueBridge ? 30 : 0,
        status: 'CONFIRMED'
      };

      if (data.issueBridge) {
        updated.status = 'IN_PROGRESS';
        updated.blocker = {
          ...c.blocker,
          title: '30-Day Safety Bridge Issued',
          badgeLabel: 'Bridge Active · Visit Booked',
          reason: `Appointment confirmed for ${data.appointmentDate} at ${data.appointmentTime}. 30-day safety bridge refill authorized to ${c.pharmacy.name}.`
        };
      } else {
        updated.status = 'WAITING';
        updated.blocker = {
          ...c.blocker,
          badgeLabel: 'Visit Scheduled',
          reason: `Doctor appointment confirmed for ${data.appointmentDate} at ${data.appointmentTime} with ${c.prescriber.name}.`
        };
      }

      // Add timeline event
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      updated.timeline = [
        {
          id: `tl-${Date.now()}`,
          timestamp: nowTime,
          timeAgo: 'Just now',
          actor: 'Maya Rao',
          role: 'Clinical Triage Coordinator',
          system: 'Epic Scheduling / Surescripts EDI',
          title: data.issueBridge ? 'Doctor Appointment Booked · 30-Day Bridge Dispatched' : 'Doctor Appointment Booked',
          description: `${data.appointmentType} booked with ${c.prescriber.name} on ${data.appointmentDate} at ${data.appointmentTime}.${data.issueBridge ? ` 30-day safety bridge (#30) dispatched to ${c.pharmacy.name}.` : ''}`,
          category: 'staff_action'
        },
        ...c.timeline
      ];

      // Add audit entry
      updated.auditTrail = [
        {
          id: `audit-${Date.now()}`,
          timestamp: nowTime,
          actor: 'Maya Rao',
          role: 'Clinical Triage Coordinator',
          action: data.issueBridge ? 'SCHEDULE_VISIT_AND_ISSUE_BRIDGE' : 'SCHEDULE_VISIT',
          source: 'RefillBridge Operations Console',
          result: `Appointment scheduled: ${data.appointmentDate} with ${c.prescriber.name}. Bridge: ${data.issueBridge ? '30-day supply sent' : 'None'}`
        },
        ...c.auditTrail
      ];

      // Update patient notification
      if (data.notifyPatient) {
        updated.patientCommunication = {
          ...c.patientCommunication,
          currentStatusText: `Your appointment with ${c.prescriber.name} is confirmed for ${data.appointmentDate} at ${data.appointmentTime}.${data.issueBridge ? ' A 30-day bridge prescription has been sent to your pharmacy so you have medication without delay.' : ''}`,
          lastSentAt: 'Just now'
        };
      }

      return updated;
    }));

    addToast(
      'success',
      data.issueBridge ? 'Appointment Booked & 30-Day Bridge Active' : 'Doctor Appointment Confirmed',
      `Visit scheduled for ${data.appointmentDate}. ${data.issueBridge ? '30-day bridge prescription sent electronically to pharmacy.' : ''}`
    );
  };

  const handleSignIn = (user: StaffUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('refillbridge_user', JSON.stringify(user));
    } catch {}
    addToast('success', 'Clinical Terminal Authorized', `Welcome, ${user.name} (${user.role})`);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('refillbridge_user');
    } catch {}
    addToast('info', 'Clinical Session Ended', 'You have been signed out of the hospital workstation.');
  };

  // If user is not authenticated, render Hospital Clinical Sign In view first
  if (!currentUser) {
    return (
      <>
        <SignInView onSignIn={handleSignIn} />
        <ToastNotification toasts={toasts} onDismiss={handleDismissToast} />
      </>
    );
  }

  // Find currently selected case
  const activeCase = refills.find(r => r.id === selectedCaseId) || refills[0];

  const totalBlocked = refills.filter(r => r.status === 'BLOCKED').length;
  const totalNeedsAction = refills.filter(r => r.status === 'NEEDS_ACTION').length;

  const getBreadcrumbs = () => {
    switch (activeView) {
      case 'OPERATIONS':
        return 'Refill Operations';
      case 'QUEUE':
        return `Refill Queue (${activeFilter === 'ALL' ? 'All' : activeFilter === 'NEEDS_ACTION' ? 'Needs Attention' : activeFilter})`;
      case 'DETAIL':
        return `Case Workspace / ${activeCase.referenceNumber}`;
      case 'ACTIONS':
        return 'Action Center';
      case 'PATIENTS':
        return 'Patient Context';
      case 'ANALYTICS':
        return 'Refill Performance';
      case 'INTEGRATIONS':
        return 'Connected Systems';
      default:
        return 'Refill Operations';
    }
  };

  return (
    <div className="min-h-screen flex bg-clinical-canvas text-slate-800">
      {/* Fixed Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        activeFilter={activeFilter}
        totalBlockedCount={totalBlocked}
        totalNeedsActionCount={totalNeedsAction}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onResetDemo={handleResetDemo}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          breadcrumbs={getBreadcrumbs()}
          onOpenAssistant={() => setIsAssistantOpen(true)}
          onResetDemo={handleResetDemo}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onOpenQuickDemoCase={() => handleOpenCase('case-01')}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        {/* View Router */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {activeView === 'OPERATIONS' && (
            <OperationsHomeView
              refills={refills}
              onOpenCase={handleOpenCase}
              onNavigateToQueue={(filter) => {
                setActiveFilter(filter);
                setActiveView('QUEUE');
              }}
              onOpenAssistant={() => setIsAssistantOpen(true)}
            />
          )}

          {activeView === 'QUEUE' && (
            <RefillQueueView
              refills={refills}
              onOpenCase={handleOpenCase}
              initialFilter={activeFilter}
            />
          )}

          {activeView === 'DETAIL' && (
            <RefillDetailWorkspace
              refillCase={activeCase}
              onBack={() => setActiveView('QUEUE')}
              onExecuteAction={handleExecuteAction}
              onAskAssistantAboutCase={() => setIsAssistantOpen(true)}
              onBookAppointment={handleBookAppointment}
            />
          )}

          {activeView === 'ACTIONS' && (
            <ActionCenterView
              refills={refills}
              onOpenCase={handleOpenCase}
            />
          )}

          {activeView === 'PATIENTS' && (
            <PatientContextView
              refills={refills}
              onOpenCase={handleOpenCase}
            />
          )}

          {activeView === 'ANALYTICS' && (
            <AnalyticsView />
          )}

          {activeView === 'INTEGRATIONS' && (
            <IntegrationsView />
          )}
        </main>
      </div>

      {/* Floating / Docked RxRelay AI Assistant */}
      <RxRelayAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        activeCase={activeView === 'DETAIL' ? activeCase : null}
      />

      {/* Toast Notifications */}
      <ToastNotification
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}
