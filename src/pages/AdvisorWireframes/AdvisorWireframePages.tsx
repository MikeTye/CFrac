import type { ReactNode } from 'react';
import { AdvisorEventTimeline, AdvisorPageHeader, AdvisorPrimaryPanel, AdvisorRightRail, type AdvisorTimelineEvent } from '../../features/advisor/components';
import {
    getClosureGate,
    formatMoneyFromCents,
    formatTimestampForUser,
    getOverlayRoute,
    getOverlayState,
    getTranscriptFinalizeGate,
    normalizeAppointment,
    normalizeDispute,
    normalizePayment,
    normalizeTranscript,
} from '../../features/advisor/workflow';
import profileData from '../../../mocks/advisor/profile.json';
import notificationsData from '../../../mocks/advisor/notifications.json';
import availabilityData from '../../../mocks/advisor/availability.json';
import appointmentsData from '../../../mocks/advisor/appointments.json';
import paymentsData from '../../../mocks/advisor/payments.json';
import notesData from '../../../mocks/advisor/session-notes.json';
import transcriptsData from '../../../mocks/advisor/transcripts.json';
import disputesData from '../../../mocks/advisor/disputes.json';
import scenariosData from '../../../mocks/scenarios/advisor-seed-scenarios.json';

function requirePayloadSchemaVersion(payload: unknown, payloadName: string): string {
    const schemaVersion = (payload as { schema_version?: unknown }).schema_version;
    if (typeof schemaVersion !== 'string' || schemaVersion.length === 0) {
        throw new Error(`Missing required field: ${payloadName}.schema_version`);
    }
    return schemaVersion;
}

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

requirePayloadSchemaVersion(profileData, 'profileData');
requirePayloadSchemaVersion(notificationsData, 'notificationsData');
requirePayloadSchemaVersion(availabilityData, 'availabilityData');
requirePayloadSchemaVersion(appointmentsData, 'appointmentsData');
requirePayloadSchemaVersion(paymentsData, 'paymentsData');
requirePayloadSchemaVersion(notesData, 'notesData');
requirePayloadSchemaVersion(transcriptsData, 'transcriptsData');
requirePayloadSchemaVersion(disputesData, 'disputesData');

function PageScaffold({ title, subtitle, primaryCta, secondaryCta, children, timeline }: { title: string; subtitle: string; primaryCta: string; secondaryCta: string; children: ReactNode; timeline?: AdvisorTimelineEvent[] }) {
    return (
        <div className="container stack-lg" style={{ paddingBlock: '1rem 2rem' }}>
            <AdvisorPageHeader title={title} subtitle={subtitle} status={{ variant: 'default', label: 'Wireframe' }} />
            <div className="stack-row">
                <button className="btn">{primaryCta}</button>
                <button className="btn ghost">{secondaryCta}</button>
            </div>
            <div className="dashboard-grid two-col-right">
                {children}
            </div>
            {timeline ? <AdvisorEventTimeline events={timeline} /> : null}
        </div>
    );
}

const appt = normalizeAppointment(appointmentsData.appointments[0], appointmentsData.schema_version);
const payment = normalizePayment(paymentsData.payments[0], paymentsData.schema_version);
const transcript = normalizeTranscript(transcriptsData.transcript, transcriptsData.schema_version);
const dispute = normalizeDispute(disputesData.disputes[0], disputesData.schema_version);

function timelineFromAppointment(): AdvisorTimelineEvent[] {
    const overlayState = getOverlayState(appt);
    const overlayTitle = overlayState ? `Overlay active: ${overlayState}` : 'No exception overlay';
    return [
        { id: 'overlay', timeLabel: 'now', title: overlayTitle },
        { id: 'start', timeLabel: appt.session.starts_at, title: 'Session started' },
        { id: 'end', timeLabel: appt.session.ends_at, title: 'Session ended' },
    ];
}

function OverlayBanner() {
    const overlayState = getOverlayState(appt);
    const route = getOverlayRoute(appt);
    if (!overlayState || !route) {
        return <p className="badge">Overlay: none (happy-path flow active)</p>;
    }

    return <p className="badge warning">Exception overlay: {overlayState} (routing to {route})</p>;
}

function SimplePanels({ primary, rail }: { primary: ReactNode; rail: ReactNode }) {
    return (
        <>
            <AdvisorPrimaryPanel title="Primary panel">{primary}</AdvisorPrimaryPanel>
            <AdvisorRightRail>{rail}</AdvisorRightRail>
        </>
    );
}

