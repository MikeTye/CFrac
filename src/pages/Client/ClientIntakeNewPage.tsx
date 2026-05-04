import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';

export function ClientIntakeNewPage() {
  return <div className="stack-lg"><h1>New Case Intake</h1><Card><p className="muted">All fields are permissive for POC demo.</p><label>Company<input placeholder="Company" /></label><label>Topic<input placeholder="Topic" /></label><label>Problem statement<textarea placeholder="Describe your challenge" /></label><label>Desired outcomes<textarea placeholder="What should this session achieve?" /></label><label>NDA preference<select><option>Require NDA</option><option>No NDA required</option></select></label><div className="stack-row"><Link to="/client/intake/int-1001/status" className="btn">Submit Intake</Link><Link to="/advisors/nina-cfo" className="btn ghost">Back to Advisor</Link></div></Card></div>;
}
