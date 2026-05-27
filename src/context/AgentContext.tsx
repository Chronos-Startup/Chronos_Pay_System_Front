import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Message } from "../components/Agent/AgentChat";
import sendMessageAgent from "../Agent/agentStream";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

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
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const { user, isLoading: authIsLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!user) return;
    let ws: WebSocket;
    const connect = () => {
      ws = new WebSocket("wss://o3hab5y196.execute-api.us-east-1.amazonaws.com/production/");
    }
    connect()
  }, [user]);

  useEffect(() => {
    if (!authIsLoading && user) {
      const firstName = user.name.split(" ")[0];
      setMessages([
        {
          id: "initial",
          role: "model",
          text: `Olá, ${firstName}! Sou o assistente inteligente do Chronos Payments. Como posso te ajudar hoje?`,
        },
      ]);
    }
  }, [authIsLoading, user]);

  //enviar uma nova mensagem para o agente
  const onSend = async (message: string) => {
    try {
      setIsLoading(true);
      setMessages((prev) => [...prev, { role: "user", text: message }]);
      await sendMessageAgent(message, setMessages);
    } catch (error) {
      console.error("Erro do agente:", error);
    } finally {
      setIsLoading(false);
    }
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
