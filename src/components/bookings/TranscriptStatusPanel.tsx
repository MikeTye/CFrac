export function TranscriptStatusPanel({ status }: { status?: 'not_started' | 'processing' | 'ready' }) {
  return (
    <div className="card">
      <h3>Transcript Status</h3>
      <p>{status?.replace('_', ' ') ?? 'not started'}</p>
    </div>
  );
}
