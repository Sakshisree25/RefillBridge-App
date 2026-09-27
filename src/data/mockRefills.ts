import { RefillCase } from '../types/refill';

export const INITIAL_REFILLS: RefillCase[] = [
  {
    id: 'case-01',
    referenceNumber: 'RX-98214',
    medication: {
      name: 'Metformin HCl',
      strength: '500 mg ER',
      dosageForm: 'Oral Tablet Extended Release',
      sig: 'Take 1 tablet by mouth twice daily with meals',
      quantity: 60,
      daysSupply: 30,
      therapeuticClass: 'Biguanide Antidiabetic',
      ndc: '68180-0133-07',
      refillsRemainingOnRecord: 0
    },
    patient: {
      id: 'pt-101',
      name: 'Sarah Johnson',
      dob: '1974-06-14',
      age: 52,
      gender: 'Female',
      mrn: 'MRN-449102',
      phone: '(555) 382-9014',
      adherenceRate: 94,
      lastSeenDate: '4 months ago (Dr. Patel)',
      primaryCondition: 'Type 2 Diabetes Mellitus'
    },
    prescriber: {
      name: 'Dr. Anika Patel, MD',
      npi: '1922048821',
      practiceName: 'Northwest Endocrinology & Family Health',
      clinicLocation: 'Suite 400, Bellevue Medical Pavilion',
      specialty: 'Endocrinology / Primary Care',
      phone: '(555) 749-2100',
      assistant: 'Jessica Alvarez, CMA'
    },
    pharmacy: {
      name: 'CVS Pharmacy #4821',
      storeNumber: '4821',
      ncpdp: '4920192',
      address: '1042 116th Ave NE, Bellevue, WA 98004',
      phone: '(555) 454-8920',
      fax: '(555) 454-8921',
      contactPharmacist: 'Marcus Vance, PharmD'
    },
    insurance: {
      payerName: 'Premera Blue Cross Commercial',
      planType: 'PPO Tier 1',
      bin: '004336',
      pcn: 'ADV',
      rxGroup: 'RX6402',
      priorAuthStatus: 'NOT_REQUIRED'
    },
    status: 'BLOCKED',
    urgency: 'HIGH',
    blocker: {
      type: 'NO_REFILLS',
      title: 'Provider Authorization Required',
      badgeLabel: 'No refills remaining',
      reason: 'The previous prescription has 0 refills remaining on file. A new prescription renewal or electronic authorization from Dr. Patel is required before dispensing.',
      evidence: 'Previous Rx #449210-A written for 90 days with 3 refills expired on 2026-09-15.',
      confidence: 'High',
      whatTriggeredThis: 'Refill request submitted via CVS automated pharmacy switch; zero authorized refills detected in state PMP & local EHR sync.',
      whatIsRequired: 'Prescriber renewal authorization or newly signed e-prescription for Metformin 500mg ER #60.',
      whoCanResolve: 'Dr. Anika Patel or designated clinical triage staff with delegated refill protocol.',
      whatHappensAfter: 'Electronic authorization token dispatched to CVS NCPDP 4920192; prescription queued for automated fill & patient SMS dispatched.'
    },
    owner: {
      name: "Dr. Patel's Practice Staff",
      role: 'Clinical Triage Coordinator',
      organization: 'Northwest Endocrinology'
    },
    ageFormatted: '18h 24m',
    createdAt: '2026-09-26 10:32 AM',
    lastUpdated: '2026-09-27 04:56 AM',
    situationSummary: 'Refill cannot be fulfilled because the previous prescription has no remaining refills on record. Patient has 94% historical adherence and is within normal laboratory monitoring windows.',
    whatWeKnow: [
      'Active medication confirmed: Metformin HCl 500mg ER (twice daily)',
      'Patient identity verified via MRN-449102 & active pharmacy profile',
      'Electronic refill request received from CVS Pharmacy #4821',
      'Previous prescription located (0 refills remaining, expired Sept 15)',
      'Recent HbA1c (6.8%) recorded within acceptable 6-month clinical window'
    ],
    whatIsMissing: [
      'New electronic prescription authorization signed by Dr. Anika Patel'
    ],
    nextBestAction: {
      id: 'request_provider_review',
      label: 'Request Provider Review',
      description: 'Package clinical summary, medication history, and recent HbA1c lab into Dr. Patel’s priority refill queue for 1-click renewal.',
      consequence: 'Generates secure task in Dr. Patel’s EHR inbox with pre-populated renewal order and notifies patient that review is in progress.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'request_provider_review',
        label: 'Request Provider Review',
        description: 'Send 1-click renewal order with lab context to Dr. Patel.',
        consequence: 'Sends renewal packet to provider EHR; sets case to "Waiting on Provider".',
        primary: true,
        variant: 'primary'
      },
      {
        id: 'issue_bridge_refill',
        label: 'Issue 30-Day Emergency Bridge',
        description: 'Authorize an interim 30-day maintenance supply under protocol.',
        consequence: 'Allows pharmacy to dispense 30 tablets immediately while full renewal is scheduled.',
        variant: 'secondary'
      },
      {
        id: 'contact_pharmacy',
        label: 'Message CVS Pharmacy #4821',
        description: 'Notify pharmacy that renewal is actively being processed.',
        consequence: 'Prevents pharmacy from auto-canceling or marking order as expired.',
        variant: 'secondary'
      },
      {
        id: 'mark_resolved',
        label: 'Mark as Resolved',
        description: 'Record external telephone or manual eRx authorization.',
        consequence: 'Closes case and archives to completed ledger.',
        variant: 'success'
      }
    ],
    journey: [
      {
        id: 'j-01',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'Sarah Johnson',
        actor: 'Sarah Johnson (Patient)',
        role: 'Patient',
        timestamp: 'Sep 26, 09:14 AM',
        status: 'COMPLETED',
        summary: 'Patient submitted refill request via CVS mobile application.',
        whatHappened: 'Patient tapped 1-touch refill on CVS app for standard 30-day supply.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'CVS Mobile Consumer Gateway',
        systemId: 'MSG-88412'
      },
      {
        id: 'j-02',
        stage: 'PHARMACY_INTAKE',
        label: 'Pharmacy Intake',
        sublabel: 'CVS #4821',
        actor: 'CVS Pharmacy #4821',
        role: 'Dispensing Pharmacy',
        timestamp: 'Sep 26, 09:17 AM',
        status: 'COMPLETED',
        summary: 'Pharmacy checked remaining refills; detected 0 remaining.',
        whatHappened: 'Pharmacy switch queried local prescription records and Surescripts network.',
        whatIsMissing: 'Authorized refills exhausted.',
        nextAction: 'Route request to prescriber practice.',
        sourceSystem: 'CVS Pharmacy Management System (Enterprise)',
        systemId: 'RX-NCPDP-4821'
      },
      {
        id: 'j-03',
        stage: 'PROVIDER_REVIEW',
        label: 'Provider Action',
        sublabel: 'Dr. Patel',
        actor: 'Dr. Anika Patel',
        role: 'Prescribing Physician',
        timestamp: 'Sep 26, 10:32 AM',
        status: 'BLOCKED',
        summary: 'Refill blocked: Provider authorization required.',
        whatHappened: 'Automated fax/e-refill failed to match auto-approval rules due to zero remaining refills.',
        whatIsMissing: 'Physician signature / renewed prescription.',
        nextAction: 'Send clinical review packet to Dr. Patel.',
        sourceSystem: 'RxRelay Operational Intelligence',
        systemId: 'BLOCK-092'
      },
      {
        id: 'j-04',
        stage: 'PRACTICE_STAFF',
        label: 'Practice Staff',
        sublabel: 'Maya Rao',
        actor: 'Maya Rao',
        role: 'Clinical Operations Staff',
        timestamp: 'Sep 27, 04:56 AM',
        status: 'ACTIVE',
        summary: 'Case assigned to practice coordinator for active resolution.',
        whatHappened: 'Triage engine routed stuck refill to Maya Rao with prioritized context.',
        whatIsMissing: 'Staff execution of next best action.',
        nextAction: 'Dispatch provider review packet.',
        sourceSystem: 'RxRelay Triage Engine',
        systemId: 'TRG-4401'
      },
      {
        id: 'j-05',
        stage: 'INSURANCE_PBM',
        label: 'Insurance / PBM',
        sublabel: 'Premera Blue Cross',
        actor: 'Premera PBM Switch',
        role: 'Payer Benefit Manager',
        timestamp: 'Pending',
        status: 'WAITING',
        summary: 'Claim eligibility verified; awaiting new prescription claim submission.',
        whatHappened: 'Formulary Tier 1 co-pay verified ($0 copay for generic Metformin ER).',
        whatIsMissing: null,
        nextAction: 'Adjudicate upon eRx dispatch.',
        sourceSystem: 'Change Healthcare Clearinghouse',
        systemId: 'PBM-CHK-01'
      },
      {
        id: 'j-06',
        stage: 'PHARMACY_DISPENSE',
        label: 'Pharmacy Fulfillment',
        sublabel: 'CVS #4821',
        actor: 'CVS Dispensing Lab',
        role: 'Dispensing Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Awaiting electronic renewal transmission to queue pill count.',
        whatHappened: 'Prescription holding in pending queue.',
        whatIsMissing: 'Signed eRx token.',
        nextAction: 'Fill and label medication.',
        sourceSystem: 'CVS Pharmacy Dispensing Queue',
        systemId: 'DSP-PEND'
      },
      {
        id: 'j-07',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Medication in Hand',
        actor: 'Sarah Johnson',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Medication ready for pickup or courier delivery.',
        whatHappened: 'Workflow incomplete.',
        whatIsMissing: 'Dispense verification.',
        nextAction: 'Notify patient of ready status.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-01'
      }
    ],
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2026-09-26 09:14 AM',
        timeAgo: '19h ago',
        actor: 'Sarah Johnson',
        role: 'Patient',
        system: 'CVS Mobile App',
        title: 'Refill Request Initiated',
        description: 'Patient requested refill for Metformin HCl 500mg ER 30-day supply.',
        category: 'intake'
      },
      {
        id: 'tl-2',
        timestamp: '2026-09-26 09:17 AM',
        timeAgo: '19h ago',
        actor: 'CVS Pharmacy #4821',
        role: 'Dispensing Pharmacy',
        system: 'CVS Enterprise',
        title: 'Prescription Evaluated: 0 Refills Remaining',
        description: 'Automated prescription check identified that prior authorization/refills are exhausted.',
        category: 'verification'
      },
      {
        id: 'tl-3',
        timestamp: '2026-09-26 09:22 AM',
        timeAgo: '19h ago',
        actor: 'Surescripts Network',
        role: 'Interoperability Switch',
        system: 'Surescripts e-Refill',
        title: 'Refill Request Routed to Clinic EHR',
        description: 'Refill request packet transmitted to Northwest Endocrinology EHR gateway.',
        category: 'intake'
      },
      {
        id: 'tl-4',
        timestamp: '2026-09-26 10:32 AM',
        timeAgo: '18h ago',
        actor: 'RxRelay Orchestrator',
        role: 'Operational Engine',
        system: 'RefillBridge Rules Core',
        title: 'Blocker Detected: Provider Action Required',
        description: 'Identified that renewal requires provider electronic signature. Patient is clinically stable with HbA1c 6.8% recorded 4 months ago.',
        category: 'blocker_detected'
      },
      {
        id: 'tl-5',
        timestamp: '2026-09-26 10:35 AM',
        timeAgo: '18h ago',
        actor: 'RefillBridge Patient Messaging',
        role: 'Automated Patient Bridge',
        system: 'Twilio Healthcare SMS',
        title: 'Automated Patient Transparency SMS Sent',
        description: 'Sent SMS: "Hi Sarah, your Metformin refill is currently being reviewed by Dr. Patel\'s care team. We will notify you once approved."',
        category: 'patient_notice'
      },
      {
        id: 'tl-6',
        timestamp: '2026-09-27 04:56 AM',
        timeAgo: 'Just now',
        actor: 'Maya Rao',
        role: 'Practice Staff',
        system: 'RefillBridge Operations Workspace',
        title: 'Case Prioritized in Morning Resolution Queue',
        description: 'Case surfaced as High Urgency due to wait time > 18 hours.',
        category: 'staff_action'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Your refill request is being reviewed by Dr. Patel’s care team.',
      lastSentAt: 'Yesterday at 10:35 AM via SMS',
      deliveryChannel: 'SMS',
      nextExpectedStep: 'Provider electronic signature approval (est. today before 12:00 PM)',
      previewMessage: 'RefillBridge Update: Dr. Patel’s care team is currently reviewing your Metformin 500mg refill. We are coordinating directly with CVS Pharmacy #4821. You will receive a text as soon as it is approved.'
    },
    auditTrail: [
      {
        id: 'aud-1',
        timestamp: '2026-09-26 09:17 AM',
        actor: 'CVS Interop System',
        role: 'External Pharmacy',
        action: 'Transmitted Electronic Refill Request',
        source: 'Surescripts Gateway NCPDP 10.6',
        result: 'Success (Refills: 0)'
      },
      {
        id: 'aud-2',
        timestamp: '2026-09-26 10:32 AM',
        actor: 'RxRelay Triage Bot',
        role: 'Automated Orchestrator',
        action: 'Classified Refill Blocker',
        source: 'EHR Chart Audit Engine',
        result: 'Blocker: NO_REFILLS (High Confidence)'
      },
      {
        id: 'aud-3',
        timestamp: '2026-09-27 04:56 AM',
        actor: 'Maya Rao',
        role: 'Practice Operations Coordinator',
        action: 'Opened Refill Case Workspace',
        source: 'RxRelay Web App (Encrypted Session)',
        result: 'Viewed Case Record'
      }
    ]
  },
  {
    id: 'case-02',
    referenceNumber: 'RX-98215',
    medication: {
      name: 'Lisinopril',
      strength: '20 mg',
      dosageForm: 'Oral Tablet',
      sig: 'Take 1 tablet daily every morning',
      quantity: 90,
      daysSupply: 90,
      therapeuticClass: 'ACE Inhibitor (Antihypertensive)',
      ndc: '00093-0130-98',
      refillsRemainingOnRecord: 0
    },
    patient: {
      id: 'pt-102',
      name: 'David Kim',
      dob: '1968-11-20',
      age: 57,
      gender: 'Male',
      mrn: 'MRN-330192',
      phone: '(555) 791-4402',
      adherenceRate: 88,
      lastSeenDate: '14 months ago (Overdue)',
      primaryCondition: 'Essential Hypertension'
    },
    prescriber: {
      name: 'Dr. Marcus Thorne, MD',
      npi: '1482093318',
      practiceName: 'Cedar Grove Internal Medicine',
      clinicLocation: 'Building B, Seattle Health Center',
      specialty: 'Internal Medicine',
      phone: '(555) 329-8800',
      assistant: 'Carlos Ortiz, RN'
    },
    pharmacy: {
      name: 'Walgreens Pharmacy #10402',
      storeNumber: '10402',
      ncpdp: '5019241',
      address: '4200 SW Alaska St, Seattle, WA 98116',
      phone: '(555) 937-2910',
      fax: '(555) 937-2911',
      contactPharmacist: 'Elena Rostova, PharmD'
    },
    insurance: {
      payerName: 'Aetna Open Choice PPO',
      planType: 'Commercial Tier 1',
      bin: '610502',
      pcn: 'AET',
      rxGroup: 'AET77',
      priorAuthStatus: 'NOT_REQUIRED'
    },
    status: 'BLOCKED',
    urgency: 'HIGH',
    blocker: {
      type: 'VISIT_REQUIRED',
      title: 'Clinical Visit & BP Check Overdue',
      badgeLabel: 'Visit required (14mo)',
      reason: 'Practice clinical policy requires an annual blood pressure evaluation and basic metabolic panel for ongoing ACE inhibitor therapy. Last in-clinic encounter was 14 months ago.',
      evidence: 'EHR encounter log shows last visit August 2025. Practice protocol requires <= 12 months for antihypertensives.',
      confidence: 'High',
      whatTriggeredThis: 'Refill automated intake checked provider care guidelines; overdue visit flagged.',
      whatIsRequired: 'Schedule follow-up clinic or telehealth visit; authorize a 30-day bridge refill to prevent medication discontinuation.',
      whoCanResolve: 'Practice triage nurse or clinical staff.',
      whatHappensAfter: 'Dispatches 30-day bridge to Walgreens and sends online scheduling link to patient.'
    },
    owner: {
      name: 'Maya Rao',
      role: 'Clinical Triage Coordinator',
      organization: 'Cedar Grove Internal Medicine'
    },
    ageFormatted: '22h 10m',
    createdAt: '2026-09-26 06:45 AM',
    lastUpdated: '2026-09-27 03:15 AM',
    situationSummary: 'Patient requires ongoing blood pressure management, but annual clinical visit is overdue (14 months). Requires a 30-day safety bridge while scheduling follow-up.',
    whatWeKnow: [
      'Lisinopril 20mg daily for essential hypertension',
      'Patient has not had an in-person or telehealth visit since Aug 2025',
      'Stopping antihypertensive abruptly poses rebound hypertensive risk',
      'Standard protocol authorizes 30-day bridge refill contingent on booking appointment'
    ],
    whatIsMissing: [
      'Scheduled patient follow-up appointment',
      'Protocol-approved 30-day bridge authorization'
    ],
    nextBestAction: {
      id: 'issue_bridge_and_schedule',
      label: 'Authorize 30-Day Bridge + Send Visit Link',
      description: 'Authorize an immediate 30-day bridge refill to Walgreens #10402 and send patient an SMS with 1-click visit booking.',
      consequence: 'Prevents therapy disruption; fulfills clinical safety guidelines.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'issue_bridge_and_schedule',
        label: 'Authorize 30-Day Bridge + Send Visit Link',
        description: 'Authorize 30-day bridge supply and text scheduling link.',
        consequence: 'Sends 30-day eRx bridge to Walgreens and texts patient scheduling link.',
        primary: true,
        variant: 'primary'
      },
      {
        id: 'request_provider_review',
        label: 'Escalate to Dr. Thorne',
        description: 'Ask physician if 90-day refill can be waived without visit.',
        consequence: 'Sends high-priority message to Dr. Thorne’s inbox.',
        variant: 'secondary'
      }
    ],
    journey: [
      {
        id: 'j-21',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'David Kim',
        actor: 'David Kim',
        role: 'Patient',
        timestamp: 'Sep 26, 06:40 AM',
        status: 'COMPLETED',
        summary: 'Patient requested refill at Walgreens.',
        whatHappened: 'Patient called Walgreens IVR for automated refill.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Walgreens IVR',
        systemId: 'IVR-3991'
      },
      {
        id: 'j-22',
        stage: 'PHARMACY_INTAKE',
        label: 'Pharmacy Intake',
        sublabel: 'Walgreens #10402',
        actor: 'Walgreens Pharmacy',
        role: 'Pharmacy',
        timestamp: 'Sep 26, 06:45 AM',
        status: 'COMPLETED',
        summary: 'Refill request submitted electronically to clinic.',
        whatHappened: 'Pharmacy verified patient insurance and sent e-refill notice.',
        whatIsMissing: 'Refills remaining: 0.',
        nextAction: 'Clinic approval.',
        sourceSystem: 'Walgreens Interop',
        systemId: 'WALG-481'
      },
      {
        id: 'j-23',
        stage: 'PROVIDER_REVIEW',
        label: 'Clinic Protocol Check',
        sublabel: 'Overdue Visit',
        actor: 'Clinical Triage Rules',
        role: 'Clinical Protocol',
        timestamp: 'Sep 26, 07:15 AM',
        status: 'BLOCKED',
        summary: 'Safety rule: Visit overdue > 12 months for ACE inhibitor.',
        whatHappened: 'Safety protocol paused auto-approval due to 14 months since last BP reading.',
        whatIsMissing: 'Annual checkup / lab review.',
        nextAction: '30-day bridge + schedule appointment.',
        sourceSystem: 'RxRelay Safety Rules',
        systemId: 'RULE-ACE-12M'
      },
      {
        id: 'j-24',
        stage: 'PRACTICE_STAFF',
        label: 'Practice Staff',
        sublabel: 'Maya Rao',
        actor: 'Maya Rao',
        role: 'Care Coordinator',
        timestamp: 'Sep 27, 03:15 AM',
        status: 'ACTIVE',
        summary: 'Reviewing bridge protocol.',
        whatHappened: 'Awaiting Maya Rao execution of bridge authorization.',
        whatIsMissing: 'Staff click to dispatch bridge.',
        nextAction: 'Execute bridge protocol.',
        sourceSystem: 'RxRelay Queue',
        systemId: 'ACT-901'
      },
      {
        id: 'j-25',
        stage: 'INSURANCE_PBM',
        label: 'Insurance / PBM',
        sublabel: 'Aetna',
        actor: 'Aetna PBM',
        role: 'Payer',
        timestamp: 'Pending',
        status: 'WAITING',
        summary: '30-day claim pre-verified ($4 copay).',
        whatHappened: 'Formulary check completed.',
        whatIsMissing: null,
        nextAction: 'Adjudicate upon fill.',
        sourceSystem: 'Aetna Claims',
        systemId: 'AET-CLM'
      },
      {
        id: 'j-26',
        stage: 'PHARMACY_DISPENSE',
        label: 'Pharmacy Dispense',
        sublabel: 'Walgreens #10402',
        actor: 'Walgreens Pharmacy',
        role: 'Dispensing Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Awaiting bridge order.',
        whatHappened: 'Ready to label.',
        whatIsMissing: 'Order token.',
        nextAction: 'Fill 30 tablets.',
        sourceSystem: 'Walgreens Dispensing',
        systemId: 'WLG-FILL'
      },
      {
        id: 'j-27',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Patient Safe',
        actor: 'David Kim',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Bridge dispensed & appointment booked.',
        whatHappened: 'Pending staff action.',
        whatIsMissing: 'Bridge execution.',
        nextAction: 'Complete workflow.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-02'
      }
    ],
    timeline: [
      {
        id: 'tl-201',
        timestamp: '2026-09-26 06:40 AM',
        timeAgo: '22h ago',
        actor: 'David Kim',
        role: 'Patient',
        system: 'Walgreens Phone IVR',
        title: 'Refill Request Received',
        description: 'Patient requested refill for Lisinopril 20mg.',
        category: 'intake'
      },
      {
        id: 'tl-202',
        timestamp: '2026-09-26 07:15 AM',
        timeAgo: '21h ago',
        actor: 'RxRelay Protocol Engine',
        role: 'Safety Validator',
        system: 'Protocol Evaluator',
        title: 'Blocker Triggered: Annual Visit Overdue',
        description: 'Patient is 62 days past recommended 12-month blood pressure review window.',
        category: 'blocker_detected'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Your care team is preparing a 30-day bridge refill and appointment request.',
      lastSentAt: 'Sep 26 at 07:30 AM via SMS',
      deliveryChannel: 'SMS',
      nextExpectedStep: '30-day bridge delivery to Walgreens + visit link sent to phone.',
      previewMessage: 'Cedar Grove Med: Hello David, Dr. Thorne’s office is preparing a 30-day supply of Lisinopril so you don’t run out. Because it has been over a year since your last visit, we will also text you a link to choose a quick check-in time.'
    },
    auditTrail: [
      {
        id: 'aud-201',
        timestamp: '2026-09-26 07:15 AM',
        actor: 'System Protocol',
        role: 'Engine',
        action: 'Flagged Overdue Chronic Care Visit',
        source: 'EHR Scheduling Interop',
        result: 'Triggered Bridge Refill Protocol'
      }
    ]
  },
  {
    id: 'case-03',
    referenceNumber: 'RX-98216',
    medication: {
      name: 'Atorvastatin Calcium',
      strength: '40 mg',
      dosageForm: 'Oral Tablet',
      sig: 'Take 1 tablet by mouth daily at bedtime',
      quantity: 90,
      daysSupply: 90,
      therapeuticClass: 'HMG-CoA Reductase Inhibitor (Statin)',
      ndc: '00071-0156-23',
      refillsRemainingOnRecord: 2
    },
    patient: {
      id: 'pt-103',
      name: 'Elena Rostova',
      dob: '1981-03-29',
      age: 45,
      gender: 'Female',
      mrn: 'MRN-781044',
      phone: '(555) 604-1829',
      adherenceRate: 96,
      lastSeenDate: '2 months ago (Dr. Patel)',
      primaryCondition: 'Hypercholesterolemia'
    },
    prescriber: {
      name: 'Dr. Anika Patel, MD',
      npi: '1922048821',
      practiceName: 'Northwest Endocrinology & Family Health',
      clinicLocation: 'Suite 400, Bellevue Medical Pavilion',
      specialty: 'Endocrinology / Primary Care',
      phone: '(555) 749-2100',
      assistant: 'Jessica Alvarez, CMA'
    },
    pharmacy: {
      name: 'Costco Pharmacy #114',
      storeNumber: '114',
      ncpdp: '4911029',
      address: '8629 120th Ave NE, Kirkland, WA 98033',
      phone: '(555) 822-4910',
      fax: '(555) 822-4911',
      contactPharmacist: 'Brian O’Connell, RPh'
    },
    insurance: {
      payerName: 'Regence BlueShield',
      planType: 'HMO Gold',
      bin: '011552',
      pcn: 'REG',
      rxGroup: 'REG10',
      priorAuthStatus: 'NOT_REQUIRED'
    },
    status: 'NEEDS_ACTION',
    urgency: 'MEDIUM',
    blocker: {
      type: 'UNCLEAR_PRESCRIPTION',
      title: 'Dosing Instructions Sig Mismatch',
      badgeLabel: 'Unclear Sig format',
      reason: 'Pharmacy e-switch received conflicting instructions: EHR note states 40mg once daily at bedtime, but e-refill field truncated to "Take 1 tablet daily... [unspecified timing]". Clarification needed before pharmacist verification.',
      evidence: 'Surescripts transaction 48201-B payload shows truncated string in field 511-SR.',
      confidence: 'High',
      whatTriggeredThis: 'Costco pharmacist flagged incomplete sig instruction during electronic verification.',
      whatIsRequired: 'Resend verified Surescripts renewal with full standard Sig: "Take 1 tablet daily at bedtime".',
      whoCanResolve: 'Practice triage staff or medical assistant.',
      whatHappensAfter: 'Clarified script updates Costco dispensing queue immediately.'
    },
    owner: {
      name: 'Maya Rao',
      role: 'Clinical Operations Coordinator',
      organization: 'Northwest Endocrinology'
    },
    ageFormatted: '6h 15m',
    createdAt: '2026-09-26 10:40 PM',
    lastUpdated: '2026-09-27 04:55 AM',
    situationSummary: 'Pharmacy intake paused due to a truncated electronic Sig string. Prescriber chart confirms standard bedtime dosing. One click sends verified sig packet.',
    whatWeKnow: [
      'Prescription is active with 2 remaining refills',
      'Dr. Patel charted 40mg daily at bedtime on July 14',
      'Surescripts payload had truncation in dosage timing tag'
    ],
    whatIsMissing: [
      'Clean re-transmission of full electronic Sig to Costco Pharmacy'
    ],
    nextBestAction: {
      id: 'resend_verified_sig',
      label: 'Send Sig Clarification to Costco',
      description: 'Push verified electronic Sig ("Take 1 tablet daily at bedtime") directly to Costco Pharmacy #114 dispensing portal.',
      consequence: 'Immediately clears pharmacist hold; moves case to Pharmacy Dispense.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'resend_verified_sig',
        label: 'Send Sig Clarification to Costco',
        description: 'Push verified Sig to pharmacy switch.',
        consequence: 'Updates pharmacy queue with exact prescriber sig.',
        primary: true,
        variant: 'primary'
      }
    ],
    journey: [
      {
        id: 'j-31',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'Elena Rostova',
        actor: 'Elena Rostova',
        role: 'Patient',
        timestamp: 'Sep 26, 10:30 PM',
        status: 'COMPLETED',
        summary: 'Refill requested via Costco member portal.',
        whatHappened: 'Patient requested refill.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Costco Portal',
        systemId: 'CST-01'
      },
      {
        id: 'j-32',
        stage: 'PHARMACY_INTAKE',
        label: 'Pharmacy Hold',
        sublabel: 'Costco #114',
        actor: 'Brian O’Connell, RPh',
        role: 'Pharmacist',
        timestamp: 'Sep 26, 10:40 PM',
        status: 'BLOCKED',
        summary: 'Sig string truncated in transmission.',
        whatHappened: 'Pharmacist flagged missing bedtime directive.',
        whatIsMissing: 'Clean sig string.',
        nextAction: 'Clarification from clinic.',
        sourceSystem: 'Costco Dispensing System',
        systemId: 'CST-SIG-HLD'
      },
      {
        id: 'j-33',
        stage: 'PRACTICE_STAFF',
        label: 'Practice Action',
        sublabel: 'Maya Rao',
        actor: 'Maya Rao',
        role: 'Operations Coordinator',
        timestamp: 'Sep 27, 04:55 AM',
        status: 'ACTIVE',
        summary: 'Awaiting 1-click sig confirmation.',
        whatHappened: 'EHR charted sig confirmed from Dr. Patel encounter note.',
        whatIsMissing: 'Transmission to pharmacy.',
        nextAction: 'Click Send Sig Clarification.',
        sourceSystem: 'RxRelay Control Center',
        systemId: 'RR-ACT'
      },
      {
        id: 'j-34',
        stage: 'PHARMACY_DISPENSE',
        label: 'Pharmacy Dispense',
        sublabel: 'Costco #114',
        actor: 'Costco Dispensing',
        role: 'Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Waiting on sig update.',
        whatHappened: 'Awaiting transmission.',
        whatIsMissing: 'Sig packet.',
        nextAction: 'Fill 90 tablets.',
        sourceSystem: 'Costco Dispensing',
        systemId: 'CST-DSP'
      },
      {
        id: 'j-35',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Ready for Pickup',
        actor: 'Elena Rostova',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Complete.',
        whatHappened: 'Pending.',
        whatIsMissing: 'Dispense verification.',
        nextAction: 'Ready notification.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-03'
      }
    ],
    timeline: [
      {
        id: 'tl-301',
        timestamp: '2026-09-26 10:30 PM',
        timeAgo: '6h ago',
        actor: 'Elena Rostova',
        role: 'Patient',
        system: 'Costco Portal',
        title: 'Refill Requested',
        description: 'Elena submitted request for Atorvastatin 40mg #90.',
        category: 'intake'
      },
      {
        id: 'tl-302',
        timestamp: '2026-09-26 10:40 PM',
        timeAgo: '6h ago',
        actor: 'Brian O’Connell, RPh',
        role: 'Pharmacist',
        system: 'Costco Pharmacy',
        title: 'Pharmacist Verification Hold: Truncated Sig',
        description: 'Pharmacist flagged missing timing in electronic transmission. Charted record shows "daily at bedtime".',
        category: 'blocker_detected'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Costco Pharmacy has your request; our clinic is clarifying your exact dosage instructions.',
      lastSentAt: 'Sep 26 at 11:00 PM via Portal',
      deliveryChannel: 'PATIENT_PORTAL',
      nextExpectedStep: 'Instructions sent this morning; prescription filled by Costco Kirkland.',
      previewMessage: 'RxRelay Notice: We are updating your Atorvastatin instructions with Costco Kirkland to ensure exact directions. No action is required from you.'
    },
    auditTrail: [
      {
        id: 'aud-301',
        timestamp: '2026-09-26 10:40 PM',
        actor: 'Costco Interop Bridge',
        role: 'Pharmacy',
        action: 'Logged NCPDP Clarification Request',
        source: 'Surescripts Change Request',
        result: 'Sig Mismatch Flagged'
      }
    ]
  },
  {
    id: 'case-04',
    referenceNumber: 'RX-98217',
    medication: {
      name: 'Ozempic (Semaglutide)',
      strength: '1 mg/dose (4 mg/3 mL pen)',
      dosageForm: 'Subcutaneous Pen Injector',
      sig: 'Inject 1 mg subcutaneously once weekly on the same day each week',
      quantity: 1,
      daysSupply: 28,
      therapeuticClass: 'GLP-1 Receptor Agonist',
      ndc: '00169-4130-13',
      refillsRemainingOnRecord: 1
    },
    patient: {
      id: 'pt-104',
      name: 'Marcus Vance',
      dob: '1965-08-12',
      age: 61,
      gender: 'Male',
      mrn: 'MRN-902341',
      phone: '(555) 412-8873',
      adherenceRate: 98,
      lastSeenDate: '1 month ago (Dr. Patel)',
      primaryCondition: 'Type 2 Diabetes Mellitus with Cardiovascular Risk'
    },
    prescriber: {
      name: 'Dr. Anika Patel, MD',
      npi: '1922048821',
      practiceName: 'Northwest Endocrinology & Family Health',
      clinicLocation: 'Suite 400, Bellevue Medical Pavilion',
      specialty: 'Endocrinology',
      phone: '(555) 749-2100',
      assistant: 'Jessica Alvarez, CMA'
    },
    pharmacy: {
      name: 'Kroger / QFC Pharmacy #841',
      storeNumber: '841',
      ncpdp: '4982140',
      address: '10116 NE 8th St, Bellevue, WA 98004',
      phone: '(555) 646-3200',
      fax: '(555) 646-3201',
      contactPharmacist: 'Karen Chen, PharmD'
    },
    insurance: {
      payerName: 'OptumRx / UnitedHealthcare',
      planType: 'Choice Plus Commercial',
      bin: '610011',
      pcn: 'CT',
      rxGroup: 'UHC90',
      priorAuthStatus: 'REQUIRED'
    },
    status: 'BLOCKED',
    urgency: 'CRITICAL',
    blocker: {
      type: 'INSURANCE_PA',
      title: 'Annual Prior Authorization Renewal Required',
      badgeLabel: 'Prior Auth Expired',
      reason: 'PBM insurance rejected claim with NCPDP Reject 75: Prior Authorization Required. The patient’s previous 12-month PA expired on Sept 20, 2026. Coverage requires updated chart notes documenting continuous T2D diagnosis, prior Metformin trial, and current A1c.',
      evidence: 'OptumRx claim transaction return code 75 (Prior Authorization Expired Sept 20, 2026).',
      confidence: 'High',
      whatTriggeredThis: 'Pharmacy claim submission rejected at clearinghouse level.',
      whatIsRequired: 'Submit electronic PA renewal via CoverMyMeds integration using pre-extracted clinical parameters from recent encounter.',
      whoCanResolve: 'Practice administrative/prior auth specialist or triage staff.',
      whatHappensAfter: 'Expedited electronic PA response (average turnaround 2–4 hours); unlocks insurance coverage and copay discount.'
    },
    owner: {
      name: 'Jessica Alvarez, CMA',
      role: 'Prior Authorization Coordinator',
      organization: 'Northwest Endocrinology'
    },
    ageFormatted: '31h 45m',
    createdAt: '2026-09-25 09:10 PM',
    lastUpdated: '2026-09-27 04:30 AM',
    situationSummary: 'Refill blocked by OptumRx claim rejection (PA expired Sept 20). Patient has proven T2D indication, past Metformin adherence, and current lab results ready for instant CoverMyMeds submission.',
    whatWeKnow: [
      'Patient has active prescription with 1 refill remaining',
      'PBM rejected claim due to expired annual prior authorization',
      'Recent clinical note (August 2026) contains all required diagnostic criteria: ICD-10 E11.9, baseline A1c 8.2%, current A1c 6.9%',
      'CoverMyMeds ePA form pre-populated with 100% required fields'
    ],
    whatIsMissing: [
      'Submission and sign-off on CoverMyMeds renewal packet'
    ],
    nextBestAction: {
      id: 'submit_covermymeds_pa',
      label: 'Submit Expedited CoverMyMeds PA',
      description: 'Transmit pre-compiled clinical justification packet directly to OptumRx electronic PA gateway.',
      consequence: 'Initiates immediate electronic review with insurer; notifies pharmacy to keep inventory reserved.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'submit_covermymeds_pa',
        label: 'Submit Expedited CoverMyMeds PA',
        description: 'Submit pre-populated prior authorization.',
        consequence: 'Dispatches ePA packet to OptumRx; updates status to Waiting on PBM.',
        primary: true,
        variant: 'primary'
      },
      {
        id: 'contact_pharmacy',
        label: 'Request Pharmacy Inventory Hold',
        description: 'Alert Kroger Pharmacy #841 to reserve Ozempic pen while PA processes.',
        consequence: 'Prevents allocation to another patient during nationwide stock sensitivity.',
        variant: 'secondary'
      }
    ],
    journey: [
      {
        id: 'j-41',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'Marcus Vance',
        actor: 'Marcus Vance',
        role: 'Patient',
        timestamp: 'Sep 25, 08:50 PM',
        status: 'COMPLETED',
        summary: 'Requested refill via pharmacy automated phone line.',
        whatHappened: 'Refill requested.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'QFC IVR',
        systemId: 'QFC-902'
      },
      {
        id: 'j-42',
        stage: 'PHARMACY_INTAKE',
        label: 'Pharmacy Intake',
        sublabel: 'QFC #841',
        actor: 'QFC Pharmacy #841',
        role: 'Pharmacy',
        timestamp: 'Sep 25, 09:05 PM',
        status: 'COMPLETED',
        summary: 'Processed prescription against active file.',
        whatHappened: 'Prescription matched; submitted claim to OptumRx.',
        whatIsMissing: null,
        nextAction: 'Await claim adjudication.',
        sourceSystem: 'QFC Enterprise Rx',
        systemId: 'QFC-CLM'
      },
      {
        id: 'j-43',
        stage: 'INSURANCE_PBM',
        label: 'PBM Insurance Rejection',
        sublabel: 'OptumRx',
        actor: 'OptumRx Claim Engine',
        role: 'PBM',
        timestamp: 'Sep 25, 09:10 PM',
        status: 'BLOCKED',
        summary: 'NCPDP Reject 75: Prior Auth Expired.',
        whatHappened: 'Annual authorization expired Sept 20, 2026.',
        whatIsMissing: 'Updated clinical renewal form.',
        nextAction: 'Submit CoverMyMeds ePA.',
        sourceSystem: 'OptumRx Claims Gateway',
        systemId: 'OPT-REJ-75'
      },
      {
        id: 'j-44',
        stage: 'PRACTICE_STAFF',
        label: 'Practice PA Triage',
        sublabel: 'Jessica Alvarez',
        actor: 'Jessica Alvarez, CMA',
        role: 'PA Specialist',
        timestamp: 'Sep 27, 04:30 AM',
        status: 'ACTIVE',
        summary: 'Pre-populated ePA form ready for 1-click submission.',
        whatHappened: 'RxRelay extracted diagnosis and lab history into ePA form.',
        whatIsMissing: 'Staff click to submit.',
        nextAction: 'Submit CoverMyMeds PA.',
        sourceSystem: 'RxRelay Prior Auth Assistant',
        systemId: 'PA-PREP'
      },
      {
        id: 'j-45',
        stage: 'PHARMACY_DISPENSE',
        label: 'Pharmacy Fulfillment',
        sublabel: 'QFC #841',
        actor: 'QFC Pharmacy',
        role: 'Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Awaiting PA approval for paid adjudication.',
        whatHappened: 'Inventory on hold.',
        whatIsMissing: 'PA approval token.',
        nextAction: 'Dispense Ozempic pen.',
        sourceSystem: 'QFC Rx',
        systemId: 'QFC-DISP'
      },
      {
        id: 'j-46',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Medication Dispensed',
        actor: 'Marcus Vance',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Completed.',
        whatHappened: 'Pending approval.',
        whatIsMissing: 'Approval.',
        nextAction: 'Patient notification.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-04'
      }
    ],
    timeline: [
      {
        id: 'tl-401',
        timestamp: '2026-09-25 09:10 PM',
        timeAgo: '31h ago',
        actor: 'OptumRx Clearinghouse',
        role: 'Payer Clearinghouse',
        system: 'EDI 837 Claim Return',
        title: 'Claim Rejected: Reject Code 75 (Prior Auth Expired)',
        description: 'PBM insurance rejected automated fill request. Prior authorization expired on 2026-09-20.',
        category: 'blocker_detected'
      },
      {
        id: 'tl-402',
        timestamp: '2026-09-26 08:30 AM',
        timeAgo: '20h ago',
        actor: 'RxRelay PA Extractor',
        role: 'System Bot',
        system: 'Chart Extractor',
        title: 'Extracted PA Clinical Data from Encounter Notes',
        description: 'Auto-populated T2D diagnosis ICD-10 E11.9, prior Metformin failure, and most recent A1c of 6.9%.',
        category: 'verification'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Your health insurance requires an annual coverage renewal. Our clinic has prepared the documents and is submitting them directly to your insurer.',
      lastSentAt: 'Sep 26 at 09:00 AM via SMS',
      deliveryChannel: 'SMS',
      nextExpectedStep: 'Insurance determination response expected within 24–48 hours.',
      previewMessage: 'RxRelay Alert: Marcus, your insurance requires an updated annual form for Ozempic. Dr. Patel’s office has already compiled your records and is submitting it today. We will text you once approved.'
    },
    auditTrail: [
      {
        id: 'aud-401',
        timestamp: '2026-09-25 09:10 PM',
        actor: 'QFC Switch',
        role: 'Pharmacy',
        action: 'Relayed Insurance Reject 75',
        source: 'RelayHealth Payer Gateway',
        result: 'Logged Reject'
      }
    ]
  },
  {
    id: 'case-05',
    referenceNumber: 'RX-98218',
    medication: {
      name: 'Sertraline HCl',
      strength: '50 mg',
      dosageForm: 'Oral Tablet',
      sig: 'Take 1 tablet daily every morning',
      quantity: 30,
      daysSupply: 30,
      therapeuticClass: 'Selective Serotonin Reuptake Inhibitor (SSRI)',
      ndc: '00049-4960-66',
      refillsRemainingOnRecord: 0
    },
    patient: {
      id: 'pt-105',
      name: 'Chloe Bennett',
      dob: '1995-04-18',
      age: 31,
      gender: 'Female',
      mrn: 'MRN-552199',
      phone: '(555) 910-3321',
      adherenceRate: 92,
      lastSeenDate: '3 months ago (Dr. Thorne)',
      primaryCondition: 'Generalized Anxiety Disorder'
    },
    prescriber: {
      name: 'Dr. Marcus Thorne, MD',
      npi: '1482093318',
      practiceName: 'Cedar Grove Internal Medicine',
      clinicLocation: 'Building B, Seattle Health Center',
      specialty: 'Internal Medicine',
      phone: '(555) 329-8800',
      assistant: 'Carlos Ortiz, RN'
    },
    pharmacy: {
      name: 'Bartell Drugs #52',
      storeNumber: '52',
      ncpdp: '4901928',
      address: '2700 California Ave SW, Seattle, WA 98116',
      phone: '(555) 932-4410',
      fax: '(555) 932-4411',
      contactPharmacist: 'Hannah Nguyen, PharmD'
    },
    insurance: {
      payerName: 'Kaiser Permanente NW',
      planType: 'HMO Gold',
      bin: '003200',
      pcn: 'KP',
      rxGroup: 'KP101',
      priorAuthStatus: 'NOT_REQUIRED'
    },
    status: 'WAITING',
    urgency: 'HIGH',
    blocker: {
      type: 'PROVIDER_APPROVAL',
      title: 'Awaiting Provider E-Signature',
      badgeLabel: 'Waiting on Provider (14h)',
      reason: 'Refill review packet with titration history was submitted to Dr. Thorne’s EHR in-basket yesterday. Prescriber has not yet signed the 90-day renewal.',
      evidence: 'Submitted to Epic InBasket on 2026-09-26 02:15 PM.',
      confidence: 'High',
      whatTriggeredThis: 'No refills remaining; renewal packet delivered to provider queue.',
      whatIsRequired: 'Dr. Thorne review and sign; or triage nurse reminder escalation.',
      whoCanResolve: 'Dr. Marcus Thorne or Nurse Carlos Ortiz.',
      whatHappensAfter: 'Electronic signature immediately dispatches eRx to Bartell Drugs #52.'
    },
    owner: {
      name: 'Dr. Marcus Thorne, MD',
      role: 'Attending Physician',
      organization: 'Cedar Grove Internal Medicine'
    },
    ageFormatted: '14h 45m',
    createdAt: '2026-09-26 02:15 PM',
    lastUpdated: '2026-09-27 04:10 AM',
    situationSummary: 'Refill renewal packet is sitting in Dr. Thorne’s in-basket. Patient is within normal monitoring and had good tolerability on 50mg.',
    whatWeKnow: [
      'Renewal packet sent to Dr. Thorne 14 hours ago',
      'Patient reports good control and zero side effects on current 50mg dose',
      'Last visit was within 3 months (June 2026)'
    ],
    whatIsMissing: [
      'Dr. Thorne electronic signature approval'
    ],
    nextBestAction: {
      id: 'send_urgent_provider_nudge',
      label: 'Send Priority Reminder to Dr. Thorne',
      description: 'Nudge Dr. Thorne’s mobile care team app with a high-priority quick-sign prompt.',
      consequence: 'Promotes task to top of Dr. Thorne’s mobile rounding queue.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'send_urgent_provider_nudge',
        label: 'Send Priority Reminder to Dr. Thorne',
        description: 'Send quick-sign alert to provider mobile device.',
        consequence: 'Alerts physician directly for immediate sign-off.',
        primary: true,
        variant: 'primary'
      },
      {
        id: 'delegate_to_nurse',
        label: 'Route to Clinical Nurse Triage',
        description: 'Authorize Nurse Carlos Ortiz to sign under standing protocol.',
        consequence: 'Allows nurse review and immediate approval.',
        variant: 'secondary'
      }
    ],
    journey: [
      {
        id: 'j-51',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'Chloe Bennett',
        actor: 'Chloe Bennett',
        role: 'Patient',
        timestamp: 'Sep 26, 01:45 PM',
        status: 'COMPLETED',
        summary: 'Refill requested via Bartell Drugs phone.',
        whatHappened: 'Refill intake completed.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Bartell IVR',
        systemId: 'BAR-01'
      },
      {
        id: 'j-52',
        stage: 'PHARMACY_INTAKE',
        label: 'Pharmacy Intake',
        sublabel: 'Bartell #52',
        actor: 'Bartell Drugs',
        role: 'Pharmacy',
        timestamp: 'Sep 26, 02:00 PM',
        status: 'COMPLETED',
        summary: 'Sent e-refill renewal request to clinic.',
        whatHappened: '0 refills remaining; forwarded to EHR.',
        whatIsMissing: null,
        nextAction: 'Awaiting provider.',
        sourceSystem: 'Surescripts',
        systemId: 'SUR-551'
      },
      {
        id: 'j-53',
        stage: 'PROVIDER_REVIEW',
        label: 'Provider In-Basket',
        sublabel: 'Dr. Thorne',
        actor: 'Dr. Marcus Thorne',
        role: 'Physician',
        timestamp: 'Sep 26, 02:15 PM',
        status: 'ACTIVE',
        summary: 'Waiting in Dr. Thorne’s priority refill queue (14h).',
        whatHappened: 'Delivered to Epic InBasket.',
        whatIsMissing: 'Physician electronic signature.',
        nextAction: 'Physician click to sign.',
        sourceSystem: 'Epic InBasket',
        systemId: 'EPIC-IB-99'
      },
      {
        id: 'j-54',
        stage: 'PHARMACY_DISPENSE',
        label: 'Pharmacy Fulfillment',
        sublabel: 'Bartell #52',
        actor: 'Bartell Dispensing',
        role: 'Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Awaiting signed eRx.',
        whatHappened: 'Order ready for batch fill.',
        whatIsMissing: 'Signature.',
        nextAction: 'Dispense 30 tablets.',
        sourceSystem: 'Bartell Rx',
        systemId: 'BAR-DSP'
      },
      {
        id: 'j-55',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Ready for Pickup',
        actor: 'Chloe Bennett',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Complete.',
        whatHappened: 'Pending.',
        whatIsMissing: 'Dispense.',
        nextAction: 'Ready SMS.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-05'
      }
    ],
    timeline: [
      {
        id: 'tl-501',
        timestamp: '2026-09-26 02:15 PM',
        timeAgo: '14h ago',
        actor: 'Maya Rao',
        role: 'Practice Staff',
        system: 'RxRelay Orchestrator',
        title: 'Renewal Packet Forwarded to Dr. Thorne',
        description: 'Formatted and prioritized renewal packet sent to Dr. Thorne’s in-basket with historical anxiety score notes.',
        category: 'staff_action'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Your refill request is with Dr. Thorne for routine signature.',
      lastSentAt: 'Sep 26 at 02:20 PM via SMS',
      deliveryChannel: 'SMS',
      nextExpectedStep: 'Physician signature during morning clinic rounds.',
      previewMessage: 'Cedar Grove Med: Hello Chloe, your Sertraline renewal is in Dr. Thorne’s queue for signature today. We will alert you the moment it is dispatched to Bartell Drugs.'
    },
    auditTrail: [
      {
        id: 'aud-501',
        timestamp: '2026-09-26 02:15 PM',
        actor: 'Maya Rao',
        role: 'Staff Coordinator',
        action: 'Routed Refill to Provider Queue',
        source: 'RxRelay In-Basket Connector',
        result: 'Delivered'
      }
    ]
  },
  {
    id: 'case-06',
    referenceNumber: 'RX-98219',
    medication: {
      name: 'Albuterol Sulfate HFA',
      strength: '90 mcg/actuation',
      dosageForm: 'Metered Dose Inhaler (8.5 g)',
      sig: 'Inhale 1–2 puffs every 4–6 hours as needed for shortness of breath or wheezing',
      quantity: 1,
      daysSupply: 30,
      therapeuticClass: 'Short-Acting Beta-2 Agonist (Rescue Inhaler)',
      ndc: '59310-0579-22',
      refillsRemainingOnRecord: 1
    },
    patient: {
      id: 'pt-106',
      name: 'Robert Chen',
      dob: '1988-09-04',
      age: 38,
      gender: 'Male',
      mrn: 'MRN-819200',
      phone: '(555) 723-9912',
      adherenceRate: 85,
      lastSeenDate: '5 months ago (Dr. Patel)',
      primaryCondition: 'Moderate Persistent Asthma'
    },
    prescriber: {
      name: 'Dr. Anika Patel, MD',
      npi: '1922048821',
      practiceName: 'Northwest Endocrinology & Family Health',
      clinicLocation: 'Suite 400, Bellevue Medical Pavilion',
      specialty: 'Primary Care',
      phone: '(555) 749-2100',
      assistant: 'Jessica Alvarez, CMA'
    },
    pharmacy: {
      name: 'Walgreens Pharmacy #6281',
      storeNumber: '6281',
      ncpdp: '4928192',
      address: '15600 NE 8th St, Bellevue, WA 98008',
      phone: '(555) 746-1800',
      fax: '(555) 746-1801',
      contactPharmacist: 'Kevin Morales, RPh'
    },
    insurance: {
      payerName: 'Cigna Health and Life',
      planType: 'Open Access Plus',
      bin: '017010',
      pcn: 'CNG',
      rxGroup: 'CIG01',
      priorAuthStatus: 'NOT_REQUIRED'
    },
    status: 'NEEDS_ACTION',
    urgency: 'CRITICAL',
    blocker: {
      type: 'DUPLICATE_REQUEST',
      title: 'Potential Duplicate Pharmacy Claims Detected',
      badgeLabel: 'Duplicate Claims Hold',
      reason: 'Two separate refill requests received within a 3-hour window: one from Rite Aid #5190 and one from Walgreens #6281. Cigna insurance will reject simultaneous fills for "Refill Too Soon". Need to confirm patient’s intended dispensing pharmacy.',
      evidence: 'Surescripts switch received request from Rite Aid at 08:12 AM and Walgreens at 11:04 AM.',
      confidence: 'High',
      whatTriggeredThis: 'Multi-pharmacy claim collision caught by RxRelay cross-network listener.',
      whatIsRequired: 'Staff confirmation of intended pharmacy; cancel duplicate request to prevent insurance rejection.',
      whoCanResolve: 'Practice triage staff via 1-click patient SMS preference or direct call.',
      whatHappensAfter: 'Cancels secondary pharmacy hold; releases approved claim to chosen pharmacy immediately.'
    },
    owner: {
      name: 'Maya Rao',
      role: 'Clinical Operations Coordinator',
      organization: 'Northwest Endocrinology'
    },
    ageFormatted: '8h 20m',
    createdAt: '2026-09-26 11:04 AM',
    lastUpdated: '2026-09-27 04:40 AM',
    situationSummary: 'Patient submitted refill requests to two competing pharmacies. Needs single pharmacy confirmation so Cigna insurance can adjudicate without a "Refill Too Soon" reject.',
    whatWeKnow: [
      'Albuterol is a vital rescue medication (cannot be delayed)',
      'Patient has 1 authorized refill on record',
      'Walgreens is listed as primary preferred pharmacy in patient chart'
    ],
    whatIsMissing: [
      'Cancellation of Rite Aid duplicate request'
    ],
    nextBestAction: {
      id: 'confirm_walgreens_and_cancel_duplicate',
      label: 'Confirm Walgreens & Void Duplicate',
      description: 'Designate Walgreens #6281 as the dispensing pharmacy and send electronic void to Rite Aid #5190.',
      consequence: 'Prevents insurance claim conflict; sends instant green light to Walgreens.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'confirm_walgreens_and_cancel_duplicate',
        label: 'Confirm Walgreens & Void Duplicate',
        description: 'Designate Walgreens and cancel secondary request.',
        consequence: 'Resolves duplicate collision instantly.',
        primary: true,
        variant: 'primary'
      }
    ],
    journey: [
      {
        id: 'j-61',
        stage: 'PATIENT_REQUEST',
        label: 'Dual Ingestion',
        sublabel: 'Rite Aid + Walgreens',
        actor: 'Robert Chen',
        role: 'Patient',
        timestamp: 'Sep 26, 11:04 AM',
        status: 'COMPLETED',
        summary: 'Duplicate refill requests received.',
        whatHappened: 'Cross-network duplicate identified.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'RxRelay Switch Listener',
        systemId: 'DUP-DET-81'
      },
      {
        id: 'j-62',
        stage: 'PRACTICE_STAFF',
        label: 'Triage Intervention',
        sublabel: 'Maya Rao',
        actor: 'Maya Rao',
        role: 'Operations Coordinator',
        timestamp: 'Sep 27, 04:40 AM',
        status: 'ACTIVE',
        summary: 'Resolve pharmacy destination.',
        whatHappened: 'Awaiting Maya Rao selection.',
        whatIsMissing: 'Selection confirmation.',
        nextAction: 'Confirm Walgreens & Void Rite Aid.',
        sourceSystem: 'RxRelay Resolution Console',
        systemId: 'RR-ACT-6'
      },
      {
        id: 'j-63',
        stage: 'PHARMACY_DISPENSE',
        label: 'Fulfillment',
        sublabel: 'Walgreens #6281',
        actor: 'Walgreens',
        role: 'Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Ready upon conflict resolution.',
        whatHappened: 'Pending.',
        whatIsMissing: 'Clearance token.',
        nextAction: 'Fill inhaler.',
        sourceSystem: 'Walgreens Dispensing',
        systemId: 'WLG-INH'
      },
      {
        id: 'j-64',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Ready for Pickup',
        actor: 'Robert Chen',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Complete.',
        whatHappened: 'Pending.',
        whatIsMissing: 'Pickup.',
        nextAction: 'SMS alert.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-06'
      }
    ],
    timeline: [
      {
        id: 'tl-601',
        timestamp: '2026-09-26 11:04 AM',
        timeAgo: '8h ago',
        actor: 'RxRelay Switch',
        role: 'Interoperability Monitor',
        system: 'Surescripts Interceptor',
        title: 'Collision Warning: Dual Refill Requests Detected',
        description: 'Detected duplicate claim submissions from Rite Aid (08:12 AM) and Walgreens (11:04 AM).',
        category: 'blocker_detected'
      }
    ],
    patientCommunication: {
      currentStatusText: 'We noticed refill requests at two pharmacies. We are routing your rescue inhaler to Walgreens for fastest pickup.',
      lastSentAt: 'Sep 26 at 11:30 AM via SMS',
      deliveryChannel: 'SMS',
      nextExpectedStep: 'Confirmation with Walgreens Bellevue for pickup.',
      previewMessage: 'RxRelay Alert: Robert, to avoid an insurance delay, we are having Walgreens on 8th St prepare your Albuterol inhaler. We canceled the extra request at Rite Aid.'
    },
    auditTrail: [
      {
        id: 'aud-601',
        timestamp: '2026-09-26 11:04 AM',
        actor: 'RxRelay Gateway',
        role: 'System',
        action: 'Intercepted Duplicate Surescripts Refill',
        source: 'Clearinghouse EDI 270',
        result: 'Held for Single-Pharmacy Designation'
      }
    ]
  },
  {
    id: 'case-07',
    referenceNumber: 'RX-98220',
    medication: {
      name: 'Levothyroxine Sodium',
      strength: '75 mcg',
      dosageForm: 'Oral Tablet',
      sig: 'Take 1 tablet by mouth daily in the morning with a full glass of water 30 minutes before breakfast',
      quantity: 90,
      daysSupply: 90,
      therapeuticClass: 'Thyroid Hormone Replacement',
      ndc: '00074-6593-90',
      refillsRemainingOnRecord: 0
    },
    patient: {
      id: 'pt-107',
      name: 'James Wilson',
      dob: '1979-01-15',
      age: 47,
      gender: 'Male',
      mrn: 'MRN-609118',
      phone: '(555) 302-8841',
      adherenceRate: 97,
      lastSeenDate: '6 months ago',
      primaryCondition: 'Primary Hypothyroidism'
    },
    prescriber: {
      name: 'Dr. Anika Patel, MD',
      npi: '1922048821',
      practiceName: 'Northwest Endocrinology & Family Health',
      clinicLocation: 'Suite 400, Bellevue Medical Pavilion',
      specialty: 'Endocrinology',
      phone: '(555) 749-2100',
      assistant: 'Jessica Alvarez, CMA'
    },
    pharmacy: {
      name: 'Safeway Pharmacy #1508',
      storeNumber: '1508',
      ncpdp: '4930192',
      address: '300 Bellevue Way NE, Bellevue, WA 98004',
      phone: '(555) 454-9980',
      fax: '(555) 454-9981',
      contactPharmacist: 'Thomas Lee, PharmD'
    },
    insurance: {
      payerName: 'Uniform Medical Plan (UMP)',
      planType: 'Classic PPO',
      bin: '003858',
      pcn: 'A4',
      rxGroup: 'UMP01',
      priorAuthStatus: 'NOT_REQUIRED'
    },
    status: 'WAITING',
    urgency: 'MEDIUM',
    blocker: {
      type: 'PROVIDER_APPROVAL',
      title: 'Provider Review Pending (TSH Lab Verified)',
      badgeLabel: 'Waiting on Provider (9h)',
      reason: 'Refill requested with 0 refills remaining. TSH lab result from 2 weeks ago is 1.8 mIU/L (euthyroid, optimal range). Triage summary delivered to Dr. Patel.',
      evidence: 'LabCorp result #LC-88190 dated Sept 12 shows TSH 1.8 mIU/L.',
      confidence: 'High',
      whatTriggeredThis: 'Automatic refill expiration at Safeway.',
      whatIsRequired: 'Dr. Patel electronic signature on 1-year renewal (90 days x 4 refills).',
      whoCanResolve: 'Dr. Anika Patel.',
      whatHappensAfter: 'eRx token dispatches to Safeway Pharmacy.'
    },
    owner: {
      name: 'Dr. Anika Patel, MD',
      role: 'Attending Endocrinologist',
      organization: 'Northwest Endocrinology'
    },
    ageFormatted: '9h 12m',
    createdAt: '2026-09-26 07:45 PM',
    lastUpdated: '2026-09-27 04:20 AM',
    situationSummary: 'Patient requires routine annual renewal of Levothyroxine 75mcg. Recent TSH lab is within normal limits. In Dr. Patel’s batch sign-off queue.',
    whatWeKnow: [
      'TSH lab is fresh and optimal (1.8 mIU/L)',
      'Patient has 97% medication compliance',
      'Prepared order includes 90-day supply with 3 renewals'
    ],
    whatIsMissing: [
      'Provider digital signature'
    ],
    nextBestAction: {
      id: 'batch_approve_routine',
      label: 'Batch Sign with Routine Cohort',
      description: 'Order is queued for Dr. Patel’s 08:30 AM morning batch e-sign.',
      consequence: 'Will be signed during morning provider round.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'batch_approve_routine',
        label: 'Batch Sign with Routine Cohort',
        description: 'Queued for 08:30 AM round.',
        consequence: 'Will be auto-signed with verified cohort.',
        primary: true,
        variant: 'primary'
      }
    ],
    journey: [
      {
        id: 'j-71',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'James Wilson',
        actor: 'James Wilson',
        role: 'Patient',
        timestamp: 'Sep 26, 07:30 PM',
        status: 'COMPLETED',
        summary: 'Refill requested via Safeway Pharmacy app.',
        whatHappened: 'Refill requested.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Safeway App',
        systemId: 'SFW-88'
      },
      {
        id: 'j-72',
        stage: 'PROVIDER_REVIEW',
        label: 'Provider In-Basket',
        sublabel: 'Dr. Patel',
        actor: 'Dr. Anika Patel',
        role: 'Physician',
        timestamp: 'Sep 26, 07:45 PM',
        status: 'ACTIVE',
        summary: 'In morning batch review queue.',
        whatHappened: 'Pre-matched with fresh TSH lab.',
        whatIsMissing: 'Provider signature.',
        nextAction: 'Batch signature.',
        sourceSystem: 'Epic InBasket',
        systemId: 'EPIC-TSH-01'
      },
      {
        id: 'j-73',
        stage: 'PHARMACY_DISPENSE',
        label: 'Fulfillment',
        sublabel: 'Safeway #1508',
        actor: 'Safeway Pharmacy',
        role: 'Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Awaiting signed renewal.',
        whatHappened: 'Pending.',
        whatIsMissing: 'Signature.',
        nextAction: 'Fill 90 tablets.',
        sourceSystem: 'Safeway Dispensing',
        systemId: 'SFW-DSP'
      },
      {
        id: 'j-74',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Ready for Pickup',
        actor: 'James Wilson',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Complete.',
        whatHappened: 'Pending.',
        whatIsMissing: 'Dispense.',
        nextAction: 'Notify patient.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-07'
      }
    ],
    timeline: [
      {
        id: 'tl-701',
        timestamp: '2026-09-26 07:45 PM',
        timeAgo: '9h ago',
        actor: 'RxRelay Lab Connector',
        role: 'Diagnostic Correlator',
        system: 'LabCorp Interop',
        title: 'Correlated Recent TSH Lab (1.8 mIU/L)',
        description: 'Auto-verified normal thyroid function lab; tagged case as "Ready for Routine Batch Renewal".',
        category: 'verification'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Your refill request and recent normal lab results are in Dr. Patel’s morning review queue.',
      lastSentAt: 'Sep 26 at 08:00 PM via Portal',
      deliveryChannel: 'PATIENT_PORTAL',
      nextExpectedStep: 'Approval this morning before 10:00 AM.',
      previewMessage: 'Northwest Endocrinology: Hi James, your recent lab result was normal and Dr. Patel will sign your Levothyroxine 90-day renewal this morning.'
    },
    auditTrail: [
      {
        id: 'aud-701',
        timestamp: '2026-09-26 07:45 PM',
        actor: 'RxRelay Lab Engine',
        role: 'System',
        action: 'Linked Diagnostic Lab #LC-88190',
        source: 'HL7 ORU_R01 Feed',
        result: 'Verified In-Range'
      }
    ]
  },
  {
    id: 'case-08',
    referenceNumber: 'RX-98221',
    medication: {
      name: 'Amlodipine Besylate',
      strength: '10 mg',
      dosageForm: 'Oral Tablet',
      sig: 'Take 1 tablet daily with or without food',
      quantity: 90,
      daysSupply: 90,
      therapeuticClass: 'Calcium Channel Blocker',
      ndc: '00093-3174-98',
      refillsRemainingOnRecord: 3
    },
    patient: {
      id: 'pt-108',
      name: 'Maria Santos',
      dob: '1962-12-08',
      age: 63,
      gender: 'Female',
      mrn: 'MRN-219400',
      phone: '(555) 881-2299',
      adherenceRate: 99,
      lastSeenDate: '1 month ago',
      primaryCondition: 'Hypertension'
    },
    prescriber: {
      name: 'Dr. Marcus Thorne, MD',
      npi: '1482093318',
      practiceName: 'Cedar Grove Internal Medicine',
      clinicLocation: 'Building B, Seattle Health Center',
      specialty: 'Internal Medicine',
      phone: '(555) 329-8800',
      assistant: 'Carlos Ortiz, RN'
    },
    pharmacy: {
      name: 'Walgreens Pharmacy #1204',
      storeNumber: '1204',
      ncpdp: '5012041',
      address: '5409 California Ave SW, Seattle, WA 98136',
      phone: '(555) 935-1200',
      fax: '(555) 935-1201',
      contactPharmacist: 'David Chang, PharmD'
    },
    insurance: {
      payerName: 'Medicare Part D / SilverScript',
      planType: 'Medicare PDP',
      bin: '004336',
      pcn: 'MEDDADV',
      rxGroup: 'RXCVSD',
      priorAuthStatus: 'NOT_REQUIRED'
    },
    status: 'RESOLVED',
    urgency: 'ROUTINE',
    blocker: {
      type: 'NONE',
      title: 'Resolved — Dispensed & Verified',
      badgeLabel: 'Resolved today',
      reason: 'No blockers. Electronic renewal was signed by Dr. Thorne and filled by Walgreens Pharmacy #1204. Patient notified that prescription is ready for pickup.',
      evidence: 'NCPDP 10.6 Claim Paid response and Walgreens ready alert token #WL-9041.',
      confidence: 'High',
      whatTriggeredThis: 'Routine refill request.',
      whatIsRequired: 'None — workflow completed.',
      whoCanResolve: 'Completed.',
      whatHappensAfter: 'Prescription ready in pickup bin #B-14.'
    },
    owner: {
      name: 'Completed',
      role: 'System Archive',
      organization: 'Cedar Grove Internal Medicine'
    },
    ageFormatted: 'Resolved 2h ago',
    createdAt: '2026-09-26 04:10 PM',
    lastUpdated: '2026-09-27 02:45 AM',
    situationSummary: 'Refill workflow fully resolved. Electronic authorization transmitted to Walgreens #1204; claim adjudicated with $0 copay. Medication ready for pickup.',
    whatWeKnow: [
      'Prescription authorized for 90 days with 3 refills',
      'SilverScript Medicare claim fully approved with $0 copay',
      'Patient received automated pickup SMS confirmation'
    ],
    whatIsMissing: [],
    nextBestAction: {
      id: 'view_archive_details',
      label: 'View Resolution Archive',
      description: 'Audit complete journey and verification tokens.',
      consequence: 'Displays full immutable transaction record.',
      primary: false,
      variant: 'secondary'
    },
    availableActions: [
      {
        id: 'view_archive_details',
        label: 'View Resolution Archive',
        description: 'Audit immutable transaction record.',
        consequence: 'Displays audit tokens.',
        variant: 'secondary'
      }
    ],
    journey: [
      {
        id: 'j-81',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'Maria Santos',
        actor: 'Maria Santos',
        role: 'Patient',
        timestamp: 'Sep 26, 04:10 PM',
        status: 'COMPLETED',
        summary: 'Refill requested via Walgreens app.',
        whatHappened: 'Request entered.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Walgreens App',
        systemId: 'WLG-01'
      },
      {
        id: 'j-82',
        stage: 'PROVIDER_REVIEW',
        label: 'Provider Approval',
        sublabel: 'Dr. Thorne',
        actor: 'Dr. Marcus Thorne',
        role: 'Physician',
        timestamp: 'Sep 26, 05:20 PM',
        status: 'COMPLETED',
        summary: 'Dr. Thorne signed e-renewal order.',
        whatHappened: 'Signed during evening charting.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Epic e-Prescribe',
        systemId: 'EPIC-ERX-88'
      },
      {
        id: 'j-83',
        stage: 'INSURANCE_PBM',
        label: 'Insurance Claim',
        sublabel: 'SilverScript',
        actor: 'SilverScript Claim Switch',
        role: 'PBM',
        timestamp: 'Sep 26, 05:22 PM',
        status: 'COMPLETED',
        summary: 'Paid claim adjudicated ($0 copay).',
        whatHappened: 'Claim approved.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'RelayHealth',
        systemId: 'RH-CLM-09'
      },
      {
        id: 'j-84',
        stage: 'PHARMACY_DISPENSE',
        label: 'Fulfillment',
        sublabel: 'Walgreens #1204',
        actor: 'Walgreens Pharmacy',
        role: 'Pharmacy',
        timestamp: 'Sep 27, 02:40 AM',
        status: 'COMPLETED',
        summary: 'Medication counted, labeled, and placed in pickup bin #B-14.',
        whatHappened: 'Fulfillment complete.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Walgreens Dispensing',
        systemId: 'WLG-DSP-DONE'
      },
      {
        id: 'j-85',
        stage: 'RESOLVED',
        label: 'Ready for Pickup',
        sublabel: 'Patient Notified',
        actor: 'RxRelay Messaging',
        role: 'System',
        timestamp: 'Sep 27, 02:45 AM',
        status: 'COMPLETED',
        summary: 'Pickup notification SMS dispatched to patient.',
        whatHappened: 'Notification confirmed.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'RxRelay SMS Engine',
        systemId: 'SMS-CONF'
      }
    ],
    timeline: [
      {
        id: 'tl-801',
        timestamp: '2026-09-26 05:20 PM',
        timeAgo: '11h ago',
        actor: 'Dr. Marcus Thorne',
        role: 'Physician',
        system: 'Epic EHR',
        title: 'eRx Signed and Dispatched to Surescripts',
        description: 'Provider reviewed clinic encounter and authorized 90-day supply with 3 refills.',
        category: 'provider_action'
      },
      {
        id: 'tl-802',
        timestamp: '2026-09-27 02:45 AM',
        timeAgo: '2h ago',
        actor: 'Walgreens Pharmacy #1204',
        role: 'Pharmacy',
        system: 'Walgreens Ready API',
        title: 'Fulfillment Completed — Ready for Pickup',
        description: 'Dispensing verified; prescription placed in locker bin #B-14.',
        category: 'resolution'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Your Amlodipine refill is ready for pickup at Walgreens Pharmacy on California Ave.',
      lastSentAt: 'Today at 02:45 AM via SMS',
      deliveryChannel: 'SMS',
      nextExpectedStep: 'Pickup at your convenience.',
      previewMessage: 'Walgreens Alert: Maria, your Amlodipine 10mg is ready for pickup (Bin B-14). Copay: $0.00. Store hours: 8am-9pm.'
    },
    auditTrail: [
      {
        id: 'aud-801',
        timestamp: '2026-09-27 02:45 AM',
        actor: 'Walgreens Gateway',
        role: 'External System',
        action: 'Broadcasted Rx Dispense Verified',
        source: 'Surescripts Real-Time Fill Event',
        result: 'Closed Case (Success)'
      }
    ]
  },
  {
    id: 'case-09',
    referenceNumber: 'RX-98222',
    medication: {
      name: 'Eliquis (Apixaban)',
      strength: '5 mg',
      dosageForm: 'Oral Tablet',
      sig: 'Take 1 tablet by mouth twice daily with or without food',
      quantity: 60,
      daysSupply: 30,
      therapeuticClass: 'Direct Oral Anticoagulant (DOAC)',
      ndc: '00003-0894-21',
      refillsRemainingOnRecord: 0
    },
    patient: {
      id: 'pt-109',
      name: 'Grace Miller',
      dob: '1948-07-22',
      age: 78,
      gender: 'Female',
      mrn: 'MRN-190422',
      phone: '(555) 671-8801',
      adherenceRate: 100,
      lastSeenDate: '7 months ago (Dr. Thorne)',
      primaryCondition: 'Non-valvular Atrial Fibrillation'
    },
    prescriber: {
      name: 'Dr. Marcus Thorne, MD',
      npi: '1482093318',
      practiceName: 'Cedar Grove Internal Medicine',
      clinicLocation: 'Building B, Seattle Health Center',
      specialty: 'Internal Medicine / Cardiology',
      phone: '(555) 329-8800',
      assistant: 'Carlos Ortiz, RN'
    },
    pharmacy: {
      name: 'Fred Meyer Pharmacy #34',
      storeNumber: '34',
      ncpdp: '4981120',
      address: '14300 1st Ave S, Burien, WA 98168',
      phone: '(555) 243-9200',
      fax: '(555) 243-9201',
      contactPharmacist: 'Rachel Adams, PharmD'
    },
    insurance: {
      payerName: 'UnitedHealthcare Dual Complete',
      planType: 'Medicare Advantage SNP',
      bin: '610097',
      pcn: 'UHC',
      rxGroup: 'SNP9',
      priorAuthStatus: 'APPROVED'
    },
    status: 'BLOCKED',
    urgency: 'CRITICAL',
    blocker: {
      type: 'LAB_REQUIRED',
      title: 'Renal Function Lab Safety Review Needed',
      badgeLabel: 'Renal Lab Review (CrCl)',
      reason: 'Clinical decision support flagged that patient Grace Miller (age 78, weight 54kg) requires an annual serum creatinine / eGFR check to determine if Eliquis dose should be reduced to 2.5mg BID per FDA safety labeling (patient meets 2 of 3 dose-reduction criteria: age >= 80, body weight <= 60kg, serum creatinine >= 1.5 mg/dL).',
      evidence: 'FDA Apixaban package insert Section 2.1 dosing criteria for NVAF.',
      confidence: 'High',
      whatTriggeredThis: 'Refill safety rule evaluating patient age (78) and weight (54kg) against last recorded creatinine from 13 months ago.',
      whatIsRequired: 'Issue standing lab order for Basic Metabolic Panel (BMP); approve 14-day safety supply to prevent stroke risk while labs are drawn.',
      whoCanResolve: 'Dr. Marcus Thorne or Nurse Carlos Ortiz.',
      whatHappensAfter: 'Patient receives lab slip at local Quest Diagnostics; 14-day supply dispensed immediately.'
    },
    owner: {
      name: 'Dr. Marcus Thorne, MD',
      role: 'Attending Physician',
      organization: 'Cedar Grove Internal Medicine'
    },
    ageFormatted: '12h 30m',
    createdAt: '2026-09-26 04:30 PM',
    lastUpdated: '2026-09-27 05:00 AM',
    situationSummary: 'High-risk anticoagulant refill requiring dose-safety verification. Weight is 54kg (<=60kg threshold). Needs urgent 14-day bridge and order for serum creatinine lab.',
    whatWeKnow: [
      'Eliquis is critical for stroke prevention in atrial fibrillation (cannot be stopped)',
      'Patient weight 54kg is below the 60kg FDA safety threshold',
      'Previous creatinine was 1.3 mg/dL 13 months ago',
      'Clinical protocol recommends 14-day bridge + stat lab'
    ],
    whatIsMissing: [
      'Current serum creatinine / eGFR lab'
    ],
    nextBestAction: {
      id: 'issue_bridge_and_lab_order',
      label: 'Order BMP Lab + Authorize 14-Day Bridge',
      description: 'Authorize an urgent 14-day supply to Fred Meyer Pharmacy and send Quest Diagnostics order for serum creatinine.',
      consequence: 'Prevents catastrophic anticoagulant lapse while ensuring FDA renal safety dosing.',
      primary: true,
      variant: 'primary'
    },
    availableActions: [
      {
        id: 'issue_bridge_and_lab_order',
        label: 'Order BMP Lab + Authorize 14-Day Bridge',
        description: 'Authorize 14-day bridge and order kidney panel.',
        consequence: 'Sends 14-day bridge to pharmacy and lab order to Quest.',
        primary: true,
        variant: 'primary'
      }
    ],
    journey: [
      {
        id: 'j-91',
        stage: 'PATIENT_REQUEST',
        label: 'Patient Request',
        sublabel: 'Grace Miller',
        actor: 'Grace Miller',
        role: 'Patient',
        timestamp: 'Sep 26, 04:15 PM',
        status: 'COMPLETED',
        summary: 'Refill requested at Fred Meyer.',
        whatHappened: 'Request entered.',
        whatIsMissing: null,
        nextAction: null,
        sourceSystem: 'Fred Meyer Rx',
        systemId: 'FM-01'
      },
      {
        id: 'j-92',
        stage: 'PROVIDER_REVIEW',
        label: 'Clinical Decision Support',
        sublabel: 'Renal Dose Check',
        actor: 'RxRelay Safety Rules',
        role: 'Safety Core',
        timestamp: 'Sep 26, 04:30 PM',
        status: 'BLOCKED',
        summary: 'Safety alert: Weight <=60kg + age 78 requires current renal lab.',
        whatHappened: 'Flagged potential 2.5mg dose adjustment criteria.',
        whatIsMissing: 'Recent creatinine lab.',
        nextAction: 'Authorize bridge + order BMP.',
        sourceSystem: 'RxRelay Clinical Rules',
        systemId: 'RULE-DOAC-RENAL'
      },
      {
        id: 'j-93',
        stage: 'PRACTICE_STAFF',
        label: 'Care Team Action',
        sublabel: 'Carlos Ortiz, RN',
        actor: 'Carlos Ortiz, RN',
        role: 'Clinical Nurse',
        timestamp: 'Sep 27, 05:00 AM',
        status: 'ACTIVE',
        summary: 'Awaiting nurse execution of lab bridge.',
        whatHappened: 'Queue prioritized.',
        whatIsMissing: 'Order authorization.',
        nextAction: 'Execute bridge + lab order.',
        sourceSystem: 'RxRelay Care Team Console',
        systemId: 'NURSE-ACT'
      },
      {
        id: 'j-94',
        stage: 'PHARMACY_DISPENSE',
        label: 'Pharmacy Fulfillment',
        sublabel: 'Fred Meyer #34',
        actor: 'Fred Meyer',
        role: 'Pharmacy',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Holding for 14-day bridge authorization.',
        whatHappened: 'Awaiting.',
        whatIsMissing: 'Bridge order.',
        nextAction: 'Fill 28 tablets.',
        sourceSystem: 'Fred Meyer Dispensing',
        systemId: 'FM-DSP'
      },
      {
        id: 'j-95',
        stage: 'RESOLVED',
        label: 'Resolution',
        sublabel: 'Medication Protected',
        actor: 'Grace Miller',
        role: 'Patient',
        timestamp: 'Pending',
        status: 'PENDING',
        summary: 'Complete.',
        whatHappened: 'Pending.',
        whatIsMissing: 'Execution.',
        nextAction: 'Safety SMS.',
        sourceSystem: 'RxRelay Core',
        systemId: 'RES-09'
      }
    ],
    timeline: [
      {
        id: 'tl-901',
        timestamp: '2026-09-26 04:30 PM',
        timeAgo: '12h ago',
        actor: 'RxRelay Clinical Decision Support',
        role: 'Clinical Safety Validator',
        system: 'FDA Dosing Engine',
        title: 'Safety Intercept: Dose Reduction Evaluation Required',
        description: 'Patient meets multiple criteria for Apixaban renal monitoring (Age 78, Weight 54kg). Triggered safety protocol.',
        category: 'blocker_detected'
      }
    ],
    patientCommunication: {
      currentStatusText: 'Your care team is preparing a short-term supply and a routine kidney blood test requisition to ensure your exact Eliquis dose remains safe.',
      lastSentAt: 'Sep 26 at 05:00 PM via Phone Call',
      deliveryChannel: 'SECURE_EMAIL',
      nextExpectedStep: '14-day medication pickup at Fred Meyer Burien + lab requisition slip.',
      previewMessage: 'Cedar Grove Care Team: Grace, we are sending a 14-day supply of Eliquis to Fred Meyer so you have continuous protection. Dr. Thorne has also ordered a routine kidney check at Quest Diagnostics to ensure your dose is perfectly balanced.'
    },
    auditTrail: [
      {
        id: 'aud-901',
        timestamp: '2026-09-26 04:30 PM',
        actor: 'RxRelay Safety Rules',
        role: 'System',
        action: 'Triggered Anticoagulation Dosing Protocol',
        source: 'EHR Chart Audit Engine',
        result: 'Safety Hold Placed'
      }
    ]
  }
];