export function AdvisorSignupPage() { return <PageScaffold title="AdvisorSignupPage" subtitle={profileData.advisor.profile.headline} primaryCta="Create account" secondaryCta="Contact support"><SimplePanels primary={<p>Unread notifications: {notificationsData.notifications.filter((n) => !n.read).length}</p>} rail={<p>Email: verification pending until signup completion.</p>} /></PageScaffold>; }
export function AdvisorEmailVerificationPage() { return <PageScaffold title="AdvisorEmailVerificationPage" subtitle="Confirm your advisor email" primaryCta="Verify email" secondaryCta="Resend code"><SimplePanels primary={<p>Email verified: {String(profileData.advisor.account.email_verified)}</p>} rail={<p>Account registered at {profileData.advisor.account.registered_at}</p>} /></PageScaffold>; }
export function AdvisorKYCOrIdentityPage() { return <PageScaffold title="AdvisorKYCOrIdentityPage" subtitle="Identity verification" primaryCta="Submit KYC" secondaryCta="Save for later"><SimplePanels primary={<p>KYC status: {profileData.advisor.identity.kyc_status}</p>} rail={<p>Required: {String(profileData.advisor.identity.kyc_required)}</p>} /></PageScaffold>; }
export function AdvisorProfileSetupPage() { return <PageScaffold title="AdvisorProfileSetupPage" subtitle="Build your public advisor profile" primaryCta="Save profile" secondaryCta="Preview"><SimplePanels primary={<p>Completion: {profileData.advisor.profile.profile_completion_pct}%</p>} rail={<p>Published: {String(profileData.advisor.profile.is_published)}</p>} /></PageScaffold>; }
export function AdvisorAvailabilitySetupPage() { return <PageScaffold title="AdvisorAvailabilitySetupPage" subtitle="Define weekly windows" primaryCta="Save availability" secondaryCta="Sync calendar"><SimplePanels primary={<p>Weekly windows: {availabilityData.weekly_windows.length}</p>} rail={<p>Calendar connected: {String(availabilityData.calendar_sync.connected)}</p>} /></PageScaffold>; }
export function AdvisorOnboardingChecklistPage() { return <PageScaffold title="AdvisorOnboardingChecklistPage" subtitle="Complete all onboarding checkpoints" primaryCta="Complete step" secondaryCta="Skip"><SimplePanels primary={<p>Profile completion {profileData.advisor.profile.profile_completion_pct}% · windows {availabilityData.weekly_windows.length}</p>} rail={<p>Latest notification: {notificationsData.notifications[0]?.title}</p>} /></PageScaffold>; }
export function AdvisorHomeDashboardPage() { return <PageScaffold title="AdvisorHomeDashboardPage" subtitle="Operational overview" primaryCta="Review next booking" secondaryCta="Open payouts" timeline={timelineFromAppointment()}><SimplePanels primary={<p>Appointments: {appointmentsData.appointments.length} · payment {paymentsData.payments[0].status}</p>} rail={<p>Unread notifications: {notificationsData.notifications.filter((n) => !n.read).length}</p>} /></PageScaffold>; }
export function AdvisorCalendarPage() { return <PageScaffold title="AdvisorCalendarPage" subtitle="Calendar and schedule" primaryCta="Create block" secondaryCta="Import calendar" timeline={timelineFromAppointment()}><SimplePanels primary={<p>Slot interval: {availabilityData.slot_interval_min} min</p>} rail={<p>Scheduled appointments: {appointmentsData.appointments.length}</p>} /></PageScaffold>; }
export function AdvisorAppointmentsListPage() { return <PageScaffold title="AdvisorAppointmentsListPage" subtitle="All appointments" primaryCta="Open selected" secondaryCta="Export list"><SimplePanels primary={<p>Appointment {appt.appointment_id} in state {appt.booking_state}</p>} rail={<p>Payment status: {paymentsData.payments[0].status}</p>} /></PageScaffold>; }
export function AdvisorAppointmentDetailPage() {
    const overlayState = getOverlayState(appt);
    const primaryCta = overlayState ? `Open ${overlayState} workflow` : 'Start pre-session';
    const secondaryCta = overlayState ? 'Back to appointment list' : 'Reschedule';
    return <PageScaffold title="AdvisorAppointmentDetailPage" subtitle={appt.appointment_id} primaryCta={primaryCta} secondaryCta={secondaryCta} timeline={timelineFromAppointment()}><SimplePanels primary={<><OverlayBanner /><p>Notes status: {notesData.notes.status} · Transcript: {transcript.status}</p></>} rail={<p>Current booking state badge: <span className="badge">{appt.booking_state}</span></p>} /></PageScaffold>;
}
export function AdvisorSessionRoomPage() { return <PageScaffold title="AdvisorSessionRoomPage" subtitle="Live session workspace" primaryCta="Join session" secondaryCta="Report issue" timeline={timelineFromAppointment()}><SimplePanels primary={<p>Booking state: {appt.booking_state}</p>} rail={<p>Transcript segments: {transcript.segments?.length ?? 0}</p>} /></PageScaffold>; }
export function AdvisorSessionNotesEditorPage() { return <PageScaffold title="AdvisorSessionNotesEditorPage" subtitle="Compose and edit notes" primaryCta="Save draft" secondaryCta="Finalize note"><SimplePanels primary={<p>Decisions: {notesData.notes.sections.decisions.length}</p>} rail={<p>Appointment state: {appt.advisor_status}</p>} /></PageScaffold>; }
export function AdvisorTranscriptReviewPage() {
    const gate = getTranscriptFinalizeGate(appt, transcript);
    return <PageScaffold title="AdvisorTranscriptReviewPage" subtitle="Review transcript and finalize" primaryCta={gate.enabled ? 'Finalize transcript' : 'Finalize blocked'} secondaryCta="Request reprocess"><SimplePanels primary={<><p className="badge warning">{gate.reason}</p><p>{gate.helperText}</p></>} rail={<button className="btn" disabled={!gate.enabled} title={gate.reason}>Finalize transcript</button>} /></PageScaffold>;
}
export function AdvisorSessionSummaryPage() { return <PageScaffold title="AdvisorSessionSummaryPage" subtitle="Post-session summary" primaryCta="Publish summary" secondaryCta="Back to notes"><SimplePanels primary={<p>Action items: {notesData.notes.sections.action_items.length}</p>} rail={<p>Booking state: {appt.booking_state}</p>} /></PageScaffold>; }
export function AdvisorAppointmentClosurePage() {
    const gate = getClosureGate(appt, payment);
    return <PageScaffold title="AdvisorAppointmentClosurePage" subtitle="Close completed appointment" primaryCta={gate.enabled ? 'Close appointment' : 'Closure blocked'} secondaryCta="Escalate"><SimplePanels primary={<><p className="badge warning">{gate.reason}</p><p>Next action: {gate.nextAction}</p></>} rail={<button className="btn" disabled={!gate.enabled} title={gate.reason}>Close now</button>} /></PageScaffold>;
}
export function AdvisorPreSessionChecklistPage() { return <PageScaffold title="AdvisorPreSessionChecklistPage" subtitle="Readiness checks" primaryCta="Mark ready" secondaryCta="Message client"><SimplePanels primary={<p>Upcoming appointment (UTC input rendered in {userTimeZone}): {formatTimestampForUser(appt.session.starts_at, userTimeZone)}</p>} rail={<p>Notifications: {notificationsData.notifications.length}</p>} /></PageScaffold>; }
export function AdvisorInvoiceOrPaymentStatusPage() { return <PageScaffold title="AdvisorInvoiceOrPaymentStatusPage" subtitle="Invoice and payout status" primaryCta="Generate invoice" secondaryCta="Contact billing"><SimplePanels primary={<p>Invoice {paymentsData.payments[0].invoice_id}</p>} rail={<p>Payment status: {appt.payment_status} · {typeof payment.amount_cents === 'number' && payment.currency ? formatMoneyFromCents(payment.amount_cents, payment.currency) : 'N/A'}</p>} /></PageScaffold>; }
export function AdvisorHistoricalRecordsPage() { return <PageScaffold title="AdvisorHistoricalRecordsPage" subtitle="Historical records" primaryCta="Export archive" secondaryCta="Filter results"><SimplePanels primary={<p>{appt.appointment_id} · {notesData.notes.status} · {transcript.status}</p>} rail={<p>Payment total: {typeof payment.amount_cents === 'number' && payment.currency ? formatMoneyFromCents(payment.amount_cents, payment.currency) : 'N/A'}</p>} /></PageScaffold>; }
export function RescheduleOrCancellationPage() { return <PageScaffold title="RescheduleOrCancellationPage" subtitle="Handle reschedule/cancellation" primaryCta="Offer reschedule" secondaryCta="Confirm cancellation"><SimplePanels primary={<p>Current state: {appt.booking_state}</p>} rail={<p>Scenario: {scenariosData.scenarios.find((s) => s.scenario_id === 'cancellation_reschedule')?.appointment_id}</p>} /></PageScaffold>; }
export function NoShowResolutionPage() { return <PageScaffold title="NoShowResolutionPage" subtitle="Resolve no-show outcomes" primaryCta="Mark no-show resolved" secondaryCta="Open dispute"><SimplePanels primary={<p>No-show scenario required resolution.</p>} rail={<p>Scenario id: {scenariosData.scenarios.find((s) => s.scenario_id === 'no_show')?.appointment_id}</p>} /></PageScaffold>; }
export function DisputeOrEscalationPage() { return <PageScaffold title="DisputeOrEscalationPage" subtitle="Dispute and escalation" primaryCta="Respond to dispute" secondaryCta="Escalate to admin"><SimplePanels primary={<p>Dispute {dispute.dispute_id} status {dispute.status}</p>} rail={<p>Scenario count: {scenariosData.scenarios.length}</p>} /></PageScaffold>; }
