import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCqjAPCzwnMZezZlg3mWQTm2XbOa5_5J20");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

let chatSession: any = null;

export function initGeminiChat(context: string) {
  console.log("🤖 Initializing Gemini chat with context:", context);
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
  console.log("✅ Gemini chat session initialized");
}

export async function sendMessageToGemini(message: string): Promise<string> {
  console.log("📤 Sending message to Gemini:", message);
  
  if (!chatSession) {
    console.log("⚠️ No chat session found, initializing...");
    initGeminiChat("You are a helpful assistant.");
  }

  try {
    console.log("🔄 Calling Gemini API...");
    const result = await chatSession.sendMessage(message);
    const response = result.response.text();
    console.log("📥 Gemini response received:", response);
    return response || "(No response)";
  } catch (error: any) {
    console.error("❌ Gemini API error:", error);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name
    });
    return `Sorry, I encountered an error: ${error?.message || "Could not reach Gemini API"}`;
  }
}

// Additional helper functions for compatibility
export function resetChatSession() {
  chatSession = null;
}

export function getChatSession() {
  return chatSession;
}