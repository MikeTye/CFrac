type BadgeProps = {
  children: React.ReactNode;
  tone?: "success" | "default" | "warning" | "danger";
  className?: string;
};

export function Badge({ children, tone = "default", className = "" }: BadgeProps) {
  return (
    <span className={`badge badge-${tone} ${className}`}>
      {children}
    </span>
  );
}