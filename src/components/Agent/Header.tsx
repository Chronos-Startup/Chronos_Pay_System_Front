import { Bot, Maximize2, MinusCircle, X } from "lucide-react";
import { useAgent } from "../../context/AgentContext";

export function AgentHeader() {
  const { isMinimized, setIsMinimized, setIsOpen } = useAgent();
  return (
    <div className="p-4 border-b border-white/5 flex items-center justify-between bg-primary/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Bot size={18} className="text-midnight-dark" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-widest">Chronos AI</h3>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-text-gray font-medium">Sempre pronta para ajudar</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 text-text-gray hover:text-white transition-colors"
        >
          {isMinimized ? <Maximize2 size={16} /> : <MinusCircle size={16} />}
        </button>
        <button onClick={() => setIsOpen(false)} className="p-2 text-text-gray hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
