import { ElementType } from "react";
import { useNotificationType, NotificationType } from "./NotificationRoot";

const iconColorMap: Record<NotificationType, string> = {
  success: "#34d399",
  error: "#f87171",
  warning: "#fbbf24",
  info: "#60a5fa",
  plan: "#d4af37",
  neutral: "#94a3b8",
};

interface NotificationIconProps {
  icon: ElementType;
  size?: number;
}

export default function NotificationIcon({
  icon: Icon,
  size = 20,
}: NotificationIconProps) {
  const { type } = useNotificationType();

  return (
    <div
      className="mt-0.5 flex-shrink-0 rounded-lg p-1.5"
      style={{ backgroundColor: `${iconColorMap[type]}15` }}
    >
      <Icon
        size={size}
        className="stroke-[2]"
        style={{ color: iconColorMap[type] }}
      />
    </div>
  );
}
