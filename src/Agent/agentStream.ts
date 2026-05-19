import axios from "axios";
import { getCognitoIdToken } from "../utils/Authorizer";
import { Message } from "../components/Agent/AgentChat";

export default async function sendMessageAgent(
  message: string,
  setMessages: (value: Message[] | ((prev: Message[]) => Message[])) => void,
) {
  try {
    const idToken = await getCognitoIdToken();
    await axios.post(
      `${import.meta.env.VITE_API_URL}/ai/chat`,
      {
        prompt: message,
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        responseType: "text",
        onDownloadProgress: (progressEvent) => {
          const target = progressEvent.event.currentTarget as XMLHttpRequest;
          
          const currentResponse = JSON.parse(target.response);
          let displayText = currentResponse;
          
          if (Array.isArray(currentResponse)) {
            displayText = currentResponse
              .filter((block: any) => block.text)
              .map((block: any) => block.text)
              .join("");
          }
          setMessages((prev) => {
            const updated = [...prev];
            // Localiza o último item (que criamos vazio ali em cima) e injeta o acumulado
            if (updated.length > 0) {
              updated[updated.length - 1] = {
                role: "model",
                text: displayText,
              };
            }
            return updated;
          });
        },
      },
    );
  } catch (error) {
    console.error("Erro ao enviar mensagem para o agente:", error);
    // Opcional: Tratar erro atualizando o último balão com uma mensagem amigável
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          role: "model",
          text: "[Instabilidade na rede. Não foi possível receber a resposta do agente.]",
        };
      }
      return updated;
    });
  }
}
