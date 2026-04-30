export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <header className="section-header-v2">
            <div className="sh-rule" aria-hidden="true" />
            <h2 className="sh-title">{title}</h2>
            {subtitle && <p className="sh-subtitle">{subtitle}</p>}
        </header>
    );
}