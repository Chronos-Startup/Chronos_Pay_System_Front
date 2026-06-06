import { ReactNode } from "react";

interface NotificationTimestampProps {
  children: ReactNode;
}

export default function NotificationTimestamp({
  children,
}: NotificationTimestampProps) {
  return (
    <span className="text-xs text-slate-500 mt-1 block">{children}</span>
  );
}
