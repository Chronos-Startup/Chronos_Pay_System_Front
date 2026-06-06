import { ReactNode } from "react";

interface NotificationContentProps {
  children: ReactNode;
}

export default function NotificationContent({
  children,
}: NotificationContentProps) {
  return <div className="flex flex-col gap-1 flex-1 min-w-0">{children}</div>;
}
