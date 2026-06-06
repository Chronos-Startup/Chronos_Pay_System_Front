import { ReactNode } from "react";

interface NotificationMessageProps {
  children: ReactNode;
}

export default function NotificationMessage({
  children,
}: NotificationMessageProps) {
  return (
    <p className="text-sm text-white/70 leading-relaxed">{children}</p>
  );
}
