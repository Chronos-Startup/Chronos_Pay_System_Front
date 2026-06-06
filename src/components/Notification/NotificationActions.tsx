import { ReactNode } from "react";

interface NotificationActionsProps {
  children: ReactNode;
}

export default function NotificationActions({
  children,
}: NotificationActionsProps) {
  return (
    <div className="flex items-center gap-2 mt-2">{children}</div>
  );
}
