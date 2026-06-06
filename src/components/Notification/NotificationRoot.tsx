import { motion } from "motion/react";
import { ReactNode, createContext, useContext } from "react";

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "plan"
  | "neutral";

interface NotificationContextValue {
  type: NotificationType;
}

const NotificationContext = createContext<NotificationContextValue>({
  type: "info",
});

export function useNotificationType() {
  return useContext(NotificationContext);
}

const typeStyles: Record<NotificationType, string> = {
  success:
    "border-l-emerald-400 bg-emerald-500/5 [--notif-accent:theme(--color-emerald-400)]",
  error:
    "border-l-red-400 bg-red-500/5 [--notif-accent:theme(--color-red-400)]",
  warning:
    "border-l-amber-400 bg-amber-500/5 [--notif-accent:theme(--color-amber-400)]",
  info: "border-l-blue-400 bg-blue-500/5 [--notif-accent:theme(--color-blue-400)]",
  plan: "border-l-primary bg-primary/5 [--notif-accent:theme(--color-primary)]",
  neutral:
    "border-l-slate-400 bg-slate-500/5 [--notif-accent:theme(--color-slate-400)]",
};

interface NotificationRootProps {
  type?: NotificationType;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export default function NotificationRoot({
  type = "info",
  children,
  className = "",
  onClose,
}: NotificationRootProps) {
  return (
    <NotificationContext.Provider value={{ type }}>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`
          relative overflow-hidden rounded-xl border-l-4
          border border-white/5 backdrop-blur-md
          p-4 flex items-start gap-3
          ${typeStyles[type]}
          ${className}
        `}
      >
        {children}

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label="Fechar notificação"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        )}
      </motion.div>
    </NotificationContext.Provider>
  );
}
