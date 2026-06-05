export default function CardRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-card p-6 rounded-3xl border border-white/5 relative overflow-hidden group">{children}</div>
  );
}
