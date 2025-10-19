import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyChQXOJu-661I2cJr4dgbypfSR5zlxgujs");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

let chatSession: any = null;

export function initGeminiChat(context: string) {
  chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: context || "You are a helpful assistant." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
    },
  });
}

export async function sendMessageToGemini(message: string): Promise<string> {
  if (!chatSession) {
    initGeminiChat("You are a helpful assistant.");
  }

  try {
    const result = await chatSession.sendMessage(message);
    const response = result.response.text();
    return response || "(No response)";
  } catch (error: any) {
    return `Sorry, I encountered an error: ${
      error?.message || "Could not reach Gemini API"
    }`;
  }
}

// Additional helper functions for compatibility
export function resetChatSession() {
  chatSession = null;
}

export function getChatSession() {
  return chatSession;
}
