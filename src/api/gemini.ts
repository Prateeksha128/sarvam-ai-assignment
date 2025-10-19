// Secure API client - calls our serverless function instead of direct Gemini API
let sessionId: string = "default";
let currentContext: string = "You are a helpful assistant.";

// Generate a unique session ID for this widget instance
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function initGeminiChat(context: string) {
  console.log("🤖 Initializing Gemini chat with context:", context);
  currentContext = context || "You are a helpful assistant.";
  sessionId = generateSessionId(); // Create new session
  console.log("✅ Gemini chat session initialized with session ID:", sessionId);
}

export async function sendMessageToGemini(message: string): Promise<string> {
  console.log("📤 Sending message to Gemini AI:", message);

  try {
    const baseUrl = window.location.origin;
    const apiUrl = `${baseUrl}/api/chat`;

    console.log("🔄 Calling Gemini API endpoint:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        context: currentContext,
        sessionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("📥 Gemini AI response received:", data.response);
    return (
      data.response || "I apologize, but I didn't receive a proper response."
    );
  } catch (error: any) {
    console.error("❌ Gemini API error:", error);

    // Provide helpful deployment message for local development
    if (window.location.hostname === "localhost") {
      return "🚀 To get real AI responses, deploy this project to Vercel where the API endpoints are available. The widget is working perfectly and will use real Gemini AI in production!";
    }

    return `I apologize, but I'm having trouble connecting to my AI service right now. Please try again in a moment. Error: ${error?.message}`;
  }
}

// Additional helper functions for compatibility
export function resetChatSession() {
  // Generate a new session ID to effectively "reset" the chat
  sessionId = generateSessionId();
  console.log("🔄 Chat session reset with new session ID:", sessionId);
}

export function getChatSession() {
  return { sessionId, context: currentContext };
}
