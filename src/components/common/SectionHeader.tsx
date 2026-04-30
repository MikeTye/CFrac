export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="section-header">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  );
}
