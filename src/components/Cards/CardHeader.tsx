export default function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-3 text-primary mb-3">{children}</div>;
}
