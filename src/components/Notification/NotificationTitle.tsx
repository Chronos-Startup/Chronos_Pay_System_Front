import { ReactNode } from "react";

interface NotificationTitleProps {
  children: ReactNode;
}

export default function NotificationTitle({
  children,
}: NotificationTitleProps) {
  return (
    <p className="text-sm font-semibold text-white leading-tight">
      {children}
    </p>
  );
}
