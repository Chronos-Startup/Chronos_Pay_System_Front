import { Sparkles, User } from "lucide-react";
import { motion } from "motion/react";
import { useAgent } from "../../context/AgentContext";
import { useEffect, useRef } from "react";

export function AgentMessages() {
  const { isMinimized, messages, isLoading } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth"  });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    !isMinimized && (
      <>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hidden">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
                    m.role === "user" ? "bg-white/10" : "bg-primary/20"
                  }`}
                >
                  {m.role === "user" ? (
                    <User size={14} className="text-white" />
                  ) : (
                    <Sparkles size={14} className="text-primary" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-primary text-midnight-dark font-medium rounded-tr-none"
                      : "bg-white/5 text-text-gray border border-white/5 rounded-tl-none leading-relaxed"
                  }`}
                >
                  <div className="markdown-body text-xs">{m.text}</div>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 items-center text-text-gray">
                <div className="w-7 h-7 bg-primary/20 rounded-lg flex items-center justify-center animate-pulse">
                  <Sparkles size={14} className="text-primary" />
                </div>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-primary/50 rounded-full animate-bounce" />
                  <span className="w-1 h-1 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </>
    )
  );
}
