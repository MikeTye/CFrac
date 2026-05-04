import { useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { sessionArtifacts } from '../../mocks/client';

export function ClientSessionDetailsPage() {
  const { bookingId } = useParams();
  const artifact = sessionArtifacts.find((a) => a.bookingId === bookingId) ?? sessionArtifacts[0];
  return <div className="stack-lg"><h1>Past Session Details</h1><Card><h3>Summary</h3><p>{artifact.summary}</p></Card><Card><h3>Action items</h3><ul>{artifact.actionItems.map((item) => <li key={item}>{item}</li>)}</ul></Card><Card><h3>Risks</h3><ul>{artifact.risks.map((risk) => <li key={risk}>{risk}</li>)}</ul><p>Transcript: {artifact.transcriptStatus}</p><p>Recording: {artifact.recordingStatus}</p></Card></div>;
}
