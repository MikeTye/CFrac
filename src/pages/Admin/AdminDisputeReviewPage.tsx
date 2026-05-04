import { useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { disputes } from '../../mocks/admin';

export function AdminDisputeReviewPage() {
  const { disputeId } = useParams();
  const dispute = disputes.find((item) => item.id === disputeId) ?? disputes[0];

  return (
    <Card>
      <h3>Dispute Review · {dispute.id}</h3>
      <p><strong>Booking:</strong> {dispute.bookingId}</p>
      <p><strong>Status:</strong> {dispute.status}</p>
      <p><strong>Reason:</strong> {dispute.reason}</p>
      <ul>{dispute.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
    </Card>
  );
}
