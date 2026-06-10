import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import { useAuth } from "./AuthContext";
import { CheckCircle, AlertTriangle, XCircle, Info, Crown, Bell } from "lucide-react";
import { Notification, NotificationType } from "@components/Notification";

interface WsNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt?: string;
}

const typeIcons: Record<NotificationType, React.ElementType> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  plan: Crown,
  neutral: Bell,
};

interface NotificationContextData {
  notifications: WsNotification[];
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextData | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<WsNotification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  useEffect(() => {
    if (!user) return;

    let ws: WebSocket;
    let reconnectTimeout: ReturnType<typeof setTimeout>;
    let shouldReconnect = true;

    const connect = () => {
      ws = new WebSocket(`wss://o3hab5y196.execute-api.us-east-1.amazonaws.com/production/?userId=${user.user_id}`);

      ws.onopen = () => console.log("WebSocket conectado");

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        const notif: WsNotification = {
          id: crypto.randomUUID(),
          type: data.type ?? "info",
          title: data.title ?? "Notificação",
          message: data.message ?? "",
          createdAt: data.createdAt,
        };

        setNotifications((prev) => [...prev, notif]);

        // Auto-remove após 6 segundos
        setTimeout(() => removeNotification(notif.id), 10000);
      };

      ws.onclose = () => {
        if (!shouldReconnect) return;
        console.log("WebSocket desconectado, reconectando em 3s...");
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.onerror = () => {
        console.error("WebSocket erro");
        ws.close();
      };
    };

    connect();

    return () => {
      shouldReconnect = false;
      clearTimeout(reconnectTimeout);
      ws?.close();
    };
  }, [user?.user_id, removeNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, removeNotification }}>
      {children}

      {/* Notificações WebSocket — renderizadas via portal no body */}
      {createPortal(
        <div className="fixed top-4 right-4 z-9999 flex flex-col gap-3 w-full max-w-[90vw] pointer-events-none">
          <AnimatePresence mode="popLayout">
            {notifications.map((notif) => (
              <div key={notif.id} className="pointer-events-auto">
                <Notification.Root type={notif.type} onClose={() => removeNotification(notif.id)}>
                  <Notification.Icon icon={typeIcons[notif.type] ?? Bell} />
                  <Notification.Content>
                    <Notification.Title>{notif.title}</Notification.Title>
                    <Notification.Message>{notif.message}</Notification.Message>
                    {notif.createdAt && <Notification.Timestamp>{notif.createdAt}</Notification.Timestamp>}
                  </Notification.Content>
                </Notification.Root>
              </div>
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification deve ser usado dentro de NotificationProvider");
  return context;
}
