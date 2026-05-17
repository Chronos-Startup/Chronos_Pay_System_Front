import { Bot } from "lucide-react";
import { motion } from "motion/react";
import { useAgent } from "../../context/AgentContext";

export function AgentButton() {
  const { setIsOpen } = useAgent();
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      className="w-16 h-16  bg-primary rounded-full flex items-center justify-center text-midnight-dark shadow-[0_10px_30px_rgba(212,175,55,0.4)] relative group"
    >
      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
      <Bot size={28} />
      <span className="absolute -top-10 right-0 bg-midnight-dark border border-white/10 text-white text-[10px] font-bold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Opa! Precisa de ajuda?
      </span>
    </motion.button>
  );
}
