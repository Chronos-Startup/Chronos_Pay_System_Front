import NotificationRoot from "./NotificationRoot";
import NotificationIcon from "./NotificationIcon";
import NotificationContent from "./NotificationContent";
import NotificationTitle from "./NotificationTitle";
import NotificationMessage from "./NotificationMessage";
import NotificationTimestamp from "./NotificationTimestamp";
import NotificationActions from "./NotificationActions";

export type { NotificationType } from "./NotificationRoot";

export const Notification = {
  Root: NotificationRoot,
  Icon: NotificationIcon,
  Content: NotificationContent,
  Title: NotificationTitle,
  Message: NotificationMessage,
  Timestamp: NotificationTimestamp,
  Actions: NotificationActions,
};
