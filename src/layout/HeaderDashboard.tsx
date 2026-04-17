import { CircleUser, Clock, CreditCard, Link2, LogOut, Repeat, Settings } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../components/Button";
import TextUppercase from "../components/TextUppercase";
import { AuthUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "../pages/LoadingPage";
import { truncateString } from "../utils/StringUtils";
import { AnimatePresence, motion } from "motion/react";
import { NavLink } from "../components/NavLinks";

interface HeaderDashboardProps {
  userCognito?: AuthUser;
  signOut?: () => void;
}

function HeaderDashboard({ signOut }: HeaderDashboardProps) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isLoading, mpConnected } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <header className="w-full py-3 px-6 flex gap-5 justify-between items-center bg-midnight-dark/50 border-b border-charcoal">
      <div className="flex items-center gap-3">
        <div className="p-2 flex gap-2 items-center font-bold uppercase text-xs bg-primary/20 border text-primary border-primary/50 rounded">
          <Clock />
        </div>
        <p className="uppercase text-xl max-md:text-md text-slate-100 font-extrabold">
          CHRONOS<span className="text-primary">PAY</span>
        </p>
        <div className="flex gap-10 max-md:hidden px-10">
          <NavLink path="/transactions" label="Transações" />
          <NavLink path="/plans" label="Planos e Assinaturas" />
          {/* <NavLink path="/reports" label="Relatórios" /> */}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            aria-expanded={open}
            aria-label="Abrir menu de usuário"
            onClick={() => setOpen((v) => !v)}
            className={`rounded-full cursor-pointer overflow-hidden shrink-0 bg-gray-700 h-10 w-10 flex items-center justify-center`}
          >
            <div
              className={`${!mpConnected && "bg-red-400 animate-ping"} w-2 h-2 rounded-full absolute bg-green-500 top-0 left-0`}
            ></div>
            {user?.company.picture_url ? (
              <img src={user?.company.picture_url} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <CircleUser size={20} className="text-amber-400" />
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute max-md:-right-4 right-0 top-12 rounded-2xl backdrop-blur-md text-start flex flex-col gap-3 p-5 min-w-64 glass-card text-white z-20"
              >
                <div className="w-full flex items-center gap-3">
                  <div
                    className={`rounded-full cursor-pointer overflow-hidden shrink-0 bg-primary/30 h-10 w-10 flex items-center justify-center`}
                  >
                    {user?.company.picture_url ? (
                      <img
                        src={user?.company.picture_url}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CircleUser size={20} className="text-amber-400" />
                    )}
                  </div>
                  <div className="w-full">
                    <p className="font-bold">{truncateString(user?.name, 20)}</p>
                    <p className="text-text-gray text-sm">{user?.email}</p>
                  </div>
                </div>

                <div className="w-full border-t border-text-gray/20 py-3 text-left flex flex-col gap-3">
                  <TextUppercase>Integrações</TextUppercase>
                  <Button.Root
                    onClick={() => handleNavigate("/oauth/mercadopago")}
                    className={`py-3 text-midnight-dark px-2.5 ${!mpConnected && "border-red-400 text-red-400 bg-red-400/20 border hover:bg-red-400/30 hover:scale-105"}`}
                  >
                    <Button.Icon icon={Link2} className={`${!mpConnected && "text-red-400"}`} />
                    {mpConnected ? "Ver Credenciais Mercado Pago" : "Conectar Mercado Pago"}
                  </Button.Root>
                </div>

                <div className="w-full border-t border-text-gray/20 py-3 flex flex-col gap-3">
                  <button
                    onClick={() => handleNavigate("/transactions")}
                    className="text-text-gray border-l-primary border-l-3 w-full flex items-center cursor-pointer hover:bg-text-gray/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md hover:scale-105"
                  >
                    <CreditCard size={16} />
                    Transações
                  </button>

                  <button
                    onClick={() => handleNavigate("/plans")}
                    className="text-text-gray border-l-primary border-l-3 w-full flex items-center cursor-pointer hover:bg-text-gray/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md hover:scale-105"
                  >
                    <Repeat size={16} />
                    Planos e Assinaturas
                  </button>
                </div>

                <div className="w-full border-t border-b border-text-gray/20 py-3 flex flex-col gap-3">
                  <button
                    onClick={() => handleNavigate("/profile")}
                    className="text-text-gray w-full flex items-center cursor-pointer hover:bg-text-gray/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md hover:scale-105"
                  >
                    <CircleUser size={16} />
                    Perfil
                  </button>

                  <button
                    onClick={() => handleNavigate("/settings")}
                    className="text-text-gray w-full flex items-center cursor-pointer hover:bg-text-gray/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md hover:scale-105"
                  >
                    <Settings size={16} />
                    Configurações
                  </button>
                </div>

                <button
                  onClick={signOut}
                  className="text-red-500/70 flex hover:scale-105 w-full items-center cursor-pointer hover:bg-red-500/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md"
                >
                  <LogOut size={16} />
                  Sair da conta
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default memo(HeaderDashboard);
