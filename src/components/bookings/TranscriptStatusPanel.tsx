export function TranscriptStatusPanel({ status }: { status?: 'not_started' | 'processing' | 'ready' }) {
  return (
    <div className="card">
      <h3>Transcript Status</h3>
      <p>{status?.replaceAll('_', ' ') ?? 'not started'}</p>
    </div>
  );
}
