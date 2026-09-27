/**
 * RxRelay Data Model & Type Definitions
 * Purpose-built domain schema for resolving stuck prescription refills.
 */

export type RefillStatus = 'BLOCKED' | 'NEEDS_ACTION' | 'WAITING' | 'IN_PROGRESS' | 'RESOLVED';

export type BlockerType = 
  | 'NO_REFILLS'
  | 'PROVIDER_APPROVAL'
  | 'VISIT_REQUIRED'
  | 'MISSING_INFO'
  | 'INSURANCE_PA'
  | 'UNCLEAR_PRESCRIPTION'
  | 'DUPLICATE_REQUEST'
  | 'LAB_REQUIRED'
  | 'NONE';

export type UrgencyLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'ROUTINE';

export type JourneyStage = 
  | 'PATIENT_REQUEST'
  | 'PHARMACY_INTAKE'
  | 'PROVIDER_REVIEW'
  | 'PRACTICE_STAFF'
  | 'INSURANCE_PBM'
  | 'PHARMACY_DISPENSE'
  | 'RESOLVED';

export type NodeStatus = 'COMPLETED' | 'BLOCKED' | 'ACTIVE' | 'WAITING' | 'PENDING';

export interface JourneyStep {
  id: string;
  stage: JourneyStage;
  label: string;
  sublabel: string;
  actor: string;
  role: string;
  timestamp: string;
  status: NodeStatus;
  summary: string;
  whatHappened: string;
  whatIsMissing: string | null;
  nextAction: string | null;
  sourceSystem: string;
  systemId: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  timeAgo: string;
  actor: string;
  role: string;
  system: string;
  title: string;
  description: string;
  category: 'intake' | 'verification' | 'blocker_detected' | 'staff_action' | 'provider_action' | 'patient_notice' | 'resolution';
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  source: string;
  result: string;
}

export interface PatientCommunication {
  currentStatusText: string;
  lastSentAt: string;
  deliveryChannel: 'SMS' | 'PATIENT_PORTAL' | 'SECURE_EMAIL';
  nextExpectedStep: string;
  previewMessage: string;
}

export interface BlockerDetails {
  type: BlockerType;
  title: string;
  badgeLabel: string;
  reason: string;
  evidence: string;
  confidence: 'High' | 'Medium';
  whatTriggeredThis: string;
  whatIsRequired: string;
  whoCanResolve: string;
  whatHappensAfter: string;
}

export interface RefillActionOption {
  id: string;
  label: string;
  description: string;
  consequence: string;
  primary?: boolean;
  variant?: 'primary' | 'secondary' | 'warning' | 'success';
}

export interface RefillCase {
  id: string;
  referenceNumber: string;
  medication: {
    name: string;
    strength: string;
    dosageForm: string;
    sig: string;
    quantity: number;
    daysSupply: number;
    therapeuticClass: string;
    ndc: string;
    refillsRemainingOnRecord: number;
  };
  patient: {
    id: string;
    name: string;
    dob: string;
    age: number;
    gender: string;
    mrn: string;
    phone: string;
    adherenceRate: number;
    lastSeenDate: string;
    primaryCondition: string;
  };
  prescriber: {
    name: string;
    npi: string;
    practiceName: string;
    clinicLocation: string;
    specialty: string;
    phone: string;
    assistant: string;
  };
  pharmacy: {
    name: string;
    storeNumber: string;
    ncpdp: string;
    address: string;
    phone: string;
    fax: string;
    contactPharmacist: string;
  };
  insurance: {
    payerName: string;
    planType: string;
    bin: string;
    pcn: string;
    rxGroup: string;
    priorAuthStatus: 'NOT_REQUIRED' | 'REQUIRED' | 'SUBMITTED' | 'APPROVED';
  };
  status: RefillStatus;
  urgency: UrgencyLevel;
  blocker: BlockerDetails;
  owner: {
    name: string;
    role: string;
    organization: string;
  };
  ageFormatted: string;
  createdAt: string;
  lastUpdated: string;
  
  // Situation statements
  situationSummary: string;
  whatWeKnow: string[];
  whatIsMissing: string[];
  nextBestAction: RefillActionOption;
  availableActions: RefillActionOption[];

  // Journey & History
  journey: JourneyStep[];
  timeline: TimelineEvent[];
  patientCommunication: PatientCommunication;
  auditTrail: AuditEntry[];

  // Doctor Appointment & Bridge record
  appointment?: {
    date: string;
    time: string;
    type: string;
    provider: string;
    bridgeIssued: boolean;
    bridgeQuantity: number;
    status: 'CONFIRMED' | 'SCHEDULED' | 'COMPLETED';
  };
}
