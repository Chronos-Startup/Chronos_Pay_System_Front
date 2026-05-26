import { getCognitoIdToken } from "../utils/Authorizer";
import { Message } from "../components/Agent/AgentChat";

export default async function sendMessageAgent(
  message: string,
  setMessages: (value: Message[] | ((prev: Message[]) => Message[])) => void,
) {
  try {
    const idToken = await getCognitoIdToken();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/ai/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
          prompt: message
        })
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    if (!response.body) {
      throw new Error("Stream não disponivel")
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let fullText = "";
    const messageId = crypto.randomUUID()

    setMessages((prev) => [...prev, { id: messageId, role: "model", text: "" }])

    while (true) {
      const { done, value } = await reader.read()

      if (done) break;

      const chunk = decoder.decode(value, {
        stream: true
      })

      fullText += chunk

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ?
            { ...msg, text: fullText } : msg
        )
      )
    }


  } catch (error) {
    console.error("Erro ao enviar mensagem para o agente:", error);
    // Opcional: Tratar erro atualizando o último balão com uma mensagem amigável
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated.push({
          role: "model",
          text: "Instabilidade na rede. Não foi possível receber a resposta do agente.",
        })
      }
      return updated;
    });
  }
}
