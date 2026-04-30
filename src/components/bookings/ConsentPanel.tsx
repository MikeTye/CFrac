export function ConsentPanel({ consentClient, consentAdvisor }: { consentClient: boolean; consentAdvisor: boolean }) {
  const allowed = consentClient && consentAdvisor;
  return (
    <div className="card">
      <h3>Consent Status</h3>
      <label><input type="checkbox" checked={consentClient} readOnly /> Client consent</label>
      <p>Advisor consent: {consentAdvisor ? 'Granted' : 'Missing'}</p>
      <p className={allowed ? 'success' : 'danger'}>{allowed ? 'Recording allowed' : 'Recording disabled: missing consent'}</p>
    </div>
  );
}
