import { Send } from "lucide-react";
import { useState } from "react";
import { useAgent } from "../../context/AgentContext";

export function AgentInput() {
  const [input, setInput] = useState<string>("");
  const { onSend, isLoading } = useAgent();
  const handleOnSendInput = (input: string) => {
    if (!input.trim()) return;
    onSend(input);
    setInput(""); //clean input
  };

  return (
    <div className="p-4 border-t bottom-0 w-full border-white/5">
      <div className="relative group">
        <textarea
          value={input}
          rows={1}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleOnSendInput(input)}
          placeholder="Como posso te ajudar hoje?..."
          className="w-full resize-none overflow-y-hidden bg-midnight-light/50 border border-white/10 rounded-2xl py-3.5 pl-4 pr-12 text-xs text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-text-gray/30"
        />
        <button
          onClick={() => handleOnSendInput(input)}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-xl text-midnight-dark hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
