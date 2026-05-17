import { createContext, useContext, ReactNode, useState } from "react";
import { Message } from "../components/Agent/AgentChat";
import sendMessageAgent from "../Agent/agentStream";

interface AgentContextData {
  isLoading: boolean;
  messages: Message[];
  isMinimized: boolean;
  isOpen: boolean;
  setIsMinimized: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  setMessages: (value: Message[] | ((prev: Message[]) => Message[])) => void;
  onSend: (message: string) => void;
}

const AgentContext = createContext<AgentContextData | undefined>(undefined);
interface AgentProviderProps {
  children: ReactNode;
}
export function AgentProvider({ children }: AgentProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Olá! Sou o assistente inteligente do Chronos Pay. Como posso ajudar você hoje?" },
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const onSend = async (message: string) => {
      setMessages((prev) => [...prev, { role: "user", text: message }]);
      setMessages((prev) => [...prev, { role: "model", text: "" }]);
      await sendMessageAgent(message, setMessages)
  };

  return (
    <AgentContext.Provider
      value={{ isLoading, isMinimized, isOpen, messages, setIsMinimized, setIsOpen, setMessages, onSend }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgent deve ser usado dentro de AgentProvider");
  return context;
}
