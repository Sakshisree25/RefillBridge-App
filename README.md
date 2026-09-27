# RefillBridge Clinical — Hospital & Pharmacy Refill Operations Center

[![React 19](https://img.shields.io/badge/React-19.0.1-teal.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.3-teal.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev/)
[![HIPAA Workstation](https://img.shields.io/badge/Security-HIPAA%20Compliant-emerald.svg)]()

> **RefillBridge Clinical** is an operational command workstation designed for hospital outpatient clinics, physician groups, and partner retail pharmacies to identify, triage, and resolve stuck prescription refills in real time.

---

## 🏥 Problem Overview

In modern ambulatory care, more than **30% of all prescription refill requests stall** between retail pharmacies and provider offices. These delays lead to treatment non-adherence, unnecessary emergency visits, and administrative burnout:
- Refill requests get buried in electronic health record (EHR) in-baskets.
- Prescribers block refills due to overdue routine laboratory visits or annual wellness exams.
- Pharmacies face unclear dosage instructions (*sig*) or unaddressed Electronic Prior Authorization (ePA) requirements.

**RefillBridge Clinical** bridges the gap between EHR systems (Epic FHIR R4), national pharmacy networks (Surescripts NCPDP), and clinical staff—providing a unified operational cockpit to unblock prescriptions with human-in-the-loop safety protocols.

---

## ✨ Key Features & Clinical Views

### 1. 🔐 Hospital Clinical Sign-In Gateway (`SignInView`)
* **HIPAA Compliant Workstation**: Secure entry point featuring 256-bit TLS encryption notices and hospital credential validation.
* **Credentials Form**: Direct sign-in using hospital email or clinical staff ID.
* **1-Click Clinical Quick Sign-In (Staff Presets)**:
  * 🩺 **Maya Rao** — *Clinical Triage Lead (Practice Operations & Triage)*
  * 👨‍⚕️ **Dr. Aris Patel, MD** — *Attending Endocrinologist (Endocrinology & Internal Medicine)*
  * 💊 **Elena Rostova, PharmD** — *Partner Pharmacy Liaison (Clinical Pharmacy Network)*
* **Sign Out & Session Persistence**: Full sign-out control in both the sidebar footer and top navigation bar, with session state preserved in `localStorage`.

### 2. ⚡ Operations Command (`OperationsHomeView`)
* **Hospital Refill Triage Header**: Live shift tracker, operational status, and clinical turnaround metrics.
* **4 Core Operational States**:
  * 🟡 **Needs Attention**: Refills requiring clinical staff review.
  * 🔴 **Waiting on Provider**: Refills blocked pending prescriber review or authorization.
  * 🔵 **Waiting on Pharmacy**: Refills awaiting pharmacy dispensing confirmation.
  * 🟣 **Insurance / Admin**: Refills blocked by Prior Authorization or required clinic visits.
* **Workload Velocity Rail**: Real-time distribution visualization tracking triage clearance speeds and critical 18h+ escalations.
* **Priority Actions Stream**: High-priority refill case cards with direct 1-click review triggers.

### 3. 📋 Refill Queue (`RefillQueueView`)
* **Segmented Filter Bar**: Filter by *All Cases*, *Needs Attention*, *Blocked*, *Waiting*, and *Resolved*.
* **Multi-Dimensional Triage**: Filter by blocker type (*Visit Required*, *No Refills*, *Prior Auth*, *Unclear Sig*) and urgency levels (*Critical*, *High*, *Medium*, *Routine*).
* **Live Case Rows**: Displays medication details, patient MRN, prescriber, pharmacy, waiting time, root cause blocker, and recommended next best action.

### 4. 🔬 Case Detail Workspace (`RefillDetailWorkspace`)
* **Flagship Prescription Dossier**: Complete medication profile including Sig instructions, quantity, days supply, NDC, and patient refill adherence score.
* **Interactive Prescription Journey**: End-to-end visualization tracing the refill lifecycle:
  `Patient Request` ➔ `Pharmacy Intake` ➔ `Provider Review` ➔ `Practice Staff` ➔ `Insurance PBM` ➔ `Pharmacy Dispense`.
* **Blocker Root-Cause Reasoning**: Diagnostic card highlighting why the refill stalled, source evidence, required clinical criteria, and who can resolve it.
* **Operational Action Panel**:
  * *1-Click Renewal Packets* dispatched to doctor InBaskets.
  * *Appointment Scheduling Modal* with automatic 30-day safety bridge prescription generation.
  * *Pharmacy Sig Clarification* and direct electronic messaging.
* **Clinical Audit Trail & Timeline**: Immutable chronological log capturing every action, system source, and timestamp.
* **Patient Notification Center**: Real-time SMS and patient portal status preview.

### 5. 🎯 Action Center (`ActionCenterView`)
* Categorized operational workflow matrix:
  * **Your Actions**: High-priority cases waiting on staff execution.
  * **Waiting on Others**: Cases pending provider sign-off or pharmacy fulfillment.
  * **Escalated**: Critical cases stalled past safety thresholds (>18 hours).
  * **Completed**: Prescriptions successfully cleared during the current shift.

### 6. 👤 Patient Context (`PatientContextView`)
* Dedicated longitudinal patient profile with MRN, DOB, contact information, and primary diagnoses.
* Comprehensive active prescription list showing concurrent therapies and refill states across all medications.

### 7. 📊 Refill Performance & Analytics (`AnalyticsView`)
* **Operational KPIs**:
  * *Average Resolution Time*: 4.2 hours (-82% reduction from 28h baseline).
  * *Shift Resolution Rate*: 96.8% same-shift completion.
  * *Provider Response Time*: Reduced from 19h to 1.8h with automated renewal packets.
  * *Pharmacy Electronic Confirmation*: 32 minutes median turnaround.
* **Blocker Distribution Breakdown**: Real-time percentages of common failure modes (No Refills, ePA, Visit Required).

### 8. 🔌 Connected Systems & Integrations (`IntegrationsView`)
* **Epic EHR (FHIR R4 / InBasket)**: Bidirectional synchronization of patient records and renewal tasks.
* **Surescripts Network (NCPDP SCRIPT 2017071)**: Electronic routing across 65,000+ US retail and mail-order pharmacies.
* **CoverMyMeds Electronic Prior Auth (ePA)**: Direct questionnaire extraction and commercial PBM transmission.
* **Twilio Healthcare SMS Gateway**: HIPAA-compliant patient milestone SMS notifications.

### 9. 🤖 Clinical Workflow Assistant (`RxRelayAssistant`)
* Embedded AI-assisted workflow companion able to:
  * Explain why a specific prescription is blocked.
  * Draft clinical renewal notes for attending physicians.
  * Check electronic insurance and ePA status.
  * Provide suggested 30-day safety bridge protocols.

---

## 🎨 Visual Identity & Clinical Design System

The application uses an authentic **hospital and medical scrub color system** designed for high clinical legibility, eye comfort, and professional appeal without dark or harsh contrasts:

| Token | Hex / Class | Clinical Context |
| :--- | :--- | :--- |
| **Hospital Scrub Teal** | `#0D9488` (`bg-teal-600`) | Primary actions, active navigation, brand icons, and clinical CTAs |
| **Pharmacy Pill Amber** | `#F59E0B` (`bg-amber-500`) | *Needs Attention*, prescription warnings, and renewal holds |
| **Emergency Cross Rose** | `#EF4444` (`bg-rose-500`) | *Blocked*, critical doctor holds, and overdue clinical exams |
| **Stethoscope Cyan** | `#06B6D4` (`bg-cyan-500`) | Pharmacy dispensing clearances, network indicators, and EDI status |
| **Hospital Mint & White** | `#F8FAFC` & `#F0FDFA` | Calming clinical card surfaces and diffused background canvas |

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Dev Server**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **AI SDK**: [@google/genai](https://www.npmjs.com/package/@google/genai)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or bun

### Installation

1. **Clone or download the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

4. **Verify TypeScript & build**:
   ```bash
   npm run lint
   npm run build
   ```

---

## 👥 Demo Clinical Workflows to Try

1. **Sign In**: Launch the app and click **Maya Rao (Clinical Triage Lead)** on the Sign In page.
2. **Review Operations**: View the live shift statistics on the Operations Command dashboard.
3. **Inspect a Stalled Refill**:
   - Click **Triage Queue** or select **Case #RX-78921** (Metformin 1000mg for Sarah Jenkins).
   - Review the **Prescription Journey** and see that it is blocked because an annual diabetes lab exam is overdue.
4. **Execute Next Best Action**:
   - In the Action Panel, click **Schedule Visit & Issue 30-Day Bridge**.
   - Confirm the appointment date and verify that a 30-day bridge prescription is sent to the pharmacy so the patient does not miss medication doses.
5. **Ask the Clinical Assistant**: Click **Clinical Assistant** in the top bar to query blocker rationale or draft physician notes.
6. **Switch Staff Accounts**: Click **Sign Out** to return to the clinical gateway and sign in as **Dr. Aris Patel** or **Elena Rostova**.

---

## 📄 License

This project is licensed for clinical demonstration and development operations.
