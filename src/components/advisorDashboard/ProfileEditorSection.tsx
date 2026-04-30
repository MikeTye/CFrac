import { useState, type ReactNode } from 'react';

export function ProfileEditorSection({ title, helper, children }: { title: string; helper: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="card">
      <button className="row-spread" onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <span>{open ? '−' : '+'}</span>
      </button>
      <p className="muted">{helper}</p>
      {open ? <div>{children}<button className="btn">Save Section</button></div> : null}
    </section>
  );
}
