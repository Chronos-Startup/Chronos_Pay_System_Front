import { AlertCircle, CircleUser, Clock, CreditCard, LogOut, Receipt, Settings } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ElementType, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { truncateString } from "../utils/StringUtils";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../components/Skeleton";

interface SidebarItemProps {
  icon: ElementType;
  label: string;
  hasAlert?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, hasAlert, className }: SidebarItemProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: 4 }}
    className={twMerge(
      `w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-text-gray hover:text-white hover:bg-white/5"
      }`,
      className,
    )}
  >
    <div className="relative">
      <Icon size={18} />
      {hasAlert && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-midnight-dark" />
      )}
    </div>
    <span className="font-medium text-sm">{label}</span>
    {hasAlert && <AlertCircle size={14} className="ml-auto text-red-500 animate-pulse" />}
  </motion.button>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  logOut?: () => void;
}

export default function Sidebar({ isOpen, onClose, logOut }: SidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mpConnected, isLoading, user } = useAuth();
  const activeView = pathname;
  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 xl:hidden"
          />
        )}
      </AnimatePresence>
      <aside
        className={`fixed top-0 left-0 h-dvh w-72 border-r border-charcoal bg-midnight-dark flex flex-col gap-5 p-6 z-50 transition-transform duration-300 xl:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-5">
          <div className="p-2 flex gap-2 items-center font-bold uppercase text-xs bg-primary/20 border text-primary border-primary/50 rounded">
            <Clock />
          </div>
          <p className="uppercase text-xl max-md:text-md text-slate-100 font-extrabold">
            CHRONOS<span className="text-primary">PAY</span>
          </p>
        </div>

        <nav className="flex-1 space-y-2">
          {/* <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeView === "/dashboard"}
            onClick={() => navigate("dashboard")}
          /> */}
          <SidebarItem
            icon={Receipt}
            label="Transações"
            active={activeView === "/transactions"}
            onClick={() => navigate("/transactions")}
          />
          <SidebarItem
            icon={CreditCard}
            label="Planos e Assinaturas"
            active={activeView === "/plans"}
            onClick={() => navigate("/plans")}
          />
        </nav>

        {!mpConnected && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-2 mb-6 p-4 rounded-2xl bg-red-500/5 border border-red-500/20"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                <AlertCircle size={16} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Atenção</p>
                <p className="text-[11px] text-text-gray/80 leading-tight">Integração Mercado Pago inativa.</p>
                <button
                  onClick={() => navigate("/settings")}
                  className="mt-2 cursor-pointer font-bold text-white underline underline-offset-4 hover:text-primary transition-colors"
                >
                  <span className="text-sm">Configurar agora</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-auto border-t border-charcoal space-y-3 pt-6">
          <SidebarItem
            icon={Settings}
            label="Configurações"
            active={activeView === "/settings"}
            onClick={() => navigate("/settings")}
            hasAlert={!isLoading && !mpConnected}
          />
          <SidebarItem icon={LogOut} onClick={logOut} className="text-red-500/80 hover:bg-red-500/20" label="Sair" />
          {user && (
            <button
              onClick={() => navigate("/profile")}
              className="mt-4 cursor-pointer p-3 bg-glass rounded-xl w-full flex items-center space-x-3 border border-charcoal hover:bg-charcoal"
            >
              <div
                className={`rounded-2xl  hover:border-primary/20 cursor-pointer overflow-hidden shrink-0 bg-primary/30 h-10 w-10 flex items-center justify-center border border-primary/20`}
              >
                {user?.company.picture_url ? (
                  <img src={user?.company.picture_url} alt="Foto de perfil" className="w-full h-full object-cover" />
                ) : (
                  <CircleUser size={20} className="text-amber-400" />
                )}
              </div>
              <div className="w-full">
                <p className="text-xs font-bold text-on-surface truncate">{truncateString(user?.name, 23)}</p>
              </div>
            </button>
          )}

          {isLoading && <Skeleton className="min-h-14" />}
        </div>
      </aside>
    </>
  );
}
