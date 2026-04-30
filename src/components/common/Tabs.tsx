export function Tabs<T extends string>({ values, active, onChange }: { values: T[]; active: T; onChange: (next: T) => void }) {
  return (
    <div className="tabs">
      {values.map((value) => (
        <button key={value} onClick={() => onChange(value)} className={value === active ? 'active' : ''}>
          {value.replaceAll('_', ' ')}
        </button>
      ))}
    </div>
  );
}
